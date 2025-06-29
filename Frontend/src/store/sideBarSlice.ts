import type { StateCreator } from "zustand";

export type SideBarSlice = {
    sidebarHidden: boolean;
    toggleSidebar: () => void;
};

export const createSideBarSlice: StateCreator<
    SideBarSlice,
    [],
    [],
    SideBarSlice
> = (set) => ({
    sidebarHidden: true,
    toggleSidebar: () => set((state) => ({ sidebarHidden: !state.sidebarHidden })),
});
