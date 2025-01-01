import React from 'react';
import { motion } from 'framer-motion';

export const WhyFounders = () => {
  const reasons = [
    {
      icon: '🏆',
      title: 'Own Your AI Future',
      description: 'No subscriptions, no dependencies—pure ownership'
    },
    {
      icon: '💎',
      title: 'Early Adopter Advantage',
      description: 'Join the elite 500 who\'ll shape the future of AI operations'
    },
    {
      icon: '🔒',
      title: 'Limited Time Opportunity',
      description: 'Founders Edition pricing will never be offered again'
    }
  ];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center text-purple-400 mb-12">
        Why Founders Choose Us
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6 text-center"
          >
            <div className="text-4xl mb-4">{reason.icon}</div>
            <h3 className="text-xl font-bold text-purple-400 mb-2">{reason.title}</h3>
            <p className="text-gray-300">{reason.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
