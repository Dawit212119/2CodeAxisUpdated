import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getBetterAuthSession } from "@/lib/better-auth-server";
import { cloudinary } from "@/lib/cloudinary";
import type { UploadApiResponse } from "cloudinary";

export async function GET() {
  try {
    const session = await getBetterAuthSession();
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
    const session = await getBetterAuthSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    
    const title = formData.get('title')?.toString() || '';
    if (!title) {
      return NextResponse.json(
        { error: "Project title is required." },
        { status: 400 }
      );
    }

    // Handle imageUrl - either file upload or URL
    let imageUrl: string | null = null;
    const imageUrlFile = formData.get('imageUrlFile') as File | null;
    const imageUrlText = formData.get('imageUrl')?.toString() || '';
    
    if (imageUrlFile && imageUrlFile.size > 0) {
      try {
        const arrayBuffer = await imageUrlFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "projects" },
            (error, result) => {
              if (error || !result) {
                return reject(error || new Error("Failed to upload image"));
              }
              resolve(result);
            }
          );
          uploadStream.end(buffer);
        });
        imageUrl = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload image file." },
          { status: 500 }
        );
      }
    } else if (imageUrlText) {
      imageUrl = imageUrlText;
    }

    // Handle modalImageUrl - either file upload or URL
    let modalImageUrl: string | null = null;
    const modalImageUrlFile = formData.get('modalImageUrlFile') as File | null;
    const modalImageUrlText = formData.get('modalImageUrl')?.toString() || '';
    
    if (modalImageUrlFile && modalImageUrlFile.size > 0) {
      try {
        const arrayBuffer = await modalImageUrlFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "projects" },
            (error, result) => {
              if (error || !result) {
                return reject(error || new Error("Failed to upload modal image"));
              }
              resolve(result);
            }
          );
          uploadStream.end(buffer);
        });
        modalImageUrl = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Modal image upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload modal image file." },
          { status: 500 }
        );
      }
    } else if (modalImageUrlText) {
      modalImageUrl = modalImageUrlText;
    }

    // Parse technologies and features
    const technologiesText = formData.get('technologies')?.toString();
    const technologies = technologiesText ? JSON.parse(technologiesText) : null;
    
    const featuresText = formData.get('features')?.toString();
    const features = featuresText ? JSON.parse(featuresText) : null;

    const newProject = await prisma.project.create({
      data: {
        title,
        category: formData.get('category')?.toString() || null,
        description: formData.get('description')?.toString() || null,
        imageUrl,
        modalImageUrl,
        detailDescription: formData.get('detailDescription')?.toString() || null,
        linkUrl: formData.get('linkUrl')?.toString() || null,
        technologies: technologies ? JSON.stringify(technologies) : null,
        client: formData.get('client')?.toString() || null,
        date: formData.get('date')?.toString() || null,
        duration: formData.get('duration')?.toString() || null,
        features: features ? JSON.stringify(features) : null,
        order: parseInt(formData.get('order')?.toString() || '0'),
        isActive: formData.get('isActive')?.toString() === 'true',
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



