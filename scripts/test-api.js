/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Script to test the API endpoints
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testAPI() {
  try {
    console.log('Testing content cards API logic...\n');
    
    // Test projects
    const projects = await prisma.contentCard.findMany({
      where: {
        type: 'project',
        isActive: true,
      },
      orderBy: {
        order: 'asc',
      },
    });
    
    console.log(`Projects found: ${projects.length}`);
    projects.forEach(p => {
      console.log(`  - ${p.title} (Active: ${p.isActive}, Order: ${p.order})`);
    });
    
    // Test services
    const services = await prisma.contentCard.findMany({
      where: {
        type: 'service',
        isActive: true,
      },
      orderBy: {
        order: 'asc',
      },
    });
    
    console.log(`\nServices found: ${services.length}`);
    services.forEach(s => {
      console.log(`  - ${s.title} (Active: ${s.isActive}, Order: ${s.order})`);
    });
    
    // Check all cards
    const allCards = await prisma.contentCard.findMany();
    console.log(`\nTotal cards in DB: ${allCards.length}`);
    allCards.forEach(c => {
      console.log(`  - ${c.type}: ${c.title} (Active: ${c.isActive})`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAPI();


