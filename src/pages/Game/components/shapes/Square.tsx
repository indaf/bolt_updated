import React from 'react';
import { Color } from '../../types';

interface SquareProps {
  color: Color;
  size?: 'md' | 'lg';
}

export function Square({ color, size = 'md' }: SquareProps) {
  const colors = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    black: 'bg-black',
  };

  const sizeClasses = {
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };
  
  return <div className={`${sizeClasses[size]} ${colors[color]}`} />;
}