import { Exercise, ModuleType, ExerciseCategory } from '../types/Exercise';

export function filterExercisesByModule(exercises: Exercise[], module?: ModuleType): Exercise[] {
  if (!module) return exercises;
  return exercises.filter(ex => ex.module.difficulty === module);
}

export function filterExercisesBySearch(exercises: Exercise[], searchTerm: string): Exercise[] {
  if (!searchTerm) return exercises;
  const term = searchTerm.toLowerCase();
  
  return exercises.filter(exercise => 
    exercise.name.toLowerCase().includes(term) ||
    exercise.target.name.toLowerCase().includes(term) ||
    exercise.weapon.type.toLowerCase().includes(term)
  );
}

export function filterExercisesByCategory(exercises: Exercise[], category?: ExerciseCategory): Exercise[] {
  if (!category) return exercises;
  return exercises.filter(ex => ex.categories.includes(category));
}