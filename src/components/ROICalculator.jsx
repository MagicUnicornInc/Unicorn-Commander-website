import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const ROICalculator = () => {
  const [hours, setHours] = useState(100);
  const [hourlyRate, setHourlyRate] = useState(50);

  const calculateROI = () => {
    const monthlySavings = hours * hourlyRate;
    const annualSavings = monthlySavings * 12;
    const contentValue = hours * 75; // Estimated content production value
    const totalROI = annualSavings + contentValue;
    
    return {
      monthly: monthlySavings,
      annual: annualSavings,
      content: contentValue,
      total: totalROI
    };
  };

  const roi = calculateROI();

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="py-16"
    >
      <h2 className="text-3xl font-bold text-center text-purple-400 mb-8">
        Your Investment Return Calculator
      </h2>
      <div className="max-w-2xl mx-auto bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Hours saved monthly:</label>
            <input
              type="range"
              min="20"
              max="200"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-purple-400 text-lg font-bold">{hours} hours</div>
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Average hourly rate:</label>
            <input
              type="range"
              min="20"
              max="200"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-purple-400 text-lg font-bold">${hourlyRate}/hour</div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-purple-500/20 rounded-lg p-4">
              <div className="text-gray-300">Monthly Savings</div>
              <div className="text-2xl font-bold text-purple-400">
                ${roi.monthly.toLocaleString()}
              </div>
            </div>
            <div className="bg-purple-500/20 rounded-lg p-4">
              <div className="text-gray-300">Annual Savings</div>
              <div className="text-2xl font-bold text-purple-400">
                ${roi.annual.toLocaleString()}
              </div>
            </div>
            <div className="bg-purple-500/20 rounded-lg p-4">
              <div className="text-gray-300">Content Value</div>
              <div className="text-2xl font-bold text-purple-400">
                ${roi.content.toLocaleString()}
              </div>
            </div>
            <div className="bg-purple-500/20 rounded-lg p-4">
              <div className="text-gray-300">Total ROI Potential</div>
              <div className="text-2xl font-bold text-purple-400">
                ${roi.total.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
