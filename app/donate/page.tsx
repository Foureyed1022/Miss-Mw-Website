import type React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, CheckCircle, CreditCard, Heart, Landmark, Wallet } from "lucide-react"
import PageHeader from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { submitDonation } from "./payment-action"

export default function DonatePage() {
  return (
    <div className="flex flex-col w-full">
      <PageHeader
        title="Support Our Mission"
        description="Your donation helps empower young Malawian women and create lasting impact"
      />

      {/* Donation Impact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#212224] mb-4">Your Impact</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Your generous donation directly supports our programs and initiatives, creating meaningful change in the
              lives of young Malawian women and communities.
            </p>
            <div className="w-24 h-1 bg-gold mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ImpactCard
              icon={<Heart className="h-8 w-8" />}
              title="Education Support"
              description="Your donation helps provide scholarships, educational resources, and mentorship to young women across Malawi."
              amount="K50,000"
              impact="Provides school supplies for 10 girls"
            />
            <ImpactCard
              icon={<Heart className="h-8 w-8" />}
              title="Health Initiatives"
              description="Support health awareness campaigns, workshops, and access to essential health services for women."
              amount="K100,000"
              impact="Funds a health workshop for 30 women"
            />
            <ImpactCard
              icon={<Heart className="h-8 w-8" />}
              title="Leadership Development"
              description="Help nurture the next generation of Malawian female leaders through training and opportunities."
              amount="K200,000"
              impact="Sponsors leadership training for 5 young women"
            />
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-8">
                <h2 className="font-playfair text-3xl font-bold text-[#212224] mb-6 text-center">Make a Donation</h2>

                <Tabs defaultValue="one-time" className="w-full">
                  <div className="text-center mb-8">
                    <TabsList className="inline-flex">
                      <TabsTrigger value="one-time">One-Time Donation</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly Donation</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="one-time">
                    <form action={submitDonation} className="space-y-6">
                      <input type="hidden" name="isMonthly" value="false" />

                      {/* Donation Amount */}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Select Donation Amount</h3>
                        <RadioGroup defaultValue="5000" name="amount">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div>
                              <RadioGroupItem value="5000" id="amount-5000" className="sr-only" />
                              <Label
                                htmlFor="amount-5000"
                                className="flex flex-col items-center justify-center border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-[#212224]/5 hover:border-[#212224]/20 [&:has([data-state=checked])]:bg-[#212224]/5 [&:has([data-state=checked])]:border-[#212224]/20"
                              >
                                <span className="text-lg font-bold text-gray-900">K5,000</span>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="10000" id="amount-10000" className="sr-only" />
                              <Label
                                htmlFor="amount-10000"
                                className="flex flex-col items-center justify-center border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-[#212224]/5 hover:border-[#212224]/20 [&:has([data-state=checked])]:bg-[#212224]/5 [&:has([data-state=checked])]:border-[#212224]/20"
                              >
                                <span className="text-lg font-bold text-gray-900">K10,000</span>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="25000" id="amount-25000" className="sr-only" />
                              <Label
                                htmlFor="amount-25000"
                                className="flex flex-col items-center justify-center border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-[#212224]/5 hover:border-[#212224]/20 [&:has([data-state=checked])]:bg-[#212224]/5 [&:has([data-state=checked])]:border-[#212224]/20"
                              >
                                <span className="text-lg font-bold text-gray-900">K25,000</span>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="custom" id="amount-custom" className="sr-only" />
                              <Label
                                htmlFor="amount-custom"
                                className="flex flex-col items-center justify-center border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-[#212224]/5 hover:border-[#212224]/20 [&:has([data-state=checked])]:bg-[#212224]/5 [&:has([data-state=checked])]:border-[#212224]/20"
                              >
                                <span className="text-lg font-bold text-gray-900">Custom</span>
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>

                        <div className="mt-4">
                          <Input
                            type="number"
                            name="customAmount"
                            placeholder="Enter custom amount (MWK)"
                            className="w-full"
                          />
                        </div>
                      </div>

                      {/* Donation Allocation */}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Allocate Your Donation</h3>
                        <RadioGroup defaultValue="general" name="allocation">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="general" id="allocation-general" />
                              <Label htmlFor="allocation-general" className="text-gray-700">
                                General Fund (Support all programs)
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="education" id="allocation-education" />
                              <Label htmlFor="allocation-education" className="text-gray-700">
                                Education Initiatives
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="health" id="allocation-health" />
                              <Label htmlFor="allocation-health" className="text-gray-700">
                                Health Programs
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="leadership" id="allocation-leadership" />
                              <Label htmlFor="allocation-leadership" className="text-gray-700">
                                Leadership Development
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="pageant" id="allocation-pageant" />
                              <Label htmlFor="allocation-pageant" className="text-gray-700">
                                Miss Malawi Pageant
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Personal Information */}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Your Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                              First Name <span className="text-red-500">*</span>
                            </Label>
                            <Input id="first-name" name="firstName" required className="w-full" />
                          </div>
                          <div>
                            <Label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                              Last Name <span className="text-red-500">*</span>
                            </Label>
                            <Input id="last-name" name="lastName" required className="w-full" />
                          </div>
                          <div>
                            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address <span className="text-red-500">*</span>
                            </Label>
                            <Input id="email" name="email" type="email" required className="w-full" />
                          </div>
                          <div>
                            <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number
                            </Label>
                            <Input id="phone" name="phone" type="tel" className="w-full" />
                          </div>
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h3>
                        <RadioGroup defaultValue="card" name="paymentMethod">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <RadioGroupItem value="card" id="payment-card" className="sr-only" />
                              <Label
                                htmlFor="payment-card"
                                className="flex flex-col items-center justify-center border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-[#212224]/5 hover:border-[#212224]/20 [&:has([data-state=checked])]:bg-[#212224]/5 [&:has([data-state=checked])]:border-[#212224]/20 h-full"
                              >
                                <CreditCard className="h-8 w-8 text-[#212224] mb-2" />
                                <span className="text-gray-900 font-medium">Credit/Debit Card</span>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="bank" id="payment-bank" className="sr-only" />
                              <Label
                                htmlFor="payment-bank"
                                className="flex flex-col items-center justify-center border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-[#212224]/5 hover:border-[#212224]/20 [&:has([data-state=checked])]:bg-[#212224]/5 [&:has([data-state=checked])]:border-[#212224]/20 h-full"
                              >
                                <Landmark className="h-8 w-8 text-[#212224] mb-2" />
                                <span className="text-gray-900 font-medium">Bank Transfer</span>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="mobile" id="payment-mobile" className="sr-only" />
                              <Label
                                htmlFor="payment-mobile"
                                className="flex flex-col items-center justify-center border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-[#212224]/5 hover:border-[#212224]/20 [&:has([data-state=checked])]:bg-[#212224]/5 [&:has([data-state=checked])]:border-[#212224]/20 h-full"
                              >
                                <Wallet className="h-8 w-8 text-[#212224] mb-2" />
                                <span className="text-gray-900 font-medium">Mobile Money</span>
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Comments */}
                      <div>
                        <Label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
                          Comments (Optional)
                        </Label>
                        <Textarea
                          id="comments"
                          name="comments"
                          placeholder="Share why you're supporting Miss Malawi Foundation"
                          className="w-full"
                        />
                      </div>

                      {/* Submit */}
                      <div className="pt-4">
                        <Button type="submit" className="w-full bg-[#212224] hover:bg-[#212224]/90 text-lg py-6">
                          Donate Now
                        </Button>
                        <p className="text-center text-sm text-gray-500 mt-4">
                          Your donation is tax-deductible to the extent allowed by law.
                        </p>
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="monthly">
                    <form action={submitDonation} className="space-y-6">
                      <input type="hidden" name="isMonthly" value="true" />

                      {/* Similar form structure as one-time donation, with monthly-specific options */}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Select Monthly Donation Amount</h3>
                        <RadioGroup defaultValue="2000" name="amount">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div>
                              <RadioGroupItem value="2000" id="monthly-2000" className="sr-only" />
                              <Label
                                htmlFor="monthly-2000"
                                className="flex flex-col items-center justify-center border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-[#212224]/5 hover:border-[#212224]/20 [&:has([data-state=checked])]:bg-[#212224]/5 [&:has([data-state=checked])]:border-[#212224]/20"
                              >
                                <span className="text-lg font-bold text-gray-900">K2,000/mo</span>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="5000" id="monthly-5000" className="sr-only" />
                              <Label
                                htmlFor="monthly-5000"
                                className="flex flex-col items-center justify-center border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-[#212224]/5 hover:border-[#212224]/20 [&:has([data-state=checked])]:bg-[#212224]/5 [&:has([data-state=checked])]:border-[#212224]/20"
                              >
                                <span className="text-lg font-bold text-gray-900">K5,000/mo</span>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="10000" id="monthly-10000" className="sr-only" />
                              <Label
                                htmlFor="monthly-10000"
                                className="flex flex-col items-center justify-center border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-[#212224]/5 hover:border-[#212224]/20 [&:has([data-state=checked])]:bg-[#212224]/5 [&:has([data-state=checked])]:border-[#212224]/20"
                              >
                                <span className="text-lg font-bold text-gray-900">K10,000/mo</span>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="custom" id="monthly-custom" className="sr-only" />
                              <Label
                                htmlFor="monthly-custom"
                                className="flex flex-col items-center justify-center border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-[#212224]/5 hover:border-[#212224]/20 [&:has([data-state=checked])]:bg-[#212224]/5 [&:has([data-state=checked])]:border-[#212224]/20"
                              >
                                <span className="text-lg font-bold text-gray-900">Custom</span>
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>

                        <div className="mt-4">
                          <Input
                            type="number"
                            name="customAmount"
                            placeholder="Enter custom monthly amount (MWK)"
                            className="w-full"
                          />
                        </div>
                      </div>

                      {/* Rest of the form fields similar to one-time donation */}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Allocate Your Monthly Donation</h3>
                        <RadioGroup defaultValue="general" name="allocation">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="general" id="monthly-allocation-general" />
                              <Label htmlFor="monthly-allocation-general" className="text-gray-700">
                                General Fund (Support all programs)
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="education" id="monthly-allocation-education" />
                              <Label htmlFor="monthly-allocation-education" className="text-gray-700">
                                Education Initiatives
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="health" id="monthly-allocation-health" />
                              <Label htmlFor="monthly-allocation-health" className="text-gray-700">
                                Health Programs
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="leadership" id="monthly-allocation-leadership" />
                              <Label htmlFor="monthly-allocation-leadership" className="text-gray-700">
                                Leadership Development
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="pageant" id="monthly-allocation-pageant" />
                              <Label htmlFor="monthly-allocation-pageant" className="text-gray-700">
                                Miss Malawi Pageant
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Personal Information */}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Your Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label
                              htmlFor="monthly-first-name"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              First Name <span className="text-red-500">*</span>
                            </Label>
                            <Input id="monthly-first-name" name="firstName" required className="w-full" />
                          </div>
                          <div>
                            <Label htmlFor="monthly-last-name" className="block text-sm font-medium text-gray-700 mb-1">
                              Last Name <span className="text-red-500">*</span>
                            </Label>
                            <Input id="monthly-last-name" name="lastName" required className="w-full" />
                          </div>
                          <div>
                            <Label htmlFor="monthly-email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address <span className="text-red-500">*</span>
                            </Label>
                            <Input id="monthly-email" name="email" type="email" required className="w-full" />
                          </div>
                          <div>
                            <Label htmlFor="monthly-phone" className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number
                            </Label>
                            <Input id="monthly-phone" name="phone" type="tel" className="w-full" />
                          </div>
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h3>
                        <RadioGroup defaultValue="card" name="paymentMethod">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <RadioGroupItem value="card" id="monthly-payment-card" className="sr-only" />
                              <Label
                                htmlFor="monthly-payment-card"
                                className="flex flex-col items-center justify-center border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-[#212224]/5 hover:border-[#212224]/20 [&:has([data-state=checked])]:bg-[#212224]/5 [&:has([data-state=checked])]:border-[#212224]/20 h-full"
                              >
                                <CreditCard className="h-8 w-8 text-[#212224] mb-2" />
                                <span className="text-gray-900 font-medium">Credit/Debit Card</span>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="bank" id="monthly-payment-bank" className="sr-only" />
                              <Label
                                htmlFor="monthly-payment-bank"
                                className="flex flex-col items-center justify-center border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-[#212224]/5 hover:border-[#212224]/20 [&:has([data-state=checked])]:bg-[#212224]/5 [&:has([data-state=checked])]:border-[#212224]/20 h-full"
                              >
                                <Landmark className="h-8 w-8 text-[#212224] mb-2" />
                                <span className="text-gray-900 font-medium">Bank Transfer</span>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="mobile" id="monthly-payment-mobile" className="sr-only" />
                              <Label
                                htmlFor="monthly-payment-mobile"
                                className="flex flex-col items-center justify-center border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-[#212224]/5 hover:border-[#212224]/20 [&:has([data-state=checked])]:bg-[#212224]/5 [&:has([data-state=checked])]:border-[#212224]/20 h-full"
                              >
                                <Wallet className="h-8 w-8 text-[#212224] mb-2" />
                                <span className="text-gray-900 font-medium">Mobile Money</span>
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Comments */}
                      <div>
                        <Label htmlFor="monthly-comments" className="block text-sm font-medium text-gray-700 mb-1">
                          Comments (Optional)
                        </Label>
                        <Textarea
                          id="monthly-comments"
                          name="comments"
                          placeholder="Share why you're supporting Miss Malawi Foundation"
                          className="w-full"
                        />
                      </div>

                      {/* Submit */}
                      <div className="pt-4">
                        <Button type="submit" className="w-full bg-[#212224] hover:bg-[#212224]/90 text-lg py-6">
                          Become a Monthly Donor
                        </Button>
                        <p className="text-center text-sm text-gray-500 mt-4">
                          You can cancel your monthly donation at any time.
                        </p>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#212224] mb-4">Other Ways to Give</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Beyond online donations, there are several other ways you can support Miss Malawi Foundation
            </p>
            <div className="w-24 h-1 bg-gold mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Corporate Sponsorship</h3>
              <p className="text-gray-700 mb-4">
                Partner with Miss Malawi Foundation as a corporate sponsor. We offer various sponsorship packages with
                recognition and visibility benefits.
              </p>
              <Button variant="outline" className="border-[#212224] text-[#212224] hover:bg-[#212224]/5">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">In-Kind Donations</h3>
              <p className="text-gray-700 mb-4">
                Donate goods, services, or expertise to support our programs and events. We welcome various forms of
                in-kind support.
              </p>
              <Button variant="outline" className="border-[#212224] text-[#212224] hover:bg-[#212224]/5">
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Legacy Giving</h3>
              <p className="text-gray-700 mb-4">
                Make a lasting impact by including Miss Malawi Foundation in your estate planning. Your legacy gift will
                support future generations.
              </p>
              <Button variant="outline" className="border-[#212224] text-[#212224] hover:bg-[#212224]/5">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Donor Recognition */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#212224] mb-4">Donor Recognition</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We are grateful to our generous donors who make our work possible
            </p>
            <div className="w-24 h-1 bg-gold mx-auto mt-4"></div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Platinum Donors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center h-32">
                    <Image
                      src="/placeholder-logo.svg"
                      alt={`Platinum Donor ${i}`}
                      width={120}
                      height={60}
                      className="opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Gold Donors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center h-24">
                    <Image
                      src="/placeholder-logo.svg"
                      alt={`Gold Donor ${i}`}
                      width={100}
                      height={50}
                      className="opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Silver Donors</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                  <div key={i} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-20">
                    <Image
                      src="/placeholder-logo.svg"
                      alt={`Silver Donor ${i}`}
                      width={80}
                      height={40}
                      className="opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#212224] mb-4">Donor Stories</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Hear from our donors about why they choose to support Miss Malawi Foundation
            </p>
            <div className="w-24 h-1 bg-gold mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <DonorStory
              image="/placeholder.svg?height=400&width=400"
              name="Chimwemwe Mphande"
              title="Individual Donor"
              quote="I support Miss Malawi Foundation because I believe in the power of empowering young women. The impact they're making in communities across Malawi is truly inspiring."
            />
            <DonorStory
              image="/placeholder.svg?height=400&width=400"
              name="Mphatso Banda"
              title="Corporate Sponsor"
              quote="As a business leader, I see the value in investing in women's empowerment. Our partnership with Miss Malawi Foundation has been rewarding both for our company and the communities we serve."
            />
            <DonorStory
              image="/placeholder.svg?height=400&width=400"
              name="Grace Nyirenda"
              title="Monthly Donor"
              quote="I give monthly because I want to be part of the ongoing work of Miss Malawi Foundation. It's a small contribution that, combined with others, makes a big difference."
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#212224] mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <FAQ
                question="Is my donation tax-deductible?"
                answer="Yes, Miss Malawi Foundation is a registered non-profit organization, and all donations are tax-deductible to the extent allowed by Malawian law. You will receive a receipt for your donation that can be used for tax purposes."
              />
              <FAQ
                question="How is my donation used?"
                answer="Your donation directly supports our programs in education, health, leadership development, and cultural preservation. We maintain transparency in our financial reporting, and you can specify which program you'd like your donation to support."
              />
              <FAQ
                question="Can I make a donation in honor or memory of someone?"
                answer="Yes, you can make a tribute donation in honor or memory of a loved one. During the donation process, you'll have the option to provide the name of the person you're honoring and, if desired, contact information for a notification card."
              />
              <FAQ
                question="What payment methods do you accept?"
                answer="We accept various payment methods including credit/debit cards, bank transfers, and mobile money services like TNM Mpamba and Airtel Money. For corporate donations or other arrangements, please contact our office directly."
              />
              <FAQ
                question="How do I update or cancel my monthly donation?"
                answer="To update or cancel your monthly donation, please email us at donations@missmalawi.com or call our office at +265 996 263 843. We'll be happy to assist you with any changes to your recurring donation."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#212224] text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Make a Difference Today</h2>
            <p className="mb-8 text-lg">
              Your support empowers young Malawian women and creates lasting change in communities across the country.
              Join us in our mission to promote beauty, intelligence, and advocacy.
            </p>
            <Button className="bg-gold hover:bg-gold/90 text-black text-lg px-8 py-6">
              Donate Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

interface ImpactCardProps {
  icon: React.ReactNode
  title: string
  description: string
  amount: string
  impact: string
}

function ImpactCard({ icon, title, description, amount, impact }: ImpactCardProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#212224]/5 text-[#212224] mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-700 mb-6">{description}</p>
      <div className="bg-[#212224]/5 p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <CheckCircle className="h-5 w-5 text-[#212224] mr-2" />
          <span className="font-bold text-gray-900">{amount}</span>
        </div>
        <p className="text-[#212224]">{impact}</p>
      </div>
    </div>
  )
}

interface DonorStoryProps {
  image: string
  name: string
  title: string
  quote: string
}

function DonorStory({ image, name, title, quote }: DonorStoryProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">{name}</h3>
          <p className="text-gold">{title}</p>
        </div>
      </div>
      <p className="text-gray-700 italic">"{quote}"</p>
    </div>
  )
}

interface FAQProps {
  question: string
  answer: string
}

function FAQ({ question, answer }: FAQProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-2">{question}</h3>
      <p className="text-gray-700">{answer}</p>
    </div>
  )
}
