import { create } from "zustand";

type UIState = {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
};

export const useUIStore = create<UIState>()((set) => ({
  isDialogOpen: false,
  setIsDialogOpen: (open) => set({ isDialogOpen: open }),
}));
