import React from 'react';
import { cn } from '../../../utils/cn';

interface TempoTargetProps {
  onClick: () => void;
  isActive: boolean;
  isPreview?: boolean;
}

export function TempoTarget({ onClick, isActive, isPreview }: TempoTargetProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "w-32 h-32 rounded-full border-4",
        "cursor-pointer transition-all duration-100",
        "flex items-center justify-center shadow-lg",
        isActive && "scale-105",
        isPreview && "animate-pulse",
        "border-white bg-[#202123]"
      )}
    />
  );
}