import React from 'react';
import { motion } from 'framer-motion';

export const FoundersGuarantee = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="py-16"
    >
      <div className="max-w-2xl mx-auto bg-purple-500/10 border border-purple-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center text-purple-400 mb-6">
          🛡️ Our Iron-Clad Founder's Promise
        </h2>
        <div className="space-y-4">
          {[
            'Lifetime Priority Support',
            'Free Upgrades for Life',
            '30-Day Money-Back Guarantee',
            'Forever Ownership, Zero Subscriptions'
          ].map((promise, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center text-gray-300"
            >
              <span className="text-purple-400 mr-3">✓</span>
              {promise}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
