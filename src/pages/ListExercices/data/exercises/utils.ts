import { Exercise, ModuleType } from '../../types/Exercise';
import { MODULE_TYPES } from './constants';

export function generateExerciseId(targetType: string, number: number, seriesId: number): number {
  // Create unique IDs by combining series ID with exercise number
  // seriesId ensures different exercise series don't conflict
  return seriesId * 1000 + number;
}

export function createExerciseBase(
  seriesId: number,
  number: number,
  targetType: string,
  moduleType: ModuleType = MODULE_TYPES.INITIAL,
  categories: string[] = ["modèles", "semaines"]
): Partial<Exercise> {
  return {
    id: generateExerciseId(targetType, number, seriesId),
    name: `${targetType} ${String(number).padStart(4, '0')}`,
    module: {
      name: moduleType,
      difficulty: moduleType
    },
    categories,
    target: {
      name: targetType,
      count: 1
    },
    weapon: {
      type: "PA",
      transition: false,
      starting: "Arme de poing",
      position: "Position contact"
    }
  };
}