/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const teamMembersData = [
  {
    id: 'abdi-birassa',
    name: 'Abdi Birassa',
    role: 'CEO & Co‑Founder',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
    email: 'abdi@example.com',
    linkedin: '#',
    owner: true,
    order: 1,
    isActive: true,
  },
  {
    id: 'lulit-bekele',
    name: 'Lulit Bekele',
    role: 'Head of Product',
    imageUrl: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=800&auto=format&fit=crop',
    email: 'lulit@example.com',
    linkedin: '#',
    owner: true,
    order: 2,
    isActive: true,
  },
  {
    id: 'michael-chen',
    name: 'Michael Chen',
    role: 'CTO',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=800&auto=format&fit=crop',
    email: 'michael@example.com',
    linkedin: '#',
    owner: true,
    order: 3,
    isActive: true,
  },
  {
    id: 'jared-smith',
    name: 'Jared Smith',
    role: 'Lead Engineer',
    imageUrl: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop',
    email: 'jared@example.com',
    linkedin: '#',
    owner: true,
    order: 4,
    isActive: true,
  },
];

async function seedTeam() {
  try {
    console.log('Starting to seed team members...');

    for (const member of teamMembersData) {
      await prisma.teamMember.upsert({
        where: { id: member.id },
        update: {
          name: member.name,
          role: member.role,
          imageUrl: member.imageUrl,
          email: member.email,
          linkedin: member.linkedin,
          owner: member.owner,
          order: member.order,
          isActive: member.isActive,
        },
        create: member,
      });
      console.log(`✓ Seeded team member: ${member.name}`);
    }

    console.log('Team members seeded successfully!');
  } catch (error) {
    console.error('Error seeding team members:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedTeam()
  .then(() => {
    console.log('Seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  });

