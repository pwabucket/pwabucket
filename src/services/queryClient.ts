import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /** Disable Refetch */
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});
