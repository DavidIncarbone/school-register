import type { StateCreator } from "zustand";

export type notificationsSlice = {
    isGeneralNotifsOpen: boolean;
    setIsGeneralNotifsOpen: (bool: boolean) => void;
};

export const createNotificationsSlice: StateCreator<
    notificationsSlice,
    [],
    [],
    notificationsSlice
> = (set) => ({
    isGeneralNotifsOpen: false,
    setIsGeneralNotifsOpen: (bool) => set(() => ({ isGeneralNotifsOpen: bool })),
});
