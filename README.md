This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- Cloudinary account (for file uploads)

### Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
Create a `.env` file in the root directory with:
```
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**For Neon Database (recommended for production):**
- Use the **pooled connection string** (ends with `-pooler`) for better performance
- Ensure SSL is enabled: add `?sslmode=require` to your connection string if not already included
- Example: `postgresql://user:password@ep-xxx-pooler.us-east-1.aws.neon.tech:5432/dbname?sslmode=require`
- **Important:** Neon databases auto-pause after inactivity. Wake up your database in the Neon dashboard if you see connection errors.

3. **Run database migrations:**
```bash
npx prisma migrate dev
# or
npx prisma db push
```

4. **Create an admin user:**
```bash
node scripts/create-admin.js admin@example.com yourpassword "Admin Name"
```

5. **Run the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

### Authentication
- User registration and login
- Session-based authentication
- Role-based access control (user/admin)

### Project Submission
- Users must be logged in to submit projects
- Project submissions are linked to user accounts
- File upload support via Cloudinary

### Course Registration
- Course registration form (no login required, but links to user if logged in)
- Status tracking for registrations

### Admin Dashboard
- View all project submissions and course registrations
- Update status of submissions (pending, in_progress, completed, rejected)
- Access at `/admin` (admin role required)

### User Dashboard
- View all submitted projects
- Track project status
- Access at `/dashboard` (login required)

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
