import React from 'react';
import { Exercise } from '../../types/Exercise';

interface ExerciseDetailsProps {
  exercise: Exercise;
}

export function ExerciseDetails({ exercise }: ExerciseDetailsProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold mb-4">Détails de l'exercice</h3>
      <dl className="space-y-3">
        <div className="flex justify-between">
          <dt className="text-gray-600">Cible</dt>
          <dd className="font-medium">{exercise.target.name}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Position</dt>
          <dd className="font-medium">{exercise.weapon.position}</dd>
        </div>
        {exercise.direction && (
          <div className="flex justify-between">
            <dt className="text-gray-600">Direction</dt>
            <dd className="font-medium">{exercise.direction}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}