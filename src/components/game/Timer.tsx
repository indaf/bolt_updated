import React from 'react';
import { Timer as TimerIcon } from 'lucide-react';
import { GameState } from '../../types';

interface TimerProps {
  timeLeft: number;
  gameState: GameState;
}

export function Timer({ timeLeft, gameState }: TimerProps) {
  return (
    <div className="bg-[#202123] rounded-lg px-4 py-2 flex items-center gap-2">
      <TimerIcon className="w-5 h-5 text-[#009B70]" />
      <span className="text-2xl font-bold text-white">
        {gameState === 'playing' ? timeLeft : '--'}
      </span>
    </div>
  );
}