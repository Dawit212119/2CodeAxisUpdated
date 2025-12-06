import { auth } from './better-auth';
import { prisma } from './prisma';
import { headers } from 'next/headers';

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export async function getBetterAuthSession(): Promise<SessionUser | null> {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({ headers: headersList });
    
    if (!session?.user) {
      return null;
    }

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

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  } catch (error) {
    console.error('Error getting better-auth session:', error);
    return null;
  }
}


