import { api, profileEndpoint } from "@/services/api";
import { useGlobalStore } from "@/store/useGlobalStore";
import { useQuery } from "@tanstack/react-query";

// enabled = in useQuery è un parametro booleano che decide se far partire la query oppure no.
// se lo assegno adesso, quando chiamo la funzione e non lo assegno come argomento, di default è true
export const useQueryIndexPersonalProfile = (enabled = true) => {
  const { authUser } = useGlobalStore();
  return useQuery({
    // Chiave univoca di ogni chiamata che serve a React Query per cachare univocamente.
    // Per convenzione dare lo stesso nome dell'endpoint
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get(profileEndpoint, {
        params: { email: authUser?.email, type: authUser?.type },
      });
      // Questo valore viene assegnato alla variabile di default "data" di useQuery
      return res.data.data;
    },
    staleTime: Infinity,
    enabled,
  });
};
