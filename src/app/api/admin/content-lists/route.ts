import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET all content lists (admin only)
export async function GET(request: Request) {
  try {
    const session = await getSession();

    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const where: any = {};
    if (type) {
      where.type = type;
    }

    const lists = await prisma.contentList.findMany({
      where,
      orderBy: [
        { order: "asc" },
        { createdAt: "desc" },
      ],
    });

    // Parse metadata JSON if present
    const listsWithParsedMetadata = lists.map((list) => ({
      ...list,
      metadata: list.metadata ? JSON.parse(list.metadata) : null,
    }));

    return NextResponse.json({ lists: listsWithParsedMetadata });
  } catch (error) {
    console.error("Error fetching content lists:", error);
    return NextResponse.json(
      { error: "Failed to fetch content lists" },
      { status: 500 }
    );
  }
}

// POST create new content list
export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { type, title, content, order, isActive, metadata } = body;

    if (!type || !content) {
      return NextResponse.json(
        { error: "Type and content are required." },
        { status: 400 }
      );
    }

    const list = await prisma.contentList.create({
      data: {
        type,
        title: title || null,
        content,
        order: order ?? 0,
        isActive: isActive !== undefined ? isActive : true,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    });

    return NextResponse.json({
      success: true,
      list: {
        ...list,
        metadata: list.metadata ? JSON.parse(list.metadata) : null,
      },
    });
  } catch (error) {
    console.error("Error creating content list:", error);
    return NextResponse.json(
      { error: "Failed to create content list" },
      { status: 500 }
    );
  }
}


