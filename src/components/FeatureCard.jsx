import React from 'react';
import { motion } from 'framer-motion';

export const FeatureCard = ({ icon: Icon, title, description, emoji }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6"
    >
      <div className="flex items-center mb-4">
        <div className="bg-purple-500/20 rounded-full p-3 mr-4">
          <Icon className="text-2xl text-purple-400" />
        </div>
        <span className="text-2xl">{emoji}</span>
      </div>
      <h3 className="text-xl font-bold text-purple-400 mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};
