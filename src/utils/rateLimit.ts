interface RateLimitEntry {
  count: number;
  firstAttempt: number;
  locked: boolean;
  lockExpiry?: number;
}

const rateLimits = new Map<string, RateLimitEntry>();

export const checkRateLimit = (identifier: string): boolean => {
  const now = Date.now();
  const entry = rateLimits.get(identifier);

  // Si l'entrée n'existe pas, créer une nouvelle
  if (!entry) {
    rateLimits.set(identifier, {
      count: 1,
      firstAttempt: now,
      locked: false
    });
    return true;
  }

  // Si l'entrée est verrouillée, vérifier si le délai est écoulé
  if (entry.locked && entry.lockExpiry) {
    if (now > entry.lockExpiry) {
      // Réinitialiser l'entrée après le délai
      rateLimits.set(identifier, {
        count: 1,
        firstAttempt: now,
        locked: false
      });
      return true;
    }
    return false;
  }

  // Réinitialiser le compteur après 15 minutes
  if (now - entry.firstAttempt > 15 * 60 * 1000) {
    rateLimits.set(identifier, {
      count: 1,
      firstAttempt: now,
      locked: false
    });
    return true;
  }

  // Incrémenter le compteur
  entry.count++;

  // Verrouiller après 5 tentatives
  if (entry.count > 5) {
    entry.locked = true;
    entry.lockExpiry = now + 15 * 60 * 1000; // 15 minutes
    return false;
  }

  return true;
};

export const getRateLimitInfo = (identifier: string): RateLimitEntry | undefined => {
  return rateLimits.get(identifier);
};

export const clearRateLimit = (identifier: string): void => {
  rateLimits.delete(identifier);
};