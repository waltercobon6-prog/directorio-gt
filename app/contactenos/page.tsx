import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contáctenos",
  description: "Contacta al Directorio Comercial Guatemala para consultas, registros de negocios y soporte.",
};

export default function ContactenosPage() {
  return (
    <main className="section">
      <div className="container contact-grid">
        <div className="contact-card">
          <p className="eyebrow">Contáctenos</p>
          <h1 style={{ textAlign: "left", fontSize: "clamp(34px,5vw,58px)" }}>Conecta con el Directorio Comercial Guatemala</h1>
          <p>Información editable para correo, teléfono, WhatsApp, dirección y redes sociales. Preparado para integrar mapa embebido.</p>
          <p><b>Correo:</b> contacto@directoriogt.com<br /><b>Teléfono:</b> +502 0000-0000<br /><b>WhatsApp:</b> +502 0000-0000</p>
        </div>
        <form className="form">
          <div className="form-grid">
            <input name="name" placeholder="Nombre" />
            <input name="email" placeholder="Correo electrónico" />
            <input name="phone" placeholder="Teléfono" />
            <input name="subject" placeholder="Asunto" />
          </div>
          <textarea name="message" rows={7} placeholder="Mensaje" />
          <button className="primary" type="button" style={{ marginTop: 14 }}>Enviar mensaje</button>
        </form>
      </div>
    </main>
  );
}
