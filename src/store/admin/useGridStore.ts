import { create } from "zustand";
import { GridFiltersState, GridFilterValue } from "@/components/admin/GridFilters";
import React from "react";

type GridState = {
  search: string;
  filters: GridFiltersState;
  setSearch: (v: string) => void;
  setFilter: (key: string, value: GridFilterValue) => void;
  resetFilters: () => void;
};

const stores = new Map<string, any>();

export function useGridStore(gridKey: string) {
  if (!stores.has(gridKey)) {
    stores.set(
      gridKey,
      create<GridState>((set) => ({
        search: "",
        filters: {},
        setSearch: (search) => set({ search }),
        setFilter: (key, value) =>
          set((state) => ({ filters: { ...state.filters, [key]: value } })),
        resetFilters: () => set({ search: "", filters: {} }),
      }))
    );
  }

  const store = stores.get(gridKey);

  // Reset filters automatically when component unmounts
  React.useEffect(() => {
    return () => store.getState().resetFilters();
  }, [store]);

  return store;
}
