import React from 'react';
import { Exercise } from '../../types/Exercise';

interface ExerciseSkillsProps {
  skills: NonNullable<Exercise['skills']>;
}

export function ExerciseSkills({ skills }: ExerciseSkillsProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold mb-3">Compétences</h3>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-3">
            <h4 className="font-medium">{skill.name}</h4>
            <p className="text-sm text-gray-600 mt-1">{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}