import { create } from "zustand";
import { createAuthUserSlice, type AuthUserSlice } from "./authUserSlice";

export type StoreState = AuthUserSlice;

export const useGlobalStore = create<StoreState>()((...a) => ({
    ...createAuthUserSlice(...a),
}));
