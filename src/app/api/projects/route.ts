import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: {
        isActive: true,
      },
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
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects", details: error.message },
      { status: 500 }
    );
  }
}


