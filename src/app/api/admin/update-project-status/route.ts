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
        { error: 'Project ID and status are required.' },
        { status: 400 }
      );
    }

    const validStatuses = ['pending', 'in_progress', 'completed', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: pending, in_progress, completed, rejected' },
        { status: 400 }
      );
    }

    const updated = await prisma.projectSubmission.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    return NextResponse.json({ success: true, submission: updated });
  } catch (error) {
    console.error('Error updating project status', error);
    return NextResponse.json(
      { error: 'Something went wrong while updating status.' },
      { status: 500 }
    );
  }
}


