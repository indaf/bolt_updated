import React from 'react';

interface DifficultyBarProps {
  difficulty: number;
  maxPoints: number;
  showDetails?: boolean;
}

export function DifficultyBar({ difficulty, maxPoints = 61, showDetails = false }: DifficultyBarProps) {
  const percentage = (difficulty / maxPoints) * 100;
  
  return (
    <div className="h-2 w-20 bg-gray-700 rounded-full overflow-hidden">
      <div 
        className="h-full bg-[#DC002B] rounded-full transition-all duration-300 group-hover:bg-white"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}