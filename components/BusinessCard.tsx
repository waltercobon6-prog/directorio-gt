import Link from "next/link";

type BusinessWithCategory = {
  slug: string;
  name: string;
  description: string | null;
  address: string | null;
  city: string | null;
  phone: string | null;
  whatsapp: string | null;
  hours: string | null;
  rating: number | null;
  category: {
    name: string;
    slug: string;
  };
};

export function BusinessCard({
  business,
}: {
  business: BusinessWithCategory;
}) {
  return (
    <article className="business-card">
      <div className="business-top">
        <div className="biz-logo">🏢</div>

        <div>
          <h3>{business.name}</h3>

          <span className="badge">
            {business.category.name} · ⭐{" "}
            {business.rating ?? "Nuevo"}
          </span>
        </div>
      </div>

      <p className="desc">
        {business.description ??
          "Negocio registrado en Directorio Comercial Guatemala."}
      </p>

      <div className="info">
        <span>
          📍 {business.address ?? business.city ?? "Guatemala"}
        </span>

        <span>
          ☎ {business.phone ?? "Teléfono no disponible"}
        </span>

        <span>
          🕒 {business.hours ?? "Horario no disponible"}
        </span>
      </div>

      <div className="actions">
        {business.whatsapp ? (
          <a
            className="whatsapp"
            href={`https://wa.me/${business.whatsapp.replace(
              /\D/g,
              ""
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        ) : (
          <button className="whatsapp">WhatsApp</button>
        )}

        <Link
          className="outline"
          href={`/negocio/${business.slug}`}
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
}
