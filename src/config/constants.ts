// Constantes globales de l'application
export const APP_NAME = 'CDTARGET';
export const APP_DESCRIPTION = 'Générateur d\'exercices de tir';
export const BASE_URL = 'https://cdtarget.com';

// Configuration des routes
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  EXERCISES: '/exercises',
  SHOOTERS: '/shooters',
  PROFILE: '/profile',
  CHAT: '/chat',
  COURSES: '/courses',
  APPS: '/apps'
} as const;

// Configuration de l'authentification
export const AUTH_CONFIG = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
  SESSION_DURATION: 7 * 24 * 60 * 60 * 1000 // 7 jours
} as const;

// Configuration des exercices
export const EXERCISE_CONFIG = {
  MAX_DIFFICULTY: 61,
  DEFAULT_TIME_LIMIT: 5,
  MIN_SCORE: 0,
  MAX_SCORE: 20
} as const;