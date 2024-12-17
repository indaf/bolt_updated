import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Exercise } from '../types/exercise';

interface ExerciseStore {
  exercises: Exercise[];
  selectedExerciseId: string | null;
  addExercise: (exercise: Omit<Exercise, 'id' | 'timestamp' | 'archived' | 'userId'>, userId: string) => Exercise;
  updateExercise: (id: string, exercise: Exercise) => void;
  renameExercise: (id: string, newName: string) => void;
  removeExercise: (id: string) => void;
  toggleArchived: (id: string) => void;
  getExercisesByUserId: (userId: string) => Exercise[];
  setSelectedExerciseId: (id: string | null) => void;
}

export const useExerciseStore = create<ExerciseStore>()(
  persist(
    (set, get) => ({
      exercises: [],
      selectedExerciseId: null,
      addExercise: (exercise, userId) => {
        const newExercise = {
          ...exercise,
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          archived: false,
          userId,
        };
        
        set((state) => ({
          exercises: [...state.exercises, newExercise],
        }));
        
        return newExercise;
      },
      updateExercise: (id, exercise) => set((state) => ({
        exercises: state.exercises.map((ex) =>
          ex.id === id ? exercise : ex
        ),
      })),
      renameExercise: (id, newName) => set((state) => ({
        exercises: state.exercises.map((ex) =>
          ex.id === id ? { ...ex, name: newName } : ex
        ),
      })),
      removeExercise: (id) => set((state) => ({
        exercises: state.exercises.filter((ex) => ex.id !== id),
        selectedExerciseId: state.selectedExerciseId === id ? null : state.selectedExerciseId,
      })),
      toggleArchived: (id) => set((state) => ({
        exercises: state.exercises.map((ex) =>
          ex.id === id ? { ...ex, archived: !ex.archived } : ex
        ),
      })),
      getExercisesByUserId: (userId) => {
        const exercises = get().exercises.filter(ex => ex.userId === userId);
        return exercises;
      },
      setSelectedExerciseId: (id) => set({ selectedExerciseId: id }),
    }),
    {
      name: 'exercise-storage',
    }
  )
);