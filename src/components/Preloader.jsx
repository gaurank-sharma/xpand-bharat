import React from 'react';
import { motion } from 'framer-motion';
import { WmhLogo } from './WmhLogo';

const Preloader = ({ setLoading }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => setLoading(false)}
    >
      <div className="w-48 md:w-64">
        <WmhLogo className="w-full h-full drop-shadow-2xl" />
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-1 bg-gradient-to-r from-blue-400 to-purple-600 mt-8 rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default Preloader;