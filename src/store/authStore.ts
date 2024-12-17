import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate?: string;
  birthPlace?: string;
  mobile?: string;
  avatar?: string;
  uniqueId: string;
  role: "instructor" | "shooter";
  status: "pending" | "active" | "inactive";
  validationCode?: string;
  regiment?: string;
  militaryId?: string;
  xp: number;
  level: number;
  nextLevelXp: number;
}

interface AuthState {
  user: User | null;
  users: User[];
  isAuthenticated: boolean;
  version: number;
}

interface AuthStore extends AuthState {
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  deleteUser: (userId: string) => void;
  getAllUsers: () => User[];
  clearStorage: () => void;
}

const ADMIN_USER: User = {
  id: "admin",
  email: "loic@cdtar.com",
  firstName: "Admin",
  lastName: "CDTARGET",
  uniqueId: "@admincdtarget",
  role: "instructor",
  status: "active",
  password: "Azerty64",
  xp: 1500,
  level: 5,
  nextLevelXp: 2000,
};

const initialState: AuthState = {
  user: ADMIN_USER,
  users: [ADMIN_USER],
  isAuthenticated: true,
  version: 1,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      getAllUsers: () => get().users,

      clearStorage: () => {
        localStorage.removeItem("auth-storage");
        set(initialState);
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      updateUser: (data) => {
        if (!data.id) return;

        set((state) => ({
          users: state.users.map((u) =>
            u.id === data.id ? { ...u, ...data } : u
          ),
          user:
            state.user?.id === data.id
              ? { ...state.user, ...data }
              : state.user,
        }));
      },

      deleteUser: (userId: string) => {
        set((state) => ({
          users: state.users.filter((u) => u.id !== userId),
          user: state.user?.id === userId ? null : state.user,
          isAuthenticated:
            state.user?.id === userId ? false : state.isAuthenticated,
        }));
      },
    }),
    {
      name: "auth-storage",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            ...initialState,
            users: [ADMIN_USER],
          };
        }
        return persistedState;
      },
    }
  )
);
