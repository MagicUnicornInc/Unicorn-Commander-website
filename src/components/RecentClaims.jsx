import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const RecentClaims = () => {
  const [currentClaim, setCurrentClaim] = useState(0);
  
  const claims = [
    'San Francisco, CA',
    'New York, NY',
    'London, UK',
    'Toronto, CA',
    'Sydney, AU'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentClaim(prev => (prev + 1) % claims.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentClaim}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-purple-500/20 border border-purple-500/30 rounded-lg px-4 py-2"
        >
          <div className="text-sm text-purple-300">
            Just claimed: {claims[currentClaim]}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
