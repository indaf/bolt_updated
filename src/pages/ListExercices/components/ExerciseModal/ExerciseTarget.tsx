import React from 'react';

interface ExerciseTargetProps {
  imageUrl: string;
}

export function ExerciseTarget({ imageUrl }: ExerciseTargetProps) {
  return (
    <div className="mb-6">
      <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-gray-100">
        <img 
          src={imageUrl} 
          alt="Target"
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
    </div>
  );
}