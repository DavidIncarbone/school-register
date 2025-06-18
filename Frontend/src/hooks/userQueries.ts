import { api, userEndpoint } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useQueryGetUser = (enabled = true) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await api.get(userEndpoint);
      return res.data;
    },
  });
};

export const useMutationLoginUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["user"],
    mutationFn: async (user: unknown) => {
      console.log("try to login");
      await api.post("/login", user);
    },
    onSuccess: () => {
      console.log("login");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};
