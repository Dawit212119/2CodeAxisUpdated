import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getBetterAuthSession } from "@/lib/better-auth-server";

// PUT update content card
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getBetterAuthSession();

    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { type, title, category, description, imageUrl, iconName, linkUrl, order, isActive, metadata } = body;

    const card = await prisma.contentCard.update({
      where: { id },
      data: {
        ...(type !== undefined && { type }),
        ...(title !== undefined && { title }),
        ...(category !== undefined && { category: category || null }),
        ...(description !== undefined && { description: description || null }),
        ...(imageUrl !== undefined && { imageUrl: imageUrl || null }),
        ...(iconName !== undefined && { iconName: iconName || null }),
        ...(linkUrl !== undefined && { linkUrl: linkUrl || null }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive }),
        ...(metadata !== undefined && { metadata: metadata ? JSON.stringify(metadata) : null }),
      },
    });

    // Note: Cache revalidation happens automatically when fetch calls use the same tags
    // The cache will be revalidated on the next request that uses these tags

    return NextResponse.json({
      success: true,
      card: {
        ...card,
        metadata: card.metadata ? JSON.parse(card.metadata) : null,
      },
    });
  } catch (error) {
    console.error("Error updating content card:", error);
    return NextResponse.json(
      { error: "Failed to update content card" },
      { status: 500 }
    );
  }
}

// DELETE content card
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getBetterAuthSession();

    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const { id } = await params;

    await prisma.contentCard.delete({
      where: { id },
    });

    // Note: Cache revalidation happens automatically when fetch calls use the same tags

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting content card:", error);
    return NextResponse.json(
      { error: "Failed to delete content card" },
      { status: 500 }
    );
  }
}


