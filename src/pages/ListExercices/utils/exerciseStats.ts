import { Exercise, ModuleType } from '../types/Exercise';

export function countExercisesByModule(exercises: Exercise[], moduleType?: ModuleType): number {
  return exercises.filter(ex => !moduleType || ex.module.difficulty === moduleType).length;
}