import React, { useState, useEffect, useCallback, useRef } from "react";
import { Clock } from "lucide-react";
import { preloadImgs } from "../../../helpers/Object.helper";
import useInterval from "../../../hooks/useInterval.hook";

interface GameProps {
  settings: any;
  onGameEnd: (result: any) => void;
  onRetry: () => void;
  onConfigure: () => void;
  images: any[];
}

const INITIAL_COUNTDOWN = 5;

export function Game({
  settings,
  onGameEnd,
  onRetry,
  onConfigure,
  images,
}: GameProps) {
  const currentTarget = useRef<any | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(INITIAL_COUNTDOWN);
  const [stats, setStats] = useState({
    correct: 0,
    incorrect: 0,
    missedThreats: 0,
    falseAlarms: 0,
    images: [] as Array<any>,
    reactionTimes: [] as number[],
    processedImages: 0,
  });
  const start = useRef<number>(0);
  const [remainingTargets, setRemainingTargets] = useState<any[]>([]);
  const [hasSendScore, setHasSendScore] = useState(false);
  const [gamePhase, setGamePhase] = useState<
    "initial-countdown" | "playing" | "failed" | "failed-civil"
  >("initial-countdown");
  const phase = useRef<
    "initial-countdown" | "playing" | "failed" | "failed-civil"
  >("initial-countdown");
  const [timer, setTimer] = useState<number>(INITIAL_COUNTDOWN);

  const shuffleAndFilterTargets = useCallback(() => {
    const threatCount = Math.round(
      (settings.imagesCount * settings.threatRatio) / 100
    );
    const nonThreatCount = settings.imagesCount - threatCount;

    const threats = images.filter((t) => t.is_threat).slice(0, threatCount);
    const nonThreats = images
      .filter((t) => !t.is_threat)
      .slice(0, nonThreatCount);
    return [...threats, ...nonThreats].sort(() => Math.random() - 0.5);
  }, [settings]);

  useEffect(() => {
    setRemainingTargets(shuffleAndFilterTargets());
    start.current = Date.now();
  }, [shuffleAndFilterTargets]);

  const handleRestart = () => {
    currentTarget.current.current(null);
    setTimeLeft(INITIAL_COUNTDOWN);
    setStats({
      correct: 0,
      incorrect: 0,
      missedThreats: 0,
      falseAlarms: 0,
      reactionTimes: [],
      images: [],
      processedImages: 0,
    });
    setHasSendScore(false);
    setGamePhase("initial-countdown");
    phase.current = "initial-countdown";
    setTimer(INITIAL_COUNTDOWN);
    setRemainingTargets(shuffleAndFilterTargets());
    start.current = Date.now();
  };

  const handleShot = (shoot: boolean) => {
    if (!currentTarget.current || phase.current !== "playing") return;
    const reactionTime = (Date.now() - start.current) / 1000;

    if (shoot == currentTarget.current.is_threat) {
      setStats((prev) => ({
        ...prev,
        correct: prev.correct + 1,
        images: [
          ...prev.images,
          {
            image: currentTarget.current.id,
            missed: false,
            time: reactionTime,
          },
        ],
        reactionTimes: [...prev.reactionTimes, reactionTime],
        processedImages: prev.processedImages + 1,
      }));
    } else {
      setStats((prev) => ({
        ...prev,
        incorrect: prev.incorrect + 1,
        [shoot ? "falseAlarms" : "missedThreats"]:
          prev[shoot ? "falseAlarms" : "missedThreats"] + 1,
        images: [
          ...prev.images,
          { image: currentTarget.current.id, missed: true, time: reactionTime },
        ],
        processedImages: prev.processedImages + 1,
      }));
    }
    nextTarget();
  };

  useInterval(() => {
    if ((Date.now() - start.current) / 1000 > timeLeft) {
      if (gamePhase === "initial-countdown") {
        setGamePhase("playing");
        phase.current = "playing";
        // }
        // else if (gamePhase === "playing" && currentTarget?.is_threat) {
        // setGamePhase("failed");
      } else if (gamePhase === "playing") {
        handleTimeout();
      }
    } else {
      if (stats.processedImages < images.length) {
        setTimer((Date.now() - start.current) / 1000);
      }
    }
  }, 10);

  useEffect(() => {
    if (stats.processedImages >= images.length && !hasSendScore) {
      const averageReactionTime =
        stats.reactionTimes.reduce((a, b) => a + b, 0) /
        stats.reactionTimes.length;
      setHasSendScore(true);
      onGameEnd({
        correct: stats.correct,
        incorrect: stats.incorrect,
        missedThreats: stats.missedThreats,
        falseAlarms: stats.falseAlarms,
        averageReactionTime,
        timestamp: Date.now(),
        images: stats.images,
      });
      return;
    }

    if (remainingTargets.length > 0 && gamePhase === "playing") {
      currentTarget.current = remainingTargets[0];
      setTimeLeft(settings.timeLimit);
      setTimer(settings.timeLimit);
      start.current = Date.now();
    }
  }, [remainingTargets, stats.processedImages, gamePhase]);

  const handleTimeout = () => {
    if (!currentTarget) return;

    if (currentTarget.current.is_threat) {
      if (stats.processedImages < images.length) {
        setStats((prev) => ({
          ...prev,
          images: [
            ...prev.images,
            { image: currentTarget.current.id, missed: true, time: 0 },
          ],
          missedThreats: prev.missedThreats + 1,
          incorrect: prev.incorrect + 1,
          processedImages: prev.processedImages + 1,
        }));
        nextTarget();
      }
    } else {
      if (stats.processedImages < images.length) {
        setStats((prev) => ({
          ...prev,
          images: [
            ...prev.images,
            { image: currentTarget.current.id, missed: false, time: 0 },
          ],
          correct: prev.correct + 1,
          processedImages: prev.processedImages + 1,
        }));
      }
      nextTarget();
    }
  };

  const nextTarget = () => {
    setRemainingTargets((prev) => prev.slice(1));
  };

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === "i") {
      handleShot(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  if (gamePhase === "failed" || gamePhase === "failed-civil") {
    return (
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-4xl font-bold text-red-500 mb-8">ÉCHEC</h2>
        <p className="text-lg text-gray-300 mb-8">
          {gamePhase === "failed"
            ? "Vous n'avez pas neutralisé la menace à temps."
            : "Vous avez neutralisé un civil."}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-[#009B70] text-white rounded-lg hover:bg-[#007B56] transition-colors"
          >
            Recommencer
          </button>
          <button
            onClick={onConfigure}
            className="px-6 py-3 bg-[#343541] text-white rounded-lg hover:bg-[#3E3F4B] transition-colors"
          >
            Configurer
          </button>
        </div>
      </div>
    );
  }

  // if (!currentTarget) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4 flex justify-between items-center flex-col md:flex-row">
        <div className="flex items-center gap-2 text-white">
          <Clock className="w-5 h-5" />
          <span className="text-xl font-medium">
            {(timeLeft - timer).toFixed(1)}s
          </span>
        </div>
        <div className="text-sm text-gray-400">
          Image {stats.processedImages + 1} sur {images.length}
        </div>
        <div className="text-sm text-gray-400 text-center">
          Cliquez sur l'image ou appuyez sur la touche "i" pour tirer
        </div>
      </div>
      <div
        className={`relative aspect-video bg-black rounded-lg overflow-hidden cursor-pointer ${
          gamePhase === "initial-countdown" ? "pointer-events-none" : ""
        }`}
        onClick={() =>
          gamePhase === "initial-countdown" ? null : handleShot(true)
        }
      >
        {gamePhase !== "initial-countdown" && currentTarget.current && (
          <img
            src={
              import.meta.env.VITE_SERVICE_API_URL + currentTarget.current.url
            }
            alt="Target"
            className="w-full h-full object-contain"
          />
        )}
        {gamePhase === "initial-countdown" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="text-8xl font-bold text-white animate-pulse mb-4">
              {Math.ceil(timeLeft - timer)}
            </div>
            <div className="text-xl text-white">
              Traitez les individus menaçants
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
