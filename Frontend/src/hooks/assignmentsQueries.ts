import type { IndexAssignmentsParams } from "@/config/types";
import { api, assignmentEndpoint } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useQueryIndexAssignment = (
    params: IndexAssignmentsParams,
    enabled = true
) => {
    return useQuery({
        queryKey: ["assignments", params],
        queryFn: async () => {
            const res = await api.get(assignmentEndpoint, {
                params,
            });
            return res.data;
        },
        // staleTime: Infinity,
        enabled,
    });
};
