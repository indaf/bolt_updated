import React from "react";
import { Exercise } from "../../types/Exercise";
import { Target, Shield, Star } from "lucide-react";

interface ExerciseCardProps {
  exercise: Exercise;
  onClick: () => void;
}

export function ExerciseCard({ exercise, onClick }: ExerciseCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-[#2A2B32] rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden flex flex-col"
    >
      <div className="p-3 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-medium text-red-500 line-clamp-2">
            {exercise.name}
          </h3>
          <div className="flex items-center text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
          </div>
        </div>

        <div className="mt-auto pt-3 flex flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1 text-gray-400">
            <Target className="w-3.5 h-3.5" />
            <span>{exercise.target.name}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <Shield className="w-3.5 h-3.5" />
            <span>{exercise.weapon.type}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
