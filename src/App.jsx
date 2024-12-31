import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Toaster } from 'react-hot-toast';
import { 
  FaSearch, FaCogs, FaPaintBrush, FaShieldAlt, FaUsers, 
  FaDollarSign, FaRobot, FaBrain, FaLock, FaChartLine,
  FaCloud, FaClock, FaCheck
} from 'react-icons/fa';
import { WaitlistForm } from './components/WaitlistForm';
import { Stats } from './components/Stats';
import { Section } from './components/Section';

const FeatureCard = ({ icon: Icon, title, description }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="feature-card"
    >
      <Icon className="text-4xl text-purple-500 mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const PricingCard = ({ title, price, features, isPopular }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`pricing-card relative ${isPopular ? 'border-purple-500' : ''}`}
    >
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm">
          Most Popular
        </span>
      )}
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-4xl font-bold mb-6">${price}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-400">
            <FaCheck className="text-green-500 mr-2" /> {feature}
          </li>
        ))}
      </ul>
      <button className={`btn w-full ${isPopular ? 'btn-primary' : 'btn-outline'}`}>
        Get Started
      </button>
    </motion.div>
  );
};

const App = () => {
  return (
    <div className="min-h-screen">
      <Toaster position="top-center" />
      <header className="container mx-auto px-4 py-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl text-purple-400 mb-2 font-light italic"
        >
          Magic Unicorn Presents...
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl font-bold mb-6"
        >
          <span className="gradient-text">Unicorn Commander</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-400 mb-8"
        >
          Take Command. Automate. Dominate.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-2xl mx-auto text-gray-300 mb-12"
        >
          <p>
            Imagine having a fleet of AI agents, creative tools, and automated workflows—ready to tackle
            any challenge 24/7. That's Unicorn Commander, your AI-powered operations hub.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-4"
        >
          <button className="btn btn-primary">Get Started</button>
          <button className="btn btn-outline">Learn More</button>
        </motion.div>
      </header>

      <Section title="Why Choose Unicorn Commander?">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={FaDollarSign}
            title="No Subscriptions"
            description="Buy once, own forever. No recurring costs or hidden fees."
          />
          <FeatureCard 
            icon={FaChartLine}
            title="Scale Effortlessly"
            description="Built to grow with your business—no replacements needed."
          />
          <FeatureCard 
            icon={FaLock}
            title="Total Data Control"
            description="Your data stays private with no third-party cloud dependencies."
          />
          <FeatureCard 
            icon={FaRobot}
            title="AI Teams on Demand"
            description="Deploy AI agents for research, analysis, and content creation."
          />
          <FeatureCard 
            icon={FaCloud}
            title="Open-Source Flexibility"
            description="Customize endlessly with no vendor lock-in."
          />
          <FeatureCard 
            icon={FaClock}
            title="24/7 Operation"
            description="Your AI workforce never sleeps, ensuring constant productivity."
          />
        </div>
      </Section>

      <Section title="Reserve Your Unicorn Commander">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">
            🚀 Early Access Available
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Be among the first to command your AI workforce. Join our waitlist for exclusive updates or secure your unit with a pre-order today.
          </p>
        </div>
        <WaitlistForm />
        <Stats />
      </Section>

      <Section title="Key Features">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={FaSearch}
            title="Find Answers Faster"
            description="Instant search and smart insights with seamless database integration."
          />
          <FeatureCard 
            icon={FaCogs}
            title="Automate Workflows"
            description="Schedule tasks, track deadlines, and generate quick reports effortlessly."
          />
          <FeatureCard 
            icon={FaPaintBrush}
            title="Create Stunning Content"
            description="AI-generated marketing materials and polished presentations in minutes."
          />
          <FeatureCard 
            icon={FaShieldAlt}
            title="Fortress-Level Security"
            description="Built-in encryption protects your sensitive information."
          />
          <FeatureCard 
            icon={FaBrain}
            title="Smart Insights"
            description="AI-powered analytics and recommendations for better decision making."
          />
          <FeatureCard 
            icon={FaUsers}
            title="Team Collaboration"
            description="Seamless integration between human and AI teams for maximum efficiency."
          />
        </div>
      </Section>

      <Section title="Support Plans">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="feature-card">
            <h3 className="text-xl font-bold mb-4">Basic Support</h3>
            <p className="text-gray-400 mb-4">Email support and guides during business hours</p>
            <p className="text-purple-500 font-bold">Included with purchase</p>
          </div>
          <div className="feature-card">
            <h3 className="text-xl font-bold mb-4">Pro Support</h3>
            <p className="text-gray-400 mb-4">Faster troubleshooting, live chat, and regular audits</p>
            <p className="text-purple-500 font-bold">$499-$999/month</p>
          </div>
          <div className="feature-card">
            <h3 className="text-xl font-bold mb-4">Enterprise Support</h3>
            <p className="text-gray-400 mb-4">24/7 support, AI experts, and on-site assistance</p>
            <p className="text-purple-500 font-bold">$1,500-$2,500/month</p>
          </div>
        </div>
      </Section>

      <footer className="container mx-auto px-4 py-12 text-center text-gray-400">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p>support@unicorncommander.com</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <p>@UnicornCommander</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Shipping</h4>
            <p>Starting Valentine's Day 2024</p>
          </div>
        </div>
        <p className="mb-4">Stop renting technology—own your future.</p>
        <p>© 2023 Magic Unicorn Presents. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
