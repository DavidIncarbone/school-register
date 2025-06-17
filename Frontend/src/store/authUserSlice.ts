import type { StateCreator } from "zustand";
import type { Profile, User } from "../config/types";

export type AuthUserSlice = {
    isAuthLoading: boolean;
    setIsAuthLoading: (bool: boolean) => void;
    authUser: User | null;
    setAuthUser: (user: User | null) => void;
    profile: Profile | null;
    setProfile: (record: Profile | null) => void;
};

export const createAuthUserSlice: StateCreator<
    AuthUserSlice,
    [],
    [],
    AuthUserSlice
> = (set) => ({
    isAuthLoading: true,
    setIsAuthLoading: (bool) => set(() => ({ isAuthLoading: bool })),
    authUser: null,
    setAuthUser: (user) => set(() => ({ authUser: user })),
    profile: null,
    setProfile: (record) => set(() => ({ profile: record })),
});
