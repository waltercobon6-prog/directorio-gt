import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { prisma } from "@/lib/prisma";
import { absoluteUrl, siteName } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

async function getBusiness(slug: string) {
  return prisma.business.findUnique({ where: { slug }, include: { category: true } });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const business = await getBusiness(slug);
  if (!business) return {};
  const title = business.seoTitle ?? `${business.name} en ${business.city ?? "Guatemala"}`;
  const description = business.seoDescription ?? `${business.name}: ${business.description}`;
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/negocio/${business.slug}`) },
    openGraph: { title, description, url: absoluteUrl(`/negocio/${business.slug}`), siteName },
  };
}

export async function generateStaticParams() {
  const businesses = await prisma.business.findMany({ where: { isActive: true }, select: { slug: true } });
  return businesses.map((business: { slug: string }) => ({
  slug: business.slug,
}));
}

export default async function BusinessDetailPage({ params }: Props) {
  const { slug } = await params;
  const business = await getBusiness(slug);
  if (!business || !business.isActive) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description,
    url: absoluteUrl(`/negocio/${business.slug}`),
    telephone: business.phone,
    email: business.email,
    address: business.address,
    aggregateRating: business.rating ? { "@type": "AggregateRating", ratingValue: business.rating.toString(), reviewCount: business.views || 1 } : undefined,
  };

  return (
    <main className="section">
      <Script id="local-business-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container">
        <p className="eyebrow">/negocio/{business.slug}</p>
        <div className="detail-hero">
          <div className="gallery"><div><h2>Galería de imágenes</h2><p>Espacio para fotografías optimizadas en WebP.</p></div></div>
          <div className="card">
            <span className="badge">{business.category.name} · ⭐ {business.rating?.toString() ?? "Nuevo"}</span>
            <h1 style={{ textAlign: "left", fontSize: "clamp(34px,5vw,58px)", marginTop: 18 }}>{business.name}</h1>
            <p className="lead" style={{ margin: "16px 0 0", textAlign: "left" }}>{business.description}</p>
            <div className="info" style={{ marginTop: 24 }}>
              {business.address && <span>📍 {business.address}</span>}
              {business.phone && <span>☎ {business.phone}</span>}
              {business.whatsapp && <span>💬 {business.whatsapp}</span>}
              {business.email && <span>✉ {business.email}</span>}
              {business.website && <span>🌐 {business.website}</span>}
              {business.hours && <span>🕒 {business.hours}</span>}
            </div>
            <div className="actions">
              {business.whatsapp && <a className="whatsapp" href={`https://wa.me/${business.whatsapp.replace(/\D/g, "")}`}>Contactar por WhatsApp</a>}
              {business.phone && <a className="primary" href={`tel:${business.phone}`}>Llamar ahora</a>}
            </div>
          </div>
        </div>

        <div className="section-head" style={{ marginTop: 44 }}><div><p className="eyebrow">Mapa y video</p><h2>Ubicación y contenido multimedia</h2></div></div>
        <div className="business-grid">
          <div className="mapbox"><div><h2>Mapa preparado</h2><p className="desc">Google Maps u OpenStreetMap.</p></div></div>
          <div className="video">▶ Video de YouTube embebido preparado</div>
          <div className="video">Schema LocalBusiness activo</div>
        </div>
      </div>
    </main>
  );
}
