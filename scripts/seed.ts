// scripts/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'tiger@example.com' },
    update: {},
    create: {
      name: 'Tiger',
      email: 'tiger@example.com',
      password: 'secret123', // 🔐 NOTE: Always hash passwords in production
      stocks: {
        create: [
          {
            name: 'Reliance Industries',
            symbol: 'RELIANCE',
            quantity: 20,
          },
          {
            name: 'Infosys Ltd',
            symbol: 'INFY',
            quantity: 15,
          },
        ],
      },
    },
  });

  console.log('✅ Seeded:', user);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
