import { create } from "zustand";
import { createAuthSlice, type AuthSlice } from "./authSlice";
import { createAuthUserSlice, type AuthUserSlice } from "./authUserSlice";

export type StoreState = AuthSlice & AuthUserSlice;

export const useGlobalStore = create<StoreState>()((...a) => ({
    ...createAuthSlice(...a),
    ...createAuthUserSlice(...a),
}));
