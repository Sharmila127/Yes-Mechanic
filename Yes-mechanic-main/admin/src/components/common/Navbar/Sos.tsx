import React from 'react';

const SosButton: React.FC = () => {
  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
      <div className="relative w-10 h-10">
        {/* Green notification dot (like HPE style) */}
        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full z-20" />

        <button
          className="w-full h-full rounded-3xl bg-gradient-to-r from-red-600 to-red-800 text-white font-bold text-sm shadow-lg hover:scale-105 transition-transform"
        >
          SOS
        </button>
      </div>
    </div>
  );
};

export default SosButton;
