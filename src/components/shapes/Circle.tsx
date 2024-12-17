import React from 'react';
import { Color } from '../../types';

interface CircleProps {
  color: Color;
}

export function Circle({ color }: CircleProps) {
  const colors = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    black: 'bg-black',
  };
  
  return <div className={`w-12 h-12 rounded-full ${colors[color]}`} />;
}