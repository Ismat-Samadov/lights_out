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
  const [gameState, setGameState] = useState<GameState>(() =>
    createInitialState(gridSize)
  );
  const [showWinAnimation, setShowWinAnimation] = useState(false);

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

  const handleReset = useCallback(() => {
    setGameState(createInitialState(gridSize));
    setShowWinAnimation(false);
  }, [gridSize]);

  useEffect(() => {
    if (showWinAnimation) {
      const timer = setTimeout(() => setShowWinAnimation(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showWinAnimation]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text">
          Lights Out
        </h1>
        <p className="text-gray-300 text-lg mb-2">
          Toggle the lights to turn them all off!
        </p>
        <p className="text-gray-400">
          Click a light to toggle it and its neighbors
        </p>
      </div>

      <div className="mb-6 flex items-center gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-yellow-400">
            {gameState.moves}
          </div>
          <div className="text-sm text-gray-400">Moves</div>
        </div>

        <button
          onClick={handleReset}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
        >
          New Game
        </button>
      </div>

      <div
        className="relative bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-gray-700"
        style={{
          maxWidth: '600px',
        }}
      >
        <div
          className="grid gap-2"
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

        {gameState.isWon && showWinAnimation && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-2xl">
            <div className="text-center animate-bounce">
              <div className="text-6xl mb-4">🎉</div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                You Won!
              </div>
              <div className="text-xl text-gray-300">
                Completed in {gameState.moves} moves
              </div>
            </div>
          </div>
        )}
      </div>

      {gameState.isWon && !showWinAnimation && (
        <div className="mt-6 text-center">
          <div className="text-2xl font-bold text-green-400 mb-2">
            Victory! 🎉
          </div>
          <div className="text-gray-300">
            You solved it in {gameState.moves} moves
          </div>
        </div>
      )}

      <div className="mt-8 text-center max-w-md">
        <h2 className="text-xl font-semibold text-yellow-400 mb-3">
          How to Play
        </h2>
        <ul className="text-gray-300 space-y-2 text-left">
          <li className="flex items-start">
            <span className="text-yellow-400 mr-2">•</span>
            <span>Click any light to toggle it on/off</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-2">•</span>
            <span>Adjacent lights (up, down, left, right) will also toggle</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-2">•</span>
            <span>Turn off all lights to win the game</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
