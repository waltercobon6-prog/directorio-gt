export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://directoriogt.com";
export const siteName = "Directorio Comercial Guatemala";

export function absoluteUrl(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
