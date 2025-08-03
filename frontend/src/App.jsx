import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Cyber-Noir SVG Icons
const PowerIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
    </svg>
);

const SendIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

// A component to simulate text being typed
const TypingEffect = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');
    useEffect(() => {
        let i = 0;
        const intervalId = setInterval(() => {
            setDisplayedText(text.substring(0, i + 1));
            i++;
            if (i > text.length) {
                clearInterval(intervalId);
            }
        }, 20); // Adjust typing speed here
        return () => clearInterval(intervalId);
    }, [text]);

    return <p className="whitespace-pre-wrap">{displayedText}</p>;
};

function App() {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const API_BASE_URL =  "http://localhost:8000";

  const initSession = async () => {
    if (!websiteUrl) return;
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/init_session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: websiteUrl })
      });
      if (!response.ok) throw new Error((await response.json()).detail || 'Connection refused');

      const data = await response.json();
      setSessionId(data.session_id);
      setChatHistory([{ type: 'ai', content: `[CONNECTION ESTABLISHED]\nAccessing target: ${websiteUrl}\nI am online. State your query.` }]);
    } catch (error) {
      setChatHistory([{ type: 'ai', content: `[CONNECTION FAILED]\nError: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!userInput.trim() || !sessionId) return;
    const newMessage = userInput;
    setChatHistory(prev => [...prev, { type: 'human', content: newMessage }]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, message: newMessage })
      });
      if (!response.ok) throw new Error((await response.json()).detail || 'Transmission lost');
      const data = await response.json();
      setChatHistory(prev => [...prev, { type: 'ai', content: data.response }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { type: 'ai', content: `[ERROR]\nSignal corrupted: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col p-4" style={{'--glow-color': '#0f0'}}>
      {/* Glitchy Scanline Overlay */}
      <div className="absolute inset-0 bg-black opacity-25 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
        backgroundSize: '100% 4px, 6px 100%',
      }}></div>

      <header className="w-full border-2 border-green-400 p-2 mb-4 text-center relative">
        <h1 className="text-2xl uppercase tracking-widest" style={{ textShadow: '0 0 5px var(--glow-color)' }}>
          G.L.I.T.C.H. - Global Link & Information Tactical Communications Hub
        </h1>
        <div className="absolute top-1 right-2 text-xs">v1.3.37</div>
      </header>

      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Control Panel */}
        <div className="w-1/3 border-2 border-green-400 p-4 flex flex-col">
          <h2 className="text-xl mb-4">[CONTROL PANEL]</h2>
          <div className="mb-4">
            <label className="block mb-1"> >Target URL: </label>
            <input
              type="text"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="w-full bg-gray-900 border border-green-400 p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter endpoint..."
              disabled={!!sessionId}
            />
          </div>
          <motion.button
            onClick={initSession}
            disabled={isLoading || !websiteUrl || !!sessionId}
            className={`w-full py-2 px-4 border-2 border-green-400 flex items-center justify-center gap-2 transition-all duration-200 ${
              isLoading || !websiteUrl || !!sessionId
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-green-900 hover:bg-green-800'
            }`}
          >
            <PowerIcon className="h-5 w-5" />
            {isLoading ? 'INITIATING...' : sessionId ? '[SESSION ACTIVE]' : 'CONNECT'}
          </motion.button>
        </div>

        {/* Main Terminal */}
        <div className="flex-1 flex flex-col border-2 border-green-400">
          <div className="flex-1 overflow-y-auto p-4">
            <AnimatePresence>
              {chatHistory.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-4"
                >
                  <div className={`font-bold ${msg.type === 'ai' ? 'text-cyan-400' : 'text-yellow-400'}`}>
                    {msg.type === 'ai' ? `> [GLITCH_AI]:` : `> [USER]:`}
                  </div>
                  <div className="pl-4">
                    <TypingEffect text={msg.content} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 border-t-2 border-green-400">
            <div className="flex items-center">
              <span className="mr-2"> > </span>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
                disabled={isLoading || !sessionId}
                className="flex-1 bg-transparent border-none focus:outline-none"
                placeholder={sessionId ? "Awaiting input..." : "Establish connection to begin transmission."}
              />
              <motion.button
                onClick={sendMessage}
                disabled={isLoading || !userInput.trim() || !sessionId}
                className={`ml-2 p-2 border border-green-400 ${
                  isLoading || !userInput.trim() || !sessionId ? 'opacity-50' : 'hover:bg-green-900'
                }`}
              >
                {isLoading ? '...' : <SendIcon className="h-5 w-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;