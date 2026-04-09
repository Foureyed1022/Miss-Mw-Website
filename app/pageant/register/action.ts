"use server"

import { redirect } from "next/navigation"
import { saveApplicant } from "@/lib/firestore"

export type RegistrationData = {
  firstName: string
  lastName: string
  dob: string
  nationality: string
  idNumber: string
  occupation: string
  email: string
  phone: string
  address: string
  city: string
  district: string
  education: string
  institution: string
  languages: string
  skills?: string
  experience: string
  pageants?: string
  platform: string
  why: string
  region: string
}

// This is a mock registration processor function
async function processRegistration(
  data: RegistrationData,
): Promise<{ success: boolean; registrationId?: string; error?: string }> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Simulate successful registration (in a real app, this would call an API)
  if (!data.firstName || !data.lastName || !data.email) {
    return {
      success: false,
      error: "Missing required registration information",
    }
  }

  // Generate a mock registration ID
  const registrationId = `REG-${Math.random().toString(36).substring(2, 10).toUpperCase()}`

  return {
    success: true,
    registrationId,
  }
}

export async function submitRegistration(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const dob = formData.get("dob") as string
  const nationality = formData.get("nationality") as string
  const idNumber = formData.get("idNumber") as string
  const occupation = formData.get("occupation") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const address = formData.get("address") as string
  const city = formData.get("city") as string
  const district = formData.get("district") as string
  const education = formData.get("education") as string
  const institution = formData.get("institution") as string
  const languages = formData.get("languages") as string
  const skills = formData.get("skills") as string
  const experience = formData.get("experience") as string
  const pageants = formData.get("pageants") as string
  const platform = formData.get("platform") as string
  const why = formData.get("why") as string
  const region = formData.get("region") as string

  const registrationData: RegistrationData = {
    firstName,
    lastName,
    dob,
    nationality,
    idNumber,
    occupation,
    email,
    phone,
    address,
    city,
    district,
    education,
    institution,
    languages,
    skills,
    experience,
    pageants,
    platform,
    why,
    region,
  }

  let redirectUrl = ""
  try {
    const result = await processRegistration(registrationData)

    if (result.success) {
      // Save to Firebase
      await saveApplicant({
        ...registrationData,
        age: 0,
        height: 0,
        country: registrationData.nationality,
        talents: registrationData.skills || "",
        communityService: "",
        previousPageants: registrationData.pageants || "",
        whyJoin: registrationData.why,
        paymentMethod: "Manual",
        termsAccepted: true,
        headshotPhoto: "",
        fullLengthPhoto: "",
        idProof: "",
        consentletter: "",
        paymentProof: "",
        applicationStatus: 'pending'
      } as any)

      // Store registration details in URL params for the success page
      const params = new URLSearchParams({
        registrationId: result.registrationId || "",
        name: `${firstName} ${lastName}`,
      })

      redirectUrl = `/pageant/register/success?${params.toString()}`
    } else {
      // Set error redirect URL
      redirectUrl = `/pageant/register/error?message=${encodeURIComponent(result.error || "Registration failed")}`
    }
  } catch (error) {
    console.error("Registration processing error:", error)
    redirectUrl = "/pageant/register/error?message=An unexpected error occurred"
  }

  if (redirectUrl) {
    redirect(redirectUrl)
  }
}
