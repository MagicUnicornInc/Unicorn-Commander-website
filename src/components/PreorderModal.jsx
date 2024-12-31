import React from 'react';
import { FaCheck, FaRocket, FaGift } from 'react-icons/fa';
import toast from 'react-hot-toast';

export const PreorderModal = ({ onClose, email }) => {
  const handlePreorder = () => {
    // Store preorder in localStorage
    const preorders = JSON.parse(localStorage.getItem('preorders') || '[]');
    preorders.push({
      email,
      date: new Date().toISOString(),
      deposit: 1000,
      status: 'pending'
    });
    localStorage.setItem('preorders', JSON.stringify(preorders));
    
    toast.success('Preorder recorded! Payment integration coming soon.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 p-6 rounded-xl max-w-md w-full">
        <h3 className="text-2xl font-bold mb-4 text-center">
          <FaRocket className="inline-block mr-2" />
          Secure Your Unicorn Commander
        </h3>
        
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-6">
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-purple-400">$4,999</div>
            <div className="text-sm text-gray-400">Total Price</div>
          </div>
          <div className="text-center mb-4">
            <div className="text-xl font-bold text-purple-400">$1,000</div>
            <div className="text-sm text-gray-400">Deposit Today</div>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-300 text-sm">
              <FaCheck className="text-green-500 mr-2" /> Ships February 14th, 2024
            </li>
            <li className="flex items-center text-gray-300 text-sm">
              <FaCheck className="text-green-500 mr-2" /> FREE Hosted Version Access
            </li>
            <li className="flex items-center text-gray-300 text-sm">
              <FaCheck className="text-green-500 mr-2" /> 1 Year FREE Hosting ($1,200 value)
            </li>
            <li className="flex items-center text-gray-300 text-sm">
              <FaGift className="text-green-500 mr-2" /> Limited to First 1,000 Orders
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handlePreorder}
            className="w-full btn btn-primary"
          >
            Pay $1,000 Deposit Now
          </button>
          <button 
            onClick={onClose}
            className="w-full btn btn-outline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
