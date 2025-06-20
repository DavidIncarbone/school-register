import type { QueryClient } from "@tanstack/react-query";
import type { StateCreator } from "zustand";

export type QueriesSlice = {
    queryClient: QueryClient | null;
    setQueryClient: (client: QueryClient) => void;
};

export const createQueriesSlice: StateCreator<
    QueriesSlice,
    [],
    [],
    QueriesSlice
> = (set) => ({
    queryClient: null,
    setQueryClient: (client) => set(() => ({ queryClient: client })),
});
