import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteName, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Empresas y negocios en Guatemala`,
    template: `%s | ${siteName}`,
  },
  description: "Encuentra restaurantes, hoteles, clínicas, comercios, servicios y empresas en Guatemala de forma rápida y sencilla.",
  openGraph: {
    type: "website",
    locale: "es_GT",
    siteName,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-GT">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
