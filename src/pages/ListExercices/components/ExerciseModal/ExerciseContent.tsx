import React from 'react';
import { Exercise } from '../../types/Exercise';
import { ExerciseDetails } from './ExerciseDetails';
import { ExerciseInstruction } from './ExerciseInstruction';
import { ExerciseRules } from './ExerciseRules';
import { ExerciseConstraints } from './ExerciseConstraints';
import { ExerciseSkills } from './ExerciseSkills';
import { ExerciseActions } from './ExerciseActions';

interface ExerciseContentProps {
  exercise: Exercise;
  onDownload: () => void;
  onPrint: () => void;
}

export function ExerciseContent({ exercise, onDownload, onPrint }: ExerciseContentProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Left Column */}
      <div>
        {exercise.images?.target && (
          <div className="aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden mb-6">
            <img 
              src={exercise.images.target}
              alt="Cible"
              className="w-full h-full object-contain"
            />
          </div>
        )}

        <ExerciseDetails 
          direction={exercise.direction || ''}
          targetModel={exercise.target.name}
          distance={exercise.ammunition?.distance || 0}
        />
      </div>

      {/* Right Column */}
      <div className="space-y-8">
        {exercise.objective && (
          <ExerciseInstruction instruction={exercise.objective} />
        )}
        
        <ExerciseRules
          rules={{
            weaponType: exercise.weapon.type,
            weaponTransition: exercise.weapon.transition,
            firstWeapon: exercise.weapon.starting,
            startingPosition: exercise.weapon.position,
            ammoWithoutConstraints: exercise.ammunition?.withoutConstraints || 0,
            ammoWithConstraints: exercise.ammunition?.withConstraints || 0,
            magazineChangePA: exercise.ammunition?.magazineChangesPA ? 1 : 0,
            magazineChangeFA: exercise.ammunition?.magazineChangesFA ? 1 : 0,
            magazine1PA: exercise.ammunition?.magazine1PA || 0,
            magazine2PA: exercise.ammunition?.magazine2PA || 0,
            magazine1FA: exercise.ammunition?.magazine1FA || 0,
            magazine2FA: exercise.ammunition?.magazine2FA || 0,
            shooterCount: 1
          }}
        />

        {exercise.constraints && exercise.constraints.length > 0 && (
          <ExerciseConstraints constraints={exercise.constraints} />
        )}

        {exercise.skills && exercise.skills.length > 0 && (
          <ExerciseSkills skills={exercise.skills} />
        )}

        <ExerciseActions 
          onValidate={() => {}}
          onFavorite={() => {}}
          onComment={() => {}}
          onShare={() => {}}
          onRate={() => {}}
          onDownload={onDownload}
          onPrint={onPrint}
        />

        {exercise.audio?.embed && (
          <div className="rounded-xl overflow-hidden shadow-lg">
            <div dangerouslySetInnerHTML={{ __html: exercise.audio.embed }} />
          </div>
        )}
      </div>
    </div>
  );
}