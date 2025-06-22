import type { StateCreator } from "zustand";

import Echo from "laravel-echo";

export type WsSlice = {
    echo: Echo<"reverb"> | null;
    setEcho: (echo: Echo<"reverb">) => void;
};

export const createWsSlice: StateCreator<WsSlice, [], [], WsSlice> = (set) => ({
    echo: null,
    setEcho: (echo) => set(() => ({ echo })),
});
