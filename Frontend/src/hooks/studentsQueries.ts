import { useQuery } from "@tanstack/react-query";
import type { IndexStudentParams } from "../config/types";
import { api, studentsEndpoint } from "../services/api";

export const useQueryIndexStudent = (
    params: IndexStudentParams,
    enabled: boolean
) => {
    return useQuery({
        queryKey: ["students", params],
        queryFn: async () => {
            const res = await api.get(studentsEndpoint, { params });
            return res.data;
        },
        staleTime: 60 * 60 * 1000, // ms
        refetchInterval: 60 * 60 * 1000,
        enabled,
    });
};
