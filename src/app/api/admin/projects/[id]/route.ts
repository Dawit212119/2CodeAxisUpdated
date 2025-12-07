import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getBetterAuthSession } from "@/lib/better-auth-server";
import { cloudinary } from "@/lib/cloudinary";
import type { UploadApiResponse } from "cloudinary";

export async function GET(
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
    const formData = await request.formData();
    
    const title = formData.get('title')?.toString() || '';
    if (!title) {
      return NextResponse.json(
        { error: "Project title is required." },
        { status: 400 }
      );
    }

    // Get existing project to preserve values if not provided
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 }
      );
    }

    // Handle imageUrl - either file upload or URL
    let imageUrl: string | null | undefined = undefined;
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
    } else if (imageUrlText === '' && !imageUrlFile) {
      // If both are empty, keep existing value
      imageUrl = existingProject.imageUrl;
    }

    // Handle modalImageUrl - either file upload or URL
    let modalImageUrl: string | null | undefined = undefined;
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
    } else if (modalImageUrlText === '' && !modalImageUrlFile) {
      // If both are empty, keep existing value
      modalImageUrl = existingProject.modalImageUrl;
    }

    // Parse technologies and features
    const technologiesText = formData.get('technologies')?.toString();
    const technologies = technologiesText ? JSON.parse(technologiesText) : undefined;
    
    const featuresText = formData.get('features')?.toString();
    const features = featuresText ? JSON.parse(featuresText) : undefined;

    const updateData: {
      title: string;
      category?: string | null;
      description?: string | null;
      imageUrl?: string | null;
      modalImageUrl?: string | null;
      detailDescription?: string | null;
      linkUrl?: string | null;
      technologies?: string | null;
      client?: string | null;
      date?: string | null;
      duration?: string | null;
      features?: string | null;
      order?: number;
      isActive?: boolean;
    } = {
      title,
    };

    // Only update fields that are provided
    const category = formData.get('category')?.toString();
    if (category !== undefined) updateData.category = category || null;
    
    const description = formData.get('description')?.toString();
    if (description !== undefined) updateData.description = description || null;
    
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    
    if (modalImageUrl !== undefined) updateData.modalImageUrl = modalImageUrl;
    
    const detailDescription = formData.get('detailDescription')?.toString();
    if (detailDescription !== undefined) updateData.detailDescription = detailDescription || null;
    
    const linkUrl = formData.get('linkUrl')?.toString();
    if (linkUrl !== undefined) updateData.linkUrl = linkUrl || null;
    
    if (technologies !== undefined) {
      updateData.technologies = technologies ? JSON.stringify(technologies) : null;
    }
    
    const client = formData.get('client')?.toString();
    if (client !== undefined) updateData.client = client || null;
    
    const date = formData.get('date')?.toString();
    if (date !== undefined) updateData.date = date || null;
    
    const duration = formData.get('duration')?.toString();
    if (duration !== undefined) updateData.duration = duration || null;
    
    if (features !== undefined) {
      updateData.features = features ? JSON.stringify(features) : null;
    }
    
    const order = formData.get('order')?.toString();
    if (order !== undefined) updateData.order = parseInt(order || '0');
    
    const isActive = formData.get('isActive')?.toString();
    if (isActive !== undefined) updateData.isActive = isActive === 'true';

    const updatedProject = await prisma.project.update({
      where: { id },
      data: updateData,
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


