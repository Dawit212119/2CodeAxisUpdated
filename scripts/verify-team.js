const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verifyTeam() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { order: 'asc' }
    });
    
    console.log(`\nTotal team members in database: ${members.length}\n`);
    
    members.forEach((member, index) => {
      console.log(`${index + 1}. ${member.name}`);
      console.log(`   Role: ${member.role}`);
      console.log(`   Owner: ${member.owner ? 'Yes' : 'No'}`);
      console.log(`   Email: ${member.email || 'N/A'}`);
      console.log(`   Active: ${member.isActive ? 'Yes' : 'No'}`);
      console.log('');
    });

    // Check owners (will show in team section)
    const owners = members.filter(m => m.owner === true);

    console.log(`Owners (shown in team section): ${owners.length}`);
    owners.forEach(m => console.log(`  - ${m.name} (${m.role})`));

    const nonOwners = members.filter(m => m.owner === false);

    console.log(`\nNon-owners (shown on team page): ${nonOwners.length}`);
    nonOwners.forEach(m => console.log(`  - ${m.name} (${m.role})`));

  } catch (error) {
    console.error('Error verifying team:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyTeam();

