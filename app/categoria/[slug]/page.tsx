import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { absoluteUrl, siteName } from "@/lib/seo";
import { BusinessCard } from "@/components/BusinessCard";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ q?: string; sort?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return {};
  const title = category.seoTitle ?? `${category.name} en Guatemala`;
  const description = category.seoDescription ?? `Encuentra empresas de ${category.name.toLowerCase()} en Guatemala.`;
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/categoria/${category.slug}`) },
    openGraph: { title, description, url: absoluteUrl(`/categoria/${category.slug}`), siteName },
  };
}

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({ where: { isActive: true }, select: { slug: true } });
  return categories.map((category: { slug: string }) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category || !category.isActive) notFound();

  const q = query.q?.trim();
  const sort = query.sort ?? "relevancia";

  const businesses = await prisma.business.findMany({
    where: {
      isActive: true,
      categoryId: category.id,
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { description: { contains: q, mode: "insensitive" } },
              { address: { contains: q, mode: "insensitive" } },
              { city: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy:
      sort === "nombre"
        ? [{ name: "asc" }]
        : sort === "recientes"
          ? [{ createdAt: "desc" }]
          : [{ isFeatured: "desc" }, { rating: "desc" }, { views: "desc" }],
    include: { category: true },
  });

  return (
    <main className="section alt">
      <div className="container">
        <p className="eyebrow">/categoria/{category.slug}</p>
        <div className="section-head">
          <div>
            <h1 style={{ textAlign: "left" }}>{category.name} en Guatemala</h1>
            <p className="lead" style={{ marginLeft: 0, textAlign: "left" }}>{category.seoDescription}</p>
          </div>
        </div>

        <form className="toolbar" action={`/categoria/${category.slug}`} method="GET">
          <input className="mini-search" name="q" defaultValue={q} placeholder="Filtrar empresas" />
          <select className="select" name="sort" defaultValue={sort}>
            <option value="relevancia">Más relevantes</option>
            <option value="nombre">Nombre</option>
            <option value="vistos">Más vistos</option>
            <option value="valorados">Mejor valorados</option>
            <option value="recientes">Más recientes</option>
          </select>
          <button className="primary">Aplicar</button>
        </form>

        {businesses.length ? (
          <div className="business-grid">{businesses.map((business) => <BusinessCard key={business.slug} business={business} />)}</div>
        ) : (
          <div className="mapbox"><p>No hay negocios activos en esta categoría todavía.</p></div>
        )}

        <div className="mapbox" style={{ marginTop: 24 }}>
          <div><h2>Vista de mapa preparada</h2><p className="desc">Aquí se integrará Google Maps u OpenStreetMap para negocios de {category.name}.</p></div>
        </div>
      </div>
    </main>
  );
}
