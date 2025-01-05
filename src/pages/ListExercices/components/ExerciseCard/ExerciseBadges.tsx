import React from 'react';
import { Star, Shield } from 'lucide-react';
import { ModuleType, WeaponType } from '../../types/Exercise';

interface ExerciseBadgesProps {
  difficulty: ModuleType;
  weaponType: WeaponType;
}

export function ExerciseBadges({ difficulty, weaponType }: ExerciseBadgesProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-yellow-100 px-2 py-0.5 rounded-full flex items-center gap-1">
        <Star className="w-4 h-4 text-yellow-500" />
        <span className="text-xs font-medium text-yellow-700">{difficulty}</span>
      </div>
      <div className="bg-blue-100 px-2 py-0.5 rounded-full flex items-center gap-1">
        <Shield className="w-4 h-4 text-blue-500" />
        <span className="text-xs font-medium text-blue-700">{weaponType}</span>
      </div>
    </div>
  );
}