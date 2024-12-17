import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Shooter } from '../types/shooter';

interface ShooterStore {
  shooters: Shooter[];
  selectedShooterId: string | null;
  addShooter: (shooter: Omit<Shooter, 'id' | 'timestamp' | 'results'>) => Shooter;
  updateShooter: (id: string, data: Partial<Shooter>) => void;
  removeShooter: (id: string) => void;
  setSelectedShooter: (id: string | null) => void;
  updateShooterResults: (shooterId: string, exerciseId: string, results: Record<string, string>) => void;
}

export const useShooterStore = create<ShooterStore>()(
  persist(
    (set, get) => ({
      shooters: [],
      selectedShooterId: null,
      addShooter: (shooter) => {
        const newShooter = {
          ...shooter,
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          results: {},
        };
        
        set((state) => ({
          shooters: [...state.shooters, newShooter],
        }));
        
        return newShooter;
      },
      updateShooter: (id, data) => set((state) => ({
        shooters: state.shooters.map((shooter) =>
          shooter.id === id ? { ...shooter, ...data } : shooter
        ),
      })),
      removeShooter: (id) => set((state) => ({
        shooters: state.shooters.filter((shooter) => shooter.id !== id),
        selectedShooterId: state.selectedShooterId === id ? null : state.selectedShooterId,
      })),
      setSelectedShooter: (id) => set({ selectedShooterId: id }),
      updateShooterResults: (shooterId, exerciseId, results) => set((state) => {
        const shooter = state.shooters.find(s => s.id === shooterId);
        if (!shooter) return state;

        // S'assurer que le tableau des résultats existe
        const existingResults = shooter.results[exerciseId] || [];
        const updatedResults = Array.isArray(existingResults) 
          ? [...existingResults, results] 
          : [results];

        return {
          shooters: state.shooters.map((s) =>
            s.id === shooterId
              ? {
                  ...s,
                  results: {
                    ...s.results,
                    [exerciseId]: updatedResults,
                  },
                }
              : s
          ),
        };
      }),
    }),
    {
      name: 'shooter-storage',
    }
  )
);