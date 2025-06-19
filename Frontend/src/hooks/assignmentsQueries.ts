import type { Assignment, IndexAssignmentsParams } from "@/config/types";
import { api, assignmentEndpoint } from "@/services/api";
import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

export const useInfiniteQueryIndexAssignment = (
    params: IndexAssignmentsParams,
    enabled = true
) => {
    return useInfiniteQuery({
        queryKey: ["assignments", params],
        queryFn: async ({ pageParam }) => {
            const res = await api.get(
                assignmentEndpoint + `?page=${pageParam}`,
                {
                    params,
                }
            );
            return res.data;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            // console.log(lastPage);
            if (lastPage.current_page < lastPage.last_page) {
                return lastPage.current_page + 1;
            }
            return undefined; // segnala che non ci sono più pagine
        },
        getPreviousPageParam: (firstPage) => {
            // console.log(firstPage);
            if (firstPage.current_page > 1) {
                return firstPage.current_page - 1;
            }
            return undefined; // segnala che non ci sono più pagine
        },
        enabled,
    });
};

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
