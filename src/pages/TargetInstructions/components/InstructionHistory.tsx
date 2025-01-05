import React from 'react';
import { Clock } from 'lucide-react';
import { Instruction } from '../types';
import { formatInstruction } from '../utils/instructionUtils';

interface InstructionHistoryProps {
  history: Instruction[];
}

export function InstructionHistory({ history }: InstructionHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#202123] rounded-lg p-8 text-center">
          <p className="text-gray-400">
            Aucune consigne dans l'historique
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#202123] rounded-lg p-6">
        <h2 className="text-xl font-medium text-white mb-6">
          Dernières consignes générées
        </h2>

        <div className="space-y-4">
          {history.map((instruction) => (
            <div
              key={instruction.id}
              className="bg-[#2A2B32] rounded-lg p-4"
            >
              <div className="space-y-2">
                <p className="text-2xl font-bebas tracking-wider text-white">
                  {formatInstruction(instruction, 'direction')}
                </p>
                <p className="text-2xl font-bebas tracking-wider text-white">
                  {formatInstruction(instruction, 'target')}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                <Clock className="w-4 h-4" />
                <span>
                  {new Date(instruction.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}