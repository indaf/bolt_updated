import React from 'react';
import { Clock } from 'lucide-react';
import { GameState } from '../types';

interface GameControlsProps {
  timeLeft: number;
  gameState: GameState;
  maxTime: number;
  setMaxTime: (time: number) => void;
  onStart: () => void;
}

export function GameControls({
  timeLeft,
  gameState,
  maxTime,
  setMaxTime,
  onStart
}: GameControlsProps) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="bg-[#202123] rounded-lg px-4 py-2 flex items-center gap-2">
        <Clock className="w-5 h-5 text-[#009B70]" />
        <span className="text-2xl font-bold text-white">
          {gameState === 'playing' ? timeLeft.toFixed(1) : '--'}
        </span>
      </div>

      <div className="h-8">
        {(gameState === 'waiting' || gameState === 'finished') && (
          <button
            onClick={onStart}
            className="h-full px-4 bg-[#009B70] hover:bg-[#007B56] text-white text-sm rounded-lg
                     flex items-center gap-2 transition-colors"
          >
            Commencer
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <span className="text-sm text-gray-400">Temps limite:</span>
        <input
          type="range"
          min="1"
          max="10"
          value={maxTime}
          onChange={(e) => setMaxTime(Number(e.target.value))}
          disabled={gameState !== 'waiting' && gameState !== 'finished'}
          className="w-32 accent-[#009B70]"
        />
        <span className="text-sm font-medium w-6">{maxTime}s</span>
      </div>
    </div>
  );
}