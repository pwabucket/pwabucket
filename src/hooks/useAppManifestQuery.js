import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function useAppManifestQuery(repo, homepage) {
  return useQuery({
    queryKey: ["manifest", repo, homepage],
    queryFn: () =>
      axios.get(new URL("manifest.webmanifest", homepage).href).then((res) => {
        return { data: res.data };
      }),
  });
}
