import React from 'react';

interface ExerciseObjectiveProps {
  objective: string;
}

export function ExerciseObjective({ objective }: ExerciseObjectiveProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold mb-3">Objectif</h3>
      <p className="text-gray-700">{objective}</p>
    </div>
  );
}