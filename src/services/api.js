import axios from "axios";

export const api = {
  listApps: () => axios.get("/data/pwa-data.json").then((res) => res.data),
};
