import type { IndexLessonScheduleParams } from "@/config/types";
import { api, lessonScheduleEndpoint } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useQueryIndexLessonSchedule = (
    params?: IndexLessonScheduleParams,
    enabled = true
) => {
    return useQuery({
        queryKey: ["lesson_schedule", params],
        queryFn: async () => {
            const res = await api.get(lessonScheduleEndpoint, { params });
            return res.data.data;
        },
        staleTime: Infinity,
        enabled,
    });
};
