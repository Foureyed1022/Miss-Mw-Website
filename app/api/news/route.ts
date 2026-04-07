import { NextResponse } from "next/server";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const uploadDir = join(process.cwd(), "public/uploads/news");

    // Create uploads directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    // Handle file upload
    const imageFile = formData.get("image") as File;

    if (!imageFile) {
      throw new Error("No image file provided");
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const filename = `news-${uuidv4()}-${imageFile.name.replace(/\s+/g, "-")}`;
    const filePath = join(uploadDir, filename);
    writeFileSync(filePath, buffer);

    const imageUrl = `/uploads/news/${filename}`;

    return NextResponse.json({
      success: true,
      url: imageUrl
    }, { status: 201 });

  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({
      success: false,
      message: error.message || "Image upload failed"
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      throw new Error("No image URL provided");
    }

    // Extract filename from URL and create full server path
    const filename = imageUrl.split('/').pop();
    const filePath = join(process.cwd(), 'public', 'uploads', 'news', filename);

    // Check if file exists before attempting deletion
    if (!existsSync(filePath)) {
      throw new Error("File not found");
    }

    // Delete the file
    unlinkSync(filePath);

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully"
    });

  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json({
      success: false,
      message: error.message || "Failed to delete image"
    }, { status: 500 });
  }
}