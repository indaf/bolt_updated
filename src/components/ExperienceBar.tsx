import React from 'react';
import { Trophy } from 'lucide-react';

interface ExperienceBarProps {
  xp?: number;
  level?: number;
  nextLevelXp?: number;
}

export function ExperienceBar({ 
  xp = 0, 
  level = 1, 
  nextLevelXp = 100 
}: ExperienceBarProps) {
  const progress = Math.min(100, Math.max(0, (xp / nextLevelXp) * 100));

  return (
    <div className="max-w-md mb-4">
      <div className="flex items-center gap-3 mb-1">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#009B70]" />
          <span className="text-base font-medium text-white">Niveau {level}</span>
        </div>
        <div className="text-xs text-gray-400">
          {xp.toLocaleString()} / {nextLevelXp.toLocaleString()} XP
        </div>
      </div>
      <div className="h-1.5 bg-[#2A2B32] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#009B70] to-[#00D1A1] rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}