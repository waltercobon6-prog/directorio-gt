import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, businesses] = await Promise.all([
    prisma.category.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
    prisma.business.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
  ]);

  return [
    { url: absoluteUrl("/"), lastModified: new Date() },
    { url: absoluteUrl("/contactenos"), lastModified: new Date() },
    { url: absoluteUrl("/quienes-somos"), lastModified: new Date() },
    ...categories.map((c) => ({ url: absoluteUrl(`/categoria/${c.slug}`), lastModified: c.updatedAt })),
    ...businesses.map((b) => ({ url: absoluteUrl(`/negocio/${b.slug}`), lastModified: b.updatedAt })),
  ];
}
