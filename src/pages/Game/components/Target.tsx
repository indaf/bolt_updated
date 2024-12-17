import React from 'react';
import { Circle } from './shapes/Circle';
import { Square } from './shapes/Square';
import { Triangle } from './shapes/Triangle';
import { Cross } from './shapes/Cross';
import { targetGrid } from '../constants';
import { Color } from '../types';

interface TargetProps {
  onShot: (position: number) => void;
  currentShots: number[];
  disabled: boolean;
  size?: 'md' | 'lg';
}

export function Target({ onShot, currentShots, disabled, size = 'md' }: TargetProps) {
  const renderShape = (shape: string, color: Color) => {
    switch (shape) {
      case 'circle':
        return <Circle color={color} size={size} />;
      case 'square':
        return <Square color={color} size={size} />;
      case 'triangle':
        return <Triangle color={color} size={size} />;
      case 'cross':
        return <Cross color={color} size={size} />;
      default:
        return null;
    }
  };

  const sizeClasses = {
    md: 'w-[375px]',
    lg: 'w-[450px]'
  };

  return (
    <div className={`${sizeClasses[size]} aspect-square bg-white p-4 rounded-xl shadow-xl`}>
      <div className="grid grid-cols-4 gap-2 h-full">
        {targetGrid.map((cell) => (
          <button
            key={cell.position}
            onClick={() => onShot(cell.position)}
            disabled={disabled || currentShots.includes(cell.position)}
            className={`
              relative aspect-square rounded-lg
              ${currentShots.includes(cell.position) ? 'opacity-50' : ''}
              ${!disabled && !currentShots.includes(cell.position) ? 'hover:bg-gray-50' : ''}
              transition-all duration-200
              flex items-center justify-center
              group
            `}
          >
            <div className="transform group-hover:scale-110 transition-transform duration-200">
              {renderShape(cell.shape, cell.color)}
            </div>
            {currentShots.includes(cell.position) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}