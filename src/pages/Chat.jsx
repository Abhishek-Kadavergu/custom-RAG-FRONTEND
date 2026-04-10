import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';

const LOCAL_STORAGE_KEY = 'ai_chat_history';

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse chat history', err);
      }
    } else {
      // Show an initial greeting if empty
      setMessages([
        { role: 'ai', content: 'Hello! I am your AI assistant. What secrets can we uncover today?' }
      ]);
    }
  }, []);

  // Save to localStorage when messages change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (text) => {
    const userMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('https://custom-rag-backend-2-sk69.onrender.com/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: text }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Assuming API returns an object format, otherwise fallbacks
      const answerContent = data.answer || data.response || data.message || JSON.stringify(data);

      setMessages((prev) => [...prev, { role: 'ai', content: answerContent }]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prev) => [...prev, { role: 'ai', content: 'Sorry, I encountered an error. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#030014] text-white font-['Inter']">
      {/* Header */}
      <header className="flex-none px-6 py-4 flex items-center justify-between border-b border-white/10 glass z-10 sticky top-0">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
        <div className="font-semibold text-lg tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          Dig the secrets of Abhi!
        </div>
        <div className="w-16"></div> {/* Spacer for centering */}
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto px-4 py-8 relative scrollbar-hide">
        {/* Background glow lines */}
        <div className="fixed top-1/4 left-0 w-full h-[500px] bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-transparent pointer-events-none -skew-y-12 blur-[100px] -z-10" />

        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} />
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex w-full justify-start mb-6"
              >
                <div className="flex max-w-[85%] md:max-w-[75%] gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shrink-0">
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-200 mx-1" />
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-300" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="flex-none pb-4 pt-2 bg-gradient-to-t from-[#030014] via-[#030014] to-transparent z-10">
        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </footer>
    </div>
  );
};

export default Chat;
