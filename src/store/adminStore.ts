import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AdminStats, AdminUser } from '../types/admin';
import { useAuthStore } from './authStore';
import type { User } from './authStore';

interface AdminState {
  stats: AdminStats | null;
  users: AdminUser[];
  version: number;
}

interface AdminStore extends AdminState {
  fetchStats: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  updateUserStatus: (userId: string, status: 'active' | 'inactive' | 'pending') => Promise<void>;
  validateInstructor: (userId: string, approved: boolean) => Promise<void>;
  resetStore: () => void;
}

const initialState: AdminState = {
  stats: null,
  users: [],
  version: 1
};

const convertToAdminUser = (user: User): AdminUser => ({
  ...user,
  isAdmin: user.email === 'loic@cdtar.com',
  lastLogin: new Date(),
  exerciseCount: 0,
  shooterCount: 0,
  createdAt: new Date(),
});

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      resetStore: () => set(initialState),

      fetchStats: async () => {
        const authUsers = useAuthStore.getState().getAllUsers();
        const users = authUsers.map(convertToAdminUser);
        const pendingInstructors = users.filter(u => u.role === 'instructor' && u.status === 'pending');
        
        const stats: AdminStats = {
          totalUsers: users.length,
          activeUsers: users.filter(u => u.status === 'active').length,
          totalExercises: 450,
          exercisesThisMonth: 75,
          totalShooters: users.filter(u => u.role === 'shooter').length,
          averageExercisesPerUser: 3,
          pendingInstructors: pendingInstructors.length,
          lastRegistrations: users
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice(0, 5)
            .map(u => ({
              id: u.id,
              name: `${u.firstName} ${u.lastName}`,
              date: u.createdAt.toISOString().split('T')[0],
            })),
          popularCriteria: [
            { name: 'Distance', count: 245 },
            { name: 'Arme', count: 198 }
          ]
        };
        set({ stats });
      },

      fetchUsers: async () => {
        const authUsers = useAuthStore.getState().getAllUsers();
        const users = authUsers.map(convertToAdminUser);
        set({ users });
      },

      updateUserStatus: async (userId, status) => {
        const authStore = useAuthStore.getState();
        const user = authStore.getAllUsers().find(u => u.id === userId);

        if (user) {
          authStore.updateUser({ ...user, status });
          await get().fetchStats();
          await get().fetchUsers();
        }
      },

      validateInstructor: async (userId, approved) => {
        const validationCode = approved ? crypto.randomUUID().slice(0, 8) : undefined;
        const newStatus = approved ? 'active' : 'inactive';

        const authStore = useAuthStore.getState();
        const user = authStore.getAllUsers().find(u => u.id === userId);

        if (user) {
          authStore.updateUser({ ...user, status: newStatus, validationCode });
          await get().fetchStats();
          await get().fetchUsers();
        }
      },
    }),
    {
      name: 'admin-storage',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return initialState;
        }
        return persistedState;
      }
    }
  )
);