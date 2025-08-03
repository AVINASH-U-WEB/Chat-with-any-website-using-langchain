import os
import uuid
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_community.document_loaders import WebBaseLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import DocArrayInMemorySearch
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from dotenv import load_dotenv

# Load environment variables FIRST!
load_dotenv()

# Verify API key is loaded
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise RuntimeError("GOOGLE_API_KEY not found in environment variables")

app = FastAPI()

# ==============================================================================
# === SECURE CORS CONFIGURATION - THIS IS THE UPDATED SECTION ===
# ==============================================================================
# Define the list of "allowed" websites that can talk to your API.
origins = [
    # Allow your local development server (for testing)
    "http://localhost:5173",

    # --- IMPORTANT ---
    # ADD THE URL OF YOUR DEPLOYED FRONTEND APPLICATION HERE!
    # Replace the line below with your actual URL from Vercel.
    "https://chat-with-any-website-using-langcha.vercel.app/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Use the specific list of origins
    allow_credentials=True,
    allow_methods=["GET", "POST"],  # You can restrict to only the methods you use
    allow_headers=["*"],
)
# ==============================================================================

# Session storage (this is simple, for a real app consider Redis or a DB)
sessions = {}


class SessionRequest(BaseModel):
    url: str


class ChatRequest(BaseModel):
    session_id: str
    message: str


def get_vectorstore_from_url(url: str):
    loader = WebBaseLoader(url)
    document = loader.load()

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    document_chunks = text_splitter.split_documents(document)

    # Create Gemini embeddings
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
        google_api_key=GOOGLE_API_KEY
    )

    # Use simple in-memory vector store
    vector_store = DocArrayInMemorySearch.from_documents(document_chunks, embeddings)
    return vector_store


@app.post("/init_session")
async def init_session(request: SessionRequest):
    session_id = str(uuid.uuid4())
    try:
        vector_store = get_vectorstore_from_url(request.url)
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error processing website: {str(e)}"
        )

    sessions[session_id] = {
        "vector_store": vector_store,
        "chat_history": [
            {"type": "ai", "content": "Hello, I am a bot. How can I help you?"}
        ]
    }
    return {"session_id": session_id}


@app.post("/chat")
async def chat(request: ChatRequest):
    session_data = sessions.get(request.session_id)
    if not session_data:
        raise HTTPException(status_code=404, detail="Session not found")

    vector_store = session_data["vector_store"]

    # Convert stored messages to LangChain format
    langchain_messages = []
    for msg in session_data["chat_history"]:
        if msg["type"] == "ai":
            langchain_messages.append(AIMessage(content=msg["content"]))
        else:
            langchain_messages.append(HumanMessage(content=msg["content"]))

    # Create Gemini chat model
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        temperature=0.7,
        google_api_key=GOOGLE_API_KEY,
        convert_system_message_to_human=True
    )

    retriever = vector_store.as_retriever()

    # Retriever prompt
    retriever_prompt = ChatPromptTemplate.from_messages([
        MessagesPlaceholder(variable_name="chat_history"),
        ("user", "{input}"),
        ("user", "Generate a search query based on the conversation")
    ])

    retriever_chain = create_history_aware_retriever(
        llm, retriever, retriever_prompt
    )

    # FIXED: Correct message ordering for Gemini
    conversation_prompt = ChatPromptTemplate.from_messages([
        ("system", "Answer questions using this context:\n\n{context}"),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}"),  # Changed from "user" to "human"
    ])

    document_chain = create_stuff_documents_chain(llm, conversation_prompt)
    conversation_rag_chain = create_retrieval_chain(retriever_chain, document_chain)

    try:
        # Get response
        response = conversation_rag_chain.invoke({
            "chat_history": langchain_messages,
            "input": request.message
        })

        # Update chat history
        sessions[request.session_id]["chat_history"].extend([
            {"type": "human", "content": request.message},
            {"type": "ai", "content": response["answer"]}
        ])

        return {"response": response["answer"]}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating response: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)