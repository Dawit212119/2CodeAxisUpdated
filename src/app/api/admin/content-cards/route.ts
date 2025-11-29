import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET all content cards (admin only)
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

    const cards = await prisma.contentCard.findMany({
      where,
      orderBy: [
        { order: "asc" },
        { createdAt: "desc" },
      ],
    });

    // Parse metadata JSON if present
    const cardsWithParsedMetadata = cards.map((card) => ({
      ...card,
      metadata: card.metadata ? JSON.parse(card.metadata) : null,
    }));

    return NextResponse.json({ cards: cardsWithParsedMetadata });
  } catch (error) {
    console.error("Error fetching content cards:", error);
    return NextResponse.json(
      { error: "Failed to fetch content cards" },
      { status: 500 }
    );
  }
}

// POST create new content card
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
    const { type, title, category, description, imageUrl, iconName, linkUrl, order, isActive, metadata } = body;

    if (!type || !title) {
      return NextResponse.json(
        { error: "Type and title are required." },
        { status: 400 }
      );
    }

    const card = await prisma.contentCard.create({
      data: {
        type,
        title,
        category: category || null,
        description: description || null,
        imageUrl: imageUrl || null,
        iconName: iconName || null,
        linkUrl: linkUrl || null,
        order: order ?? 0,
        isActive: isActive !== undefined ? isActive : true,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    });

    return NextResponse.json({
      success: true,
      card: {
        ...card,
        metadata: card.metadata ? JSON.parse(card.metadata) : null,
      },
    });
  } catch (error) {
    console.error("Error creating content card:", error);
    return NextResponse.json(
      { error: "Failed to create content card" },
      { status: 500 }
    );
  }
}


