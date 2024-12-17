import React from 'react';

interface GameInstructionProps {
  instruction: { text: string } | null;
  gameState: 'playing' | 'countdown' | 'waiting' | 'finished';
}

export function GameInstruction({ instruction, gameState }: GameInstructionProps) {
  if (!instruction || (gameState !== 'playing' && gameState !== 'countdown')) {
    return null;
  }

  return (
    <div className="text-xl font-medium text-white bg-[#202123] px-6 py-3 rounded-xl text-center">
      {instruction.text}
    </div>
  );
}