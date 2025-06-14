import type { IndexLessonAssignmentsParams } from "@/config/types";
import { api, assignmentEndpoint } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useQueryIndexAssignment = (
    params: IndexLessonAssignmentsParams
) => {
    return useQuery({
        queryKey: ["assignments"],
        queryFn: async () => {
            const res = await api.get(assignmentEndpoint, {
                params,
            });
            return res.data.data;
        },
        staleTime: Infinity,
    });
};
