import React, { useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import { Instruction } from "../types";
import {
  generateInstruction,
  formatInstruction,
  speakInstruction,
} from "../utils/instructionUtils";

interface GeneratorProps {
  onNewInstruction: (instruction: Instruction) => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
}

export function Generator({
  onNewInstruction,
  isSoundEnabled,
  onToggleSound,
}: GeneratorProps) {
  const [currentInstruction, setCurrentInstruction] =
    useState<Instruction | null>(null);

  const handleGenerate = () => {
    const instruction = generateInstruction();
    console.log(instruction);
    setCurrentInstruction(instruction);
    onNewInstruction(instruction);

    if (isSoundEnabled) {
      speakInstruction(instruction);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#202123] rounded-lg p-8">
        <div className="flex justify-end mb-8">
          <button
            onClick={onToggleSound}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            {isSoundEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="text-center mb-8">
          {currentInstruction ? (
            <div className="space-y-4">
              <p className="text-5xl font-bebas tracking-wider text-white">
                {formatInstruction(currentInstruction, "direction")}
              </p>
              <p className="text-5xl font-bebas tracking-wider text-white">
                {formatInstruction(currentInstruction, "target")}
              </p>
            </div>
          ) : (
            <p className="text-xl text-gray-400">
              Cliquez sur le bouton pour générer une consigne
            </p>
          )}
        </div>

        <button
          onClick={handleGenerate}
          className="w-full px-6 py-4 bg-[#009B70] text-white rounded-lg
                   hover:bg-[#007B56] transition-colors text-lg font-medium
                   flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5" />
          Générer une consigne
        </button>
      </div>
    </div>
  );
}
