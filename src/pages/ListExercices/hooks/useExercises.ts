import { useMemo } from 'react';
import { Exercise, ModuleType, WeaponType } from '../types/Exercise';
import { filterExercisesByModule, filterExercisesBySearch, filterExercisesByWeaponType } from '../utils/filterExercises';

interface UseExercisesProps {
  exercises: Exercise[];
  searchTerm: string;
  selectedModule?: ModuleType;
  selectedWeaponType?: WeaponType;
}

export function useExercises({
  exercises,
  searchTerm,
  selectedModule,
  selectedWeaponType
}: UseExercisesProps) {
  const filteredExercises = useMemo(() => {
    let filtered = [...exercises];
    
    filtered = filterExercisesBySearch(filtered, searchTerm);
    filtered = filterExercisesByModule(filtered, selectedModule);
    filtered = filterExercisesByWeaponType(filtered, selectedWeaponType);
    
    return filtered;
  }, [exercises, searchTerm, selectedModule, selectedWeaponType]);

  const modules = useMemo(() => {
    return Array.from(new Set(exercises.map(ex => ex.module.difficulty)));
  }, [exercises]);

  const weaponTypes = useMemo(() => {
    return Array.from(new Set(exercises.map(ex => ex.weapon.type)));
  }, [exercises]);

  return {
    filteredExercises,
    modules,
    weaponTypes
  };
}