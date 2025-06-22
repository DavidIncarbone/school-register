import { create } from "zustand";
import { createAuthUserSlice, type AuthUserSlice } from "./authUserSlice";
import { createSideBarSlice, type SideBarSlice } from "./sideBarSlice";
import { createQueriesSlice, type QueriesSlice } from "./queriesSlice";
import { createWsSlice, type WsSlice } from "./wsSlice";

export type StoreState = AuthUserSlice & SideBarSlice & QueriesSlice & WsSlice;

export const useGlobalStore = create<StoreState>()((...a) => ({
    ...createAuthUserSlice(...a),
    ...createSideBarSlice(...a),
    ...createQueriesSlice(...a),
    ...createWsSlice(...a),
}));
