'use client';

import { useState, useCallback, useEffect } from 'react';
import LightCell from './LightCell';
import {
  createInitialState,
  getToggledGrid,
  checkWin,
  type GameState,
} from '@/utils/gameLogic';

interface LightsOutGameProps {
  gridSize?: number;
}

export default function LightsOutGame({ gridSize = 5 }: LightsOutGameProps) {
  const [gameState, setGameState] = useState<GameState>({
    grid: Array(gridSize).fill(null).map(() => Array(gridSize).fill(false)),
    moves: 0,
    isWon: false,
  });
  const [showWinAnimation, setShowWinAnimation] = useState(false);

  // Initialize game after component mounts to avoid hydration mismatch
  useEffect(() => {
    setGameState(createInitialState(gridSize));
  }, [gridSize]);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (gameState.isWon) return;

      const newGrid = getToggledGrid(gameState.grid, row, col);
      const isWon = checkWin(newGrid);

      setGameState({
        grid: newGrid,
        moves: gameState.moves + 1,
        isWon,
      });

      if (isWon) {
        setShowWinAnimation(true);
      }
    },
    [gameState]
  );

  const handleReset = () => {
    setGameState(createInitialState(gridSize));
    setShowWinAnimation(false);
  };

  useEffect(() => {
    if (showWinAnimation) {
      const timer = setTimeout(() => setShowWinAnimation(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showWinAnimation]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 md:p-8 overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 -z-10" />

      {/* Animated gradient orbs */}
      <div className="fixed top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse -z-10" />
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-pulse -z-10 [animation-delay:1s]" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl">
        <div className="text-center mb-8 md:mb-12 animate-float">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 text-transparent bg-clip-text drop-shadow-lg">
            Lights Out
          </h1>
          <p className="text-gray-200 text-xl md:text-2xl mb-3 font-medium">
            Toggle the lights to turn them all off!
          </p>
          <p className="text-gray-400 text-base md:text-lg">
            Click a light to toggle it and its neighbors
          </p>
        </div>

        {/* Stats and controls */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4 md:gap-8">
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md px-8 py-4 rounded-2xl border border-gray-700/50 shadow-xl">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
              {gameState.moves}
            </div>
            <div className="text-sm md:text-base text-gray-400 font-medium uppercase tracking-wider">Moves</div>
          </div>

          <button
            onClick={handleReset}
            type="button"
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl font-bold text-white text-lg shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden cursor-pointer"
          >
            <span className="relative z-10 pointer-events-none">New Game</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </button>

          {!gameState.isWon && gameState.moves > 0 && (
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-gray-800/60 backdrop-blur-md rounded-xl font-semibold text-gray-300 border border-gray-600/50 hover:bg-gray-700/60 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Reset
            </button>
          )}
        </div>

        {/* Game board */}
        <div className="flex justify-center mb-8 w-full">
          <div
            className="relative bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 backdrop-blur-xl p-6 md:p-10 rounded-3xl shadow-2xl border border-gray-700/50 w-full"
            style={{
              maxWidth: '800px',
            }}
          >
            {/* Decorative glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 rounded-3xl blur-xl -z-10" />

            <div
              className="grid gap-3 md:gap-4"
              style={{
                gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
              }}
            >
              {gameState.grid.map((row, rowIndex) =>
                row.map((isOn, colIndex) => (
                  <LightCell
                    key={`${rowIndex}-${colIndex}`}
                    isOn={isOn}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    row={rowIndex}
                    col={colIndex}
                  />
                ))
              )}
            </div>

            {/* Win animation overlay */}
            {gameState.isWon && showWinAnimation && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md rounded-3xl">
                <div className="text-center animate-bounce">
                  <div className="text-8xl mb-6">🎉</div>
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 text-transparent bg-clip-text mb-4">
                    Victory!
                  </div>
                  <div className="text-2xl md:text-3xl text-gray-200 font-semibold">
                    Completed in <span className="text-yellow-400">{gameState.moves}</span> moves
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Victory message */}
        {gameState.isWon && !showWinAnimation && (
          <div className="text-center mb-8 animate-float">
            <div className="inline-block bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md px-8 py-4 rounded-2xl border border-green-500/30">
              <div className="text-3xl font-bold text-green-400 mb-2">
                Victory! 🎉
              </div>
              <div className="text-xl text-gray-300">
                Solved in <span className="text-green-400 font-bold">{gameState.moves}</span> moves
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="text-center max-w-2xl mx-auto bg-gray-800/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-gray-700/50">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text mb-4">
            How to Play
          </h2>
          <ul className="text-gray-300 space-y-3 text-left text-base md:text-lg">
            <li className="flex items-start">
              <span className="text-2xl mr-3">💡</span>
              <span>Click any light to toggle it on/off</span>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">🔄</span>
              <span>Adjacent lights (up, down, left, right) will also toggle</span>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">🎯</span>
              <span>Turn off all lights to win the game</span>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">🏆</span>
              <span>Challenge yourself to complete it in fewer moves!</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
