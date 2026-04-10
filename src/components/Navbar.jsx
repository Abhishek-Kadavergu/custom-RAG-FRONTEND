import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Optionally hide navbar on the chat route if it has its own header
  if (location.pathname === '/chat') {
    return null;
  }

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 w-full z-50 glass"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6D5DFC] to-[#FF8E8B] shadow-md flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <span className="font-semibold text-gray-800 tracking-wide">Abhi</span>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/chat')}
            className="text-sm font-medium text-gray-600 hover:text-[#6D5DFC] transition-colors"
          >
            Chat
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
