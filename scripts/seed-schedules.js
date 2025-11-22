/**
 * Script to seed default course schedules
 * 
 * Usage: node scripts/seed-schedules.js
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const courses = [
  { id: "programming-fundamentals", title: "Programming Fundamentals with Python" },
  { id: "frontend-web-dev", title: "Frontend Web Development (HTML, CSS, JavaScript)" },
  { id: "fullstack-web-dev", title: "Full-Stack Web Development (React & Next.js)" },
  { id: "mobile-app-dev", title: "Mobile App Development (Flutter)" },
  { id: "backend-dotnet", title: "Backend Development with .NET & REST APIs" },
  { id: "cloud-devops", title: "Cloud & DevOps Essentials (AWS / Azure)" },
  { id: "data-engineering", title: "Data Engineering & Analytics Foundations" },
  { id: "software-engineering-practices", title: "Software Engineering Practices (Git, Testing, Clean Code)" },
  { id: "cybersecurity-basics", title: "Cybersecurity Fundamentals" },
];

const defaultSchedule = `Month 1: Foundations
- Week 1-2: Introduction and Setup
- Week 3-4: Core Concepts

Month 2: Intermediate Topics
- Week 1-2: Advanced Concepts
- Week 3-4: Practical Applications

Month 3: Advanced Topics
- Week 1-2: Deep Dive
- Week 3-4: Real-world Projects

Month 4: Specialization
- Week 1-2: Focused Learning
- Week 3-4: Advanced Projects

Month 5: Integration
- Week 1-2: System Integration
- Week 3-4: Best Practices

Month 6: Capstone Project
- Week 1-4: Final Project Development
- Week 5-6: Presentation and Review`;

async function seedSchedules() {
  try {
    console.log('Seeding course schedules...');

    for (const course of courses) {
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() + 1); // Start next month
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 6); // 6 months duration

      await prisma.courseSchedule.upsert({
        where: { courseId: course.id },
        update: {
          title: `${course.title} - 6 Month Program`,
          description: `Comprehensive 6-month program covering all aspects of ${course.title}`,
          startDate,
          endDate,
          duration: 6,
          schedule: defaultSchedule,
        },
        create: {
          courseId: course.id,
          title: `${course.title} - 6 Month Program`,
          description: `Comprehensive 6-month program covering all aspects of ${course.title}`,
          startDate,
          endDate,
          duration: 6,
          schedule: defaultSchedule,
        },
      });

      console.log(`✓ Seeded schedule for: ${course.title}`);
    }

    console.log('All schedules seeded successfully!');
  } catch (error) {
    console.error('Error seeding schedules:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedSchedules();

