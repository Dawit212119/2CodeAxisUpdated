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

    const projects = await prisma.project.findMany({
      orderBy: {
        order: "asc",
      },
    });

    // Parse JSON strings back to arrays
    const projectsWithParsedData = projects.map((project) => ({
      ...project,
      technologies: project.technologies ? JSON.parse(project.technologies) : null,
      features: project.features ? JSON.parse(project.features) : null,
    }));

    return NextResponse.json({ projects: projectsWithParsedData });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
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

    const newProject = await prisma.project.create({
      data: {
        title,
        category: category || null,
        description: description || null,
        imageUrl: imageUrl || null,
        modalImageUrl: modalImageUrl || null,
        detailDescription: detailDescription || null,
        linkUrl: linkUrl || null,
        technologies: technologies ? JSON.stringify(technologies) : null,
        client: client || null,
        date: date || null,
        duration: duration || null,
        features: features ? JSON.stringify(features) : null,
        order: order !== undefined ? parseInt(order) : 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json({ success: true, project: newProject });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Something went wrong while creating the project." },
      { status: 500 }
    );
  }
}


