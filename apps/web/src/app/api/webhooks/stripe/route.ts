import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = headers().get("stripe-signature")!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return new NextResponse("Webhook signature verification failed", { status: 400 })
    }

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session
        console.log("Checkout session completed:", session.id)
        // Handle successful payment
        // Update user subscription status in database
        break

      case "customer.subscription.created":
        const subscription = event.data.object as Stripe.Subscription
        console.log("Subscription created:", subscription.id)
        // Handle new subscription
        break

      case "customer.subscription.updated":
        const updatedSubscription = event.data.object as Stripe.Subscription
        console.log("Subscription updated:", updatedSubscription.id)
        // Handle subscription updates
        break

      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object as Stripe.Subscription
        console.log("Subscription deleted:", deletedSubscription.id)
        // Handle subscription cancellation
        break

      case "invoice.payment_succeeded":
        const invoice = event.data.object as Stripe.Invoice
        console.log("Invoice payment succeeded:", invoice.id)
        // Handle successful invoice payment
        break

      case "invoice.payment_failed":
        const failedInvoice = event.data.object as Stripe.Invoice
        console.log("Invoice payment failed:", failedInvoice.id)
        // Handle failed invoice payment
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
