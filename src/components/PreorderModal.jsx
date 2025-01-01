import React, { useState } from 'react';
import { FaCheck, FaRocket, FaGift } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

export const PreorderModal = ({ onClose, onPreorder }) => {
  const [email, setEmail] = useState('');

  const handlePreorder = async () => {
    const stripe = await stripePromise;

    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 100000 }), // $1000 in cents
    });

    const { clientSecret } = await response.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email,
        },
      },
    });

    if (result.error) {
      toast.error(result.error.message);
    } else {
      onPreorder(result.paymentIntent);
      toast.success('Preorder successful!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 p-6 rounded-xl max-w-md w-full">
        <h3 className="text-2xl font-bold mb-4 text-center">
          <FaRocket className="inline-block mr-2" />
          Secure Your Founders Edition
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
              <FaGift className="text-green-500 mr-2" /> Limited to First 500 Orders
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
            required
          />
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
