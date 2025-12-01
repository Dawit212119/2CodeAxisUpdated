import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cloudinary } from "@/lib/cloudinary";
import { getBetterAuthSession } from "@/lib/better-auth-server";
import type { UploadApiResponse } from "cloudinary";

export async function POST(request: Request) {
  try {
    // Check authentication using better-auth
    const session = await getBetterAuthSession();
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to submit a project." },
        { status: 401 }
      );
    }

    const formData = await request.formData();

    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const company = formData.get("company")?.toString().trim() || undefined;
    const projectType = formData.get("projectType")?.toString().trim() || undefined;
    const budgetRange = formData.get("budgetRange")?.toString().trim() || undefined;
    const timeline = formData.get("timeline")?.toString().trim() || undefined;
    const description = formData.get("description")?.toString().trim() ?? "";
    const file = formData.get("attachment");

    if (!name || !email || !description) {
      return NextResponse.json(
        { error: "Name, email, and project description are required." },
        { status: 400 }
      );
    }

    let fileUrl: string | undefined;

    // Handle file upload if provided
    if (file && typeof file === "object" && "arrayBuffer" in file && file.size > 0) {
      try {
        const arrayBuffer = await (file as Blob).arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "project-submissions",
              resource_type: "auto",
            },
            (error, result) => {
              if (error || !result) {
                return reject(error || new Error("Failed to upload file"));
              }
              resolve(result);
            }
          );

          uploadStream.end(buffer);
        });

        fileUrl = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        // Continue without file if upload fails
      }
    }

    // Create submission with userId
    const submission = await prisma.projectSubmission.create({
      data: {
        userId: session.id,
        name,
        email,
        company,
        projectType,
        budgetRange,
        timeline,
        description,
        fileUrl,
        status: "pending",
      },
    });

    return NextResponse.json({ success: true, submissionId: submission.id });
  } catch (error: any) {
    console.error("Error creating project submission", error);
    
    // Provide more specific error messages
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "A submission with this information already exists." },
        { status: 400 }
      );
    }
    
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: "Invalid user reference. Please log in again." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        error: error.message || "Something went wrong while submitting your project.",
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
