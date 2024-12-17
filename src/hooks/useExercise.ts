import { useCallback } from 'react';
import { useExerciseStore } from '../store/exerciseStore';
import { Exercise } from '../types/exercise';

export function useExercise() {
  const { 
    exercises,
    selectedExerciseId,
    addExercise,
    updateExercise,
    removeExercise,
    setSelectedExerciseId
  } = useExerciseStore();

  const handleAddExercise = useCallback((exercise: Omit<Exercise, 'id' | 'timestamp' | 'archived' | 'userId'>, userId: string) => {
    return addExercise(exercise, userId);
  }, [addExercise]);

  const handleUpdateExercise = useCallback((id: string, exercise: Exercise) => {
    updateExercise(id, exercise);
  }, [updateExercise]);

  const handleRemoveExercise = useCallback((id: string) => {
    removeExercise(id);
  }, [removeExercise]);

  return {
    exercises,
    selectedExerciseId,
    addExercise: handleAddExercise,
    updateExercise: handleUpdateExercise,
    removeExercise: handleRemoveExercise,
    setSelectedExerciseId
  };
}