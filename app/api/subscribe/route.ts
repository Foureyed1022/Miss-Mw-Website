import { NextResponse } from "next/server"
import { saveSubscriber } from "@/lib/firestore"

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const success = await saveSubscriber(email, source || "unknown")

    if (success) {
      return NextResponse.json({ ok: true })
    } else {
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
    }
  } catch (error) {
    console.error("Subscription error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
