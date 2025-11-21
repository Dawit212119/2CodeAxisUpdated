import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    const body = await request.json();
    const {
      courseId,
      name,
      email,
      phone,
      experienceLevel,
      preferredSchedule,
      message,
    } = body ?? {};

    if (!courseId || !name || !email) {
      return NextResponse.json(
        { error: "Course, name, and email are required." },
        { status: 400 }
      );
    }

    const registration = await prisma.courseRegistration.create({
      data: {
        userId: session?.id,
        courseId,
        name,
        email,
        phone,
        experienceLevel,
        preferredSchedule,
        message,
        status: "pending",
      },
    });

    return NextResponse.json({ success: true, registrationId: registration.id });
  } catch (error) {
    console.error("Error creating course registration", error);
    return NextResponse.json(
      { error: "Something went wrong while submitting your registration." },
      { status: 500 }
    );
  }
}
