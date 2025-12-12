import { create } from "zustand";

interface ConfirmDialogState {
  openConfirmDialog: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  loading: boolean;
  isDestructive: boolean;

  setOpenConfirmDialog: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;

  showDialog: (config: Partial<ConfirmDialogState>) => void;
  closeDialog: () => void;
  setLoading: (loading: boolean) => void;
}

export const useConfirmDialogStore = create<ConfirmDialogState>((set) => ({
  openConfirmDialog: false,
  title: "",
  description: "",
  confirmText: "Yes",
  cancelText: "Cancel",
  loading: false,
  isDestructive: false,

  setOpenConfirmDialog: (open: boolean) =>
    set({ openConfirmDialog: open }),

  onConfirm: () => {},
  onCancel: () => set({ openConfirmDialog: false }),

  showDialog: (config) =>
    set(() => ({
      openConfirmDialog: true,
      loading: false,
      title: config.title ?? "Are you sure?",
      description: config.description ?? "Please confirm your action.",
      confirmText: config.confirmText ?? "Yes",
      cancelText: config.cancelText ?? "Cancel",
      isDestructive: config.isDestructive ?? false,
      onConfirm: config.onConfirm ?? (() => {}),
      onCancel:
        config.onCancel ??
        (() => set({ openConfirmDialog: false })),
    })),

  closeDialog: () => set({ openConfirmDialog: false, loading: false }),

  setLoading: (loading: boolean) => set({ loading }),
}));
