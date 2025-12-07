import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getBetterAuthSession } from "@/lib/better-auth-server";

// PUT update content list
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
    const { type, title, content, order, isActive, metadata } = body;

    const list = await prisma.contentList.update({
      where: { id },
      data: {
        ...(type !== undefined && { type }),
        ...(title !== undefined && { title: title || null }),
        ...(content !== undefined && { content }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive }),
        ...(metadata !== undefined && { metadata: metadata ? JSON.stringify(metadata) : null }),
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
    console.error("Error updating content list:", error);
    return NextResponse.json(
      { error: "Failed to update content list" },
      { status: 500 }
    );
  }
}

// DELETE content list
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

    await prisma.contentList.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting content list:", error);
    return NextResponse.json(
      { error: "Failed to delete content list" },
      { status: 500 }
    );
  }
}




