import { useQuery } from "@tanstack/react-query";
import type { SearchStudentsParams } from "../config/types";
import { api } from "../services/api";

export const useQueryIndexStudent = (params: SearchStudentsParams) => {
    return useQuery({
        queryKey: ["students", params],
        queryFn: async () => {
            if (!("course_id" in params)) {
                throw new Error("no course_id");
            }
            const res = await api.get(`/api/students`, { params });
            return res.data.data;
        },
        staleTime: 60 * 60 * 1000, // ms
        refetchInterval: 60 * 60 * 1000,
    });
};
