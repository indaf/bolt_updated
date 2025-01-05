export const TOTAL_BARS = 32;
export const MIN_BPM = 30;
export const MAX_BPM = 350;

export const calculateBeatInterval = (bpm: number): number => {
  const clampedBpm = Math.max(MIN_BPM, Math.min(MAX_BPM, bpm));
  return (60 / clampedBpm) * 1000;
};

export const isValidClick = (clickTime: number, expectedTime: number, tolerance: number): boolean => {
  return Math.abs(clickTime - expectedTime) <= tolerance;
};