import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={clsx(
        "flex w-full mb-6",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={clsx(
          "flex max-w-[85%] md:max-w-[75%] gap-4",
          isUser ? "flex-row-reverse" : "flex-row"
        )}
      >
        {/* Avatar */}
        <div className={clsx(
          "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg",
          isUser
            ? "bg-gradient-to-br from-blue-500 to-blue-700"
            : "bg-gradient-to-br from-purple-500 to-pink-600"
        )}>
          {isUser ? <User size={20} className="text-white" /> : <Bot size={20} className="text-white" />}
        </div>

        {/* Message Bubble */}
        <div
          className={clsx(
            "px-5 py-4 rounded-2xl text-sm md:text-base shadow-lg backdrop-blur-md leading-relaxed",
            isUser
              ? "bg-blue-600/20 border border-blue-500/30 text-blue-50 rounded-tr-sm"
              : "bg-white/10 border border-white/10 text-gray-200 rounded-tl-sm"
          )}
        >
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-2">{children}</p>,
              li: ({ children }) => <li className="ml-4 list-disc">{children}</li>,
              strong: ({ children }) => <strong className="text-white">{children}</strong>
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;