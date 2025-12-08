import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type AppState = {
  tost: boolean;
  setTost: (t: boolean) => void;
  clearTost: () => void;

  theme: "light" | "dark";
  toggleTheme: () => void;
};

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        tost: false,
        setTost: (t) => set({ tost: t }),
        clearTost: () => set({ tost: false }),

        theme: "light",
        toggleTheme: () =>
          set((state) => ({
            theme: state.theme === "light" ? "dark" : "light",
          })),
      }),
      {
        name: "app-storage",
        partialize: (state) => ({
          tost: state.tost,
          theme: state.theme,
        }),
      }
    )
  )
);
