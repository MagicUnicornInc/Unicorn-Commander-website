import React from 'react';
import { motion } from 'framer-motion';

export const WhyFounders = () => {
  const reasons = [
    {
      icon: '🏆',
      title: 'Own Your AI Future',
      description: 'Unicorn Commander is a one-time purchase, not a subscription. You get full control, unlimited usage, and no recurring fees. It\'s your AI, your way.',
      expanded: 'With Unicorn Commander, you\'re not just renting software; you\'re investing in your future. No more subscription traps or limitations. You own your AI infrastructure, giving you the freedom to customize, scale, and adapt without vendor lock-in.'
    },
    {
      icon: '💎',
      title: 'Exclusive Founders Advantage',
      description: 'Join an elite group of 500 visionaries shaping the future of AI operations. Get exclusive perks, lifetime updates, and direct access to our development team.',
      expanded: 'As a Founders Edition owner, you\'re not just a customer; you\'re a partner. You\'ll have a direct line to our development team, influence our roadmap, and receive personalized support to ensure your success. Plus, you\'ll lock in lifetime access to all future updates and features.'
    },
    {
      icon: '🔒',
      title: 'Unmatched Security & Privacy',
      description: 'Your data is your own. Unicorn Commander operates on your infrastructure, ensuring complete data sovereignty and maximum security.',
      expanded: 'Unlike cloud-based solutions, Unicorn Commander keeps your data within your control. You decide where it\'s stored, how it\'s secured, and who has access. This is crucial for businesses handling sensitive information or operating in regulated industries.'
    },
    {
      icon: '📈',
      title: 'Explosive ROI Potential',
      description: 'Automate costly tasks, create content at scale, and unlock insights faster than ever before. Unicorn Commander is designed to deliver a 10x return on your investment.',
      expanded: 'Unicorn Commander isn\'t just a cost-saver; it\'s a revenue generator. By automating workflows, accelerating content creation, and providing deep data insights, it empowers you to achieve more with less, driving significant bottom-line growth.'
    },
    {
      icon: '⚡',
      title: 'Future-Proof Technology',
      description: 'Built on a modular, open architecture, Unicorn Commander adapts to your evolving needs. Integrate new AI models, expand capabilities, and stay ahead of the curve.',
      expanded: 'The AI landscape is constantly changing. Unicorn Commander is designed to evolve with it. Our open architecture allows you to integrate the latest AI models and technologies, ensuring you always have access to the most advanced capabilities.'
    },
    {
      icon: '🤝',
      title: 'Dedicated Support & Community',
      description: 'Get priority support from our expert team and connect with a vibrant community of fellow AI pioneers. We\'re committed to your success.',
      expanded: 'We\'re not just providing software; we\'re building a community. As a Founders Edition owner, you\'ll have access to a dedicated support team, exclusive forums, and networking opportunities with other industry leaders. We\'re here to help you every step of the way.'
    }
  ];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center text-purple-400 mb-12">
        Why Founders Choose Us
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6"
          >
            <div className="flex items-center mb-4">
              <div className="text-4xl text-purple-400 mr-3">{reason.icon}</div>
              <h3 className="text-xl font-bold text-purple-400">{reason.title}</h3>
            </div>
            <p className="text-gray-300 mb-4">{reason.description}</p>
            <p className="text-gray-400 italic">{reason.expanded}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
