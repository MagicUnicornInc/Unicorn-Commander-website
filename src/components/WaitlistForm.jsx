import React, { useState } from 'react';
import { FaCheck, FaGift, FaRocket } from 'react-icons/fa';
import toast from 'react-hot-toast';

export const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [betaTester, setBetaTester] = useState(false);
  const [hostedInterest, setHostedInterest] = useState(false);
  const [selfHostedInterest, setSelfHostedInterest] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        betaTester,
        hostedInterest,
        selfHostedInterest,
      }),
    });

    if (response.ok) {
      toast.success('Thanks for joining the waitlist! We\'ll keep you updated.');
      setEmail('');
      setBetaTester(false);
      setHostedInterest(false);
      setSelfHostedInterest(false);
    } else {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">🚀 Join the Waitlist</h3>
          <p className="text-purple-400">Be the first to try our hosted solution!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
            required
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={betaTester}
              onChange={(e) => setBetaTester(e.target.checked)}
              className="mr-2"
            />
            <span className="text-gray-400">I'm interested in being a beta tester</span>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={hostedInterest}
              onChange={(e) => setHostedInterest(e.target.checked)}
              className="mr-2"
            />
            <span className="text-gray-400">I'm interested in the hosted solution</span>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selfHostedInterest}
              onChange={(e) => setSelfHostedInterest(e.target.checked)}
              className="mr-2"
            />
            <span className="text-gray-400">I'm interested in the self-hosted solution</span>
          </div>
          <button type="submit" className="w-full btn btn-primary">
            Join Waitlist
          </button>
        </form>
      </div>
    </div>
  );
};
