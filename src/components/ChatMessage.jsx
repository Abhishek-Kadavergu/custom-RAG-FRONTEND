import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { User } from 'lucide-react';
import clsx from 'clsx';

const ChatMessage = ({ message }) => {
  const isAi = message.role === 'ai';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={clsx(
        "flex w-full mb-8 font-sans",
        isAi ? "justify-start" : "justify-end"
      )}
    >
      <div className={clsx(
        "flex max-w-[85%] md:max-w-[75%] gap-4",
        isAi ? "flex-row" : "flex-row-reverse"
      )}>
        
        {/* Avatar */}
        <div className="shrink-0 pt-1">
          {isAi ? (
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#6D5DFC] to-[#FF8E8B] shadow-sm text-white font-bold text-sm select-none">
              A
            </div>
          ) : (
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-gray-100 border border-gray-200 text-gray-500 shadow-sm overflow-hidden select-none">
              <User className="w-5 h-5" />
            </div>
          )}
        </div>

        {/* Message Bubble */}
        <div className={clsx(
          "px-5 py-4 text-[15px] leading-relaxed shadow-sm",
          isAi 
            ? "bg-white text-gray-800 rounded-2xl rounded-tl-sm border border-gray-100 ring-1 ring-black/[0.02]" 
            : "bg-gradient-to-br from-[#F5F3FF] to-[#F1F0FF] text-gray-900 rounded-2xl rounded-tr-sm"
        )}>
          {isAi && (
            <div className="font-semibold text-xs text-gray-400 uppercase tracking-wider mb-1.5 ml-0.5">
              Abhi
            </div>
          )}
          <div className="prose prose-sm md:prose-base prose-slate max-w-none break-words [&_pre]:bg-gray-50 [&_pre]:border [&_pre]:border-gray-200 [&_code]:text-gray-800 [&_p]:m-0 [&_p+p]:mt-3">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default ChatMessage;