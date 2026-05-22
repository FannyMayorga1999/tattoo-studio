import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.artist.create({
    data: {
      name: "Elena Ink",
      bio: "With over 10 years of experience, Elena specializes in custom tattoo design, bringing each client's vision to life with precision and artistry. Based in downtown Seattle, she creates everything from delicate fine-line work to bold traditional pieces.",
      avatar: null,
      email: "elena@inkartstudio.com",
      phone: "+1 (555) 123-4567",
      location: "Seattle, WA",
      socialLinks: {
        instagram: "https://instagram.com/elena.ink",
        facebook: "https://facebook.com/elena.ink",
        pinterest: "https://pinterest.com/elena.ink",
      },
      experience: 10,
    },
  });

  const styles = [
    { name: "Traditional", description: "Bold lines and classic colors with timeless American traditional designs.", icon: "⚓", order: 1 },
    { name: "Realism", description: "Highly detailed pieces that capture lifelike portraits and imagery.", icon: "🎨", order: 2 },
    { name: "Fine Line", description: "Delicate, minimalistic designs with thin precise lines.", icon: "✏️", order: 3 },
    { name: "Geometric", description: "Symmetrical patterns and sacred geometry with clean edges.", icon: "🔷", order: 4 },
    { name: "Blackwork", description: "Bold black ink designs from intricate patterns to solid silhouettes.", icon: "🖤", order: 5 },
    { name: "Watercolor", description: "Soft, vibrant designs that mimic watercolor painting techniques.", icon: "🌈", order: 6 },
  ];

  for (const style of styles) {
    await prisma.tattooStyle.create({ data: style });
  }

  const portfolioItems = [
    { title: "Dragon Sleeve", description: "Full-color traditional dragon sleeve with Japanese influences.", imageUrl: "/images/portfolio/dragon-sleeve.jpg", category: "Traditional", featured: true },
    { title: "Portrait of a Wolf", description: "Hyper-realistic wolf portrait on the forearm.", imageUrl: "/images/portfolio/wolf-portrait.jpg", category: "Realism", featured: true },
    { title: "Minimalist Rose", description: "Delicate fine-line rose on the inner wrist.", imageUrl: "/images/portfolio/fine-rose.jpg", category: "Fine Line", featured: false },
    { title: "Sacred Geometry", description: "Mandala and sacred geometry piece covering the shoulder blade.", imageUrl: "/images/portfolio/geometry.jpg", category: "Geometric", featured: true },
    { title: "Floral Back Piece", description: "Intricate blackwork floral design spanning the full back.", imageUrl: "/images/portfolio/blackwork-floral.jpg", category: "Blackwork", featured: false },
    { title: "Galaxy Arm", description: "Watercolor galaxy scene with vibrant nebula colors.", imageUrl: "/images/portfolio/galaxy.jpg", category: "Watercolor", featured: true },
    { title: "Anchor Traditional", description: "Classic sailor anchor with banner on the bicep.", imageUrl: "/images/portfolio/anchor.jpg", category: "Traditional", featured: false },
    { title: "Lion Realism", description: "Realistic lion portrait with detailed fur texture.", imageUrl: "/images/portfolio/lion.jpg", category: "Realism", featured: false },
    { title: "Constellation Wrist", description: "Fine-line constellation connecting stars on the wrist.", imageUrl: "/images/portfolio/constellation.jpg", category: "Fine Line", featured: false },
    { title: "Dotwork Mandala", description: "Geometric mandala created entirely with dotwork technique.", imageUrl: "/images/portfolio/dotwork.jpg", category: "Geometric", featured: false },
    { title: "Abstract Blackwork", description: "Abstract flowing lines and shapes in solid black.", imageUrl: "/images/portfolio/abstract-bw.jpg", category: "Blackwork", featured: false },
    { title: "Butterfly Watercolor", description: "Colorful watercolor butterfly with splatter effects.", imageUrl: "/images/portfolio/butterfly.jpg", category: "Watercolor", featured: false },
  ];

  for (const item of portfolioItems) {
    await prisma.portfolioItem.create({ data: item });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
