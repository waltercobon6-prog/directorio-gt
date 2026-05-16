import { prisma } from "@/lib/prisma";
import { CategoryCard } from "@/components/CategoryCard";
import { BusinessCard } from "@/components/BusinessCard";

export default async function HomePage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  const q = params.q?.trim();

  const [categories, businesses] = await Promise.all([
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      include: { _count: { select: { businesses: { where: { isActive: true } } } } },
    }),
    prisma.business.findMany({
      where: {
        isActive: true,
        ...(q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
                { address: { contains: q, mode: "insensitive" } },
                { category: { name: { contains: q, mode: "insensitive" } } },
              ],
            }
          : {}),
      },
      orderBy: [{ isFeatured: "desc" }, { rating: "desc" }, { name: "asc" }],
      include: { category: true },
      take: 12,
    }),
  ]);

  return (
    <main>
      <section className="hero">
        <div className="container">
          <span className="pill">Directorio de empresas Guatemala · Negocios en Guatemala · Comercios cerca de ti</span>
          <h1>Directorio Comercial Guatemala</h1>
          <p className="lead">Encuentra restaurantes, hoteles, clínicas, comercios, servicios y empresas en Guatemala de forma rápida, sencilla y confiable.</p>
          <form className="searchbox" action="/" method="GET">
            <input name="q" defaultValue={q} placeholder="Buscar por negocio, palabra clave, categoría o ubicación..." />
            <button className="primary">Buscar</button>
          </form>
          <div style={{ marginTop: 22, display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            {categories.slice(0, 4).map((category) => <a className="outline" key={category.slug} href={`/categoria/${category.slug}`}>{category.name}</a>)}
          </div>
        </div>
      </section>

      <section className="section" id="categorias">
        <div className="container">
          <div className="section-head">
            <div><p className="eyebrow">Categorías</p><h2>Explora negocios por categoría</h2></div>
            <p>Los contadores se actualizan automáticamente según los negocios activos de cada categoría.</p>
          </div>
          <div className="grid">{categories.map((category) => <CategoryCard key={category.slug} category={category} />)}</div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head"><div><p className="eyebrow">Listado inicial</p><h2>{q ? `Resultados para “${q}”` : "Negocios destacados"}</h2></div></div>
          <div className="business-grid">{businesses.map((business) => <BusinessCard key={business.slug} business={business} />)}</div>
        </div>
      </section>
    </main>
  );
}
