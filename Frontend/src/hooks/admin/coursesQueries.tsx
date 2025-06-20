import { useQuery } from "@tanstack/react-query";
import { api, adminCoursesEndpoint } from "@/services/api";

export const useQueryAdminIndexCourse = (params: unknown, enabled = true) => {
  return useQuery({
    queryKey: ["courses", params],
    queryFn: async () => {
      const res = await api.get(adminCoursesEndpoint, { params });
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
      const res = await api.get(`${adminCoursesEndpoint}/${id}`);
      return res.data.data;
    },
    staleTime: Infinity,
  });
};
