import { NextResponse } from "next/server";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { applicationSchema } from "@/lib/validation";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const uploadDir = join(process.cwd(), "public/uploads");

    // 1. Create uploads directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    // 2. Handle file uploads locally
    const saveFile = async (file: File, prefix: string) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${prefix}-${uuidv4()}-${file.name.replace(/\s+/g, "-")}`;
      const filePath = join(uploadDir, filename);
      writeFileSync(filePath, buffer);
      return `/uploads/${filename}`;
    };

    // 3. Process all files
    const files = {
      headshotPhoto: formData.get("headshotPhoto") as File,
      fullLengthPhoto: formData.get("fullLengthPhoto") as File,
      consentletter: formData.get("consentletter") as File,
      idProof: formData.get("idProof") as File,
    };

    const [
      headshotPath,
      fullLengthPath,
      consentPath,
      idProofPath,
    ] = await Promise.all([
      saveFile(files.headshotPhoto, "headshot"),
      saveFile(files.fullLengthPhoto, "full-length"),
      saveFile(files.consentletter, "consent"),
      saveFile(files.idProof, "id-proof"),
    ]);

    // 4. Prepare and validate form data
    const formValues = Object.fromEntries(formData.entries());
    const preparedData = {
      ...formValues,
      age: parseInt(formValues.age as string),
      height: parseInt(formValues.height as string),
      termsAccepted: formValues.termsAccepted === "true",
    };

    const validatedData = applicationSchema.omit({
      headshotPhoto: true,
      fullLengthPhoto: true,
      consentletter: true,
      idProof: true,
    }).parse(preparedData);

    // 5. Save to Firestore
    const applicantId = uuidv4();
    await setDoc(doc(db, "applicant", applicantId), {
      ...validatedData,
      id: applicantId,
      headshotPhoto: headshotPath,
      fullLengthPhoto: fullLengthPath,
      consentletter: consentPath,
      idProof: idProofPath,
      applicationStatus: "pending",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // 6. Return success response
    return NextResponse.json({
      success: true,
      data: {
        id: applicantId,
        email: validatedData.email,
        name: `${validatedData.firstName} ${validatedData.lastName}`,
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error("Application error:", error);
    return NextResponse.json({
      success: false,
      message: error.message || "Application failed",
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    }, { 
      status: error instanceof ZodError ? 400 : 500 
    });
  }
}