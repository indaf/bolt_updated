import { useMemo } from 'react';
import { POST_CONSTANTS } from '../constants';

export function usePostValidation() {
  const validateTextPost = (text: string) => {
    const errors: string[] = [];
    
    if (!text.trim()) {
      errors.push('Le texte ne peut pas être vide');
    }
    if (text.length > POST_CONSTANTS.MAX_TEXT_LENGTH) {
      errors.push(`Le texte ne peut pas dépasser ${POST_CONSTANTS.MAX_TEXT_LENGTH} caractères`);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const validateMediaPost = (medias: File[], description: string) => {
    const errors: string[] = [];
    
    if (medias.length === 0) {
      errors.push('Au moins un média est requis');
    }
    if (description && description.length > POST_CONSTANTS.MAX_TEXT_LENGTH) {
      errors.push(`La description ne peut pas dépasser ${POST_CONSTANTS.MAX_TEXT_LENGTH} caractères`);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  return {
    validateTextPost,
    validateMediaPost
  };
}