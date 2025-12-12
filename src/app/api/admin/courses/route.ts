import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getBetterAuthSession } from "@/lib/better-auth-server";

// GET all courses (admin only)
export async function GET() {
  try {
    const session = await getBetterAuthSession();

    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const courses = await prisma.course.findMany({
      orderBy: [
        { order: "asc" },
        { createdAt: "desc" },
      ],
    });

    // Parse features JSON if present
    const coursesWithParsedFeatures = courses.map((course) => ({
      ...course,
      features: course.features ? JSON.parse(course.features) : null,
    }));

    return NextResponse.json({ courses: coursesWithParsedFeatures });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

// POST create new course
export async function POST(request: Request) {
  try {
    const session = await getBetterAuthSession();

    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, description, duration, mode, level, features, order, isActive } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Title is required." },
        { status: 400 }
      );
    }

    const course = await prisma.course.create({
      data: {
        title,
        description: description || null,
        duration: duration || null,
        mode: mode || null,
        level: level || null,
        features: features ? JSON.stringify(features) : null,
        order: order ?? 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json({
      success: true,
      course: {
        ...course,
        features: course.features ? JSON.parse(course.features) : null,
      },
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}






