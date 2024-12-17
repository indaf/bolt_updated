import { create } from 'zustand';

interface NavigateStore {
  currentPage: string;
  profileId: string | null;
  setCurrentPage: (page: string) => void;
  navigateToProfile: (userId: string) => void;
}

export const useNavigateStore = create<NavigateStore>((set) => ({
  currentPage: 'dashboard',
  profileId: null,
  setCurrentPage: (page) => set({ currentPage: page, profileId: null }),
  navigateToProfile: (userId) => set({ currentPage: 'profile', profileId: userId }),
}));

export const useNavigate = () => {
  const setCurrentPage = useNavigateStore((state) => state.setCurrentPage);
  const navigateToProfile = useNavigateStore((state) => state.navigateToProfile);

  return {
    navigateTo: (page: string) => {
      setCurrentPage(page);
    },
    goToProfile: (userId: string) => {
      navigateToProfile(userId);
    }
  };
};