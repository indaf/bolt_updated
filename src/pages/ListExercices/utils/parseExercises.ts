import { Exercise, ModuleType, WeaponType } from '../types/Exercise';

export function parseConstraints(row: any): string[] {
  const constraints: string[] = [];
  
  if (row['Anticipation interdite']) constraints.push(row['Anticipation interdite']);
  if (row['Next']) constraints.push(row['Next']);
  if (row['Back']) constraints.push(row['Back']);
  if (row['A, B, C, 1, 2, 3']) constraints.push(row['A, B, C, 1, 2, 3']);
  if (row['Ancre']) constraints.push(row['Ancre']);
  if (row['Sommation']) constraints.push(row['Sommation']);
  if (row['Basse visibilité']) constraints.push(row['Basse visibilité']);
  if (row['Tir en mouvement']) constraints.push(row['Tir en mouvement']);
  
  return constraints.filter(Boolean);
}

export function parseSkills(row: any): Array<{ name: string; description: string; image?: string }> {
  const skills = [];
  
  if (row['Identification d\'objectif']) {
    skills.push({
      name: 'Identification d\'objectif',
      description: row['Identification d\'objectif'],
      image: row['Identification d\'objectif image']
    });
  }
  
  if (row['Spatialisation']) {
    skills.push({
      name: 'Spatialisation',
      description: row['Spatialisation'],
      image: row['Spatialisation image']
    });
  }
  
  if (row['Capacité d\'adaptation']) {
    skills.push({
      name: 'Capacité d\'adaptation',
      description: row['Capacité d\'adaptation'],
      image: row['Capacité d\'adaptation image']
    });
  }

  return skills.filter(skill => skill.description);
}

export function parseExerciseRow(row: any): Exercise {
  return {
    id: parseInt(row['Numéro d\'exercice']),
    name: row['Nom d\'exercice'],
    module: {
      name: row['Nom du module'],
      difficulty: row['Nom du module'] as ModuleType
    },
    images: {
      drill: row['Images exemple\ndrill'],
      target: row['Images du modèle de cible'],
      objective: row['Objectif images']
    },
    objective: row['Consigne de tir'],
    direction: row['Sens de tir'],
    target: {
      name: row['Nom du modèle de cible'],
      count: parseInt(row['Nombre de cible'])
    },
    weapon: {
      type: row['Type d\'arme'] as WeaponType,
      transition: row['Transition\nd\'arme'] === 'Oui',
      starting: row['Première\narme'],
      position: row['Position au départ']
    },
    ammunition: {
      withoutConstraints: parseInt(row['Munition\nsans\ncontraintes']),
      withConstraints: parseInt(row['Munition\navec\ncontraintes']),
      magazineChangesPA: row['Changement\nchargeur\nPA'] === 'Oui',
      magazineChangesFA: row['Changement\nchargeur\nFA'] === 'Oui',
      magazine1PA: parseInt(row['Munition\ndans le chargeur n°1\nPA']) || 0,
      magazine2PA: parseInt(row['Munition\ndans le chargeur n°2\nPA']) || 0,
      magazine1FA: parseInt(row['Munition\ndans le chargeur n°1\nFA']) || 0,
      magazine2FA: parseInt(row['Munition\ndans le chargeur n°2\nFA']) || 0,
      distance: parseInt(row['Distance\nen M'])
    },
    constraints: parseConstraints(row),
    skills: parseSkills(row),
    audio: row['Soundcloud'] ? {
      soundcloud: row['Soundcloud'],
      embed: row['Embed soundcloud']
    } : undefined
  };
}