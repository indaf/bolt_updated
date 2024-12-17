import { useEffect } from 'react';
import { GameState } from '../types';

interface UseGameTimerProps {
  gameState: GameState;
  timeLeft: number;
  setTimeLeft: (time: number) => void;
  setGameState: (state: GameState) => void;
  countdown: number;
  setCountdown: (count: number) => void;
  handleTimeout: () => void;
}

export function useGameTimer({
  gameState,
  timeLeft,
  setTimeLeft,
  setGameState,
  countdown,
  setCountdown,
  handleTimeout
}: UseGameTimerProps) {
  useEffect(() => {
    const timer = setInterval(() => {
      if (gameState === 'countdown' && countdown > 0) {
        setCountdown(countdown - 1);
      } else if (gameState === 'countdown' && countdown === 0) {
        setGameState('playing');
      } else if (gameState === 'playing' && timeLeft > 0) {
        setTimeLeft(timeLeft - 0.1);
      } else if (gameState === 'playing' && timeLeft <= 0) {
        handleTimeout();
      }
    }, 100);

    return () => clearInterval(timer);
  }, [gameState, countdown, timeLeft]);
}