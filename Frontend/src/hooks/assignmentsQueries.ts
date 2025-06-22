import type { Assignment, IndexAssignmentsParams } from "@/config/types";
import { api, assignmentEndpoint } from "@/services/api";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

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
        staleTime: Infinity,
        enabled,
        // placeholderData: (previousData) => previousData, // per evitare flickering (loading state)
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
export const useMutationUpdateAssignment = (
    params: IndexAssignmentsParams,
    assignmentId: number
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["assignments", assignmentId],
        mutationFn: async (assignment: Assignment) => {
            console.log("try to update");
            const res = await api.patch(
                assignmentEndpoint + `/${assignmentId}`,
                assignment
            );
            return res.data;
        },
        onSuccess: () => {
            console.log("updated");

            // Funzione per refetchare la index
            queryClient.invalidateQueries({
                queryKey: ["assignments", params],

                // Esattamente come deve essere la queryKey
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
