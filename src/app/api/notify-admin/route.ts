import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { type: _type, registrationId, studentName, studentEmail, courseId } = body;

    // Get admin email
    const admin = await prisma.user.findFirst({
      where: { role: 'admin' },
      select: { email: true, name: true },
    });

    if (!admin) {
      console.error('No admin user found');
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    // In a real application, you would use an email service like SendGrid, Resend, or Nodemailer
    // For now, we'll just log it. You can integrate with your preferred email service.
    const adminEmail = admin.email;
    // Construct URL from request headers or use environment variables
    const origin = request.headers.get('origin') || 
                   request.headers.get('host') ? `https://${request.headers.get('host')}` : 
                   process.env.NEXT_PUBLIC_BASE_URL || 
                   process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                   'http://localhost:3000';
    const adminDashboardUrl = `${origin}/admin`;
    
    console.log(`
      ============================================
      NEW COURSE REGISTRATION - PAYMENT VERIFICATION REQUIRED
      ============================================
      Registration ID: ${registrationId}
      Student Name: ${studentName}
      Student Email: ${studentEmail}
      Course ID: ${courseId}
      
      Please verify the payment receipt at: ${adminDashboardUrl}
      
      Admin Email: ${adminEmail}
      ============================================
    `);

    // TODO: Replace with actual email service
    // Example with a service like Resend:
    // await resend.emails.send({
    //   from: 'noreply@codeaxis.com',
    //   to: adminEmail,
    //   subject: 'New Course Registration - Payment Verification Required',
    //   html: `...`
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending admin notification', error);
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    );
  }
}




