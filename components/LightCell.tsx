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
        aspect-square rounded-lg transition-all duration-300 transform
        ${isAnimating ? 'animate-pulse-light' : ''}
        ${
          isOn
            ? 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 shadow-lg shadow-orange-500/50 scale-100'
            : 'bg-gradient-to-br from-gray-700 to-gray-800 shadow-inner scale-95'
        }
        hover:scale-105 active:scale-95
        border-2
        ${isOn ? 'border-yellow-300' : 'border-gray-600'}
      `}
      aria-label={`Light at row ${row + 1}, column ${col + 1}, currently ${isOn ? 'on' : 'off'}`}
    >
      <div
        className={`
          w-full h-full rounded-md transition-opacity duration-300
          ${isOn ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <div className="w-full h-full bg-white/30 rounded-md blur-sm" />
      </div>
    </button>
  );
}
