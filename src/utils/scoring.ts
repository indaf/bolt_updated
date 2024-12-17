import { Exercise } from '../types/exercise';

export interface ExerciseScore {
  total: number;
  details: {
    miss: number;
    out: number;
    time: number;
    gesture: number;
    sequence: number;
    safety: number;
  };
  level: 'excellent' | 'good' | 'average' | 'needsImprovement';
  penalties: {
    miss: number[];
    out: number[];
    time: number;
    gesture: boolean;
    sequence: boolean;
    safety: boolean;
  };
}

export function calculateScore(exercise: Exercise, result: {
  miss: number;
  out: number;
  time: number;
  gesture: 'yes' | 'no';
  sequence: 'yes' | 'no';
  safety: 'yes' | 'no';
  idealTime?: number;
}): ExerciseScore {
  let score = 20;
  const penalties = {
    miss: [] as number[],
    out: [] as number[],
    time: 0,
    gesture: false,
    sequence: false,
    safety: false
  };

  // Pénalités pour les Miss (-2 points par impact)
  const missPenalty = result.miss * 2;
  score -= missPenalty;
  for (let i = 0; i < result.miss; i++) {
    penalties.miss.push(-2);
  }

  // Pénalités pour les Out (-10 points par impact)
  const outPenalty = result.out * 10;
  score -= outPenalty;
  for (let i = 0; i < result.out; i++) {
    penalties.out.push(-10);
  }

  // Pénalités pour le temps (-2 points par seconde supplémentaire)
  const idealTime = result.idealTime || 5; // Temps idéal par défaut
  if (result.time > idealTime) {
    const timePenalty = Math.floor((result.time - idealTime) * 2);
    score -= timePenalty;
    penalties.time = timePenalty;
  }

  // Pénalité pour la gestuelle (-3 points)
  if (result.gesture === 'no') {
    score -= 3;
    penalties.gesture = true;
  }

  // Pénalité pour le non-respect des consignes (-3 points)
  if (result.sequence === 'no') {
    score -= 3;
    penalties.sequence = true;
  }

  // Pénalité pour le non-respect des règles de sécurité (-10 points)
  if (result.safety === 'no') {
    score -= 10;
    penalties.safety = true;
  }

  // Limiter le score minimum à 0
  score = Math.max(0, score);

  // Déterminer le niveau
  let level: ExerciseScore['level'];
  if (score === 20) {
    level = 'excellent';
  } else if (score >= 15) {
    level = 'good';
  } else if (score >= 10) {
    level = 'average';
  } else {
    level = 'needsImprovement';
  }

  return {
    total: score,
    details: {
      miss: missPenalty,
      out: outPenalty,
      time: penalties.time,
      gesture: penalties.gesture ? -3 : 0,
      sequence: penalties.sequence ? -3 : 0,
      safety: penalties.safety ? -10 : 0
    },
    level,
    penalties
  };
}

export function getScoreColor(score: number): string {
  if (score === 20) return 'text-green-500';
  if (score >= 15) return 'text-blue-500';
  if (score >= 10) return 'text-yellow-500';
  return 'text-red-500';
}

export function getLevelLabel(level: ExerciseScore['level']): string {
  switch (level) {
    case 'excellent':
      return 'Excellente performance';
    case 'good':
      return 'Bonne performance';
    case 'average':
      return 'Performance moyenne';
    case 'needsImprovement':
      return 'Doit s\'améliorer';
  }
}