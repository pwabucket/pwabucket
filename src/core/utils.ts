export function appName(name: string) {
  return name.replace(import.meta.env.VITE_ORG_NAME + "-", "");
}

export function appDomain(name: string) {
  return import.meta.env.VITE_ORG_APP_DOMAIN.replace("{NAME}", name);
}

export function appDomainPath(name: string, path: string) {
  return appDomain(name) + path;
}
