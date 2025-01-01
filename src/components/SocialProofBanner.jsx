import React from 'react';
import { motion } from 'framer-motion';

export const SocialProofBanner = ({ claimedCount }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-purple-500/20 border-y border-purple-500/30 py-3 mb-12"
    >
      <div className="container mx-auto px-4 text-center">
        <span className="text-lg text-purple-300">
          🚀 {claimedCount} Visionary Founders Already Secured Their Position in the AI Revolution
        </span>
      </div>
    </motion.div>
  );
};
