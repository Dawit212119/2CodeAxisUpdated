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

    console.log("Fetching content cards with filter:", where);

    const cards = await prisma.contentCard.findMany({
      where,
      orderBy: {
        order: "asc",
      },
    });

    console.log(`Found ${cards.length} cards`);

    // Parse metadata JSON if present
    const cardsWithParsedMetadata = cards.map((card) => ({
      ...card,
      metadata: card.metadata ? JSON.parse(card.metadata) : null,
    }));

    return NextResponse.json({ cards: cardsWithParsedMetadata });
  } catch (error: any) {
    console.error("Error fetching content cards:", error);
    console.error("Error details:", error?.message, error?.stack);
    return NextResponse.json(
      { 
        error: "Failed to fetch content cards",
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    );
  }
}

