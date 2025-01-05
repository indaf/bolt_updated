export type TempoMode = 'fixed';
export type TempoStatus = 'waiting' | 'countdown' | 'playing' | 'finished' | 'failed';

export interface TempoSettings {
  mode: TempoMode;
  initialTempo: number;
  countdownDuration: number;
}

export const DEFAULT_SETTINGS: TempoSettings = {
  mode: 'fixed',
  initialTempo: 120,
  countdownDuration: 3
};