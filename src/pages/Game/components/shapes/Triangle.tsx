import React from 'react';
import { Color } from '../../types';

interface TriangleProps {
  color: Color;
  size?: 'md' | 'lg';
}

export function Triangle({ color, size = 'md' }: TriangleProps) {
  const colors = {
    red: 'border-b-red-500',
    blue: 'border-b-blue-500',
    green: 'border-b-green-500',
    black: 'border-b-black',
  };

  const sizeClasses = {
    md: 'border-l-[18px] border-r-[18px] border-b-[36px]',
    lg: 'border-l-[24px] border-r-[24px] border-b-[48px]'
  };
  
  return (
    <div 
      className={`w-0 h-0 
        border-l-transparent
        border-r-transparent
        ${sizeClasses[size]} ${colors[color]}`}
    />
  );
}