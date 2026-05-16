import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="logo"><span className="logo-mark">GT</span><span>Directorio GT<small>Comercial Guatemala</small></span></div>
          <p className="desc">Directorio Comercial Guatemala para encontrar empresas, servicios y negocios por categoría.</p>
        </div>
        <nav>
          <Link href="/">Inicio</Link>
          <Link href="/#categorias">Categorías</Link>
          <Link href="/contactenos">Contáctenos</Link>
          <Link href="/quienes-somos">Quiénes Somos</Link>
        </nav>
        <form className="searchbox" style={{ margin: 0, boxShadow: "none" }} action="/" method="GET">
          <input name="q" placeholder="Buscar negocios" />
        </form>
      </div>
    </footer>
  );
}
