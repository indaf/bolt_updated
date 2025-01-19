import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarStore {
  isOpen: boolean;
  isOpenMobile: boolean;
  toggleMobile: () => void;
  toggle: () => void;
  setOpen: (open: boolean) => void;
  setOpenMobile: (open: boolean) => void;
  reduceAlert: (value: boolean) => void;
  isReduceAlert: boolean;
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isOpen: true,
      isReduceAlert: false,
      reduceAlert: (value: boolean) => set({ isReduceAlert: value }),
      isOpenMobile: false,
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      toggleMobile: () =>
        set((state) => ({ isOpenMobile: !state.isOpenMobile })),
      setOpen: (open) => set({ isOpen: open }),
      setOpenMobile: (open) => set({ isOpenMobile: open }),
    }),
    {
      name: "sidebar-storage",
    }
  )
);
