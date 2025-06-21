import type { GradesParams } from "@/config/types";
import { api, gradesEndpoint } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useQueryIndexGrades = (params: GradesParams, enabled = true) => {
    return useQuery({
        queryKey: ["grades", params],
        queryFn: async () => {
            const res = await api.get(gradesEndpoint, { params });
            return res.data.data;
        },
        staleTime: Infinity,
        enabled,
    });
};

export const useQueryGetGradesAverages = () => {
    return useQuery({
        queryKey: ["grades-averages"],
        queryFn: async () => {
            const res = await api.get("/api/grades-averages");
            return res.data.data;
        },
        staleTime: Infinity,
    });
};
