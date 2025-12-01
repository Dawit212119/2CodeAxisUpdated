import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface WhereClause {
  isActive: boolean;
  owner?: boolean;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const owner = searchParams.get("owner");

    const where: WhereClause = {
      isActive: true,
    };

    if (owner !== null) {
      where.owner = owner === 'true';
    }

    const members = await prisma.teamMember.findMany({
      where,
      orderBy: {
        order: "asc",
      },
    });

    const response = NextResponse.json({ members });
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
    
    return response;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("Error fetching team members:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members", details: errorMessage },
      { status: 500 }
    );
  }
}

