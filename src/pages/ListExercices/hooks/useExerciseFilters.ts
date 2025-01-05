import { useMemo } from "react";
import {
  Exercise,
  ModuleType,
  ExerciseCategory,
  WeaponType,
} from "../types/Exercise";

interface UseExerciseFiltersProps {
  exercises: any[];
  searchTerm: string;
  filters: {
    module?: ModuleType;
    category?: ExerciseCategory;
    targetModels: string[];
    weaponType?: WeaponType;
  };
}

export function useExerciseFilters({
  exercises,
  searchTerm,
  filters,
}: UseExerciseFiltersProps) {
  // Extract unique values for filters
  const modules = useMemo(() => {
    const uniqueModules = new Set(exercises.map((ex) => ex.module.name));
    return Array.from(uniqueModules).sort((a, b) => (a - b ? -1 : 1));
  }, [exercises]);

  const categories = useMemo(() => {
    return ["modèles", "semaines", "mois"] as ExerciseCategory[];
  }, []);

  const targetModels = useMemo(() => {
    const uniqueModels = new Set(exercises.map((ex) => ex.target.name));
    return Array.from(uniqueModels).sort();
  }, [exercises]);

  const weaponTypes = useMemo(() => {
    const uniqueTypes = new Set(exercises.map((ex) => ex.weapon.type));
    return Array.from(uniqueTypes).sort();
  }, [exercises]);

  // Filter exercises
  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        if (!exercise.name.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Module filter
      if (filters.module && exercise.module.name !== filters.module) {
        return false;
      }

      // Category filter
      if (filters.category && !exercise.categories.includes(filters.category)) {
        return false;
      }

      // Target models filter (only apply if category is "modèles")
      if (filters.category === "modèles" && filters.targetModels.length > 0) {
        if (!filters.targetModels.includes(exercise.target.name)) {
          return false;
        }
      }
      // Weapon type filter
      if (filters.weaponType && exercise.weapon.type !== filters.weaponType) {
        return false;
      }

      return true;
    });
  }, [exercises, searchTerm, filters]);

  return {
    filteredExercises,
    modules,
    categories,
    targetModels,
    weaponTypes,
    totalCount: exercises.length,
    filteredCount: filteredExercises.length,
  };
}
