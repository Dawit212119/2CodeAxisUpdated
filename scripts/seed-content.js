/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Script to seed services, service section cards, and projects
 * 
 * Usage: node scripts/seed-content.js
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const services = [
  {
    type: 'service',
    title: 'Managed Services',
    description: 'At Habesha Software Solutions, our Managed Services are designed to ensure your business operates smoothly and efficiently.',
    iconName: 'Settings',
    linkUrl: '/service-details?title=managed-services',
    category: 'Software Solutions',
    order: 1,
  },
  {
    type: 'service',
    title: 'Cybersecurity Services',
    description: 'At Habesha Software Solutions, our Cybersecurity Services are designed to provide robust protection against...',
    iconName: 'Shield',
    linkUrl: '/service-details?title=cybersecurity-services',
    category: 'Software Solutions',
    order: 2,
  },
  {
    type: 'service',
    title: 'Software Development',
    description: 'At Habesha Software Solutions, we offer a comprehensive range of software development solutions tailored to...',
    iconName: 'Code',
    linkUrl: '/service-details?title=software-development',
    category: 'Software Solutions',
    order: 3,
  },
  {
    type: 'service',
    title: 'Training And Development',
    description: 'At Habesha Software Solutions, our Training and Development Services are designed to empower your team with...',
    iconName: 'Users',
    linkUrl: '/service-details?title=training-development',
    category: 'Software Solutions',
    order: 4,
  },
  {
    type: 'service',
    title: 'Infrastructure Services',
    description: 'At Habesha Software Solutions, our Infrastructure Services are designed to provide a robust and scalable...',
    iconName: 'Network',
    linkUrl: '/service-details?title=infrastructure-services',
    category: 'Software Solutions',
    order: 5,
  },
  {
    type: 'service',
    title: 'System Integration',
    description: 'At Habesha Software Solutions, our System Integration services are designed to seamlessly connect your...',
    iconName: 'Lock',
    linkUrl: '/service-details?title=system-integration',
    category: 'Software Solutions',
    order: 6,
  },
];

// Service Section Cards (for homepage services section)
const serviceSectionCards = [
  {
    type: 'service-section',
    title: 'Software Solutions',
    description: 'Comprehensive software development, managed services, infrastructure, system integration, training, and cybersecurity solutions.',
    iconName: 'Code',
    linkUrl: '/services',
    order: 1,
  },
  {
    type: 'service-section',
    title: 'Teaching',
    description: 'Hands-on training programs in software development, cloud computing, and cybersecurity. Build real-world skills with expert instructors.',
    iconName: 'BookOpen',
    linkUrl: '/learn',
    order: 2,
  },
  {
    type: 'service-section',
    title: 'Guide University Students',
    description: 'Expert mentorship and technical support for your academic projects. Turn your ideas into portfolio-worthy solutions.',
    iconName: 'GraduationCap',
    linkUrl: '/guide-students',
    order: 3,
  },
];

// Projects - to be seeded in Project model
const projects = [
  {
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'A modern, scalable e-commerce solution with advanced features and seamless user experience.',
    imageUrl: null,
    modalImageUrl: null,
    detailDescription: 'A comprehensive e-commerce platform built with modern technologies, featuring advanced search, payment integration, inventory management, and analytics dashboard.',
    linkUrl: null,
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe API'],
    client: 'Retail Company',
    date: 'January 2024',
    duration: '4 months',
    features: ['Advanced product search', 'Payment gateway integration', 'Real-time inventory tracking', 'Analytics dashboard'],
    order: 1,
    isActive: true,
  },
  {
    title: 'Mobile Banking App',
    category: 'Mobile Development',
    description: 'Secure and intuitive mobile banking application with real-time transaction processing.',
    imageUrl: null,
    modalImageUrl: null,
    detailDescription: 'A secure mobile banking application with biometric authentication, real-time transaction processing, bill payments, and investment tracking features.',
    linkUrl: null,
    technologies: ['React Native', 'Node.js', 'MongoDB', 'AWS'],
    client: 'Financial Institution',
    date: 'March 2024',
    duration: '6 months',
    features: ['Biometric authentication', 'Real-time transactions', 'Bill payments', 'Investment tracking'],
    order: 2,
    isActive: true,
  },
  {
    title: 'AI Analytics Dashboard',
    category: 'Data Analytics',
    description: 'Intelligent dashboard powered by AI for real-time business insights and predictions.',
    imageUrl: null,
    modalImageUrl: null,
    detailDescription: 'An AI-powered analytics dashboard that provides real-time business insights, predictive analytics, and automated reporting for data-driven decision making.',
    linkUrl: null,
    technologies: ['Python', 'TensorFlow', 'React', 'PostgreSQL'],
    client: 'Tech Corporation',
    date: 'May 2024',
    duration: '5 months',
    features: ['Real-time analytics', 'AI predictions', 'Automated reports', 'Custom dashboards'],
    order: 3,
    isActive: true,
  },
  {
    title: 'Healthcare Management System',
    category: 'Healthcare IT',
    description: 'Comprehensive hospital management system with patient records and appointment scheduling.',
    imageUrl: null,
    modalImageUrl: null,
    detailDescription: 'A comprehensive healthcare management system featuring patient records management, appointment scheduling, billing, and telemedicine capabilities.',
    linkUrl: null,
    technologies: ['Angular', 'Java', 'MySQL', 'Docker'],
    client: 'Hospital Network',
    date: 'July 2024',
    duration: '8 months',
    features: ['Patient records', 'Appointment scheduling', 'Billing system', 'Telemedicine'],
    order: 4,
    isActive: true,
  },
  {
    title: 'Cloud Infrastructure',
    category: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure setup for enterprise-level applications and services.',
    imageUrl: null,
    modalImageUrl: null,
    detailDescription: 'Enterprise cloud infrastructure setup with auto-scaling, load balancing, disaster recovery, and multi-region deployment capabilities.',
    linkUrl: null,
    technologies: ['AWS', 'Kubernetes', 'Terraform', 'Docker'],
    client: 'Enterprise Client',
    date: 'September 2024',
    duration: '3 months',
    features: ['Auto-scaling', 'Load balancing', 'Disaster recovery', 'Multi-region deployment'],
    order: 5,
    isActive: true,
  },
  {
    title: 'IoT Smart Home System',
    category: 'IoT Development',
    description: 'Connected smart home ecosystem with automated controls and energy management.',
    imageUrl: null,
    modalImageUrl: null,
    detailDescription: 'An IoT-based smart home system with automated lighting, temperature control, security monitoring, and energy management features.',
    linkUrl: null,
    technologies: ['Arduino', 'Raspberry Pi', 'MQTT', 'React'],
    client: 'Smart Home Company',
    date: 'November 2024',
    duration: '6 months',
    features: ['Automated controls', 'Energy management', 'Security monitoring', 'Mobile app integration'],
    order: 6,
    isActive: true,
  },
];

