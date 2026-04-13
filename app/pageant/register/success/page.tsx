"use client"

import Link from "next/link"
import { useEffect, use } from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"
import { trackEvent } from "@/lib/analytics"

export default function RegistrationSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = use(searchParams)
  const registrationId = (resolvedParams.registrationId as string) || "REG-UNKNOWN"
  const name = (resolvedParams.name as string) || "Contestant"

  useEffect(() => {
    trackEvent({
      name: "pageant_registration_completed",
      source: "pageant_registration_success_page",
      metadata: {
        registrationId,
        name,
      },
    })
  }, [registrationId, name])

  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Registration Successful" description="Thank you for applying to Miss Malawi 2025" />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-[#7C3AED]enter">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#212224]/5 text-[#212224] mb-6">
              <CheckCircle className="h-10 w-10" />
            </div>

            <h2 className="font-playfair text-[#7C3AED]xl md:text-4xl font-bold text-[#212224] mb-6">
              Application Submitted Successfully!
            </h2>

            <p className="text-gray-700 text-lg mb-8">
              Thank you, {name}, for your application to Miss Malawi 2025. We have received your registration and our
              team will review it shortly.
            </p>

            <div className="bg-[#212224]/5 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Registration Details</h3>
              <p className="text-gray-700 mb-1">Registration ID: {registrationId}</p>
              <p className="text-gray-700">
                A confirmation email has been sent to your email address with further instructions.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">
                What happens next? Our team will review your application and contact you within 7-10 business days
                regarding the next steps in the selection process, including details about the regional auditions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button asChild className="bg-[#212224] hover:bg-[#212224]/90">
                  <Link href="/">Return to Homepage</Link>
                </Button>
                <Button asChild variant="outline" className="border-[#212224] text-[#212224] hover:bg-[#212224]/5">
                  <Link href="/pageant">Learn More About the Pageant</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

