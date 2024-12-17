import React from 'react';
import { Color } from '../../types';

interface CrossProps {
  color: Color;
}

export function Cross({ color }: CrossProps) {
  const colors = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    black: 'bg-black',
  };
  
  return (
    <div className="relative w-12 h-12">
      <div className={`absolute top-1/2 left-0 w-12 h-3 -mt-1.5 ${colors[color]} rotate-45`} />
      <div className={`absolute top-1/2 left-0 w-12 h-3 -mt-1.5 ${colors[color]} -rotate-45`} />
    </div>
  );
}