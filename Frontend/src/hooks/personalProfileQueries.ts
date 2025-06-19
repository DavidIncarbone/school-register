// import { api, profileEndpoint } from "@/services/api";
// import { useGlobalStore } from "@/store/useGlobalStore";
// import { useQuery } from "@tanstack/react-query";

// export const useQueryIndexPersonalProfile = (enabled = true) => {
//   const { authUser } = useGlobalStore();
//   return useQuery({
//     queryKey: ["profile"],
//     queryFn: async () => {
//       const res = await api.get(profileEndpoint, {
//         params: { email: authUser?.email, type: authUser?.type },
//       });
//       return res.data.data;
//     },
//     staleTime: Infinity,
//     // enabled,
//   });
// };