async function seedContent() {
  try {
    console.log('Seeding content (services, service sections, and projects)...\n');

    // Seed Services into ContentCard
    console.log('Seeding services into ContentCard...');
    for (const service of services) {
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

    // Seed Service Section Cards into ContentCard
    console.log('\nSeeding service section cards into ContentCard...');
    for (const card of serviceSectionCards) {
      const existing = await prisma.contentCard.findFirst({
        where: {
          type: 'service-section',
          title: card.title,
        },
      });

      if (existing) {
        await prisma.contentCard.update({
          where: { id: existing.id },
          data: card,
        });
        console.log(`✓ Updated service section card: ${card.title}`);
      } else {
        await prisma.contentCard.create({
          data: card,
        });
        console.log(`✓ Created service section card: ${card.title}`);
      }
    }

    // Seed Projects into Project model (NOT ContentCard)
    console.log('\nSeeding projects into Project model...');
    for (const project of projects) {
      const existing = await prisma.project.findFirst({
        where: {
          title: project.title,
        },
      });

      if (existing) {
        // Update existing project
        await prisma.project.update({
          where: { id: existing.id },
          data: {
            title: project.title,
            category: project.category,
            description: project.description,
            imageUrl: project.imageUrl,
            modalImageUrl: project.modalImageUrl,
            detailDescription: project.detailDescription,
            linkUrl: project.linkUrl,
            technologies: project.technologies ? JSON.stringify(project.technologies) : null,
            client: project.client,
            date: project.date,
            duration: project.duration,
            features: project.features ? JSON.stringify(project.features) : null,
            order: project.order,
            isActive: project.isActive,
          },
        });
        console.log(`✓ Updated project: ${project.title}`);
      } else {
        // Create new project
        await prisma.project.create({
          data: {
            title: project.title,
            category: project.category,
            description: project.description,
            imageUrl: project.imageUrl,
            modalImageUrl: project.modalImageUrl,
            detailDescription: project.detailDescription,
            linkUrl: project.linkUrl,
            technologies: project.technologies ? JSON.stringify(project.technologies) : null,
            client: project.client,
            date: project.date,
            duration: project.duration,
            features: project.features ? JSON.stringify(project.features) : null,
            order: project.order,
            isActive: project.isActive,
          },
        });
        console.log(`✓ Created project: ${project.title}`);
      }
    }

    // Clean up: Remove projects from ContentCard (if any exist)
    console.log('\nCleaning up: Removing projects from ContentCard...');
    const projectCards = await prisma.contentCard.findMany({
      where: {
        type: 'project',
      },
    });

    if (projectCards.length > 0) {
      for (const card of projectCards) {
        await prisma.contentCard.delete({
          where: { id: card.id },
        });
        console.log(`✓ Removed project card from ContentCard: ${card.title}`);
      }
    } else {
      console.log('✓ No project cards found in ContentCard to remove');
    }

    console.log('\n✅ All content seeded successfully!');
    console.log(`\nSummary:`);
    console.log(`- Services: ${services.length} (in ContentCard)`);
    console.log(`- Service Section Cards: ${serviceSectionCards.length} (in ContentCard)`);
    console.log(`- Projects: ${projects.length} (in Project model)`);
  } catch (error) {
    console.error('❌ Error seeding content:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedContent();


