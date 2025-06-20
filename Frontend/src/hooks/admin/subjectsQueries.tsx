import { useQuery } from "@tanstack/react-query";
import { api, adminSubjectsEndpoint } from "@/services/api";

export const useQueryAdminIndexSubject = (enabled = true) => {
  return useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const res = await api.get(adminSubjectsEndpoint);
      return res.data.data;
    },
    staleTime: Infinity,
    enabled,
  });
};

export const useQueryShowSubject = (id: number) => {
  return useQuery({
    queryKey: ["subjects", id],
    queryFn: async () => {
      const res = await api.get(`${adminSubjectsEndpoint}/${id}`);
      return res.data.data;
    },
    staleTime: Infinity,
  });
};
