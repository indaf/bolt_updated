import React, { useState, useCallback, useEffect } from 'react';
import { Timer } from './Timer';
import { Target } from './Target';
import { Results } from './Results';
import { Countdown } from './Countdown';
import { getRandomInstruction, getExpectedSequence } from '../utils/gameUtils';
import { GameState } from '../types';

export function Game() {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [currentShots, setCurrentShots] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(5);
  const [maxTime, setMaxTime] = useState(5);
  const [instruction, setInstruction] = useState(getRandomInstruction());
  const [countdown, setCountdown] = useState(3);
  const [expectedSequence, setExpectedSequence] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const startGame = useCallback(() => {
    const newInstruction = getRandomInstruction();
    setInstruction(newInstruction);
    setExpectedSequence(getExpectedSequence(newInstruction.direction, newInstruction.target));
    setGameState('countdown');
    setCountdown(3);
    setCurrentShots([]);
    setTimeLeft(maxTime);
  }, [maxTime]);

  const handleShot = useCallback((position: number) => {
    if (gameState === 'playing') {
      setCurrentShots((prev) => [...prev, position]);
    }
  }, [gameState]);

  useEffect(() => {
    if (currentShots.length === 4) {
      setGameState('finished');
      setShowResults(true);
    }
  }, [currentShots]);

  useEffect(() => {
    let timer: number;
    if (gameState === 'countdown' && countdown > 0) {
      timer = window.setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (gameState === 'countdown' && countdown === 0) {
      setGameState('playing');
    }
    return () => clearTimeout(timer);
  }, [countdown, gameState]);

  useEffect(() => {
    let timer: number;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = window.setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (gameState === 'playing' && timeLeft === 0) {
      setGameState('finished');
      setShowResults(true);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameState]);

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)] max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Timer timeLeft={timeLeft} gameState={gameState} />
          <div className="h-8">
            {(gameState === 'waiting' || gameState === 'finished') && (
              <button
                onClick={startGame}
                className="h-full px-4 bg-[#009B70] hover:bg-[#007B56] text-white text-sm rounded-lg
                         flex items-center gap-2 transition-colors"
              >
                Commencer
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-gray-400">Temps limite:</span>
            <input
              type="range"
              min="1"
              max="10"
              value={maxTime}
              onChange={(e) => setMaxTime(Number(e.target.value))}
              disabled={gameState !== 'waiting' && gameState !== 'finished'}
              className="w-32 accent-[#009B70]"
            />
            <span className="text-sm font-medium w-6">{maxTime}s</span>
          </div>
        </div>
        {(gameState === 'playing' || gameState === 'countdown') && instruction && (
          <div className="text-xl font-medium text-white bg-[#202123] px-6 py-3 rounded-xl text-center">
            {instruction.text}
          </div>
        )}
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