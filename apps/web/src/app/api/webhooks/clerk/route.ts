import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { Webhook } from "svix"
import { WebhookEvent } from "@clerk/nextjs/server"

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = headers().get("svix-signature")!
    const timestamp = headers().get("svix-timestamp")!
    const id = headers().get("svix-id")!

    const webhook = new Webhook(webhookSecret)

    let event: WebhookEvent

    try {
      event = webhook.verify(body, {
        "svix-id": id,
        "svix-timestamp": timestamp,
        "svix-signature": signature,
      }) as WebhookEvent
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return new NextResponse("Webhook signature verification failed", { status: 400 })
    }

    switch (event.type) {
      case "user.created":
        const user = event.data
        console.log("User created:", user.id)
        // Create user record in database
        // await createUser(user)
        break

      case "user.updated":
        const updatedUser = event.data
        console.log("User updated:", updatedUser.id)
        // Update user record in database
        // await updateUser(updatedUser)
        break

      case "user.deleted":
        const deletedUser = event.data
        console.log("User deleted:", deletedUser.id)
        // Delete user record from database
        // await deleteUser(deletedUser.id)
        break

      case "session.created":
        const session = event.data
        console.log("Session created:", session.id)
        // Handle new session
        break

      case "session.ended":
        const endedSession = event.data
        console.log("Session ended:", endedSession.id)
        // Handle session end
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new NextResponse("Webhook processed successfully", { status: 200 })
  } catch (error) {
    console.error("Webhook error:", error)
    return new NextResponse("Webhook error", { status: 500 })
  }
}
