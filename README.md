# Directorio Comercial Guatemala — Fase 2

Base real del proyecto con Next.js App Router, Prisma y PostgreSQL.

## Instalación

```bash
npm install
cp .env.example .env
# editar DATABASE_URL
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run db:seed
npm run dev
```

## Rutas incluidas

- `/`
- `/categoria/[slug]`
- `/negocio/[slug]`
- `/contactenos`
- `/quienes-somos`
- `/sitemap.xml`
- `/robots.txt`

## Pendiente para Fase 2.2

- Panel admin para crear categorías y negocios.
- Subida de imágenes.
- Autenticación.
- Mapa real.
- Endpoint real para formulario de contacto.
