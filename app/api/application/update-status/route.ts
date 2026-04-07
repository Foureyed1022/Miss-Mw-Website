import { NextResponse } from "next/server";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();

    // Validate required fields
    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "Application ID and status are required" },
        { status: 400 }
      );
    }

    // Validate status value
    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status. Must be 'pending', 'approved', or 'rejected'" },
        { status: 400 }
      );
    }

    // Get the document reference
    const applicantRef = doc(db, "applicant", id);

    // Check if the document exists
    const docSnap = await getDoc(applicantRef);
    if (!docSnap.exists()) {
      return NextResponse.json(
        { success: false, message: "Applicant not found" },
        { status: 404 }
      );
    }

    // Update the application status
    await updateDoc(applicantRef, {
      applicationStatus: status,
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      message: `Application status updated to ${status}`,
      data: { id, status }
    }, { status: 200 });

  } catch (error: any) {
    console.error("Update application status error:", error);
    return NextResponse.json({
      success: false,
      message: error.message || "Failed to update application status",
    }, { status: 500 });
  }
}