import { QueryClient } from "@tanstack/react-query";

import { api } from "./api";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /**
       * Call the api service with the query key data
       */
      queryFn: ({ queryKey }) => api[queryKey[0]](...queryKey.slice(1)),

      /** Disable Refetch */
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});
