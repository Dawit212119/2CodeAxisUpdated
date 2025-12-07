import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getBetterAuthSession } from "@/lib/better-auth-server";
import { cloudinary } from "@/lib/cloudinary";
import type { UploadApiResponse } from "cloudinary";

export async function POST(request: Request) {
  try {
    const session = await getBetterAuthSession();
    
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to register for a course." },
        { status: 401 }
      );
    }

    const formData = await request.formData();

    const courseId = formData.get("courseId")?.toString().trim() ?? "";
    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const phone = formData.get("phone")?.toString().trim() || undefined;
    const experienceLevel = formData.get("experienceLevel")?.toString().trim() || undefined;
    const preferredSchedule = formData.get("preferredSchedule")?.toString().trim() || undefined;
    const message = formData.get("message")?.toString().trim() || undefined;
    const paymentReceipt = formData.get("paymentReceipt");

    if (!courseId || !name || !email) {
      return NextResponse.json(
        { error: "Course, name, and email are required." },
        { status: 400 }
      );
    }

    if (!paymentReceipt) {
      return NextResponse.json(
        { error: "Payment receipt is required." },
        { status: 400 }
      );
    }

    // Upload payment receipt to Cloudinary
    let paymentReceiptUrl: string | undefined;
    if (paymentReceipt && typeof paymentReceipt === "object" && "arrayBuffer" in paymentReceipt) {
      try {
        const arrayBuffer = await (paymentReceipt as Blob).arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "payment-receipts",
              resource_type: "auto",
            },
            (error, result) => {
              if (error || !result) {
                return reject(error || new Error("Failed to upload receipt"));
              }
              resolve(result);
            }
          );

          uploadStream.end(buffer);
        });

        paymentReceiptUrl = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Receipt upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload payment receipt. Please try again." },
          { status: 500 }
        );
      }
    }

    // Create registration with pending_verification status (not saved to DB as "approved" yet)
    interface RegistrationData {
      courseId: string;
      name: string;
      email: string;
      phone: string;
      experienceLevel: string;
      preferredSchedule: string;
      message: string | null;
      paymentReceiptUrl: string | null;
      status: string;
      user?: { connect: { id: string } };
    }

    const registrationData: RegistrationData = {
      courseId,
      name,
      email,
      phone: phone || '',
      experienceLevel: experienceLevel || '',
      preferredSchedule: preferredSchedule || '',
      message: message || null,
      paymentReceiptUrl: paymentReceiptUrl || null,
      status: "pending_verification",
    };

    // Only add userId if session exists, using the correct relation syntax
    if (session?.id) {
      registrationData.user = {
        connect: { id: session.id }
      };
    }

    const registration = await prisma.courseRegistration.create({
      data: registrationData,
    });

    // Send email notification to admin
    try {
      await fetch('/api/notify-admin', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "course_registration",
          registrationId: registration.id,
          studentName: name,
          studentEmail: email,
          courseId: courseId,
        }),
      });
    } catch (emailError) {
      console.error("Failed to send admin notification email:", emailError);
      // Don't fail the registration if email fails
    }

    return NextResponse.json({ 
      success: true, 
      registrationId: registration.id,
      message: "Your registration and payment receipt have been submitted. We will verify your payment and contact you shortly."
    });
  } catch (error: unknown) {
    console.error("Error creating course registration", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
