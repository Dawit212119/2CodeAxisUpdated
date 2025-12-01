import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getBetterAuthSession } from '@/lib/better-auth-server';

export async function PATCH(request: Request) {
  try {
    const session = await getBetterAuthSession();
    
    if (!session || session.role !== 'admin') {
      console.log('Verify Payment: Unauthorized access attempt', { 
        hasSession: !!session, 
        role: session?.role 
      });
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    console.log('Verify Payment: Admin session verified', { 
      userId: session.id, 
      role: session.role 
    });

    const body = await request.json();
    const { id, verified } = body; // verified: true = approve, false = reject

    if (!id || typeof verified !== 'boolean') {
      return NextResponse.json(
        { error: 'Registration ID and verification status are required.' },
        { status: 400 }
      );
    }

    const registration = await prisma.courseRegistration.update({
      where: { id: parseInt(id) },
      data: {
        status: verified ? 'approved' : 'rejected',
        verifiedAt: verified ? new Date() : null,
      },
    });

    console.log('Verify Payment: Success', { 
      registrationId: id, 
      status: registration.status 
    });

    return NextResponse.json({ success: true, registration });
  } catch (error) {
    console.error('Error verifying payment', error);
    return NextResponse.json(
      { error: 'Something went wrong while verifying payment.' },
      { status: 500 }
    );
  }
}




