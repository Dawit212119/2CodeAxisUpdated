/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Script to verify seeded data
 * 
 * Usage: node scripts/verify-seed.js
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function verifySeed() {
  try {
    const courses = await prisma.course.findMany();
    const cards = await prisma.contentCard.findMany();
    
    const services = cards.filter(c => c.type === 'service');
    const projects = cards.filter(c => c.type === 'project');
    
    console.log('\n📊 Database Content Summary:\n');
    console.log(`✅ Courses: ${courses.length}`);
    console.log(`✅ Content Cards: ${cards.length}`);
    console.log(`   - Services: ${services.length}`);
    console.log(`   - Projects: ${projects.length}\n`);
    
    if (courses.length > 0) {
      console.log('📚 Sample Courses:');
      courses.slice(0, 3).forEach(c => {
        console.log(`   - ${c.title} (ID: ${c.id})`);
      });
    }
    
    if (services.length > 0) {
      console.log('\n🔧 Sample Services:');
      services.slice(0, 3).forEach(s => {
        console.log(`   - ${s.title}`);
      });
    }
    
    if (projects.length > 0) {
      console.log('\n💼 Sample Projects:');
      projects.slice(0, 3).forEach(p => {
        console.log(`   - ${p.title} (${p.category})`);
      });
    }
    
    console.log('\n✅ Verification complete!\n');
  } catch (error) {
    console.error('❌ Error verifying seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verifySeed();


