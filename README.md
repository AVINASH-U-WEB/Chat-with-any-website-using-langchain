Chat with Any Website 🤖 <br>

Harness the power of Google Gemini to instantly create a conversational AI chatbot for any website. This full-stack application provides a seamless interface to load a website's content and start asking questions about it.

✨ Key Features
Chat with Any URL: Provide a website URL and instantly start a conversation with its content.
AI-Powered by Google Gemini: Utilizes the cutting-edge Gemini 1.5 Flash for intelligent and context-aware responses.
Session-Based Memory: Remembers your conversation history within a session for follow-up questions.
Real-time Responses: FastAPI backend ensures quick processing and delivery of AI-generated messages.
Sleek & Responsive UI: Modern user interface built with React and styled with Tailwind CSS.
Full-Stack Architecture: Clearly defined FastAPI backend for logic and a React/Vite frontend for the user experience.

🏛️ Architecture & Workflow
The application is designed with a decoupled frontend and backend. The user interacts with the React interface, which communicates with the FastAPI server. The backend leverages LangChain to manage the workflow of scraping, processing, and interacting with the Google Gemini AI models.
High-Level Workflow Architecture
![alt text](https://github.com/user-attachments/assets/ed1c64c8-05c1-40b4-8407-ef8b3d68e979)
<br>
<details>
<summary><strong>Click to view the Initialization Phase (Sequence Diagram)</strong></summary>
![alt text](https://github.com/user-attachments/assets/29773231-145b-4bd3-82d8-2f6d4062a617)
</details>
<details>
<summary><strong>Click to view the Chat Interaction (Sequence Diagram)</strong></summary>
![alt text](https://github.com/user-attachments/assets/3ba7402d-000f-4a8c-9b3f-26a0bc37f4f1)
</details>
<details>

  🛠️ Technology Stack
The project utilizes a modern set of tools and technologies to deliver a robust and efficient experience.
Category	Technology / Library
Frontend	React 18, Vite, Tailwind CSS, Fetch API
Backend	FastAPI, Uvicorn
AI & LangChain	langchain-google-genai, langchain, DocArrayInMemorySearch
AI Models	Chat: Gemini 1.5 Flash, Embeddings: models/embedding-001
Web Scraping	WebBaseLoader (from LangChain)
Environment	Python 3.10+, Node.js 18+



🚀 Getting Started
Follow these instructions to get a local copy up and running for development and testing purposes.

Prerequisites
Node.js: Version 18 or higher.
Python: Version 3.10 or higher.
Google Gemini API Key: You'll need an API key from Google AI Studio.
Installation & Running the App
1.Clone the Repository
Generated sh
git clone https://github.com/your-username/chat-with-website.git
cd chat-with-website
2.Backend Setup
Generated sh
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment
python -m venv venv
2.On Windows:
Generated sh
venv\Scripts\activate
On macOS/Linux:
Generated sh
source venv/bin/activate
<summary><st

Generated sh
# Install Python dependencies
pip install -r requirements.txt

# Create a .env file and add your API key
echo "GOOGLE_API_KEY=your_google_api_key" > .env

# Run the FastAPI server
uvicorn main:app --reload --port 8000

The backend will now be running at http://localhost:8000.
3.Frontend Setup (in a new terminal)
Generated sh
# Navigate to the frontend directory
cd frontend

# Install Node.js dependencies
npm install

# Run the development server
npm run dev
Use code with caution.
Sh
The frontend will now be running at http://localhost:5173.

💡 Usage Guide
Open your browser and navigate to http://localhost:5173.
Enter the full URL of a website you want to chat with (e.g., https://en.wikipedia.org/wiki/Large_language_model).
Click "Start Chat" and wait for the backend to process the website.
Once processing is complete, you can ask questions related to the website's content, such as:
"What are the key features of LLMs?"
"Explain the transformer architecture in simple terms."
"What are some common applications mentioned in the article?"

🔧 Troubleshooting
Issue	Solution
CORS Errors	Ensure the FastAPI backend has the correct CORS middleware configuration to allow requests from http://localhost:5173.
API Key Issues	Verify that the .env file is present in the /backend directory and that the GOOGLE_API_KEY is correct.
Website Loading Failures	The target website might be blocking automated scraping. Try a different URL. Ensure the server has internet access.
Session Not Persistent	This is expected behavior. The current implementation uses in-memory storage, so sessions are cleared when the backend restarts.
Gemini Model Not Found	Google may update model names. Check the official Gemini documentation and update the model identifiers in backend/main.py.


🗺️ Roadmap & Future Improvements
We have many ideas for improving the application. Contributions are welcome!
Persistent Sessions: Implement Redis or a lightweight SQL database (like SQLite) for persistent session storage.
Support More Formats: Add functionality to upload and chat with PDFs, DOCX, and other document types.
Source Citations: Include citations in the AI's responses that link back to the specific text chunks from the source website.
Streaming Responses: Implement response streaming for a more interactive, real-time chat experience.
User Authentication: Add a simple authentication system to manage user-specific sessions and history.
API Key Management: Build a more robust system for managing API keys and rate limiting.

🙌 How to Contribute
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.
Please follow these steps:
Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request

📜 License
Distributed under the MIT License. See LICENSE for more information.

           rong>Click to view the LangChain Processing Pipeline</strong></summary>
![alt text](https://github.com/user-attachments/assets/86bb3a3f-d763-4809-b93a-4d17d4cbc871)
</details>
