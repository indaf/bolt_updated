import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarStore {
  isOpen: boolean;
  isOpenMobile: boolean;
  toggleMobile: () => void;
  toggle: () => void;
  setOpen: (open: boolean) => void;
  setOpenMobile: (open: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isOpen: true,
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
