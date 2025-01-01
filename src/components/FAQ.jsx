import React from 'react';
import { motion } from 'framer-motion';

export const FAQ = () => {
  const faqs = [
    {
      question: 'Why only 500 Founder\'s Edition units?',
      answer: 'To ensure premium support and explosive ROI for our founding members. Once claimed, this offer disappears forever.'
    },
    {
      question: 'What makes the Founder\'s Edition special?',
      answer: 'Exclusive features, lifetime priority support, and guaranteed best pricing that will never be offered again.'
    },
    {
      question: 'When will my unit ship?',
      answer: 'All Founder\'s Edition units begin shipping February 14th, 2024. Early supporters get priority shipping.'
    }
  ];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center text-purple-400 mb-12">
        Frequently Asked Questions
      </h2>
      <div className="max-w-2xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-purple-400 mb-2">{faq.question}</h3>
            <p className="text-gray-300">{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
