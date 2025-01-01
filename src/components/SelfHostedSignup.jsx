import React, { useState } from 'react';
import toast from 'react-hot-toast';

export const SelfHostedSignup = () => {
  const [email, setEmail] = useState('');
  const [betaTester, setBetaTester] = useState(false);

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
        type: 'self-hosted',
      }),
    });

    if (response.ok) {
      toast.success('Thanks for joining the self-hosted waitlist!');
      setEmail('');
      setBetaTester(false);
    } else {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
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
      <button type="submit" className="w-full btn btn-primary">
        Join Self-Hosted Waitlist
      </button>
    </form>
  );
};
