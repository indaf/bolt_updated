import React from 'react';
import { Exercise } from '../types/Exercise';
import { ExerciseCard } from './ExerciseCard';

interface ExerciseListProps {
  exercises: Exercise[];
  onExerciseClick: (exercise: Exercise) => void;
}

export function ExerciseList({ exercises, onExerciseClick }: ExerciseListProps) {
  if (exercises.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Aucun exercice trouvé</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {exercises.map(exercise => (
        <div key={exercise.id} className="w-full max-w-sm mx-auto">
          <ExerciseCard
            exercise={exercise}
            onClick={onExerciseClick}
          />
        </div>
      ))}
    </div>
  );
}