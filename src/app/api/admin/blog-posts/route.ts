import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getBetterAuthSession } from "@/lib/better-auth-server";

export async function GET() {
  try {
    const session = await getBetterAuthSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const posts = await prisma.blogPost.findMany({
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getBetterAuthSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, description, linkUrl, date, minutesToRead, order, isActive } = body;

    if (!title || !description || !date) {
      return NextResponse.json(
        { error: "Title, description, and date are required." },
        { status: 400 }
      );
    }

    const newPost = await prisma.blogPost.create({
      data: {
        title,
        description,
        linkUrl: linkUrl || null,
        date: new Date(date),
        minutesToRead: minutesToRead ? parseInt(minutesToRead) : null,
        order: order !== undefined ? parseInt(order) : 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Something went wrong while creating the blog post." },
      { status: 500 }
    );
  }
}








