import React from 'react';
import { Color } from '../../types';

interface TriangleProps {
  color: Color;
}

export function Triangle({ color }: TriangleProps) {
  const colors = {
    red: 'border-b-red-500',
    blue: 'border-b-blue-500',
    green: 'border-b-green-500',
    black: 'border-b-black',
  };
  
  return (
    <div 
      className={`w-0 h-0 
        border-l-[24px] border-l-transparent
        border-r-[24px] border-r-transparent
        border-b-[48px] ${colors[color]}`}
    />
  );
}