import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    const response = NextResponse.json({ posts });
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
    
    return response;
  } catch (error: any) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts", details: error.message },
      { status: 500 }
    );
  }
}


