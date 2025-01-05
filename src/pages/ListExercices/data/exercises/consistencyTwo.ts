import { Exercise } from '../../types/Exercise';

export const consistencyTwoExercises: Exercise[] = [
  {
    id: 12,
    name: "Cible Consistency Two - Exercice 0001",
    module: {
      name: "Module initial",
      difficulty: "Module initial ⭐"
    },
    categories: ["modèles", "semaines"],
    target: {
      name: "Consistency Two",
      count: 1
    },
    weapon: {
      type: "PA",
      transition: false,
      starting: "Arme de poing",
      position: "Position contact"
    },
    objective: "Sur la ligne 1, tirer 1 munition par élément.",
    direction: "De la gauche vers la droite.",
    images: {
      drill: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      target: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
    },
    ammunition: {
      withoutConstraints: 3,
      withConstraints: 3,
      magazineChangesPA: false,
      magazineChangesFA: false,
      magazine1PA: 3,
      magazine2PA: 0,
      magazine1FA: 0,
      magazine2FA: 0,
      distance: 5
    }
  }
];