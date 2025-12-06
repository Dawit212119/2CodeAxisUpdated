import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getBetterAuthSession } from '@/lib/better-auth-server';

export async function GET() {
  try {
    const session = await getBetterAuthSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in.' },
        { status: 401 }
      );
    }

    const projects = await prisma.projectSubmission.findMany({
      where: { userId: session.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error fetching user projects', error);
    return NextResponse.json(
      { error: 'Something went wrong while fetching your projects.' },
      { status: 500 }
    );
  }
}








