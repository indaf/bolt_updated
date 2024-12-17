import { useState, useCallback, useEffect } from 'react';
import { GameState } from '../types';
import { getRandomInstruction, getExpectedSequence } from '../utils';

export function useGameState(maxTime: number) {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [currentShots, setCurrentShots] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(5);
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
      setCurrentShots(prev => [...prev, position]);
    }
  }, [gameState]);

  return {
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
  };
}