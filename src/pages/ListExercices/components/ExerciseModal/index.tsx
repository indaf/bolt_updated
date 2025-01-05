import React from 'react';
import { Exercise } from '../../types/Exercise';
import { ModalHeader } from './ModalHeader';
import { ExerciseDetails } from './ExerciseDetails';
import { AmmunitionDetails } from './AmmunitionDetails';
import { ExerciseImages } from './ExerciseImages';
import { ExerciseObjective } from './ExerciseObjective';
import { ExerciseConstraints } from './ExerciseConstraints';
import { ExerciseSkills } from './ExerciseSkills';
import { ExerciseAudio } from './ExerciseAudio';

interface ExerciseModalProps {
  exercise: Exercise | null;
  onClose: () => void;
}

export function ExerciseModal({ exercise, onClose }: ExerciseModalProps) {
  if (!exercise) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <ModalHeader exercise={exercise} onClose={onClose} />

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <ExerciseImages images={exercise.images} />
              <ExerciseDetails exercise={exercise} />
              {exercise.ammunition && (
                <AmmunitionDetails ammunition={exercise.ammunition} />
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {exercise.objective && (
                <ExerciseObjective objective={exercise.objective} />
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
        </div>
      </div>
    </div>
  );
}