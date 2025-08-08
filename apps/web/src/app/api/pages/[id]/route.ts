import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { supabase } from "@linkhive/database"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { data: page, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", params.id)
      .eq("user_id", userId)
      .single()

    if (error) {
      console.error("Database error:", error)
      return new NextResponse("Page not found", { status: 404 })
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error("API error:", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { title, description, slug, theme, background, status } = body

    // Check if page exists and belongs to user
    const { data: existingPage } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", params.id)
      .eq("user_id", userId)
      .single()

    if (!existingPage) {
      return new NextResponse("Page not found", { status: 404 })
    }

    // If slug is being changed, check if new slug is available
    if (slug) {
      const { data: slugExists } = await supabase
        .from("profiles")
        .select("id")
        .eq("slug", slug)
        .neq("id", params.id)
        .single()

      if (slugExists) {
        return new NextResponse("Slug already exists", { status: 409 })
      }
    }

    // Update page
    const { data: page, error } = await supabase
      .from("profiles")
      .update({
        title,
        description,
        slug,
        theme,
        background,
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .eq("user_id", userId)
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return new NextResponse("Database error", { status: 500 })
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error("API error:", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Check if page exists and belongs to user
    const { data: existingPage } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", params.id)
      .eq("user_id", userId)
      .single()

    if (!existingPage) {
      return new NextResponse("Page not found", { status: 404 })
    }

    // Delete page and associated links
    const { error: linksError } = await supabase
      .from("links")
      .delete()
      .eq("profile_id", params.id)

    if (linksError) {
      console.error("Error deleting links:", linksError)
    }

    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", params.id)
      .eq("user_id", userId)

    if (error) {
      console.error("Database error:", error)
      return new NextResponse("Database error", { status: 500 })
    }

    return new NextResponse("Page deleted successfully", { status: 200 })
  } catch (error) {
    console.error("API error:", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}
