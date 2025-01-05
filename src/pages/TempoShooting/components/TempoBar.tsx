import React from 'react';
import { cn } from '../../../utils/cn';

interface TempoBarProps {
  isPreview: boolean;
  isFlashing: boolean;
  isCurrent: boolean;
  isCompleted: boolean;
}

export function TempoBar({ isPreview, isFlashing, isCurrent, isCompleted }: TempoBarProps) {
  return (
    <div
      className={cn(
        "w-4 h-32 rounded-lg transition-all duration-100",
        isPreview && isFlashing ? "bg-yellow-400" :
        isCurrent ? "bg-[#009B70]" :
        isCompleted ? "bg-[#009B70]" :
        "bg-transparent border border-[#343541]"
      )}
    />
  );
}