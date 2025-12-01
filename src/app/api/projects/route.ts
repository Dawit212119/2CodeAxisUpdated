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

    const projectsWithParsedData = projects.map((project) => ({
      ...project,
      technologies: project.technologies ? JSON.parse(project.technologies) : null,
      features: project.features ? JSON.parse(project.features) : null,
    }));

    const response = NextResponse.json({ projects: projectsWithParsedData });
    
    // Add cache tags for revalidation
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
    
    return response;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects", details: errorMessage },
      { status: 500 }
    );
  }
}


