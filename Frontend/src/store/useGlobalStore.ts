import { create } from "zustand";
import { createAuthUserSlice, type AuthUserSlice } from "./authUserSlice";
import { createSideBarSlice, type SideBarSlice } from "./sideBarSlice";

export type StoreState = AuthUserSlice & SideBarSlice;

export const useGlobalStore = create<StoreState>()((...a) => ({
    ...createAuthUserSlice(...a),
    ...createSideBarSlice(...a),
}));
