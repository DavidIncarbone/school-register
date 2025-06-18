import type { Assignment, IndexAssignmentsParams } from "@/config/types";
import { api, assignmentEndpoint } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useQueryIndexAssignment = (
  params: IndexAssignmentsParams,
  enabled = true
) => {
  return useQuery({
    queryKey: ["assignments", params],
    queryFn: async () => {
      const res = await api.get(assignmentEndpoint, {
        params,
      });
      return res.data;
    },
    // staleTime: Infinity,
    enabled,
  });
};

export const useMutationStoreAssignment = (params: IndexAssignmentsParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["assignments"],
    mutationFn: async (newAssignment: unknown) => {
      console.log("post");
      const res = await api.post(assignmentEndpoint, newAssignment);
      return res.data;
    },
    onSuccess: () => {
      console.log("settled");
      queryClient.invalidateQueries({
        queryKey: ["assignments", params],
        exact: true,
      });
    },
  });
};
export const useMutationDestroyAssignment = (
  params: IndexAssignmentsParams
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["assignments"],
    mutationFn: async (assignmentId: number) => {
      console.log("try to delete");
      await api.delete(assignmentEndpoint + `/${assignmentId}`);
    },
    onSuccess: () => {
      console.log("deleted");
      queryClient.invalidateQueries({
        queryKey: ["assignments", params],
        exact: true,
      });
    },
  });
};
