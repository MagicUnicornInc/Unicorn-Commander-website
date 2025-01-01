import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { FaRocket, FaCloud, FaCogs, FaPaintBrush, FaChartLine, FaRobot, FaLock, FaShieldAlt, FaCheck } from 'react-icons/fa';
import { HostedSignup } from './components/HostedSignup';
import { CountdownTimer } from './components/CountdownTimer';
import { FeatureCard } from './components/FeatureCard';
import { SocialProofBanner } from './components/SocialProofBanner';
import { WhyFounders } from './components/WhyFounders';
import { ROICalculator } from './components/ROICalculator';
import { FoundersGuarantee } from './components/FoundersGuarantee';
import { FAQ } from './components/FAQ';
import { Testimonials } from './components/Testimonials';
import { ExplainerVideo } from './components/ExplainerVideo';

const App = () => {
  const [remainingUnits, setRemainingUnits] = useState(497);
  const [claimedToday, setClaimedToday] = useState(0);
  const [showVideo, setShowVideo] = useState(false); // Initially hide the video

  useEffect(() => {
    fetchRemainingUnits();
    fetchClaimedToday();
    const interval = setInterval(() => {
      fetchRemainingUnits();
      fetchClaimedToday();
    }, 60000);
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

  const fetchClaimedToday = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/preorders/claimed-today');
      const data = await response.json();
      setClaimedToday(data.claimedToday);
    } catch (error) {
      console.error('Error fetching claimed today:', error);
    }
  };

  const handlePreorder = () => {
    window.location.href = 'https://buy.stripe.com/14kbJE8bQfxC3iobII';
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Toaster position="top-center" />

      {/* Header Section */}
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
          className="max-w-3xl mx-auto"
        >
          <p className="text-xl text-gray-300 mb-6">
            Your complete AI command center. Deploy AI agents to handle everything from content creation to data analysis—all while maintaining full ownership and control.
          </p>
          <div className="flex justify-center gap-8 text-lg text-gray-400 mb-8">
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
          <button
            onClick={handlePreorder}
            className="btn btn-primary text-lg px-8 py-4"
          >
            🚀 Secure Your Founders Edition Now
          </button>
        </motion.div>
      </header>

      {/* Social Proof Banner */}
      <SocialProofBanner claimedCount={remainingUnits} />

      {/* Explainer Video Section (Conditional) */}
      {showVideo && (
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <ExplainerVideo videoUrl="YOUR_VIDEO_URL" />
          </div>
        </section>
      )}

      {/* Founders Edition Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-purple-500/10 border border-purple-500/20 rounded-xl p-8">
          <div className="text-center">
            <div className="inline-block bg-purple-500/20 rounded-full p-4 mb-4">
              <FaRocket className="text-4xl text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-purple-400 mb-2">Founders Edition</h2>
            <p className="text-purple-300 mb-6">Secure Your Place in the AI Revolution</p>

            <div className="mb-8">
              <div className="text-4xl font-bold text-purple-400">{remainingUnits} / 500</div>
              <div className="text-gray-400 text-lg">Units Remaining</div>
            </div>

            <CountdownTimer />

            <div className="bg-purple-500/20 rounded-lg p-6 mb-8">
              <div className="text-4xl font-bold text-purple-400 mb-2">$15,000</div>
              <div className="text-2xl text-purple-300 mb-4">Own it forever. No subscriptions.</div>
              <div className="space-y-3 text-left">
                <div className="flex items-center text-gray-300">
                  <FaCheck className="text-purple-400 mr-3" />
                  Ships February 14th, 2024 💌
                </div>
                <div className="flex items-center text-gray-300">
                  <FaCheck className="text-purple-400 mr-3" />
                  FREE 1 Year Hosting ($1,200 value) 🎁
                </div>
                <div className="flex items-center text-gray-300">
                  <FaCheck className="text-purple-400 mr-3" />
                  Exclusive Founders Perks ⭐
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="text-2xl font-bold text-purple-400">$1,000 Deposit Today</div>
              <div className="text-gray-400">Reserve Your Unit</div>
            </div>

            <button
              onClick={handlePreorder}
              className="w-full btn btn-primary text-xl px-8 py-4"
            >
              🚀 Pre-order Founders Edition Now
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400">
                {claimedToday} units claimed in the last 24 hours!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is Unicorn Commander Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-purple-400 mb-8">
            What is Unicorn Commander?
          </h2>
          <p className="text-xl text-center text-gray-300 mb-12">
            Unicorn Commander is your all-in-one AI operations hub. It's not just software—it's your force multiplier. Deploy AI agents to automate workflows, generate content, analyze data, and scale your operations.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard
              icon={FaCogs}
              title="Automate Workflows"
              description="Save 100+ hours monthly. Delegate repetitive tasks to AI while you focus on high-impact strategies."
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
              description="Turn data into actionable insights instantly. Make informed decisions faster than ever before."
              emoji="📊"
            />
            <FeatureCard
              icon={FaRobot}
              title="Scale Operations"
              description="Achieve 10x output without 10x staff. Unicorn Commander grows with you—no extra costs."
              emoji="📈"
            />
          </div>
        </div>
      </section>

      {/* Why Founders Choose Us Section */}
      <WhyFounders />

      {/* ROI Calculator Section */}
      <ROICalculator />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Founders Guarantee Section */}
      <FoundersGuarantee />

      {/* FAQ Section */}
      <FAQ />

      {/* Hosted Solution Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-purple-500/10 border border-purple-500/20 rounded-xl p-8">
          <div className="text-center">
            <div className="inline-block bg-purple-500/20 rounded-full p-4 mb-4">
              <FaCloud className="text-4xl text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-purple-400 mb-2">Hosted Solution</h2>
            <p className="text-purple-300 mb-6">Experience the power of Unicorn Commander in the cloud. Join our beta waitlist for early access.</p>
            <HostedSignup />
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
