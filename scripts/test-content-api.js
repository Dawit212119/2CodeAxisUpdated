/**
 * Test script to verify content cards API endpoint logic
 * This simulates what the API endpoint does
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testContentAPI() {
  try {
    console.log('Testing Content Cards API Logic...\n');
    
    // Test projects endpoint
    console.log('=== Testing Projects (type=project) ===');
    const projectWhere = {
      type: 'project',
      isActive: true,
    };
    
    const projects = await prisma.contentCard.findMany({
      where: projectWhere,
      orderBy: {
        order: 'asc',
      },
    });
    
    console.log(`Found ${projects.length} projects`);
    if (projects.length > 0) {
      console.log('Sample project:', {
        id: projects[0].id,
        title: projects[0].title,
        category: projects[0].category,
        isActive: projects[0].isActive,
      });
    } else {
      console.log('⚠️  No projects found!');
    }
    
    // Test services endpoint
    console.log('\n=== Testing Services (type=service) ===');
    const serviceWhere = {
      type: 'service',
      isActive: true,
    };
    
    const services = await prisma.contentCard.findMany({
      where: serviceWhere,
      orderBy: {
        order: 'asc',
      },
    });
    
    console.log(`Found ${services.length} services`);
    if (services.length > 0) {
      console.log('Sample service:', {
        id: services[0].id,
        title: services[0].title,
        iconName: services[0].iconName,
        isActive: services[0].isActive,
      });
    } else {
      console.log('⚠️  No services found!');
    }
    
    // Test all cards
    console.log('\n=== All Content Cards ===');
    const allCards = await prisma.contentCard.findMany();
    console.log(`Total: ${allCards.length}`);
    console.log(`Active: ${allCards.filter(c => c.isActive).length}`);
    console.log(`Inactive: ${allCards.filter(c => !c.isActive).length}`);
    
    if (projects.length === 0 && services.length === 0) {
      console.log('\n❌ ISSUE: No active cards found!');
      console.log('Possible causes:');
      console.log('1. Prisma client not regenerated - run: npx prisma generate');
      console.log('2. Dev server needs restart');
      console.log('3. Data not seeded - run: node scripts/seed-content.js');
    } else {
      console.log('\n✅ API logic is working correctly!');
      console.log('If data is not showing in the UI:');
      console.log('1. Make sure dev server is restarted');
      console.log('2. Check browser console for errors');
      console.log('3. Verify API endpoint is accessible at /api/content-cards?type=project');
    }
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    if (error.message.includes('contentCard') || error.message.includes('ContentCard')) {
      console.log('\n⚠️  Prisma client needs to be regenerated!');
      console.log('Run: npx prisma generate');
      console.log('Then restart the dev server');
    }
  } finally {
    await prisma.$disconnect();
  }
}

testContentAPI();


