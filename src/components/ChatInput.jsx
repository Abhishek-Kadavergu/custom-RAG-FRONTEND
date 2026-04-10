import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ChatInput = ({ onSend, isLoading }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '56px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 200) + 'px';
    }
  }, [text]);

  const handleSend = () => {
    if (text.trim() && !isLoading) {
      onSend(text.trim());
      setText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = '56px';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <div className="relative flex items-end w-full bg-white rounded-[32px] border border-gray-200 shadow-[0_2px_15px_rgba(0,0,0,0.04)] focus-within:border-[#6D5DFC]/40 focus-within:ring-4 focus-within:ring-[#6D5DFC]/10 focus-within:shadow-[0_4px_25px_rgba(109,93,252,0.1)] transition-all duration-300">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="Ask Abhi anything..."
          className="w-full max-h-[200px] min-h-[56px] py-4 pl-6 pr-14 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none resize-none overflow-y-auto disabled:opacity-50 text-[16px] leading-[24px] rounded-[32px] scrollbar-hide"
          rows={1}
        />

        <AnimatePresence>
          {(text.trim() || isLoading) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-2 bottom-2"
            >
              <button
                onClick={handleSend}
                disabled={isLoading || !text.trim()}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#6D5DFC] text-white shadow-md hover:bg-[#5C4EEB] hover:shadow-[0_0_15px_rgba(109,93,252,0.4)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* <div className="text-center mt-3 text-xs text-gray-400 pb-2">
        Abhi AI can make mistakes. Consider verifying important information.
      </div> */}
    </div>
  );
};

export default ChatInput;
