import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"

export default function DonationSuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const transactionId = (searchParams.transactionId as string) || "TX-UNKNOWN"
  const amount = (searchParams.amount as string) || "0"
  const name = (searchParams.name as string) || "Donor"
  const isMonthly = searchParams.isMonthly === "true"

  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Thank You for Your Donation" description="Your generosity makes our work possible" />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#212224]/5 text-[#212224] mb-6">
              <CheckCircle className="h-10 w-10" />
            </div>

            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#212224] mb-6">Donation Successful!</h2>

            <p className="text-gray-700 text-lg mb-8">
              Thank you, {name}, for your {isMonthly ? "monthly" : "one-time"} donation of K{amount}. Your generosity
              will help empower young Malawian women and create lasting change in communities across the country.
            </p>

            <div className="bg-[#212224]/5 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Transaction Details</h3>
              <p className="text-gray-700 mb-1">Transaction ID: {transactionId}</p>
              <p className="text-gray-700 mb-1">Amount: K{amount}</p>
              <p className="text-gray-700 mb-1">Type: {isMonthly ? "Monthly Donation" : "One-Time Donation"}</p>
              <p className="text-gray-700">A receipt has been sent to your email address.</p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">
                Your donation will be put to work immediately to support our programs in education, health, and
                leadership development.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button asChild className="bg-[#212224] hover:bg-[#212224]/90">
                  <Link href="/">Return to Homepage</Link>
                </Button>
                <Button asChild variant="outline" className="border-[#212224] text-[#212224] hover:bg-[#212224]/5">
                  <Link href="/programs">Explore Our Programs</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
