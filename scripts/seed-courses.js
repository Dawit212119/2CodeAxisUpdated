/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Script to seed courses
 * 
 * Usage: node scripts/seed-courses.js
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const courses = [
  {
    id: 'programming-fundamentals',
    title: 'Programming Fundamentals with Python',
    description: 'Learn the fundamentals of programming using Python, including variables, data structures, control flow, and basic algorithms.',
    duration: '8–12 weeks',
    mode: 'Hybrid (Addis Ababa + Online)',
    level: 'Beginner – Intermediate',
    features: JSON.stringify([
      'Weekly live sessions with CodeAxis engineers',
      'Capstone project you can add to your portfolio',
      'Certificate of completion and career guidance',
    ]),
    order: 1,
    isActive: true,
  },
  {
    id: 'frontend-web-dev',
    title: 'Frontend Web Development (HTML, CSS, JavaScript)',
    description: 'Master the core technologies of web development: HTML, CSS, and JavaScript to build modern, responsive websites.',
    duration: '8–12 weeks',
    mode: 'Hybrid (Addis Ababa + Online)',
    level: 'Beginner – Intermediate',
    features: JSON.stringify([
      'Weekly live sessions with CodeAxis engineers',
      'Capstone project you can add to your portfolio',
      'Certificate of completion and career guidance',
    ]),
    order: 2,
    isActive: true,
  },
  {
    id: 'fullstack-web-dev',
    title: 'Full-Stack Web Development (React & Next.js)',
    description: 'Build complete web applications using React for the frontend and Next.js for full-stack development.',
    duration: '8–12 weeks',
    mode: 'Hybrid (Addis Ababa + Online)',
    level: 'Beginner – Intermediate',
    features: JSON.stringify([
      'Weekly live sessions with CodeAxis engineers',
      'Capstone project you can add to your portfolio',
      'Certificate of completion and career guidance',
    ]),
    order: 3,
    isActive: true,
  },
  {
    id: 'mobile-app-dev',
    title: 'Mobile App Development (Flutter)',
    description: 'Develop cross-platform mobile applications using Flutter framework for iOS and Android.',
    duration: '8–12 weeks',
    mode: 'Hybrid (Addis Ababa + Online)',
    level: 'Beginner – Intermediate',
    features: JSON.stringify([
      'Weekly live sessions with CodeAxis engineers',
      'Capstone project you can add to your portfolio',
      'Certificate of completion and career guidance',
    ]),
    order: 4,
    isActive: true,
  },
  {
    id: 'backend-dotnet',
    title: 'Backend Development with .NET & REST APIs',
    description: 'Learn to build robust backend systems and RESTful APIs using .NET framework and C#.',
    duration: '8–12 weeks',
    mode: 'Hybrid (Addis Ababa + Online)',
    level: 'Beginner – Intermediate',
    features: JSON.stringify([
      'Weekly live sessions with CodeAxis engineers',
      'Capstone project you can add to your portfolio',
      'Certificate of completion and career guidance',
    ]),
    order: 5,
    isActive: true,
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps Essentials (AWS / Azure)',
    description: 'Master cloud computing and DevOps practices using AWS and Azure platforms.',
    duration: '8–12 weeks',
    mode: 'Hybrid (Addis Ababa + Online)',
    level: 'Beginner – Intermediate',
    features: JSON.stringify([
      'Weekly live sessions with CodeAxis engineers',
      'Capstone project you can add to your portfolio',
      'Certificate of completion and career guidance',
    ]),
    order: 6,
    isActive: true,
  },
  {
    id: 'data-engineering',
    title: 'Data Engineering & Analytics Foundations',
    description: 'Learn to build data pipelines, work with big data, and create analytics solutions.',
    duration: '8–12 weeks',
    mode: 'Hybrid (Addis Ababa + Online)',
    level: 'Beginner – Intermediate',
    features: JSON.stringify([
      'Weekly live sessions with CodeAxis engineers',
      'Capstone project you can add to your portfolio',
      'Certificate of completion and career guidance',
    ]),
    order: 7,
    isActive: true,
  },
  {
    id: 'software-engineering-practices',
    title: 'Software Engineering Practices (Git, Testing, Clean Code)',
    description: 'Master essential software engineering practices including version control, testing, and writing clean code.',
    duration: '8–12 weeks',
    mode: 'Hybrid (Addis Ababa + Online)',
    level: 'Beginner – Intermediate',
    features: JSON.stringify([
      'Weekly live sessions with CodeAxis engineers',
      'Capstone project you can add to your portfolio',
      'Certificate of completion and career guidance',
    ]),
    order: 8,
    isActive: true,
  },
  {
    id: 'cybersecurity-basics',
    title: 'Cybersecurity Fundamentals',
    description: 'Learn the fundamentals of cybersecurity, including threat detection, security best practices, and ethical hacking basics.',
    duration: '8–12 weeks',
    mode: 'Hybrid (Addis Ababa + Online)',
    level: 'Beginner – Intermediate',
    features: JSON.stringify([
      'Weekly live sessions with CodeAxis engineers',
      'Capstone project you can add to your portfolio',
      'Certificate of completion and career guidance',
    ]),
    order: 9,
    isActive: true,
  },
];

async function seedCourses() {
  try {
    console.log('Seeding courses...\n');

    for (const course of courses) {
      // Check if course already exists by id
      const existing = await prisma.course.findUnique({
        where: { id: course.id },
      });

      if (existing) {
        await prisma.course.update({
          where: { id: course.id },
          data: course,
        });
        console.log(`✓ Updated course: ${course.title}`);
      } else {
        await prisma.course.create({
          data: course,
        });
        console.log(`✓ Created course: ${course.title}`);
      }
    }

    console.log('\n✅ All courses seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding courses:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedCourses();


