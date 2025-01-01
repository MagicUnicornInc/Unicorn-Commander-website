import React, { useState } from 'react';
import toast from 'react-hot-toast';

export const HostedSignup = () => {
  const [email, setEmail] = useState('');
  const [betaTester, setBetaTester] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          betaTester,
        }),
      });

      if (response.ok) {
        toast.success('Thanks for joining the waitlist! We\'ll keep you updated.');
        setEmail('');
        setBetaTester(false);
      } else {
        const data = await response.json();
        if (data.error === 'Email already registered') {
          toast.error('This email is already registered!');
        } else {
          toast.error('Something went wrong. Please try again.');
        }
      }
    } catch (error) {
      toast.error('Connection error. Please try again.');
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
        Join Waitlist
      </button>
    </form>
  );
};
