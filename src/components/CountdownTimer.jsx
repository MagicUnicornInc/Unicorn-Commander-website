import React, { useState, useEffect } from 'react';

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const valentinesDay = new Date('2024-02-14T00:00:00');
      const now = new Date();
      const difference = valentinesDay - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center gap-4 mb-6">
      <div className="bg-purple-500/20 p-3 rounded-lg min-w-[80px]">
        <div className="text-2xl font-bold text-purple-400">{timeLeft.days}</div>
        <div className="text-sm text-gray-400">Days</div>
      </div>
      <div className="bg-purple-500/20 p-3 rounded-lg min-w-[80px]">
        <div className="text-2xl font-bold text-purple-400">{timeLeft.hours}</div>
        <div className="text-sm text-gray-400">Hours</div>
      </div>
      <div className="bg-purple-500/20 p-3 rounded-lg min-w-[80px]">
        <div className="text-2xl font-bold text-purple-400">{timeLeft.minutes}</div>
        <div className="text-sm text-gray-400">Minutes</div>
      </div>
      <div className="bg-purple-500/20 p-3 rounded-lg min-w-[80px]">
        <div className="text-2xl font-bold text-purple-400">{timeLeft.seconds}</div>
        <div className="text-sm text-gray-400">Seconds</div>
      </div>
    </div>
  );
};
