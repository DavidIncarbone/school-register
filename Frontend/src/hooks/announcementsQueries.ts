import { announcementsEndpoint, api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useQueryIndexAnnouncements = () => {
    return useQuery({
        queryKey: ["announcements"],
        queryFn: async () => {
            const res = await api.get(announcementsEndpoint);
            return res.data;
        },
        staleTime: 60 * 60 * 1000,
        refetchInterval: 60 * 60 * 1000,
    });
};
