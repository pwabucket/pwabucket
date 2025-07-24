import axios from "axios";

export const api = {
  listApps: () =>
    axios
      .get(
        import.meta.env.DEV
          ? "/data/pwa-data.json"
          : `https://raw.githubusercontent.com/${
              import.meta.env.VITE_APP_ORG
            }/${import.meta.env.VITE_APP_ID}/main/public/data/pwa-data.json`
      )
      .then((res) => res.data),
};
