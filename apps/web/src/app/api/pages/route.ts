import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { supabase } from "@linkhive/database"

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { data: pages, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Database error:", error)
      return new NextResponse("Database error", { status: 500 })
    }

    return NextResponse.json(pages)
  } catch (error) {
    console.error("API error:", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { title, description, slug, theme, background } = body

    // Validate required fields
    if (!title || !slug) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // Check if slug is already taken
    const { data: existingPage } = await supabase
      .from("profiles")
      .select("id")
      .eq("slug", slug)
      .single()

    if (existingPage) {
      return new NextResponse("Slug already exists", { status: 409 })
    }

    // Create new page
    const { data: page, error } = await supabase
      .from("profiles")
      .insert({
        user_id: userId,
        title,
        description,
        slug,
        theme: theme || "modern",
        background: background || "gradient",
        status: "active",
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return new NextResponse("Database error", { status: 500 })
    }

    return NextResponse.json(page, { status: 201 })
  } catch (error) {
    console.error("API error:", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}
