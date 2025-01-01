import React from 'react';
import { motion } from 'framer-motion';

export const Testimonials = () => {
  const testimonials = [
    {
      quote: "Unicorn Commander has revolutionized our workflow. We've seen a 10x increase in productivity since implementing it.",
      author: "Alex Smith",
      title: "CEO, Tech Solutions Inc."
    },
    {
      quote: "The automation capabilities are incredible. We're saving hundreds of hours and thousands of dollars every month.",
      author: "Samantha Lee",
      title: "COO, Innovate Group"
    },
    {
      quote: "As a startup founder, Unicorn Commander is a game-changer. It's like having an entire AI team at my fingertips.",
      author: "Chris Johnson",
      title: "Founder, Future Forward"
    }
  ];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center text-purple-400 mb-12">
        What Our Founders Say
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6"
          >
            <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
            <div className="text-purple-400 font-bold">{testimonial.author}</div>
            <div className="text-gray-400">{testimonial.title}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
