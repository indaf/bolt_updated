import React from 'react';
import { ExerciseCategory } from '../../types/Exercise';

interface ExerciseCategoriesProps {
  categories: ExerciseCategory[];
}

const categoryStyles = {
  'modèles': 'bg-green-100 text-green-800',
  'semaines': 'bg-purple-100 text-purple-800',
  'mois': 'bg-orange-100 text-orange-800'
} as const;

export function ExerciseCategories({ categories }: ExerciseCategoriesProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {categories.map((category) => (
        <span 
          key={category}
          className={`px-2 py-0.5 text-xs font-medium rounded-full ${categoryStyles[category]}`}
        >
          {category}
        </span>
      ))}
    </div>
  );
}