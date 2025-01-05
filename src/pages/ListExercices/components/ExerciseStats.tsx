import React from 'react';
import { Exercise } from '../types/Exercise';
import { Target, Shield, Crosshair } from 'lucide-react';

interface ExerciseStatsProps {
  exercise: Exercise;
}

export function ExerciseStats({ exercise }: ExerciseStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center gap-2">
        <Target className="w-5 h-5 text-gray-600" />
        <div>
          <p className="text-sm font-medium text-gray-900">{exercise.target.count}</p>
          <p className="text-xs text-gray-500">Cibles</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-gray-600" />
        <div>
          <p className="text-sm font-medium text-gray-900">{exercise.weapon.type}</p>
          <p className="text-xs text-gray-500">Type d'arme</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Crosshair className="w-5 h-5 text-gray-600" />
        <div>
          <p className="text-sm font-medium text-gray-900">{exercise.ammunition.distance}m</p>
          <p className="text-xs text-gray-500">Distance</p>
        </div>
      </div>
    </div>
  );
}