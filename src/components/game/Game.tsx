import React, { useState } from 'react';
import { Target } from './components/Target';
import { Results } from './components/Results';
import { Countdown } from './components/Countdown';
import { GameControls } from './components/GameControls';
import { GameInstruction } from './components/GameInstruction';
import { useGameState } from './hooks/useGameState';
import { useGameTimer } from './hooks/useGameTimer';

export function Game() {
  const [maxTime, setMaxTime] = useState(5);
  const {
    gameState,
    setGameState,
    currentShots,
    timeLeft,
    setTimeLeft,
    instruction,
    countdown,
    setCountdown,
    expectedSequence,
    showResults,
    setShowResults,
    startGame,
    handleShot
  } = useGameState(maxTime);

  const handleTimeout = () => {
    setGameState('finished');
    setShowResults(true);
  };

  useGameTimer({
    gameState,
    timeLeft,
    setTimeLeft,
    setGameState,
    countdown,
    setCountdown,
    handleTimeout
  });

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)] max-w-2xl mx-auto">
      <div className="mb-8">
        <GameControls
          timeLeft={timeLeft}
          gameState={gameState}
          maxTime={maxTime}
          setMaxTime={setMaxTime}
          onStart={startGame}
        />
        
        <GameInstruction 
          instruction={instruction}
          gameState={gameState}
        />
      </div>

      <div className="flex-1 flex items-center justify-center relative">
        <Target
          onShot={handleShot}
          currentShots={currentShots}
          disabled={gameState !== 'playing'}
        />
        {gameState === 'countdown' && (
          <Countdown value={countdown} />
        )}
      </div>

      {showResults && (
        <Results
          shots={currentShots}
          expectedSequence={expectedSequence}
          onClose={() => {
            setShowResults(false);
            setGameState('waiting');
          }}
        />
      )}
    </div>
  );
}