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
    const width = (window.outerWidth * 70) / 100;
    const height = (window.outerHeight * 90) / 100;
    window.open(
      appDomain(name),
      "_blank",
      `popup,left=100,top=100,width=${width},height=${height}`
    );
  };
}
