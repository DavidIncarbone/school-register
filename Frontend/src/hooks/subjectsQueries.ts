import { api, subjectsEndpoint } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useQueryIndexSubjects = (enabled = true) => {
    return useQuery({
        queryKey: ["subjects"],
        queryFn: async () => {
            const res = await api.get(subjectsEndpoint);
            return res.data.data;
        },
        staleTime: Infinity,
        enabled,
    });
};
