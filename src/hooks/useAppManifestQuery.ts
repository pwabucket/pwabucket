import axios from "axios";
import type { WebAppManifest } from "web-app-manifest";
import { useQuery } from "@tanstack/react-query";

export default function useAppManifestQuery(repo: string, homepage: string) {
  return useQuery({
    queryKey: ["manifest", repo, homepage],
    queryFn: () =>
      axios.get(new URL("manifest.webmanifest", homepage).href).then((res) => {
        return { data: res.data as WebAppManifest };
      }),
  });
}
