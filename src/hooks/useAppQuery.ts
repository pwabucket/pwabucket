import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export default function useAppQuery() {
  return useQuery({
    queryKey: ["listApps"],
    queryFn: () => api.listApps(),
  });
}
