import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const owner = searchParams.get("owner"); // Optional filter by owner (true/false)

    const where: any = {
      isActive: true,
    };

    if (owner !== null) {
      // Filter by owner field
      where.owner = owner === 'true';
    }

    const members = await prisma.teamMember.findMany({
      where,
      orderBy: {
        order: "asc",
      },
    });

    return NextResponse.json({ members });
  } catch (error: any) {
    console.error("Error fetching team members:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members", details: error.message },
      { status: 500 }
    );
  }
}

