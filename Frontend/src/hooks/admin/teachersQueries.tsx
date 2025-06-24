import type { Teacher, IndexTeachersParams, ServerError } from "@/config/types";
import type { TeacherFormData } from "@/schemas/admin/teachersSchema";
import { api, adminTeachersEndpoint } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { T } from "node_modules/react-router/dist/development/route-data-WyrduLgj.d.mts";
import type { Dispatch, SetStateAction } from "react";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

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

export const useMutationStoreTeacher = <T extends FieldValues>(
  params: IndexTeachersParams,
  setError: UseFormSetError<T>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["teachers"],
    mutationFn: async (newTeacher: T) => {
      console.log("post");
      const res = await api.post(adminTeachersEndpoint, newTeacher);
      return res.data;
    },

    onError: (error: AxiosError<any>) => {
      const serverError = error.response?.data;

      if (serverError?.field && serverError?.message) {
        setError(serverError.field as Path<T>, {
          type: "server",
          message: serverError.message,
        });
      }
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
export const useMutationUpdateTeacher = <T extends FieldValues>(
  params: IndexTeachersParams,
  teacherId: number,
  setError: UseFormSetError<T>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["teachers", teacherId],
    mutationFn: async (teacher: T) => {
      console.log("try to update");
      const res = await api.patch(
        adminTeachersEndpoint + `/${teacherId}`,
        teacher
      );
      return res.data;
    },

    onError: (error: AxiosError<any>) => {
      const serverError = error.response?.data;

      if (serverError?.field && serverError?.message) {
        setError(serverError.field as Path<T>, {
          type: "server",
          message: serverError.message,
        });
      }
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
