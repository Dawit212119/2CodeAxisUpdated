import { NextResponse } from 'next/server';
import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (session?.user) {
      // Fetch user from database to get role
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      });

      if (user) {
        return NextResponse.json({ 
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        });
      }
    }
    return NextResponse.json({ user: null });
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json({ user: null });
  }
}














