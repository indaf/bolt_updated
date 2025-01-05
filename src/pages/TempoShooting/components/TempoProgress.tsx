import React from 'react';
import { TempoBar } from './TempoBar';

interface TempoProgressProps {
  currentBeat: number;
  completedBeats: number[];
  onClick: () => void;
}

export function TempoProgress({ currentBeat, completedBeats, onClick }: TempoProgressProps) {
  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: 32 }).map((_, index) => (
        <TempoBar
          key={index}
          index={index}
          currentBeat={currentBeat}
          isCompleted={completedBeats.includes(index)}
          onClick={onClick}
        />
      ))}
    </div>
  );
}