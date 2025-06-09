import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export const useQueryIndexCourse = () => {
    return useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const res = await api.get(`/api/courses`);
            return res.data.data;
        },
        staleTime: Infinity,
    });
};
