import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const members = await prisma.teamMember.findMany({
      orderBy: {
        order: "asc",
      },
    });

    return NextResponse.json({ members });
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

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
    const { name, role, imageUrl, email, linkedin, owner, order, isActive } = body;

    if (!name || !role) {
      return NextResponse.json(
        { error: "Name and role are required." },
        { status: 400 }
      );
    }

    const newMember = await prisma.teamMember.create({
      data: {
        name,
        role,
        imageUrl: imageUrl || null,
        email: email || null,
        linkedin: linkedin || null,
        owner: owner !== undefined ? owner : false,
        order: order !== undefined ? parseInt(order) : 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json({ success: true, member: newMember });
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json(
      { error: "Something went wrong while creating the team member." },
      { status: 500 }
    );
  }
}

