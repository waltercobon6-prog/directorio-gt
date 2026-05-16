import Link from "next/link";

export function Header() {
  return (
    <header className="header">
      <div className="container head-main">
        <Link className="logo" href="/">
          <span className="logo-mark">GT</span>
          <span>Directorio GT<small>Comercial Guatemala</small></span>
        </Link>
        <nav className="nav">
          <Link href="/">Inicio</Link>
          <Link href="/#categorias">Categorías</Link>
          <Link href="/contactenos">Contáctenos</Link>
          <Link href="/quienes-somos">Quiénes Somos</Link>
        </nav>
      </div>
      <div className="socialbar">
        <div className="container social-inner">
          <div className="social-left"><span>Facebook</span><span>Instagram</span><span>TikTok</span><span>WhatsApp</span><span>YouTube</span></div>
          <div>Espacio para futuros iconos</div>
        </div>
      </div>
    </header>
  );
}
