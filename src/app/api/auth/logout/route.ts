import { NextResponse } from 'next/server';
import { auth } from '@/lib/better-auth';

export async function POST(request: Request) {
  try {
    // Sign out using better-auth
    await auth.api.signOut({ headers: request.headers });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error during logout:', error);
    // Still return success to ensure logout completes even if there's an error
    return NextResponse.json({ success: true });
  }
}






