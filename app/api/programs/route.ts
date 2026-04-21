import { NextResponse } from "next/server"
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"
import { adminDb } from "@/lib/firebase-admin"
import * as admin from "firebase-admin"

const PROGRAMS_COLLECTION = "programs"

export async function GET() {
  try {
    if (!adminDb) {
      console.error("Firebase Admin DB not initialized for GET /api/programs")
      return NextResponse.json({ error: "Database unavailable" }, { status: 503 })
    }

    const programsRef = adminDb.collection(PROGRAMS_COLLECTION)
    const snapshot = await programsRef.orderBy("createdAt", "desc").get()

    const programs = snapshot.docs.map((docSnap) => {
      const data = docSnap.data() as Record<string, any>
      return {
        id: docSnap.id,
        title: data.title || "",
        description: data.description || "",
        fullDescription: data.fullDescription || data.description || "",
        mission: data.mission || "",
        category: data.category || "",
        activities: Array.isArray(data.activities) ? data.activities : [],
        impact: Array.isArray(data.impact) ? data.impact : [],
        image: data.image || "",
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : null,
      }
    })

    return NextResponse.json(programs)
  } catch (error: any) {
    console.error("Error fetching programs", error)
    return NextResponse.json({ error: "Failed to load programs", details: error?.message, stack: error?.stack }, { status: 500 })
  }
}

const parseList = (value: FormDataEntryValue | null) => {
  if (!value) return []
  return value
    .toString()
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean)
}

export async function POST(request: Request) {
  try {
    if (!adminDb) {
      console.error("Firebase Admin DB not initialized for POST /api/programs")
      return NextResponse.json({ success: false, message: "Database unavailable" }, { status: 503 })
    }

    const formData = await request.formData()
    const uploadDir = join(process.cwd(), "public/uploads/programs")

    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true })
    }

    const title = formData.get("title")?.toString().trim() || ""
    const description = formData.get("description")?.toString().trim() || ""
    const fullDescription = formData.get("fullDescription")?.toString().trim() || description
    const mission = formData.get("mission")?.toString().trim() || ""
    const category = formData.get("category")?.toString().trim() || "General"
    const activities = parseList(formData.get("activities"))
    const impact = parseList(formData.get("impact"))
    const rawImage = formData.get("image")
    const imageFile = rawImage instanceof File ? rawImage : null
    let imageUrl = formData.get("imageUrl")?.toString().trim() || ""

    if (!title) {
      return NextResponse.json({ success: false, message: "Title is required" }, { status: 400 })
    }

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer())
      const filename = `program-${uuidv4()}-${imageFile.name.replace(/\s+/g, "-")}`
      const filePath = join(uploadDir, filename)
      writeFileSync(filePath, buffer)
      imageUrl = `/uploads/programs/${filename}`
    }

    const programsRef = adminDb.collection(PROGRAMS_COLLECTION)
    const docRef = await programsRef.add({
      title,
      description,
      fullDescription,
      mission,
      category,
      activities,
      impact,
      image: imageUrl,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })

    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 })
  } catch (error) {
    console.error("Error saving program", error)
    return NextResponse.json({ success: false, message: "Failed to save program" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    if (!adminDb) {
      console.error("Firebase Admin DB not initialized for DELETE /api/programs")
      return NextResponse.json({ success: false, message: "Database unavailable" }, { status: 503 })
    }

    const body = await request.json()
    const { id, imageUrl } = body

    if (!id) {
      return NextResponse.json({ success: false, message: "Program id is required" }, { status: 400 })
    }

    await adminDb.collection(PROGRAMS_COLLECTION).doc(id).delete()

    if (imageUrl) {
      const filename = imageUrl.split("/").pop()
      if (filename) {
        const filePath = join(process.cwd(), "public/uploads/programs", filename)
        if (existsSync(filePath)) {
          unlinkSync(filePath)
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting program", error)
    return NextResponse.json({ success: false, message: "Failed to delete program" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    if (!adminDb) {
      return NextResponse.json({ success: false, message: "Database unavailable" }, { status: 503 })
    }

    const formData = await request.formData()
    const id = formData.get("id")?.toString()

    if (!id) {
      return NextResponse.json({ success: false, message: "Program ID is required" }, { status: 400 })
    }

    const title = formData.get("title")?.toString().trim() || ""
    const category = formData.get("category")?.toString().trim() || "General"
    const description = formData.get("description")?.toString().trim() || ""
    const fullDescription = formData.get("fullDescription")?.toString().trim() || description
    const mission = formData.get("mission")?.toString().trim() || ""
    const activities = parseList(formData.get("activities"))
    const impact = parseList(formData.get("impact"))
    const rawImage = formData.get("image")
    const imageFile = rawImage instanceof File ? rawImage : null
    let imageUrl = formData.get("imageUrl")?.toString().trim() || ""

    if (imageFile && imageFile.size > 0) {
      // 1. Cleanup old image if exists
      if (imageUrl) {
        const oldFilename = imageUrl.split("/").pop()
        if (oldFilename) {
          const oldPath = join(process.cwd(), "public/uploads/programs", oldFilename)
          if (existsSync(oldPath)) unlinkSync(oldPath)
        }
      }

      // 2. Upload new image
      const buffer = Buffer.from(await imageFile.arrayBuffer())
      const filename = `program-${uuidv4()}-${imageFile.name.replace(/\s+/g, "-")}`
      const uploadDir = join(process.cwd(), "public/uploads/programs")
      const filePath = join(uploadDir, filename)
      writeFileSync(filePath, buffer)
      imageUrl = `/uploads/programs/${filename}`
    }

    await adminDb.collection(PROGRAMS_COLLECTION).doc(id).update({
      title,
      description,
      fullDescription,
      mission,
      category,
      activities,
      impact,
      image: imageUrl,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating program", error)
    return NextResponse.json({ success: false, message: "Failed to update program" }, { status: 500 })
  }
}
