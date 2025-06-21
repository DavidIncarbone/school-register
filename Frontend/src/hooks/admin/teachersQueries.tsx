import type { Teacher, IndexTeachersParams } from "@/config/types";
import { api, adminTeachersEndpoint } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useQueryAdminIndexTeacher = (
  params: IndexTeachersParams,
  enabled = true
) => {
  return useQuery({
    queryKey: ["teachers", params],
    queryFn: async () => {
      const res = await api.get(adminTeachersEndpoint, {
        params,
      });
      return res.data;
    },
    // staleTime: Infinity,
    enabled,
  });
};

export const useMutationStoreTeacher = (params: IndexTeachersParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["teachers"],
    mutationFn: async (newTeacher: unknown) => {
      console.log("post");
      const res = await api.post(adminTeachersEndpoint, newTeacher);
      return res.data;
    },

    onSuccess: () => {
      console.log("stored");
      queryClient.invalidateQueries({
        queryKey: ["teachers", params],
        exact: true,
      });
    },
  });
};
export const useMutationUpdateTeacher = (
  params: IndexTeachersParams,
  teacherId: number
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["teachers", teacherId],
    mutationFn: async (teacher: Teacher) => {
      console.log("try to update");
      const res = await api.patch(
        adminTeachersEndpoint + `/${teacherId}`,
        teacher
      );
      return res.data;
    },
    onSuccess: () => {
      console.log("updated");

      // Funzione per refetchare la index
      queryClient.invalidateQueries({
        queryKey: ["teachers", params],

        // Esattamente come deve essere la queryKey
        exact: true,
      });
    },
  });
};

export const useMutationDestroyTeacher = (params: IndexTeachersParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["teachers"],
    mutationFn: async (teacherId: number) => {
      console.log("try to delete");
      await api.delete(adminTeachersEndpoint + `/${teacherId}`);
    },
    onSuccess: () => {
      console.log("deleted");
      queryClient.invalidateQueries({
        queryKey: ["teachers", params],
        exact: true,
      });
    },
  });
};
