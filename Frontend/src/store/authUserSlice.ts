import type { StateCreator } from "zustand";
import type { User } from "../config/types";

export type AuthUserSlice = {
    isAuthLoading: boolean;
    setIsAuthLoading: (bool: boolean) => void;
    authUser: User | null;
    setAuthUser: (user: User | null) => void;
};

export const createAuthUserSlice: StateCreator<
    AuthUserSlice,
    [],
    [],
    AuthUserSlice
> = (set) => ({
    isAuthLoading: true,
    setIsAuthLoading: (bool) => set(() => ({isAuthLoading: bool})),
    authUser: null,
    setAuthUser: (user) => set(() => ({ authUser: user })),
});
