import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { FaRocket, FaCloud, FaCogs, FaPaintBrush, FaChartLine, FaRobot } from 'react-icons/fa';
import { HostedSignup } from './components/HostedSignup';
import { CountdownTimer } from './components/CountdownTimer';
import { FeatureCard } from './components/FeatureCard';
import { SocialProofBanner } from './components/SocialProofBanner';
import { WhyFounders } from './components/WhyFounders';
import { ROICalculator } from './components/ROICalculator';
import { FoundersGuarantee } from './components/FoundersGuarantee';
import { RecentClaims } from './components/RecentClaims';
import { FAQ } from './components/FAQ';

const App = () => {
  const [remainingUnits, setRemainingUnits] = useState(497);

  useEffect(() => {
    fetchRemainingUnits();
    const interval = setInterval(fetchRemainingUnits, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchRemainingUnits = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/preorders/remaining');
      const data = await response.json();
      setRemainingUnits(data.remaining);
    } catch (error) {
      console.error('Error fetching remaining units:', error);
    }
  };

  const handlePreorder = () => {
    window.location.href = 'https://buy.stripe.com/14kbJE8bQfxC3iobII';
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Toaster position="top-center" />
      
      <header className="container mx-auto px-4 py-12 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold mb-4"
        >
          <span className="gradient-text">Unicorn Commander</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl text-purple-400 mb-4"
        >
          Take Command. Automate. Dominate.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto mb-8"
        >
          <p className="text-xl text-gray-300 mb-4">
            Your complete AI command center that turns one human into a hundred. Deploy AI agents to handle everything from content creation to data analysis—all while maintaining full ownership and control.
          </p>
          <div className="flex justify-center gap-8 text-lg text-gray-400">
            <div className="flex items-center">
              <span className="text-purple-400 mr-2">⚡</span>
              10x Productivity
            </div>
            <div className="flex items-center">
              <span className="text-purple-400 mr-2">💎</span>
              Own Forever
            </div>
            <div className="flex items-center">
              <span className="text-purple-400 mr-2">🤖</span>
              AI-Powered
            </div>
          </div>
        </motion.div>
      </header>

      <SocialProofBanner claimedCount={497} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Founders Edition Section */}
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
            <div className="text-center">
              <div className="inline-block bg-purple-500/20 rounded-full p-4 mb-4">
                <FaRocket className="text-4xl text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-purple-400 mb-2">Founders Edition</h2>
              <p className="text-purple-300 mb-4">Limited to 500 Units</p>
              
              <div className="mb-6">
                <div className="text-3xl font-bold text-purple-400">{remainingUnits} / 500</div>
                <div className="text-gray-400">Units Remaining</div>
              </div>

              <CountdownTimer />

              <div className="bg-purple-500/20 rounded-lg p-4 mb-6">
                <div className="text-3xl font-bold text-purple-400 mb-1">$15,000</div>
                <div className="text-xl text-purple-300 mb-4">Own it forever. No subscriptions.</div>
                <div className="space-y-2 text-left">
                  <div className="flex items-center text-gray-300">
                    <span className="text-purple-400 mr-2">💌</span>
                    Ships February 14th, 2024
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-purple-400 mr-2">🎁</span>
                    FREE Hosting for 1 Year ($1,200 value)
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-purple-400 mr-2">⭐</span>
                    Exclusive Founders Perks
                  </div>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="text-xl font-bold text-purple-400">$1,000 Deposit Today</div>
                <div className="text-gray-400">Secure Your Unit</div>
              </div>

              <button 
                onClick={handlePreorder}
                className="w-full btn btn-primary text-lg"
              >
                🚀 Pre-order Now
              </button>
            </div>
          </div>

          {/* Hosted Solution Section */}
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
            <div className="text-center">
              <div className="inline-block bg-purple-500/20 rounded-full p-4 mb-4">
                <FaCloud className="text-4xl text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-purple-400 mb-2">Hosted Solution</h2>
              <p className="text-purple-300 mb-6">Beta Access Coming Soon</p>
              
              <div className="space-y-4 mb-8 text-left">
                <div className="flex items-center text-gray-300">
                  <span className="text-purple-400 mr-2">🤖</span>
                  AI-powered workflows and tools in the cloud
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="text-purple-400 mr-2">🚀</span>
                  Perfect for startups, teams, and remote collaboration
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="text-purple-400 mr-2">⚡</span>
                  Instant access to powerful AI capabilities
                </div>
              </div>

              <HostedSignup />
            </div>
          </div>
        </div>

        {/* What is Unicorn Commander Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center text-purple-400 mb-8">
            What is Unicorn Commander?
          </h2>
          
          <p className="text-xl text-center text-gray-300 mb-12">
            Your AI-powered operations hub for transforming how you work.
            Own it once. Command it forever. No subscriptions—just pure AI power.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <FeatureCard
              icon={FaCogs}
              title="Automate Workflows"
              description="Save 100+ hours monthly. Let AI handle the repetitive $10/hour tasks while you focus on $1000/hour strategies."
              emoji="🚀"
            />
            <FeatureCard
              icon={FaPaintBrush}
              title="Create Stunning Content"
              description="Generate weeks of content in minutes. From social posts to full presentations, your AI content factory never sleeps."
              emoji="🎨"
            />
            <FeatureCard
              icon={FaChartLine}
              title="Streamline Analysis"
              description="Turn mountains of data into gold. Get instant insights that used to take teams of analysts weeks."
              emoji="📊"
            />
            <FeatureCard
              icon={FaRobot}
              title="Scale Operations"
              description="10x your output without 10x staff. AI automation that grows with you—no extra costs."
              emoji="📈"
            />
          </div>
        </div>

        <WhyFounders />
        <ROICalculator />
        <FoundersGuarantee />
        <FAQ />
        <RecentClaims />
      </div>
    </div>
  );
};

export default App;
