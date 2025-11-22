import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session || session.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    const schedules = await prisma.courseSchedule.findMany({
      orderBy: { courseId: 'asc' },
    });

    return NextResponse.json({ schedules });
  } catch (error) {
    console.error('Error fetching course schedules', error);
    return NextResponse.json(
      { error: 'Something went wrong while fetching schedules.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    
    if (!session || session.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { courseId, title, description, startDate, endDate, duration, schedule } = body;

    if (!courseId || !title || !startDate || !endDate || !duration || !schedule) {
      return NextResponse.json(
        { error: 'Course ID, title, dates, duration, and schedule are required.' },
        { status: 400 }
      );
    }

    // Upsert schedule (update if exists, create if not)
    const courseSchedule = await prisma.courseSchedule.upsert({
      where: { courseId },
      update: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        duration: parseInt(duration),
        schedule,
      },
      create: {
        courseId,
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        duration: parseInt(duration),
        schedule,
      },
    });

    return NextResponse.json({ success: true, schedule: courseSchedule });
  } catch (error) {
    console.error('Error creating/updating course schedule', error);
    return NextResponse.json(
      { error: 'Something went wrong while saving schedule.' },
      { status: 500 }
    );
  }
}

