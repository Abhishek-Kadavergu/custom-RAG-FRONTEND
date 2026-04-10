import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SendHorizonal, Loader2 } from 'lucide-react';
import clsx from 'clsx';

const ChatInput = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 relative">
      {/* Gradient Glow Effect for the background */}
      <div className="absolute inset-x-4 inset-y-4 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-pink-500/30 blur-xl opacity-50 rounded-3xl pointer-events-none" />
      
      <form 
        onSubmit={handleSubmit}
        className="relative flex items-end p-2 bg-[#101018] border border-white/10 rounded-2xl shadow-2xl focus-within:border-purple-500/50 focus-within:ring-1 focus-within:ring-purple-500/50 transition-all duration-300"
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="Ask anything..."
          className="flex-1 max-h-[120px] bg-transparent text-gray-100 placeholder-gray-500 border-none outline-none resize-none p-3 scrollbar-hide text-base sm:text-lg overflow-y-auto leading-relaxed"
          rows={1}
        />
        
        <motion.button
          type="submit"
          disabled={!input.trim() || isLoading}
          whileHover={{ scale: input.trim() && !isLoading ? 1.05 : 1 }}
          whileTap={{ scale: input.trim() && !isLoading ? 0.95 : 1 }}
          className={clsx(
            "p-3 rounded-xl ml-2 flex-shrink-0 transition-all duration-200",
            input.trim() && !isLoading 
              ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:bg-purple-500" 
              : "bg-white/5 text-gray-500 cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <SendHorizonal className="w-5 h-5" />
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default ChatInput;
