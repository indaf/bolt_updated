import React from 'react';

interface CountdownProps {
  value: number;
}

export function Countdown({ value }: CountdownProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/50 backdrop-blur-sm rounded-2xl">
      <div className="text-8xl font-bold text-white animate-pulse">
        {value}
      </div>
    </div>
  );
}