/**
 * Script to seed services and projects content cards
 * 
 * Usage: node scripts/seed-content.js
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const services = [
  {
    type: 'service',
    title: 'Managed Services',
    description: 'At CodeAxis Technologies, our Managed Services are designed to ensure your business operates smoothly and efficiently.',
    iconName: 'Settings',
    linkUrl: '/service-details?title=managed-services',
    order: 1,
  },
  {
    type: 'service',
    title: 'Cybersecurity Services',
    description: 'At CodeAxis Technologies, our Cybersecurity Services are designed to provide robust protection against...',
    iconName: 'Shield',
    linkUrl: '/service-details?title=cybersecurity-services',
    order: 2,
  },
  {
    type: 'service',
    title: 'Software Development',
    description: 'At CodeAxis Technologies, we offer a comprehensive range of software development solutions tailored to...',
    iconName: 'Code',
    linkUrl: '/service-details?title=software-development',
    order: 3,
  },
  {
    type: 'service',
    title: 'Training And Development',
    description: 'At CodeAxis Technologies, our Training and Development Services are designed to empower your team with...',
    iconName: 'Users',
    linkUrl: '/service-details?title=training-development',
    order: 4,
  },
  {
    type: 'service',
    title: 'Infrastructure Services',
    description: 'At CodeAxis Technologies, our Infrastructure Services are designed to provide a robust and scalable...',
    iconName: 'Network',
    linkUrl: '/service-details?title=infrastructure-services',
    order: 5,
  },
  {
    type: 'service',
    title: 'System Integration',
    description: 'At CodeAxis Technologies, our System Integration services are designed to seamlessly connect your...',
    iconName: 'Lock',
    linkUrl: '/service-details?title=system-integration',
    order: 6,
  },
];

const projects = [
  {
    type: 'project',
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'A modern, scalable e-commerce solution with advanced features and seamless user experience.',
    imageUrl: null,
    order: 1,
  },
  {
    type: 'project',
    title: 'Mobile Banking App',
    category: 'Mobile Development',
    description: 'Secure and intuitive mobile banking application with real-time transaction processing.',
    imageUrl: null,
    order: 2,
  },
  {
    type: 'project',
    title: 'AI Analytics Dashboard',
    category: 'Data Analytics',
    description: 'Intelligent dashboard powered by AI for real-time business insights and predictions.',
    imageUrl: null,
    order: 3,
  },
  {
    type: 'project',
    title: 'Healthcare Management System',
    category: 'Healthcare IT',
    description: 'Comprehensive hospital management system with patient records and appointment scheduling.',
    imageUrl: null,
    order: 4,
  },
  {
    type: 'project',
    title: 'Cloud Infrastructure',
    category: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure setup for enterprise-level applications and services.',
    imageUrl: null,
    order: 5,
  },
  {
    type: 'project',
    title: 'IoT Smart Home System',
    category: 'IoT Development',
    description: 'Connected smart home ecosystem with automated controls and energy management.',
    imageUrl: null,
    order: 6,
  },
];

async function seedContent() {
  try {
    console.log('Seeding content cards (services and projects)...\n');

    // Seed Services
    console.log('Seeding services...');
    for (const service of services) {
      // Check if service already exists by title and type
      const existing = await prisma.contentCard.findFirst({
        where: {
          type: 'service',
          title: service.title,
        },
      });

      if (existing) {
        await prisma.contentCard.update({
          where: { id: existing.id },
          data: service,
        });
        console.log(`✓ Updated service: ${service.title}`);
      } else {
        await prisma.contentCard.create({
          data: service,
        });
        console.log(`✓ Created service: ${service.title}`);
      }
    }

    // Seed Projects
    console.log('\nSeeding projects...');
    for (const project of projects) {
      // Check if project already exists by title and type
      const existing = await prisma.contentCard.findFirst({
        where: {
          type: 'project',
          title: project.title,
        },
      });

      if (existing) {
        await prisma.contentCard.update({
          where: { id: existing.id },
          data: project,
        });
        console.log(`✓ Updated project: ${project.title}`);
      } else {
        await prisma.contentCard.create({
          data: project,
        });
        console.log(`✓ Created project: ${project.title}`);
      }
    }

    console.log('\n✅ All content seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding content:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedContent();


