export function appName(name: string) {
  return name.replace(import.meta.env.VITE_ORG_NAME + "-", "");
}

export function appDomain(name: string) {
  return import.meta.env.VITE_ORG_APP_DOMAIN.replace("{NAME}", name);
}

export function appDomainPath(name: string, path: string) {
  return appDomain(name) + path;
}

export function appClickHandler(name: string) {
  return function () {
    const width = (window.outerWidth * 80) / 100;
    const height = (window.outerHeight * 80) / 100;
    const left = (window.outerWidth - width) / 2;
    const top = (window.outerHeight - height) / 2;

    window.open(
      appDomain(name),
      undefined,
      `popup,left=${left},top=${top},width=${width},height=${height}`
    );
  };
}
