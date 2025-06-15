import { useQuery } from "@tanstack/react-query";
import { api, courseEndpoint } from "../services/api";

export const useQueryIndexCourse = (params: unknown, enabled = true) => {
    return useQuery({
        queryKey: ["courses", params],
        queryFn: async () => {
            const res = await api.get(courseEndpoint, { params });
            return res.data.data;
        },
        staleTime: Infinity,
        enabled,
    });
};

export const useQueryShowCourse = (id: number) => {
    return useQuery({
        queryKey: ["courses", id],
        queryFn: async () => {
            const res = await api.get(`${courseEndpoint}/${id}`);
            return res.data.data;
        },
        staleTime: Infinity,
    });
};
