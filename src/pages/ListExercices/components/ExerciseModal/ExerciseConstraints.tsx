import React from 'react';
import { Exercise } from '../../types/Exercise';

interface ExerciseConstraintsProps {
  constraints: NonNullable<Exercise['constraints']>;
}

export function ExerciseConstraints({ constraints }: ExerciseConstraintsProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold mb-3">Contraintes</h3>
      <ul className="space-y-2">
        {constraints.map((constraint, index) => (
          <li key={index} className="flex gap-3">
            <span>•</span>
            <span className="text-gray-700">{constraint.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}