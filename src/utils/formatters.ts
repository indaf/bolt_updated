import { format, formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatDate = (date: number | Date): string => {
  return format(date, 'dd/MM/yyyy', { locale: fr });
};

export const formatDateTime = (date: number | Date): string => {
  return format(date, 'dd/MM/yyyy HH:mm', { locale: fr });
};

export const formatTimeAgo = (date: number | Date): string => {
  return formatDistance(date, new Date(), { 
    addSuffix: true,
    locale: fr 
  });
};

export const formatScore = (score: number): string => {
  return score.toFixed(1);
};

export const formatTime = (seconds: number): string => {
  return `${seconds.toFixed(1)}s`;
};

export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};