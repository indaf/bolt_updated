import React from 'react';

interface DifficultyIndicatorProps {
  difficulty: number;
  maxDifficulty?: number;
}

export function DifficultyIndicator({ difficulty, maxDifficulty = 3 }: DifficultyIndicatorProps) {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: maxDifficulty }).map((_, index) => (
        <div
          key={index}
          className={`h-2 w-2 rounded-full ${
            index < difficulty
              ? 'bg-[#DC002B]'
              : 'bg-gray-700'
          }`}
        />
      ))}
    </div>
  );
}