import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";

const LOCAL_STORAGE_KEY = "abhi_ai_chat_history";

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse chat history", err);
      }
    } else {
      setMessages([
        {
          role: "ai",
          content: "Hi, I am Abhi. What insights are you looking for today?",
        },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
    scrollToBottom();
  }, [messages, isLoading]); // Also scroll when loading state changes

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const clearChat = () => {
    const defaultMsg = [
      { role: "ai", content: "Chat cleared. How can I help you now?" },
    ];
    setMessages(defaultMsg);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultMsg));
  };

  const handleSend = async (text) => {
    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // const response = await fetch('https://custom-rag-backend-2-sk69.onrender.com/ask', {
      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: text }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const answerContent =
        data.answer || data.response || data.message || JSON.stringify(data);

      setMessages((prev) => [...prev, { role: "ai", content: answerContent }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "Sorry, I encountered an error connecting to my brain. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-[#FAFAFB] text-gray-800 font-['Inter'] relative w-full overflow-hidden">
      {/* Soft Ambient Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#6D5DFC]/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#FF8E8B]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="flex-none px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between border-b border-gray-100 bg-white/70 backdrop-blur-xl z-20 shadow-sm sticky top-0 md:bg-white/50">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-700 transition-colors bg-gray-50/50 px-3 py-1.5 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium text-sm">Home</span>
        </button>
        <div className="font-semibold tracking-wide text-gray-800 flex items-center gap-2">
          Abhi{" "}
          <span className="flex h-2 w-2 rounded-full bg-[#6D5DFC] opacity-80"></span>
        </div>
        <button
          onClick={clearChat}
          className="text-xs font-medium text-gray-400 hover:text-red-500 transition-colors uppercase tracking-wider px-2"
        >
          Clear
        </button>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6 sm:py-8 z-10 w-full scrollbar-hide scroll-smooth pt-32">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <ChatMessage key={`msg-${idx}-${msg.role}`} message={msg} />
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  transition: { duration: 0.2 },
                }}
                className="flex w-full justify-start mb-8 font-sans"
              >
                <div className="flex max-w-[85%] md:max-w-[75%] gap-4 flex-row">
                  <div className="shrink-0 pt-1">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#6D5DFC] to-[#FF8E8B] shadow-sm text-white font-bold text-sm">
                      A
                    </div>
                  </div>

                  <div className="px-5 py-5 text-[15px] leading-relaxed shadow-sm bg-white text-gray-800 rounded-2xl rounded-tl-sm border border-gray-100 ring-1 ring-black/[0.02] flex items-center justify-center gap-1.5 h-[52px]">
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-1.5 h-1.5 bg-[#6D5DFC]/60 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0.2,
                      }}
                      className="w-1.5 h-1.5 bg-[#6D5DFC]/60 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0.4,
                      }}
                      className="w-1.5 h-1.5 bg-[#6D5DFC]/60 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </main>

      {/* Input Area */}
      <footer className="flex-none pb-1 sm:pb-2 pt-2 bg-gradient-to-t from-[#FAFAFB] via-[#FAFAFB] to-transparent z-20 sticky bottom-0">
        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </footer>
    </div>
  );
};

export default Chat;
