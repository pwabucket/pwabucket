import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function useAppManifestQuery(repo) {
  return useQuery({
    queryKey: ["manifest", repo],
    queryFn: () =>
      axios
        .get(
          `https://${
            import.meta.env.VITE_APP_ORG
          }.github.io/${repo}/manifest.webmanifest`
        )
        .then((res) => {
          return { data: res.data };
        }),
  });
}
