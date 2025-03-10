import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function useAppMarkdownQuery(repo) {
  return useQuery({
    queryKey: ["markdown", repo],
    queryFn: () =>
      axios
        .get(
          `https://raw.githubusercontent.com/${
            import.meta.env.VITE_APP_ORG
          }/${repo}/main/README.md`
        )
        .then((res) => {
          return { data: res.data };
        }),
  });
}
