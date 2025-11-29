import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // Optional filter by type

    const where: any = {
      isActive: true,
    };

    if (type) {
      where.type = type;
    }

    const lists = await prisma.contentList.findMany({
      where,
      orderBy: {
        order: "asc",
      },
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


