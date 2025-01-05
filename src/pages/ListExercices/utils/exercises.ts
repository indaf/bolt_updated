import { Exercise, ModuleType } from '../types/Exercise';

export const getModules = (exercises: Exercise[]): ModuleType[] => {
  return Array.from(new Set(exercises.map(ex => ex.module.difficulty)));
};

export const getDifficulties = (exercises: Exercise[]): string[] => {
  return Array.from(new Set(exercises.map(ex => ex.module.difficulty)));
};

export const filterExercises = (
  exercises: Exercise[],
  searchTerm: string,
  module?: ModuleType,
  difficulty?: string
) => {
  return exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (exercise.objective?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesModule = !module || exercise.module.difficulty === module;
    const matchesDifficulty = !difficulty || exercise.module.difficulty === difficulty;
    
    return matchesSearch && matchesModule && matchesDifficulty;
  });
};