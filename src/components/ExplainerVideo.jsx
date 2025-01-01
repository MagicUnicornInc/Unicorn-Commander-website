import React from 'react';
import { motion } from 'framer-motion';

export const ExplainerVideo = ({ videoUrl }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="rounded-xl overflow-hidden shadow-lg"
    >
      <video controls width="100%" src={videoUrl}>
        Your browser does not support the video tag.
      </video>
    </motion.div>
  );
};
