import type { ExamsParams } from "@/config/types";
import { api, examsEndpoint } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useQueryIndexExams = (params: ExamsParams, enabled = true) => {
    return useQuery({
        queryKey: ["exams", params],
        queryFn: async () => {
            const res = await api.get(examsEndpoint, { params });
            return res.data.data;
        },
        enabled,
    });
};
