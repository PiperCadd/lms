import { create } from "zustand";

type DropdownDataState = {
  data: Record<string, string[]>;
  loading: boolean;
  fetchedKeys: Set<string>;
  fetchKeys: (keys: string[]) => Promise<void>;
};


export const useDropdownDataStore = create<DropdownDataState>((set, get) => ({
  data: {},
  loading: false,
  fetchedKeys: new Set(),

  fetchKeys: async (keys) => {
    const { fetchedKeys, data } = get();

    const missingKeys = keys.filter((k) => !fetchedKeys.has(k));
    if (missingKeys.length === 0) return;

    set({ loading: true });

    const res = await fetch(`/api/options?keys=${missingKeys.join(",")}`);

    const json = await res.json();

    set({
      data: { ...data, ...json },
      loading: false,
      fetchedKeys: new Set([...fetchedKeys, ...missingKeys]),
    });
  },
}));
