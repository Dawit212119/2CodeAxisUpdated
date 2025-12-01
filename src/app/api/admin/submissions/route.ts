import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getBetterAuthSession } from '@/lib/better-auth-server';

export async function GET() {
  try {
    const session = await getBetterAuthSession();
    
    if (!session || session.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    const [projectSubmissions, courseRegistrations] = await Promise.all([
      prisma.projectSubmission.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.courseRegistration.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      projectSubmissions,
      courseRegistrations,
    });
  } catch (error) {
    console.error('Error fetching submissions', error);
    return NextResponse.json(
      { error: 'Something went wrong while fetching submissions.' },
      { status: 500 }
    );
  }
}






