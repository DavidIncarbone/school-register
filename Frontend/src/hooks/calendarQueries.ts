import { api, calendarEndpoint } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

type CalendarParams = {
    show_week?: boolean;
};

export const useQueryIndexCalendar = (params: CalendarParams) => {
    return useQuery({
        queryKey: ["calendar", params],
        queryFn: async () => {
            const res = await api.get(calendarEndpoint);
            return res.data;
        },
        staleTime: Infinity,
    });
};
