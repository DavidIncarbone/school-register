import type { IndexPresenceParams } from "@/config/types";
import { api, presencesEndpoint } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useQueryIndexPresence = (
    params: IndexPresenceParams,
    enabled = true
) => {
    return useQuery({
        queryKey: ["presences", params],
        queryFn: async () => {
            const res = await api.get(presencesEndpoint, { params });
            // console.log(res.data.data)
            return res.data;
        },
        // staleTime: 60 * 60 * 1000, // ms
        refetchInterval: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        enabled,
    });
};
