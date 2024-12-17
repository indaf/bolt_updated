import React, { useState, useCallback, useEffect } from "react";
import { Timer } from "./components/Timer";
import { Target } from "./components/Target";
import { Results } from "./components/Results";
import { Countdown } from "./components/Countdown";
import { getRandomInstruction, getExpectedSequence } from "./utils";
import { GameState } from "./types";
import { createGameScore } from "../../services/GameScore/gameScore.service";
import { notifyError } from "../../helpers/Notify.helper";

export function GameComponent() {
  const [gameState, setGameState] = useState<GameState>("waiting");
  const [currentShots, setCurrentShots] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(5);
  const [maxTime, setMaxTime] = useState(5);
  const [instruction, setInstruction] = useState(getRandomInstruction());
  const [countdown, setCountdown] = useState(3);
  const [expectedSequence, setExpectedSequence] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [scoreFinal, setScoreFinal] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const startGame = useCallback(() => {
    const newInstruction = getRandomInstruction();
    setInstruction(newInstruction);
    setExpectedSequence(
      getExpectedSequence(newInstruction.direction, newInstruction.target)
    );
    setGameState("countdown");
    setCountdown(3);
    setCurrentShots([]);
    setTimeLeft(maxTime);
  }, [maxTime]);

  const handleShot = useCallback(
    (position: number) => {
      if (gameState === "playing") {
        setCurrentShots((prev) => [...prev, position]);
      }
    },
    [gameState]
  );

  useEffect(() => {
    if (currentShots.length === 4) {
      setGameState("finished");
      const duration = +(maxTime - timeLeft).toFixed(1);
      const correct = currentShots.filter(
        (shot: any, index) => shot === expectedSequence[index]
      ).length;
      const score = Math.max(0, correct * 25);
      const timePenalty = +((duration - 1) / 0.1).toFixed(1);
      setScoreFinal(+(score - timePenalty).toFixed(1));
      setScore(score);
      setDuration(duration);
      setShowResults(true);
      saveScore();
    }
  }, [currentShots]);

  const saveScore = () => {
    const duration = +(maxTime - timeLeft).toFixed(1);
    const correct = currentShots.filter(
      (shot: any, index) => shot === expectedSequence[index]
    ).length;
    const score = Math.max(0, correct * 25);
    const timePenalty = +((duration - 1) / 0.1).toFixed(1);

    createGameScore({
      game: "adaptive",
      score: +(score - timePenalty).toFixed(1),
      data: {
        sequence: currentShots.join(","),
        instruction: instruction.text,
        direction: instruction.direction,
        target: instruction.target,
        expected_sequence: expectedSequence.join(","),
        error: 4 - correct,
        duration: duration,
        timePenalty: timePenalty,
        baseScore: score,
        timeAllowed: maxTime,
      },
    })
      .then((response: any) => {})
      .catch((error: any) => {
        console.log(error);
        notifyError("Erreur lors de l'enregistrement du score");
      });
  };

  useEffect(() => {
    let timer: number;
    if (gameState === "countdown" && countdown > 0) {
      timer = window.setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (gameState === "countdown" && countdown === 0) {
      setGameState("playing");
    }
    return () => clearTimeout(timer);
  }, [countdown, gameState]);

  useEffect(() => {
    let timer: number;
    if (gameState === "playing" && timeLeft > 0) {
      timer = window.setTimeout(() => setTimeLeft(timeLeft - 0.1), 100);
    } else if (gameState === "playing" && timeLeft <= 0) {
      setGameState("finished");

      const duration = +(maxTime - timeLeft).toFixed(1);
      const correct = currentShots.filter(
        (shot: any, index) => shot === expectedSequence[index]
      ).length;
      const score = Math.max(0, correct * 25);
      const timePenalty = +((duration - 1) / 0.1).toFixed(1);
      setScoreFinal(+(score - timePenalty).toFixed(1));
      setScore(score);
      setDuration(duration);
      setShowResults(true);
      saveScore();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameState]);

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)] max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4 flex-col md:flex-row">
          <Timer timeLeft={timeLeft} gameState={gameState} />
          <div className="h-8">
            {(gameState === "waiting" || gameState === "finished") && (
              <button
                onClick={startGame}
                className="h-full px-4 bg-[#009B70] hover:bg-[#007B56] text-white text-sm rounded-lg
                         flex items-center gap-2 transition-colors"
              >
                Débuter une partie
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 ml-0 md:ml-auto">
            <span className="text-sm text-gray-400">Temps limite:</span>
            <input
              type="range"
              min="1"
              max="10"
              value={maxTime}
              onChange={(e) => setMaxTime(Number(e.target.value))}
              disabled={gameState !== "waiting" && gameState !== "finished"}
              className="w-32 accent-[#009B70]"
            />
            <span className="text-sm font-medium w-6">{maxTime}s</span>
          </div>
        </div>
        {(gameState === "playing" || gameState === "countdown") &&
          instruction && (
            <div className="flex justify-center mb-4">
              <div className="text-xl font-medium text-white bg-[#202123] px-6 py-3 rounded-xl">
                {instruction.text}
              </div>
            </div>
          )}
      </div>

      <div className="flex-1 flex items-center justify-center relative">
        <Target
          onShot={handleShot}
          currentShots={currentShots}
          disabled={gameState !== "playing"}
          size="lg"
        />
        {gameState === "countdown" && <Countdown value={countdown} />}
      </div>

      {showResults && (
        <Results
          shots={currentShots}
          expectedSequence={expectedSequence}
          onClose={() => {
            setShowResults(false);
            setGameState("waiting");
          }}
          scoreFinal={scoreFinal}
        />
      )}
    </div>
  );
}
