import { NextResponse } from "next/server"
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"
import { adminDb } from "@/lib/firebase-admin"
import * as admin from "firebase-admin"

const IMPACT_STORIES_COLLECTION = "impact_stories"

export async function GET() {
  try {
    if (!adminDb) {
      console.error("Firebase Admin DB not initialized for GET /api/impact-stories")
      return NextResponse.json({ error: "Database unavailable" }, { status: 503 })
    }

    const storiesRef = adminDb.collection(IMPACT_STORIES_COLLECTION)
    const snapshot = await storiesRef.orderBy("createdAt", "desc").get()

    const stories = snapshot.docs.map((docSnap) => {
      const data = docSnap.data() as Record<string, any>
      return {
        id: docSnap.id,
        name: data.name || "",
        title: data.title || "",
        story: data.story || "",
        image: data.image || "",
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : null,
      }
    })

    return NextResponse.json(stories)
  } catch (error) {
    console.error("Error fetching impact stories", error)
    return NextResponse.json({ error: "Failed to load impact stories" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    if (!adminDb) {
      console.error("Firebase Admin DB not initialized for POST /api/impact-stories")
      return NextResponse.json({ success: false, message: "Database unavailable" }, { status: 503 })
    }

    const formData = await request.formData()
    const uploadDir = join(process.cwd(), "public/uploads/impact")

    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true })
    }

    const name = formData.get("name")?.toString().trim() || ""
    const title = formData.get("title")?.toString().trim() || ""
    const story = formData.get("story")?.toString().trim() || ""
    const rawImage = formData.get("image")
    const imageFile = rawImage instanceof File ? rawImage : null
    let imageUrl = formData.get("imageUrl")?.toString().trim() || ""

    if (!name || !story) {
      return NextResponse.json({ success: false, message: "Name and story are required" }, { status: 400 })
    }

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer())
      const filename = `impact-${uuidv4()}-${imageFile.name.replace(/\s+/g, "-")}`
      const filePath = join(uploadDir, filename)
      writeFileSync(filePath, buffer)
      imageUrl = `/uploads/impact/${filename}`
    }

    const storiesRef = adminDb.collection(IMPACT_STORIES_COLLECTION)
    const docRef = await storiesRef.add({
      name,
      title,
      story,
      image: imageUrl,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })

    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 })
  } catch (error) {
    console.error("Error saving impact story", error)
    return NextResponse.json({ success: false, message: "Failed to save impact story" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    if (!adminDb) {
      console.error("Firebase Admin DB not initialized for DELETE /api/impact-stories")
      return NextResponse.json({ success: false, message: "Database unavailable" }, { status: 503 })
    }

    const body = await request.json()
    const { id, imageUrl } = body

    if (!id) {
      return NextResponse.json({ success: false, message: "Story id is required" }, { status: 400 })
    }

    await adminDb.collection(IMPACT_STORIES_COLLECTION).doc(id).delete()

    if (imageUrl) {
      const filename = imageUrl.split("/").pop()
      if (filename) {
        const filePath = join(process.cwd(), "public/uploads/impact", filename)
        if (existsSync(filePath)) {
          unlinkSync(filePath)
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting impact story", error)
    return NextResponse.json({ success: false, message: "Failed to delete impact story" }, { status: 500 })
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
      return NextResponse.json({ success: false, message: "Story ID is required" }, { status: 400 })
    }

    const name = formData.get("name")?.toString().trim() || ""
    const title = formData.get("title")?.toString().trim() || ""
    const story = formData.get("story")?.toString().trim() || ""
    const rawImage = formData.get("image")
    const imageFile = rawImage instanceof File ? rawImage : null
    let imageUrl = formData.get("imageUrl")?.toString().trim() || ""

    if (imageFile && imageFile.size > 0) {
      if (imageUrl) {
        const oldFilename = imageUrl.split("/").pop()
        if (oldFilename) {
          const oldPath = join(process.cwd(), "public/uploads/impact", oldFilename)
          if (existsSync(oldPath)) unlinkSync(oldPath)
        }
      }

      const buffer = Buffer.from(await imageFile.arrayBuffer())
      const filename = `impact-${uuidv4()}-${imageFile.name.replace(/\s+/g, "-")}`
      const uploadDir = join(process.cwd(), "public/uploads/impact")
      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true })
      }
      const filePath = join(uploadDir, filename)
      writeFileSync(filePath, buffer)
      imageUrl = `/uploads/impact/${filename}`
    }

    await adminDb.collection(IMPACT_STORIES_COLLECTION).doc(id).update({
      name,
      title,
      story,
      image: imageUrl,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating impact story", error)
    return NextResponse.json({ success: false, message: "Failed to update impact story" }, { status: 500 })
  }
}
