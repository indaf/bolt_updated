import React from "react";
import { Exercise } from "../../types/Exercise";
import { ExerciseCard } from "./ExerciseCard";

interface ExerciseGridProps {
  exercises: any[];
  onExerciseClick: (exercise: Exercise) => void;
}

export function ExerciseGrid({
  exercises,
  onExerciseClick,
}: ExerciseGridProps) {
  if (!exercises?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-white">Aucun exercice trouvé</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {exercises.map((exercise) => (
        <ExerciseCard
          key={`exercise-${exercise.id}`}
          exercise={exercise}
          onClick={() => onExerciseClick(exercise)}
        />
      ))}
    </div>
  );
}
