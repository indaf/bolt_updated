import React from 'react';
import { Color } from '../../types';

interface SquareProps {
  color: Color;
}

export function Square({ color }: SquareProps) {
  const colors = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    black: 'bg-black',
  };
  
  return <div className={`w-12 h-12 ${colors[color]}`} />;
}