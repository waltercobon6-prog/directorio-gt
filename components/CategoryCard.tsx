import Link from "next/link";

export function CategoryCard({ category }: { category: { name: string; slug: string; icon: string | null; _count: { businesses: number } } }) {
  return (
    <Link className="card cat-card" href={`/categoria/${category.slug}`}>
      <div className="cat-icon">{category.icon ?? "🏢"}</div>
      <h3>{category.name}</h3>
      <p className="desc"><strong>{category._count.businesses}</strong> empresas</p>
    </Link>
  );
}
