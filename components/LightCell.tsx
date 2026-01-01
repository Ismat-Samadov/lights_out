'use client';

import { useState } from 'react';

interface LightCellProps {
  isOn: boolean;
  onClick: () => void;
  row: number;
  col: number;
}

export default function LightCell({ isOn, onClick, row, col }: LightCellProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onClick();
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative aspect-square rounded-xl transition-all duration-300 transform overflow-hidden
        min-w-[70px] min-h-[70px] md:min-w-[100px] md:min-h-[100px]
        ${isAnimating ? 'animate-pulse-light' : ''}
        ${
          isOn
            ? 'bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 scale-100'
            : 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 scale-95'
        }
        hover:scale-105 active:scale-90
        border-2 cursor-pointer touch-none select-none
        ${isOn ? 'border-yellow-200 shadow-[0_0_30px_rgba(251,191,36,0.6),0_0_60px_rgba(249,115,22,0.4)]' : 'border-gray-600 shadow-inner'}
      `}
      style={{
        boxShadow: isOn
          ? '0 0 30px rgba(251, 191, 36, 0.6), 0 0 60px rgba(249, 115, 22, 0.4), 0 0 90px rgba(239, 68, 68, 0.2)'
          : 'inset 0 2px 4px rgba(0,0,0,0.6)',
      }}
      aria-label={`Light at row ${row + 1}, column ${col + 1}, currently ${isOn ? 'on' : 'off'}`}
    >
      {/* Inner glow effect */}
      <div
        className={`
          absolute inset-0 rounded-xl transition-all duration-300
          ${isOn ? 'opacity-100 animate-pulse-glow' : 'opacity-0'}
        `}
      >
        <div className="absolute inset-2 bg-gradient-to-br from-white/40 via-yellow-200/30 to-transparent rounded-lg blur-md" />
      </div>

      {/* Center bright spot */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center transition-all duration-300
          ${isOn ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <div className="w-1/2 h-1/2 bg-white/50 rounded-full blur-sm" />
      </div>

      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-xl" />

      {/* Dark overlay when off */}
      {!isOn && (
        <div className="absolute inset-0 bg-black/20 rounded-xl" />
      )}
    </button>
  );
}
