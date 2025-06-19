import { create } from "zustand";
import { createAuthUserSlice, type AuthUserSlice } from "./authUserSlice";
import { createSideBarSlice, type SideBarSlice } from "./sideBarSlice";
import { createQueriesSlice, type QueriesSlice } from "./queriesSlice";

export type StoreState = AuthUserSlice & SideBarSlice & QueriesSlice;

export const useGlobalStore = create<StoreState>()((...a) => ({
    ...createAuthUserSlice(...a),
    ...createSideBarSlice(...a),
    ...createQueriesSlice(...a),
}));
