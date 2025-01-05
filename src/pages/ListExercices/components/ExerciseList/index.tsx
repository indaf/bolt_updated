import React from 'react';
import { Exercise } from '../../types/Exercise';
import { ExerciseCard } from '../ExerciseCard';
import { EmptyState } from './EmptyState';

interface ExerciseListProps {
  exercises: Exercise[];
  onExerciseClick: (exercise: Exercise) => void;
}

export function ExerciseList({ exercises, onExerciseClick }: ExerciseListProps) {
  if (!exercises?.length) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {exercises.map(exercise => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          onClick={onExerciseClick}
        />
      ))}
    </div>
  );
}