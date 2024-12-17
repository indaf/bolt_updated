import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResultKey, ShooterResult } from '../types/result';
import { Shooter } from '../types/shooter';

interface ResultStore {
  results: ShooterResult[];
  resultKeys: ResultKey[];
  addResult: (result: Omit<ShooterResult, 'id' | 'claimed'>) => ShooterResult;
  generateKey: (exerciseId: string, shooterId: string, instructorId: string) => ResultKey;
  claimResults: (key: string, userId: string) => ShooterResult[];
  findMatchingResults: (shooter: Shooter) => ShooterResult[];
  getResultsByShooterId: (shooterId: string) => ShooterResult[];
}

const generateUniqueKey = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  for (let i = 0; i < 16; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
};

export const useResultStore = create<ResultStore>()(
  persist(
    (set, get) => ({
      results: [],
      resultKeys: [],

      addResult: (result) => {
        const newResult = {
          ...result,
          id: crypto.randomUUID(),
          claimed: false,
        };

        set((state) => ({
          results: [...state.results, newResult],
        }));

        return newResult;
      },

      generateKey: (exerciseId, shooterId, instructorId) => {
        const key = generateUniqueKey();
        const newKey: ResultKey = {
          id: crypto.randomUUID(),
          exerciseId,
          shooterId,
          key,
          createdAt: Date.now(),
          createdBy: instructorId,
        };

        set((state) => ({
          resultKeys: [...state.resultKeys, newKey],
        }));

        return newKey;
      },

      claimResults: (key, userId) => {
        const resultKey = get().resultKeys.find(rk => rk.key === key);
        if (!resultKey) return [];

        const claimedResults: ShooterResult[] = [];

        set((state) => ({
          results: state.results.map(result => {
            if (result.exerciseId === resultKey.exerciseId && 
                result.shooterId === resultKey.shooterId && 
                !result.claimed) {
              claimedResults.push({
                ...result,
                claimed: true,
                claimedBy: userId,
                claimedAt: Date.now(),
              });
              return {
                ...result,
                claimed: true,
                claimedBy: userId,
                claimedAt: Date.now(),
              };
            }
            return result;
          }),
        }));

        return claimedResults;
      },

      findMatchingResults: (shooter) => {
        return get().results.filter(result => {
          const matchingKey = get().resultKeys.find(key => 
            key.exerciseId === result.exerciseId && 
            key.shooterId === shooter.id
          );
          return matchingKey && !result.claimed;
        });
      },

      getResultsByShooterId: (shooterId) => {
        return get().results.filter(result => result.shooterId === shooterId);
      },
    }),
    {
      name: 'result-storage',
    }
  )
);