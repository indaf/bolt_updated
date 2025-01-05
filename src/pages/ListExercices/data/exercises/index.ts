import { Exercise } from '../../types/Exercise';
import { consistencyOneExercises } from './consistencyOne';
import { consistencyTwoExercises } from './consistencyTwo';
import { consistencyThreeExercises } from './consistencyThree';
import { adaptiveOneExercises } from './adaptiveOne';
import { adaptiveSpeedExercises } from './adaptiveSpeed';
import { silhouetteOneExercises } from './silhouetteOne';
import { silhouetteTwinAlphaExercises } from './silhouetteTwinAlpha';
import { silhouetteTwinBravoExercises } from './silhouetteTwinBravo';

// Distribution équilibrée des exercices entre les modules
const distributeModules = (exercises: Exercise[]): Exercise[] => {
  return exercises.map((exercise) => {
    // Garder certains exercices en module initial
    if (exercise.id <= 10) {
      return {
        ...exercise,
        module: {
          name: "Module initial ⭐",
          difficulty: "Module initial ⭐"
        }
      };
    }
    // Répartir le reste entre avancé et expert
    else if (exercise.id % 2 === 0) {
      return {
        ...exercise,
        module: {
          name: "Module avancé ⭐⭐",
          difficulty: "Module avancé ⭐⭐"
        }
      };
    } else {
      return {
        ...exercise,
        module: {
          name: "Module expert ⭐⭐⭐",
          difficulty: "Module expert ⭐⭐⭐"
        }
      };
    }
  });
};

export const exercises: Exercise[] = distributeModules([
  ...consistencyOneExercises,
  ...consistencyTwoExercises,
  ...consistencyThreeExercises,
  ...adaptiveOneExercises,
  ...adaptiveSpeedExercises,
  ...silhouetteOneExercises,
  ...silhouetteTwinAlphaExercises,
  ...silhouetteTwinBravoExercises
]);

export const getExercisesByCategory = (category: string) => {
  return exercises.filter(exercise => exercise.categories.includes(category as any));
};

export const getExercisesByModule = (moduleName: string) => {
  return exercises.filter(exercise => exercise.module.name === moduleName);
};