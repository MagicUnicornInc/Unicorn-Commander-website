import React, { useState } from 'react';
import { FaCheck, FaGift, FaRocket } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { PreorderModal } from './PreorderModal';

const PreorderBenefits = () => (
  <div className="bg-gray-800/50 p-6 rounded-xl border border-purple-500/30 mb-8">
    <h4 className="text-xl font-bold mb-4 text-purple-400">
      <FaRocket className="inline-block mr-2" />
      Preorder Benefits
    </h4>
    <ul className="space-y-2">
      <li className="flex items-center text-gray-300">
        <FaCheck className="text-green-500 mr-2" /> Early Access to Hosted Tools
      </li>
      <li className="flex items-center text-gray-300">
        <FaCheck className="text-green-500 mr-2" /> Guaranteed February Delivery
      </li>
      <li className="flex items-center text-gray-300">
        <FaCheck className="text-green-500 mr-2" /> FREE Hosted Version for 1 Year
      </li>
      <li className="flex items-center text-gray-300">
        <FaGift className="text-green-500 mr-2" /> Limited to First 1,000 Orders
      </li>
    </ul>
  </div>
);

export const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('preorder'); // Default to preorder
  const [showPreorderModal, setShowPreorderModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (interest === 'preorder') {
      setShowPreorderModal(true);
    } else {
      // Store waitlist entry in localStorage
      const waitlist = JSON.parse(localStorage.getItem('waitlist') || '[]');
      waitlist.push({
        email,
        date: new Date().toISOString(),
        type: 'hosted'
      });
      localStorage.setItem('waitlist', JSON.stringify(waitlist));
      
      toast.success('Thanks for joining the waitlist! We\'ll keep you updated on hosted solutions.');
      setEmail('');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">🚀 Preorders Are LIVE!</h3>
          <p className="text-purple-400">The Future of Automation Ships February 14th!</p>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            className={`flex-1 btn ${interest === 'preorder' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setInterest('preorder')}
          >
            Preorder Now
          </button>
          <button
            className={`flex-1 btn ${interest === 'waitlist' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setInterest('waitlist')}
          >
            Hosted Only
          </button>
        </div>
        
        {interest === 'preorder' && <PreorderBenefits />}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
            required
          />
          <button type="submit" className="w-full btn btn-primary">
            {interest === 'preorder' ? 'Secure with $1,000 Deposit' : 'Join Hosted Waitlist'}
          </button>
        </form>
        
        <p className="mt-4 text-sm text-gray-400 text-center">
          {interest === 'preorder' ? (
            <>
              <FaGift className="inline mr-2" />
              Ships February 14th with FREE hosted access
            </>
          ) : (
            'Get started with our hosted solution in the next few weeks'
          )}
        </p>
      </div>

      {showPreorderModal && (
        <PreorderModal 
          onClose={() => setShowPreorderModal(false)}
          email={email}
        />
      )}
    </div>
  );
};
