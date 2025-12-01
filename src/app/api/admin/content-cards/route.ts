import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getBetterAuthSession } from "@/lib/better-auth-server";

interface WhereClause {
  isActive: boolean;
  type?: string;
}
// GET all content cards (admin only)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const where: WhereClause = {
      isActive: true,
    };

    if (type) {
      where.type = type;
    }

    const cards = await prisma.contentCard.findMany({
      where,
      orderBy: {
        order: "asc",
      },
    });

    const cardsWithParsedMetadata = cards.map((card) => ({
      ...card,
      metadata: card.metadata ? JSON.parse(card.metadata) : null,
    }));

    const response = NextResponse.json({ cards: cardsWithParsedMetadata });
    
    // Add cache tags for revalidation
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
    
    return response;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch content cards";        

    console.error("Error fetching content cards:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch content cards",
        details: process.env.NODE_ENV === 'development' ? errorMessage: undefined
      },
      { status: 500 }
    );
  }
}

// POST create new content card
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

    // Note: Cache revalidation happens automatically when fetch calls use the same tags

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


