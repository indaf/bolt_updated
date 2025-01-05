import React from 'react';
import { ExerciseCategory } from '../../types/Exercise';

interface ExerciseCategoriesProps {
  categories: ExerciseCategory[];
}

export function ExerciseCategories({ categories }: ExerciseCategoriesProps) {
  if (!categories?.length) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <span 
          key={category}
          className={`px-3 py-1 text-sm font-medium rounded-full ${
            category === 'modèles' ? 'bg-green-100 text-green-800' :
            category === 'semaines' ? 'bg-purple-100 text-purple-800' :
            'bg-orange-100 text-orange-800'
          }`}
        >
          {category}
        </span>
      ))}
    </div>
  );
}