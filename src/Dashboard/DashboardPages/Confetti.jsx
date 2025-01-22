import React from 'react';
import ReactConfetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';

const Confetti = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Fullscreen Confetti */}
      <ReactConfetti
        width={window.innerWidth}
        height={window.innerHeight}
      />

      {/* Centered Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          🎉 Your Payment was Successful! 🎉
        </h1>
        <button
          className="bg-blue-500 text-white text-lg font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition"
          onClick={() => navigate('/dashboard/myparcels')}
        >
          View My Parcels
        </button>
      </div>
    </div>
  );
};

export default Confetti;
