import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const { id } = params;
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 }
      );
    }

    // Parse JSON strings back to arrays
    const projectWithParsedData = {
      ...project,
      technologies: project.technologies ? JSON.parse(project.technologies) : null,
      features: project.features ? JSON.parse(project.features) : null,
    };

    return NextResponse.json({ project: projectWithParsedData });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const { id } = params;
    const body = await request.json();
    const {
      title,
      category,
      description,
      imageUrl,
      modalImageUrl,
      detailDescription,
      linkUrl,
      technologies,
      client,
      date,
      duration,
      features,
      order,
      isActive,
    } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Project title is required." },
        { status: 400 }
      );
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title,
        category: category !== undefined ? (category || null) : undefined,
        description: description !== undefined ? (description || null) : undefined,
        imageUrl: imageUrl !== undefined ? (imageUrl || null) : undefined,
        modalImageUrl: modalImageUrl !== undefined ? (modalImageUrl || null) : undefined,
        detailDescription: detailDescription !== undefined ? (detailDescription || null) : undefined,
        linkUrl: linkUrl !== undefined ? (linkUrl || null) : undefined,
        technologies: technologies !== undefined ? (technologies ? JSON.stringify(technologies) : null) : undefined,
        client: client !== undefined ? (client || null) : undefined,
        date: date !== undefined ? (date || null) : undefined,
        duration: duration !== undefined ? (duration || null) : undefined,
        features: features !== undefined ? (features ? JSON.stringify(features) : null) : undefined,
        order: order !== undefined ? parseInt(order) : undefined,
        isActive: isActive !== undefined ? isActive : undefined,
      },
    });

    return NextResponse.json({ success: true, project: updatedProject });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Something went wrong while updating the project." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const { id } = params;
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Something went wrong while deleting the project." },
      { status: 500 }
    );
  }
}


