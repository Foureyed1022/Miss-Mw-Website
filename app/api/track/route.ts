import { NextResponse } from "next/server"
import { saveAnalyticsEvent } from "@/lib/firestore"

type TrackEventPayload = {
  name: string
  source?: string
  path?: string
  metadata?: Record<string, unknown>
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TrackEventPayload

    // Persist to Firestore
    await saveAnalyticsEvent({
      name: body.name,
      source: body.source,
      path: body.path || "/",
      metadata: body.metadata
    })

    console.log("[analytics] event saved", {
      ...body,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[analytics] error parsing or saving event", error)
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
