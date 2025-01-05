import React from 'react';

interface ExerciseImageProps {
  src?: string;
  alt: string;
}

export function ExerciseImage({ src, alt }: ExerciseImageProps) {
  return (
    <div className="relative w-full aspect-square bg-gray-100">
      {src ? (
        <img 
          src={src} 
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          No image available
        </div>
      )}
    </div>
  );
}