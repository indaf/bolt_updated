import React from 'react';
import { Exercise } from '../../types/Exercise';
import { Star, Shield } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  onClick: (exercise: Exercise) => void;
}

export function ExerciseCard({ exercise, onClick }: ExerciseCardProps) {
  return (
    <div 
      onClick={() => onClick(exercise)}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden h-full flex flex-col"
    >
      {/* Image */}
      <div className="aspect-square bg-gray-100 relative">
        {exercise.images?.target ? (
          <img 
            src={exercise.images.target}
            alt={`Cible ${exercise.target.name}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Pas d'image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {exercise.name}
        </h3>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-yellow-100 px-2 py-1 rounded-full text-sm font-medium text-yellow-800 flex items-center gap-1">
            <Star className="w-4 h-4" />
            {exercise.module.difficulty}
          </span>
          <span className="bg-blue-100 px-2 py-1 rounded-full text-sm font-medium text-blue-800 flex items-center gap-1">
            <Shield className="w-4 h-4" />
            {exercise.weapon.type}
          </span>
        </div>

        {/* Categories */}
        <div className="mt-auto">
          <div className="flex flex-wrap gap-1">
            {exercise.categories.map((category) => (
              <span 
                key={category}
                className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                  category === 'modèles' ? 'bg-green-100 text-green-800' :
                  category === 'semaines' ? 'bg-purple-100 text-purple-800' :
                  'bg-orange-100 text-orange-800'
                }`}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}