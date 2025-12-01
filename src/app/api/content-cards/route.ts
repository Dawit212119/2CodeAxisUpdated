import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface WhereClause {
  isActive: boolean;
  type?: string;
}

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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("Error fetching content cards:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch content cards",
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}

