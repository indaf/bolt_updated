import React from 'react';
import { Exercise } from '../../types/Exercise';
import { ExerciseDetails } from './ExerciseDetails';
import { ExerciseSkills } from './ExerciseSkills';
import { ExerciseConstraints } from './ExerciseConstraints';
import { ExerciseImages } from './ExerciseImages';
import { ExerciseAudio } from './ExerciseAudio';

interface ExerciseModalContentProps {
  exercise: Exercise;
}

export function ExerciseModalContent({ exercise }: ExerciseModalContentProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <ExerciseImages 
          drillImage={exercise.images?.drill}
          targetImage={exercise.images?.target}
        />
        <ExerciseDetails 
          direction={exercise.direction}
          target={exercise.target}
          weapon={exercise.weapon}
          ammunition={exercise.ammunition}
        />
      </div>
      
      <div className="space-y-6">
        {exercise.objective && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Objectif</h3>
            <p className="text-gray-700">{exercise.objective}</p>
          </div>
        )}
        
        {exercise.constraints && exercise.constraints.length > 0 && (
          <ExerciseConstraints constraints={exercise.constraints} />
        )}
        
        {exercise.skills && exercise.skills.length > 0 && (
          <ExerciseSkills skills={exercise.skills} />
        )}
        
        {exercise.audio?.embed && (
          <ExerciseAudio embed={exercise.audio.embed} />
        )}
      </div>
    </div>
  );
}