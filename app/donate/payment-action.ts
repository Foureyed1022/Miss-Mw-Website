"use server"

import { redirect } from "next/navigation"
import { saveDonation } from "@/lib/firestore"

export type PaymentData = {
  amount: string
  allocation: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  paymentMethod: string
  comments?: string
  isMonthly: boolean
}

// This is a mock payment processor function
// In a real application, this would integrate with a payment provider API
async function processPayment(
  data: PaymentData,
): Promise<{ success: boolean; transactionId?: string; error?: string }> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Simulate successful payment (in a real app, this would call a payment API)
  // For demo purposes, we'll return success for valid data
  if (!data.amount || !data.firstName || !data.lastName || !data.email) {
    return {
      success: false,
      error: "Missing required payment information",
    }
  }

  // Generate a mock transaction ID
  const transactionId = `TX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`

  return {
    success: true,
    transactionId,
  }
}

export async function submitDonation(formData: FormData) {
  const amount = formData.get("amount") as string
  const customAmount = formData.get("customAmount") as string
  const allocation = formData.get("allocation") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const paymentMethod = formData.get("paymentMethod") as string
  const comments = formData.get("comments") as string
  const isMonthly = formData.get("isMonthly") === "true"

  // Use custom amount if selected
  const finalAmount = amount === "custom" ? customAmount : amount

  const paymentData: PaymentData = {
    amount: finalAmount,
    allocation,
    firstName,
    lastName,
    email,
    phone,
    paymentMethod,
    comments,
    isMonthly,
  }

  let redirectUrl = ""
  try {
    const result = await processPayment(paymentData)

    if (result.success) {
      // Save to Firebase
      await saveDonation({
        amount: Number(finalAmount),
        allocation,
        firstName,
        lastName,
        email,
        phone,
        paymentMethod,
        comments,
        isMonthly,
        status: 'success',
        transactionId: result.transactionId
      })

      // Store transaction details in URL params for the success page
      const params = new URLSearchParams({
        transactionId: result.transactionId || "",
        amount: finalAmount,
        name: `${firstName} ${lastName}`,
        isMonthly: isMonthly.toString(),
      })

      redirectUrl = `/donate/success?${params.toString()}`
    } else {
      // Set error redirect URL
      redirectUrl = `/donate/error?message=${encodeURIComponent(result.error || "Payment failed")}`
    }
  } catch (error) {
    console.error("Payment processing error:", error)
    redirectUrl = "/donate/error?message=An unexpected error occurred"
  }

  if (redirectUrl) {
    redirect(redirectUrl)
  }
}
