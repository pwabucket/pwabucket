import { QueryClient } from "@tanstack/react-query";

import { api } from "./api";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: ({ queryKey }) => api[queryKey[0]](...queryKey.slice(1)),
      select: ({ data }) => data,
    },
  },
});
