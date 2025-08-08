import axios from "axios";
import type { AppsCollectionResult } from "@/types/app";

export const api = {
  listApps: () =>
    axios
      .get<AppsCollectionResult>("/data/pwa-data.json")
      .then((res) => res.data),
};
