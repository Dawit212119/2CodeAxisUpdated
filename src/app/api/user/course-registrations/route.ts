import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in.' },
        { status: 401 }
      );
    }

    // Get course registrations for the logged-in user
    const registrations = await prisma.courseRegistration.findMany({
      where: { userId: session.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ registrations });
  } catch (error) {
    console.error('Error fetching user course registrations', error);
    return NextResponse.json(
      { error: 'Something went wrong while fetching your course registrations.' },
      { status: 500 }
    );
  }
}

