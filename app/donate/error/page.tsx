import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"

export default async function DonationErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams
  const errorMessage = (resolvedParams.message as string) || "An error occurred while processing your donation."

  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Donation Error" description="There was a problem processing your donation" />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-[#7C3AED]enter">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 text-red-600 mb-6">
              <AlertCircle className="h-10 w-10" />
            </div>

            <h2 className="font-playfair text-[#7C3AED]xl md:text-4xl font-bold text-[#212224] mb-6">Payment Not Processed</h2>

            <div className="bg-red-50 p-6 rounded-lg mb-8">
              <p className="text-gray-700 text-lg">{errorMessage}</p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">Please try again or contact our support team for assistance.</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button asChild className="bg-[#212224] hover:bg-[#212224]/90">
                  <Link href="/donate">Try Again</Link>
                </Button>
                <Button asChild variant="outline" className="border-[#212224] text-[#212224] hover:bg-[#212224]/5">
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

