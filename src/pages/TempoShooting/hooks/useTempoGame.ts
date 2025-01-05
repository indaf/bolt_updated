import { useState, useCallback, useRef, useEffect } from "react";
import { TempoSettings, DEFAULT_SETTINGS } from "../types";
import { useSound } from "./useSound";
import { TOTAL_BARS, calculateBeatInterval } from "../rules/gameRules";

export function useTempoGame(settings: TempoSettings = DEFAULT_SETTINGS) {
  const tempo = settings.initialTempo;
  const [phase, setPhase] = useState<"preview" | "playing" | "finished">(
    "preview"
  );
  const [isFlashing, setIsFlashing] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [completedBeats, setCompletedBeats] = useState<number[]>([]);
  const { playMetronomeSound } = useSound();

  const intervalRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef(0);
  const beatInterval = calculateBeatInterval(tempo);
  const lastClickedBeatRef = useRef(-1);
  const missedBeats = useRef<number[]>([]);
  const [message, setMessage] = useState("");

  const handleClick = useCallback(() => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTimeRef.current;
    const beatTime = currentBeat * beatInterval;
    if (phase === "preview") {
      setPhase("playing");
      setCurrentBeat(0);
      startTimeRef.current = Date.now();
      return;
    }
    if (phase === "playing") {
      if (
        (elapsedTime > beatTime - beatInterval / 4 ||
          elapsedTime < beatTime + beatInterval) &&
        lastClickedBeatRef.current !== currentBeat &&
        !missedBeats.current.includes(currentBeat)
      ) {
        if (!completedBeats.includes(currentBeat)) {
          playMetronomeSound();
          setCompletedBeats((prev) => [...prev, currentBeat]);
          lastClickedBeatRef.current = currentBeat;
        }
      } else {
        if (lastClickedBeatRef.current !== currentBeat) {
          missedBeats.current = [...missedBeats.current, currentBeat];
        } else {
          missedBeats.current = [...missedBeats.current, currentBeat + 1];
        }
      }
      lastClickedBeatRef.current = currentBeat;
    }
  }, [phase, currentBeat, beatInterval, playMetronomeSound]);

  // Preview phase effect
  useEffect(() => {
    if (phase === "preview") {
      const flashInterval = setInterval(() => {
        setIsFlashing(true);
        playMetronomeSound();

        setTimeout(() => {
          setIsFlashing(false);
        }, 100);
      }, beatInterval);

      return () => clearInterval(flashInterval);
    }
  }, [phase, beatInterval, playMetronomeSound]);

  // Playing phase effect
  useEffect(() => {
    if (phase === "playing") {
      const updateBeat: any = () => {
        const currentTime = Date.now();
        const elapsedBeats = Math.floor(
          (currentTime - startTimeRef.current) / beatInterval
        );
        const nextBeat = elapsedBeats % TOTAL_BARS;

        setCurrentBeat(nextBeat);

        if (elapsedBeats >= TOTAL_BARS) {
          setPhase("finished");
        } else {
          requestAnimationFrame(updateBeat);
        }
      };

      requestAnimationFrame(updateBeat);

      return () => cancelAnimationFrame(updateBeat);
    }
  }, [phase, beatInterval]);

  return {
    phase,
    isFlashing,
    currentBeat,
    completedBeats,
    handleClick,
  };
}
