import { useQuery } from "@tanstack/react-query";

export default function useAppQuery() {
  return useQuery({
    queryKey: ["listApps"],
  });
}
