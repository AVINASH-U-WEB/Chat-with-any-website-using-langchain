
# 🧠 Chat with Any Website

Harness the power of **Google Gemini** to turn any website into an interactive chatbot. This full-stack AI-powered application enables users to load a website’s content and have meaningful conversations with it using natural language.

> 💡 *Tip: Add a short demo GIF or video above to boost engagement.*

---

## 🚀 Features

- 🔗 **Chat with Any URL**: Input any website link and start interacting with its content.
- 🧠 **Powered by Google Gemini 1.5 Flash**: Leverages state-of-the-art AI for deep contextual understanding.
- 🧵 **Session Memory**: Understands follow-up questions during a session.
- ⚡ **FastAPI Backend**: Quick, asynchronous responses powered by FastAPI.
- 🎨 **Modern UI**: Built using React, Vite, and Tailwind CSS.
- 🧩 **Modular Architecture**: Clear separation of frontend and backend concerns.

---

## 🏗️ System Architecture

This app uses a decoupled frontend and backend setup. The React frontend communicates with the FastAPI backend, which utilizes LangChain to handle scraping, embedding, and querying via Google Gemini.

### 📊 High-Level Workflow
![Workflow Architecture](https://github.com/user-attachments/assets/ed1c64c8-05c1-40b4-8407-ef8b3d68e979)

<details>
<summary><strong>🔧 Initialization Phase (Sequence Diagram)</strong></summary>

![Initialization Phase](https://github.com/user-attachments/assets/29773231-145b-4bd3-82d8-2f6d4062a617)

</details>

<details>
<summary><strong>💬 Chat Interaction Flow</strong></summary>

![Chat Interaction](https://github.com/user-attachments/assets/3ba7402d-000f-4a8c-9b3f-26a0bc37f4f1)

</details>

<details>
<summary><strong>🔍 LangChain Processing Pipeline</strong></summary>

![LangChain Pipeline](https://github.com/user-attachments/assets/86bb3a3f-d763-4809-b93a-4d17d4cbc871)

</details>

---

## 🧰 Tech Stack

| Category         | Tools & Libraries                                                                 |
|------------------|------------------------------------------------------------------------------------|
| **Frontend**      | React, Vite, Tailwind CSS, Fetch API                                              |
| **Backend**       | FastAPI, Uvicorn                                                                 |
| **AI Models**     | Gemini 1.5 Flash (Chat), `models/embedding-001` (Embeddings)                     |
| **LangChain**     | `langchain`, `langchain-google-genai`, `DocArrayInMemorySearch`                  |
| **Scraper**       | `WebBaseLoader` (LangChain)                                                      |
| **Environment**   | Python 3.10+, Node.js 18+                                                         |

---

## 🛠️ Getting Started

### 🔐 Prerequisites

- [Node.js (v18+)](https://nodejs.org/)
- [Python (v3.10+)](https://www.python.org/)
- [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### 📦 Setup Instructions

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/chat-with-website.git
cd chat-with-website
```

#### 2. Backend Setup

```bash
cd backend
python -m venv venv
```

Activate the environment:

**Windows**
```bash
venv\Scripts\activate
```

**macOS/Linux**
```bash
source venv/bin/activate
```

Then install dependencies and run:

```bash
pip install -r requirements.txt
echo "GOOGLE_API_KEY=your_api_key_here" > .env
uvicorn main:app --reload --port 8000
```

Backend will be available at: `http://localhost:8000`

#### 3. Frontend Setup

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at: `http://localhost:5173`

---

## 📖 Usage Guide

1. Navigate to `http://localhost:5173`
2. Enter a full website URL (e.g. `https://en.wikipedia.org/wiki/Transformer_(machine_learning)`)
3. Click **Start Chat**
4. Ask questions like:
    - “What is the Transformer architecture?”
    - “Summarize the key points of this page.”
    - “Who invented LLMs?”

---

## 🧩 Troubleshooting

| Problem                    | Fix                                                                                     |
|----------------------------|------------------------------------------------------------------------------------------|
| **CORS error**             | Make sure FastAPI has CORS enabled for `http://localhost:5173`                          |
| **Invalid API Key**        | Check `.env` in `/backend` has correct `GOOGLE_API_KEY`                                 |
| **Website not loading**    | The site may block scraping; try a different URL                                        |
| **Lost session memory**    | This is by design; session is not persisted after server restart                        |
| **Model not found**        | Confirm you're using valid Gemini model names from [Google's API docs](https://ai.google.dev/) |

---

## 🛣️ Roadmap

- [ ] Session Persistence via Redis or SQLite  
- [ ] Support for PDF/DOCX uploads  
- [ ] Citation-aware responses  
- [ ] Token-level streaming for real-time UX  
- [ ] OAuth-based User Authentication  
- [ ] Scalable API Key Management

---

## 🤝 Contributing

We welcome contributions! Follow these steps:

```bash
# 1. Fork the project
# 2. Create a new branch
git checkout -b feature/YourFeatureName

# 3. Commit your changes
git commit -m "Add YourFeatureName"

# 4. Push to GitHub
git push origin feature/YourFeatureName

# 5. Open a Pull Request
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
