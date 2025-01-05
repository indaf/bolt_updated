export type TempoMode = 'fixed';
export type TempoStatus = 'waiting' | 'countdown' | 'playing' | 'finished' | 'failed';

export interface TempoSettings {
  mode: TempoMode;
  initialTempo: number;
  countdownDuration: number;
}

export interface TempoStats {
  accuracy: number;
  totalBeats: number;
  successfulBeats: number;
  averageDeviation: number;
}