import React from 'react';
import { FaGift, FaRocket, FaCloud, FaCalendar } from 'react-icons/fa';

export const Stats = () => {
  // Get actual counts from localStorage
  const waitlist = JSON.parse(localStorage.getItem('waitlist') || '[]');
  const preorders = JSON.parse(localStorage.getItem('preorders') || '[]');
  
  return (
    <div className="mt-12 grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
      <div className="text-center">
        <div className="text-purple-500 text-4xl font-bold mb-2">
          <FaRocket className="inline" />
        </div>
        <div className="text-xl font-bold text-purple-400">$4,999</div>
        <div className="text-gray-400">Total Price</div>
      </div>
      <div className="text-center">
        <div className="text-purple-500 text-4xl font-bold mb-2">
          <FaGift className="inline" />
        </div>
        <div className="text-xl font-bold text-purple-400">$1,000</div>
        <div className="text-gray-400">Deposit Today</div>
      </div>
      <div className="text-center">
        <div className="text-purple-500 text-4xl font-bold mb-2">
          <FaCloud className="inline" />
        </div>
        <div className="text-xl font-bold text-purple-400">1 Year</div>
        <div className="text-gray-400">FREE Hosting</div>
      </div>
      <div className="text-center">
        <div className="text-purple-500 text-4xl font-bold mb-2">
          <FaCalendar className="inline" />
        </div>
        <div className="text-xl font-bold text-purple-400">Feb 14</div>
        <div className="text-gray-400">Ships 2024</div>
      </div>
    </div>
  );
};
