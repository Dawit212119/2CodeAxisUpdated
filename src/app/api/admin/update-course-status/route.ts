import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function PATCH(request: Request) {
  try {
    const session = await getSession();
    
    if (!session || session.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Registration ID and status are required.' },
        { status: 400 }
      );
    }

    const validStatuses = ['pending', 'approved', 'rejected', 'completed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: pending, approved, rejected, completed' },
        { status: 400 }
      );
    }

    const updated = await prisma.courseRegistration.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    return NextResponse.json({ success: true, registration: updated });
  } catch (error) {
    console.error('Error updating course registration status', error);
    return NextResponse.json(
      { error: 'Something went wrong while updating status.' },
      { status: 500 }
    );
  }
}


