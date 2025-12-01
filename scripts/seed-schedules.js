/**
 * Script to seed detailed course schedules for each course
 * 
 * Usage: node scripts/seed-schedules.js
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const courseSchedules = {
  'programming-fundamentals': {
    title: 'Programming Fundamentals with Python - 10 Week Program',
    description: 'A comprehensive 10-week program designed to take you from zero programming experience to building your first Python applications. Learn core programming concepts, data structures, and problem-solving skills.',
    duration: 10, // weeks
    schedule: `Week 1-2: Introduction to Programming & Python Basics
- Week 1: Programming fundamentals, Python installation, IDE setup, variables, data types, basic I/O
- Week 2: Operators, expressions, conditional statements (if/else), loops (for/while), basic functions

Week 3-4: Data Structures & Functions
- Week 3: Lists, tuples, dictionaries, sets - creation, manipulation, and common operations
- Week 4: Functions (definition, parameters, return values), scope, lambda functions, list comprehensions

Week 5-6: Object-Oriented Programming
- Week 5: Classes and objects, attributes, methods, constructors, instance vs class methods
- Week 6: Inheritance, polymorphism, encapsulation, special methods (__init__, __str__)

Week 7-8: File Handling & Error Management
- Week 7: Reading/writing files, CSV/JSON handling, working with directories
- Week 8: Exception handling (try/except), custom exceptions, debugging techniques

Week 9-10: Projects & Advanced Topics
- Week 9: Working with libraries (requests, datetime, random), building a command-line application
- Week 10: Capstone project - Build a complete Python application (e.g., task manager, data analyzer)`
  },

  'frontend-web-dev': {
    title: 'Frontend Web Development - 10 Week Program',
    description: 'Master the three pillars of web development: HTML for structure, CSS for styling, and JavaScript for interactivity. Build responsive, modern websites from scratch.',
    duration: 10,
    schedule: `Week 1-2: HTML Fundamentals
- Week 1: HTML structure, semantic elements, forms, tables, links, images, accessibility basics
- Week 2: HTML5 features, media elements (audio/video), iframes, meta tags, document structure

Week 3-4: CSS Styling & Layout
- Week 3: CSS selectors, properties, box model, typography, colors, backgrounds, borders
- Week 4: Flexbox layout, Grid layout, responsive design, media queries, CSS variables

Week 5-6: JavaScript Basics
- Week 5: JavaScript syntax, variables, data types, operators, control flow, functions
- Week 6: Arrays, objects, DOM manipulation, event handling, form validation

Week 7-8: Advanced JavaScript & APIs
- Week 7: ES6+ features (arrow functions, destructuring, spread operator, promises)
- Week 8: Async/await, fetch API, working with JSON, local storage, session storage

Week 9-10: Modern Frontend & Projects
- Week 9: CSS animations, transitions, building responsive navigation, mobile-first design
- Week 10: Capstone project - Build a complete responsive website with interactive features`
  },

  'fullstack-web-dev': {
    title: 'Full-Stack Web Development - 12 Week Program',
    description: 'Learn to build complete web applications using React for the frontend and Next.js for full-stack development. Create production-ready applications with modern tools and best practices.',
    duration: 12,
    schedule: `Week 1-2: React Fundamentals
- Week 1: React introduction, JSX, components, props, state, event handling, conditional rendering
- Week 2: Lists and keys, forms, lifting state up, component composition, React hooks (useState, useEffect)

Week 3-4: Advanced React
- Week 3: Custom hooks, useContext, useReducer, performance optimization, React Router
- Week 4: Context API, state management patterns, component lifecycle, error boundaries

Week 5-6: Next.js Basics
- Week 5: Next.js setup, pages, routing, file-based routing, dynamic routes, API routes
- Week 6: Server components vs client components, data fetching (SSR, SSG, ISR), Image optimization

Week 7-8: Next.js Advanced Features
- Week 7: Authentication, middleware, API routes, database integration, environment variables
- Week 8: Deployment, performance optimization, SEO, metadata, static site generation

Week 9-10: Backend Integration
- Week 9: Building REST APIs, database models (Prisma), CRUD operations, authentication
- Week 10: File uploads, pagination, search functionality, error handling, API security

Week 11-12: Full-Stack Project
- Week 11: Building a complete full-stack application - planning, setup, core features
- Week 12: Advanced features, testing, deployment, presentation and code review`
  },

  'mobile-app-dev': {
    title: 'Mobile App Development with Flutter - 10 Week Program',
    description: 'Develop cross-platform mobile applications using Flutter framework. Build beautiful, performant apps for both iOS and Android from a single codebase.',
    duration: 10,
    schedule: `Week 1-2: Flutter Fundamentals
- Week 1: Flutter introduction, Dart basics, widget tree, stateless vs stateful widgets, layout widgets
- Week 2: Material Design, Cupertino widgets, navigation, routing, basic animations

Week 3-4: UI Development
- Week 3: Forms, input handling, validation, custom widgets, theming, responsive design
- Week 4: Lists (ListView, GridView), cards, dialogs, bottom sheets, snackbars, app bars

Week 5-6: State Management
- Week 5: State management concepts, setState, Provider pattern, stateful widget patterns
- Week 6: Riverpod/Bloc pattern, global state management, state persistence

Week 7-8: Data & APIs
- Week 7: HTTP requests, JSON parsing, API integration, error handling, loading states
- Week 8: Local storage (SharedPreferences, SQLite), file handling, image caching

Week 9-10: Advanced Features & Publishing
- Week 9: Push notifications, device features (camera, location), platform channels, native modules
- Week 10: Capstone project - Build a complete mobile app, testing, app store preparation`
  },

  'backend-dotnet': {
    title: 'Backend Development with .NET - 10 Week Program',
    description: 'Learn to build robust backend systems and RESTful APIs using .NET framework and C#. Create scalable, secure, and maintainable server-side applications.',
    duration: 10,
    schedule: `Week 1-2: C# & .NET Fundamentals
- Week 1: C# syntax, data types, control flow, classes, objects, methods, properties
- Week 2: Inheritance, interfaces, generics, LINQ, collections, exception handling

Week 3-4: ASP.NET Core Basics
- Week 3: ASP.NET Core introduction, MVC pattern, controllers, views, routing, middleware
- Week 4: Dependency injection, configuration, logging, environment setup, project structure

Week 5-6: RESTful APIs
- Week 5: Web API controllers, HTTP methods, request/response handling, status codes
- Week 6: API routing, model binding, validation, content negotiation, API documentation (Swagger)

Week 7-8: Database Integration
- Week 7: Entity Framework Core, database context, migrations, CRUD operations
- Week 8: Relationships (one-to-many, many-to-many), LINQ queries, database optimization

Week 9-10: Advanced Backend Features
- Week 9: Authentication & authorization (JWT), security best practices, error handling, testing
- Week 10: Capstone project - Build a complete REST API with authentication, database, and deployment`
  },

  'cloud-devops': {
    title: 'Cloud & DevOps Essentials - 12 Week Program',
    description: 'Master cloud computing and DevOps practices using AWS and Azure platforms. Learn infrastructure as code, CI/CD, containerization, and cloud architecture.',
    duration: 12,
    schedule: `Week 1-2: Cloud Computing Fundamentals
- Week 1: Cloud concepts, AWS/Azure overview, IAM, EC2/VMs, storage services (S3, Blob)
- Week 2: Networking basics, VPCs, security groups, load balancers, cloud architecture patterns

Week 3-4: Infrastructure as Code
- Week 3: Infrastructure as Code concepts, Terraform introduction, writing Terraform configurations
- Week 4: Terraform modules, state management, AWS/Azure provider, infrastructure deployment

Week 5-6: Containerization
- Week 5: Docker fundamentals, containers vs VMs, Dockerfile, image building, container registry
- Week 6: Docker Compose, multi-container applications, container orchestration basics

Week 7-8: CI/CD Pipelines
- Week 7: CI/CD concepts, GitHub Actions, Azure DevOps, automated testing in pipelines
- Week 8: Deployment automation, environment management, pipeline optimization, best practices

Week 9-10: Kubernetes & Orchestration
- Week 9: Kubernetes basics, pods, services, deployments, scaling, service mesh introduction
- Week 10: Kubernetes in cloud (EKS, AKS), monitoring, logging, troubleshooting

Week 11-12: Advanced DevOps & Projects
- Week 11: Monitoring and observability (CloudWatch, Azure Monitor), alerting, cost optimization
- Week 12: Capstone project - Deploy a complete application with CI/CD, containers, and monitoring`
  },

  'data-engineering': {
    title: 'Data Engineering & Analytics - 12 Week Program',
    description: 'Learn to build data pipelines, work with big data, and create analytics solutions. Master ETL processes, data warehousing, and data processing frameworks.',
    duration: 12,
    schedule: `Week 1-2: Data Fundamentals
- Week 1: Data engineering overview, data types, data formats (CSV, JSON, Parquet), SQL basics
- Week 2: Database design, relational databases, NoSQL databases, data modeling concepts

Week 3-4: ETL Processes
- Week 3: Extract, Transform, Load concepts, data extraction from various sources, data cleaning
- Week 4: Data transformation techniques, data validation, error handling, ETL tools (Apache Airflow)

Week 5-6: Data Warehousing
- Week 5: Data warehouse concepts, star schema, snowflake schema, dimensional modeling
- Week 6: Cloud data warehouses (Snowflake, Redshift, BigQuery), data lake concepts

Week 7-8: Big Data Processing
- Week 7: Apache Spark introduction, distributed computing, RDDs, DataFrames, Spark SQL
- Week 8: Spark transformations, actions, optimization, working with large datasets

Week 9-10: Data Pipelines & Streaming
- Week 9: Building data pipelines, batch vs streaming, Apache Kafka basics, real-time data processing
- Week 10: Data quality, monitoring pipelines, error handling, pipeline orchestration

Week 11-12: Analytics & Visualization
- Week 11: Data analytics, building dashboards, BI tools, data visualization best practices
- Week 12: Capstone project - Build a complete data pipeline from ingestion to visualization`
  },

  'software-engineering-practices': {
    title: 'Software Engineering Practices - 10 Week Program',
    description: 'Master essential software engineering practices including version control, testing, and writing clean code. Learn industry-standard tools and methodologies.',
    duration: 10,
    schedule: `Week 1-2: Version Control with Git
- Week 1: Git fundamentals, repositories, commits, branches, merging, basic workflows
- Week 2: Advanced Git (rebase, cherry-pick, stashing), GitHub/GitLab, pull requests, code reviews

Week 3-4: Clean Code & Design Patterns
- Week 3: Clean code principles, naming conventions, functions, comments, code organization
- Week 4: Design patterns (Singleton, Factory, Observer), SOLID principles, code refactoring

Week 5-6: Testing Fundamentals
- Week 5: Testing concepts, unit testing, test-driven development (TDD), testing frameworks
- Week 6: Integration testing, mocking, test coverage, testing best practices, CI/CD integration

Week 7-8: Code Quality & Documentation
- Week 7: Code reviews, static analysis tools, linters, code quality metrics, technical debt
- Week 8: Documentation (code comments, README, API docs), documentation tools, best practices

Week 9-10: Agile & Project Management
- Week 9: Agile methodologies (Scrum, Kanban), sprint planning, user stories, retrospectives
- Week 10: Capstone project - Apply all practices: Git workflow, testing, clean code, documentation`
  },

  'cybersecurity-basics': {
    title: 'Cybersecurity Fundamentals - 10 Week Program',
    description: 'Learn the fundamentals of cybersecurity, including threat detection, security best practices, and ethical hacking basics. Protect systems and data from cyber threats.',
    duration: 10,
    schedule: `Week 1-2: Cybersecurity Foundations
- Week 1: Cybersecurity overview, threat landscape, attack vectors, CIA triad (Confidentiality, Integrity, Availability)
- Week 2: Security policies, risk assessment, vulnerability management, security frameworks (NIST, ISO)

Week 3-4: Network Security
- Week 3: Network protocols, firewalls, intrusion detection systems (IDS), VPNs, network segmentation
- Week 4: Wireless security, network monitoring, packet analysis, network hardening techniques

Week 5-6: Application Security
- Week 5: OWASP Top 10, secure coding practices, input validation, authentication, authorization
- Week 6: SQL injection, XSS, CSRF attacks, secure APIs, security testing, penetration testing basics

Week 7-8: System Security & Cryptography
- Week 7: Operating system security, access control, encryption basics, hashing, digital signatures
- Week 8: Public key infrastructure (PKI), SSL/TLS, certificate management, secure communication

Week 9-10: Incident Response & Ethical Hacking
- Week 9: Incident response procedures, forensics basics, malware analysis, security monitoring
- Week 10: Capstone project - Security assessment, vulnerability scanning, security report writing`
  },
};

function calculateDates(durationWeeks) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 7); // Start next week
  startDate.setHours(0, 0, 0, 0);
  
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + (durationWeeks * 7));
  
  return { startDate, endDate };
}

async function seedSchedules() {
  try {
    console.log('Seeding detailed course schedules...\n');

    for (const [courseId, scheduleData] of Object.entries(courseSchedules)) {
      const { startDate, endDate } = calculateDates(scheduleData.duration);

      await prisma.courseSchedule.upsert({
        where: { courseId },
        update: {
          title: scheduleData.title,
          description: scheduleData.description,
          startDate,
          endDate,
          duration: scheduleData.duration,
          schedule: scheduleData.schedule,
        },
        create: {
          courseId,
          title: scheduleData.title,
          description: scheduleData.description,
          startDate,
          endDate,
          duration: scheduleData.duration,
          schedule: scheduleData.schedule,
        },
      });

      console.log(`✓ Seeded ${scheduleData.duration}-week schedule for: ${courseId}`);
    }

    console.log('\n✅ All course schedules seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding schedules:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedSchedules();




