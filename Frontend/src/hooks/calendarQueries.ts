import type { IndexCalendarParams } from "@/config/types";
import { api, calendarEndpoint } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useQueryIndexCalendar = (params: IndexCalendarParams) => {
    return useQuery({
        queryKey: ["calendar", params],
        queryFn: async () => {
            const res = await api.get(calendarEndpoint, { params });
            return res.data.data;
        },
        staleTime: Infinity,
    });
};
