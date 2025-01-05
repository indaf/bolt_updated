import React from 'react';
import { FileText } from 'lucide-react';

interface ExerciseInstructionProps {
  instruction: string;
}

export function ExerciseInstruction({ instruction }: ExerciseInstructionProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl" role="img" aria-label="target">🎯</span>
        <h3 className="text-xl font-bold text-gray-800">Consigne de tir</h3>
      </div>
      <p className="text-gray-600 leading-relaxed">{instruction}</p>
    </div>
  );
}