import React from 'react';
import { Exercise } from '../types/Exercise';
import { Star, Shield } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  onClick: (exercise: Exercise) => void;
}

export function ExerciseCard({ exercise, onClick }: ExerciseCardProps) {
  return (
    <div 
      onClick={() => onClick(exercise)}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden"
      style={{ aspectRatio: '2/3' }}
    >
      <div className="h-full flex flex-col">
        {/* Image */}
        <div className="relative w-full aspect-square bg-gray-100">
          {exercise.images?.target && (
            <img 
              src={exercise.images.target} 
              alt={`Cible ${exercise.target.name}`}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Title and Difficulty */}
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">{exercise.name}</h3>
            <div className="flex items-center gap-2">
              <div className="bg-yellow-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-xs font-medium text-yellow-700">{exercise.module.difficulty}</span>
              </div>
              <div className="bg-blue-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Shield className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-medium text-blue-700">{exercise.weapon.type}</span>
              </div>
            </div>
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
    </div>
  );
}