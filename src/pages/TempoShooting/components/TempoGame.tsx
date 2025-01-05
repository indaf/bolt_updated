import React, { useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { TempoBar } from './TempoBar';
import { TempoTarget } from './TempoTarget';
import { useTempoGame } from '../hooks/useTempoGame';
import { useSound } from '../hooks/useSound';
import { TempoSettings, DEFAULT_SETTINGS } from '../types';
import { TOTAL_BARS } from '../rules/gameRules';

interface TempoGameProps {
  settings?: TempoSettings;
  onGameEnd: (result: any) => void;
}

export function TempoGame({ settings = DEFAULT_SETTINGS, onGameEnd }: TempoGameProps) {
  const { isSoundEnabled, toggleSound } = useSound();
  const {
    phase,
    isFlashing,
    currentBeat,
    completedBeats,
    handleClick
  } = useTempoGame(settings);

  // Keyboard input handler
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'i' || e.key === 'I') {
        handleClick();
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [handleClick]);

  // Game end handler
  useEffect(() => {
    if (phase === 'finished') {
      onGameEnd({
        completedBeats: completedBeats.length,
        accuracy: (completedBeats.length / TOTAL_BARS) * 100,
        tempo: settings.initialTempo
      });
    }
  }, [phase, completedBeats, settings.initialTempo, onGameEnd]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div className="text-lg font-medium text-white">
          {phase === 'preview' ? 'Suivez le rythme...' : 'Cliquez en rythme !'}
        </div>
        <button
          onClick={toggleSound}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          {isSoundEnabled ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="flex flex-col items-center gap-8">
        <div className="flex gap-2 justify-center">
          {Array.from({ length: TOTAL_BARS }).map((_, index) => (
            <TempoBar
              key={index}
              isPreview={phase === 'preview'}
              isFlashing={isFlashing}
              isCurrent={currentBeat === index}
              isCompleted={completedBeats.includes(index)}
            />
          ))}
        </div>

        <TempoTarget
          onClick={handleClick}
          isActive={phase === 'playing'}
          isPreview={phase === 'preview' && isFlashing}
        />
      </div>
    </div>
  );
}