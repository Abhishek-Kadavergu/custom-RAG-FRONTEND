import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-white overflow-hidden flex flex-col items-center justify-center font-['Inter']">
      {/* Background Gradients & Soft Blobs */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-gradient-to-b from-white to-[#FAF8FF]">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-5%] left-[-5%] w-[60vw] h-[60vw] bg-gradient-to-tr from-[#6D5DFC]/10 to-transparent rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-gradient-to-bl from-[#FF6B6B]/10 to-transparent rounded-full blur-[120px]"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8 inline-flex items-center space-x-3 px-4 py-1.5 rounded-full border border-[#6D5DFC]/10 bg-white/70 backdrop-blur-md shadow-sm"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6D5DFC] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#6D5DFC]"></span>
          </span>
          <span className="text-xs font-semibold text-gray-600 tracking-wide uppercase">Abhi AI is live</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.1]"
        >
          Step into <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D5DFC] to-[#FF8E8B]">Abhi’s mind</span>.<span className="typing-cursor"></span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl font-normal leading-relaxed"
        >
          Not just AI. This is Abhi. Answers, insights, and clarity — all in one beautifully crafted place. Ask away.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/chat')}
          className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 rounded-full shadow-[0_8px_30px_rgb(109,93,252,0.25)] hover:shadow-[0_12px_40px_rgb(109,93,252,0.4)] overflow-hidden"
        >
          {/* Button Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#6D5DFC] to-[#FF8E8B] transition-opacity duration-300 group-hover:opacity-90"></div>
          
          {/* Shine Sweep Animation effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite] skew-x-[-20deg]"></div>

          <span className="relative flex items-center gap-2 text-[17px]">
            Get Started
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </span>
        </motion.button>
      </div>

      <style jsx>{`
        @keyframes shine {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
