/**
 * Script to create an admin user
 * 
 * Usage: node scripts/create-admin.js <email> <password> <name>
 * 
 * Example: node scripts/create-admin.js admin@example.com password123 "Admin User"
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.error('Usage: node scripts/create-admin.js <email> <password> <name>');
    process.exit(1);
  }

  const [email, password, name] = args;

  try {
    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      console.log('User already exists. Updating to admin...');
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
          role: 'admin',
        },
      });
      console.log('User updated to admin successfully!');
    } else {
      // Create new admin user
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: 'admin',
        },
      });
      console.log('Admin user created successfully!');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();


