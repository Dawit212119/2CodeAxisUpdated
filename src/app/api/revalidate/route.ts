import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { getBetterAuthSession } from '@/lib/better-auth-server';

export async function POST(request: NextRequest) {
  try {
    // Check if user is admin
    const session = await getBetterAuthSession();
    
    if (!session || session.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { tag } = body;

    if (!tag) {
      return NextResponse.json(
        { error: 'Tag is required' },
        { status: 400 }
      );
    }

    // Revalidate the cache tag
    revalidateTag(tag);

    return NextResponse.json({ 
      success: true, 
      message: `Cache revalidated for tag: ${tag}` 
    });
  } catch (error) {
    console.error('Error revalidating cache:', error);
    return NextResponse.json(
      { error: 'Failed to revalidate cache' },
      { status: 500 }
    );
  }
}
