import React from 'react';
import { Exercise } from '../../types/Exercise';

interface ExerciseImagesProps {
  images?: Exercise['images'];
}

export function ExerciseImages({ images }: ExerciseImagesProps) {
  if (!images?.target) return null;

  return (
    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
      <img 
        src={images.target}
        alt="Cible"
        className="w-full h-full object-contain"
      />
    </div>
  );
}