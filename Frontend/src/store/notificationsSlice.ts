import type { StateCreator } from "zustand";

export type notificationsSlice = {
    isExamsOpen: boolean;
    setIsExamsOpen: (bool: boolean) => void;
    isGeneralNotifsOpen: boolean;
    setIsGeneralNotifsOpen: (bool: boolean) => void;
};

export const createNotificationsSlice: StateCreator<
    notificationsSlice,
    [],
    [],
    notificationsSlice
> = (set) => ({
    isExamsOpen: false,
    setIsExamsOpen: (bool) => set(() => ({ isExamsOpen: bool })),
    isGeneralNotifsOpen: false,
    setIsGeneralNotifsOpen: (bool) =>
        set(() => ({ isGeneralNotifsOpen: bool })),
});
