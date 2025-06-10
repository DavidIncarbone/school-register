import { useQuery } from "@tanstack/react-query";
import { api, courseEndpoint } from "../services/api";

export const useQueryIndexCourse = () => {
    return useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const res = await api.get(courseEndpoint);
            return res.data.data;
        },
        staleTime: Infinity,
    });
};
