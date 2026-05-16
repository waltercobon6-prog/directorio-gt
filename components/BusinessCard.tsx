import Link from "next/link";
import type { Business, Category } from "@prisma/client";

type BusinessWithCategory = Business & { category: Category };

export function BusinessCard({ business }: { business: BusinessWithCategory }) {
  return (
    <article className="card business-card">
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div className="cat-icon">🏢</div>
        <div>
          <h3 style={{ margin: 0 }}>{business.name}</h3>
          <span className="badge">{business.category.name} · ⭐ {business.rating?.toString() ?? "Nuevo"}</span>
        </div>
      </div>
      <p className="desc">{business.description}</p>
      <div className="info">
        {business.address && <span>📍 {business.address}</span>}
        {business.phone && <span>☎ {business.phone}</span>}
        {business.hours && <span>🕒 {business.hours}</span>}
      </div>
      <div className="actions">
        {business.whatsapp && <a className="whatsapp" href={`https://wa.me/${business.whatsapp.replace(/\D/g, "")}`}>WhatsApp</a>}
        <Link className="outline" href={`/negocio/${business.slug}`}>Ver detalle</Link>
      </div>
    </article>
  );
}
