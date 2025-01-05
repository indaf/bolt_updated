// Target types
export const TARGET_TYPES = {
  ADAPTIVE_ONE: 'Adaptive One',
  ADAPTIVE_SPEED: 'Adaptive Speed',
  CONSISTENCY_ONE: 'Consistency One',
  CONSISTENCY_TWO: 'Consistency Two',
  CONSISTENCY_THREE: 'Consistency Three',
  SILHOUETTE_ONE: 'Silhouette One',
  SILHOUETTE_TWIN_ALPHA: 'Silhouette Twin Alpha',
  SILHOUETTE_TWIN_BRAVO: 'Silhouette Twin Bravo'
} as const;

// Module types
export const MODULE_TYPES = {
  INITIAL: 'Module initial ⭐',
  ADVANCED: 'Module avancé ⭐⭐',
  EXPERT: 'Module expert ⭐⭐⭐'
} as const;

// Exercise categories
export const EXERCISE_CATEGORIES = {
  MODELS: 'modèles',
  WEEKS: 'semaines',
  MONTHS: 'mois'
} as const;

// Weapon types
export const WEAPON_TYPES = {
  HANDGUN: 'PA',
  RIFLE: 'FA',
  BOTH: 'PA & FA'
} as const;