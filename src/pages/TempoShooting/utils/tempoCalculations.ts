export const TOTAL_BEATS = 32;
export const MAX_MISSED_BEATS = 4;
export const MAX_ADVANCE_CLICKS = 2;
export const MIN_TEMPO = 30;
export const MAX_TEMPO = 350;

export function calculateBeatInterval(bpm: number): number {
  return (60 / Math.min(Math.max(bpm, MIN_TEMPO), MAX_TEMPO)) * 1000;
}

export function calculateAccuracy(clickTime: number, expectedTime: number, tolerance: number): number {
  const deviation = Math.abs(clickTime - expectedTime);
  return Math.max(0, 1 - deviation / tolerance);
}

export function calculateStats(clicks: number[], expectedTimes: number[]): number {
  const deviations = clicks.map((click, i) => Math.abs(click - expectedTimes[i]));
  return deviations.reduce((acc, dev) => acc + dev, 0) / deviations.length;
}