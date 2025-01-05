import React, { useState } from 'react';
import { useTempoGame } from '../../hooks/useTempoGame';
import { useSound } from '../../hooks/useSound';
import { TempoTarget } from './TempoTarget';
import { TempoProgress } from './TempoProgress';
import { TempoControls } from './TempoControls';
import { TempoStatus } from './TempoStatus';

const defaultSettings = {
  mode: 'fixed' as const,
  initialTempo: 120,
  countdownDuration: 3
};

export const TempoGame = () => {
  const [settings] = useState(defaultSettings);
  const { isSoundEnabled, toggleSound } = useSound();
  const {
    status,
    currentBeat,
    previewBeat,
    completedBeats,
    isPreviewMode,
    handleClick,
    resetGame,
    startGame
  } = useTempoGame(settings);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <TempoStatus 
        status={status} 
        isSoundEnabled={isSoundEnabled}
        onToggleSound={toggleSound}
      />

      <div className="flex flex-col items-center gap-8">
        <TempoTarget
          onClick={handleClick}
          isActive={currentBeat !== -1}
          isPreview={isPreviewMode && previewBeat !== -1}
        />

        <TempoProgress
          currentBeat={currentBeat}
          completedBeats={completedBeats}
          onClick={handleClick}
        />

        <TempoControls
          onReset={resetGame}
          onStart={startGame}
          disabled={status === 'playing'}
        />
      </div>
    </div>
  );
};