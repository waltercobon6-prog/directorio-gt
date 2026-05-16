import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quiénes Somos",
  description: "Conoce la historia, misión, visión y beneficios del Directorio Comercial Guatemala.",
};

const sections = [
  ["historia", "Nuestra Historia", "Nacimos con la visión de crear un punto de encuentro digital para empresas, comercios, profesionales y usuarios en Guatemala."],
  ["mision", "Misión", "Ayudar a las personas a encontrar negocios confiables de forma rápida y sencilla, impulsando la visibilidad digital de las empresas guatemaltecas."],
  ["vision", "Visión", "Convertirnos en el directorio comercial líder de Guatemala, con tecnología moderna, SEO sólido y experiencia de usuario premium."],
  ["valores", "Valores", "Confianza, claridad, innovación, cercanía, servicio y compromiso con el crecimiento del comercio local."],
  ["beneficios", "Beneficios", "Los usuarios encuentran opciones relevantes; las empresas obtienen presencia digital, contactos y posicionamiento orgánico."],
];

export default function QuienesSomosPage() {
  return (
    <main>
      <div style={{ position: "sticky", top: 0, zIndex: 5, background: "white", borderBottom: "1px solid var(--line)", padding: 12 }}>
        <div className="container" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {sections.map(([id, title]) => <a className="outline" key={id} href={`#${id}`}>{title}</a>)}
          <Link className="primary" href="/">Inicio</Link>
        </div>
      </div>
      {sections.map(([id, title, text]) => (
        <section className="section" id={id} key={id} style={{ minHeight: "78vh", display: "grid", placeItems: "center", textAlign: "center", borderBottom: "1px solid var(--line)" }}>
          <div className="container" style={{ maxWidth: 820 }}>
            <p className="eyebrow">Quiénes somos</p>
            <h1>{title}</h1>
            <p className="lead">{text}</p>
          </div>
        </section>
      ))}
    </main>
  );
}
