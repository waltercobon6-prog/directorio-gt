import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { name: "Restaurantes", slug: "restaurantes", icon: "🍽️", sortOrder: 1 },
  { name: "Salud", slug: "salud", icon: "🏥", sortOrder: 2 },
  { name: "Educación", slug: "educacion", icon: "🎓", sortOrder: 3 },
  { name: "Turismo", slug: "turismo", icon: "✈️", sortOrder: 4 },
  { name: "Belleza", slug: "belleza", icon: "💇", sortOrder: 5 },
  { name: "Automotriz", slug: "automotriz", icon: "🚗", sortOrder: 6 },
  { name: "Hogar", slug: "hogar", icon: "🏠", sortOrder: 7 },
  { name: "Servicios", slug: "servicios", icon: "🏢", sortOrder: 8 },
];

const businesses = [
  {
    name: "Restaurante La Antigua",
    slug: "restaurante-la-antigua",
    categorySlug: "restaurantes",
    description: "Cocina guatemalteca contemporánea, ambiente familiar y excelente ubicación turística.",
    phone: "+502 5555-1234",
    whatsapp: "+502 5555-1234",
    email: "reservas@laantigua.gt",
    website: "https://www.laantigua.gt",
    address: "Antigua Guatemala, Sacatepéquez",
    city: "Antigua Guatemala",
    department: "Sacatepéquez",
    hours: "Lunes a domingo · 8:00 AM - 10:00 PM",
    rating: 4.8,
    isFeatured: true,
  },
  {
    name: "Clínica Vida Salud",
    slug: "clinica-vida-salud",
    categorySlug: "salud",
    description: "Servicios médicos generales, laboratorio, atención preventiva y citas por WhatsApp.",
    phone: "+502 2222-9080",
    whatsapp: "+502 2222-9080",
    email: "info@vidasalud.gt",
    website: "https://www.vidasalud.gt",
    address: "Zona 10, Ciudad de Guatemala",
    city: "Ciudad de Guatemala",
    department: "Guatemala",
    hours: "Lunes a sábado · 7:00 AM - 6:00 PM",
    rating: 4.7,
    isFeatured: true,
  },
  {
    name: "Academia Futuro GT",
    slug: "academia-futuro-gt",
    categorySlug: "educacion",
    description: "Cursos técnicos, formación digital y programas educativos para jóvenes y adultos.",
    phone: "+502 3333-1212",
    whatsapp: "+502 3333-1212",
    email: "contacto@futurogt.edu.gt",
    website: "https://www.futurogt.edu.gt",
    address: "Mixco, Guatemala",
    city: "Mixco",
    department: "Guatemala",
    hours: "Lunes a viernes · 9:00 AM - 5:00 PM",
    rating: 4.6,
    isFeatured: false,
  },
];

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: {
        ...category,
        seoTitle: `${category.name} en Guatemala | Directorio Comercial Guatemala`,
        seoDescription: `Encuentra empresas de ${category.name.toLowerCase()} en Guatemala con teléfono, WhatsApp, ubicación y horarios.`,
      },
    });
  }

  for (const business of businesses) {
    const { categorySlug, ...businessData } = business;
    const category = await prisma.category.findUniqueOrThrow({ where: { slug: categorySlug } });
    await prisma.business.upsert({
      where: { slug: business.slug },
      update: { ...businessData, categoryId: category.id },
      create: { ...businessData, categoryId: category.id },
    });
  }
}

main()
  .finally(async () => prisma.$disconnect());
