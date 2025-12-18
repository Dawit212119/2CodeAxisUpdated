import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required.' },
        { status: 400 }
      );
    }

    const schedule = await prisma.courseSchedule.findUnique({
      where: { courseId },
    });

    if (!schedule) {
      return NextResponse.json(
        { error: 'Schedule not found for this course.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ schedule });
  } catch (error) {
    console.error('Error fetching course schedule', error);
    return NextResponse.json(
      { error: 'Something went wrong while fetching schedule.' },
      { status: 500 }
    );
  }
}










