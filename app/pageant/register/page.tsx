"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, Check, Upload } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { applicationSchema, ApplicationSchema } from "@/lib/validation"
import logo from "@/public/logo.png"

export default function RegistrationPage() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const totalSteps = 3

  const form = useForm<ApplicationSchema>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      age: 18,
      address: "",
      city: "",
      country: "",
      education: "",
      occupation: "",
      languages: "",
      height: 160,
      previousPageants: "",
      talents: "",
      communityService: "",
      whyJoin: "",
      paymentMethod: "Manual", // Updated to match expected enum or default
    },
  })

  const { trigger, control, setValue, handleSubmit } = form

  const nextStep = async () => {
    let isValid = false
    
    if (step === 1) {
      isValid = await trigger([
        "firstName", "lastName", "email", "phone", "dob", "age",
        "address", "city", "country"
      ])
    } else if (step === 2) {
      isValid = await trigger([
        "education", "occupation", "height", "whyJoin"
      ])
    }
    
    if (isValid && step < totalSteps) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const onSubmit = async (data: ApplicationSchema) => {
    setIsSubmitting(true)
    
    try {
      const formData = new FormData()
      
      // Append all form data
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof File) {
            formData.append(key, value)
          } else {
            formData.append(key, String(value))
          }
        }
      })

      const response = await fetch("/api/application", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit application")
      }

      window.alert("Application submitted successfully! Our team will review and contact you")
      window.location.href = "/pageant/register/success" // Updated to use existing success page

      form.reset()
      setStep(1)
    } catch (error: any) {
      window.alert(
        error instanceof Error 
          ? error.message 
          : "Failed to submit application. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (field: keyof ApplicationSchema, files: FileList | null) => {
    if (files && files.length > 0) {
      setValue(field, files[0])
      trigger(field)
    }
  }

  return (
    <>
      <div>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #8329B7 0%, #4C1D95 100%)' }}>
          {/* Animated Background Circles */}
          <div className="absolute inset-0 opacity-10">
            {/* Circle 1 */}
            <div
              className="absolute top-10 left-10 w-32 h-32 rounded-full flex items-center justify-center bg-white animate-pulse"
            >
              <Image
                src={logo}
                alt="Miss Malawi Logo"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>

            {/* Circle 2 */}
            <div
              className="absolute bottom-10 right-10 w-24 h-24 rounded-full flex items-center justify-center bg-white"
            >
              <Image
                src={logo}
                alt="Miss Malawi Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Registration & Application <span className="text-purple-200">Desk</span>
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
              Ready to begin your journey to the crown? Complete the application form below to register for <span className="font-bold text-purple-200">MISS MALAWI</span> 2025.
            </p>
          </div>
        </section>
      </div>

      <div className="container py-12 mx-auto px-4 lg:px-8">
        {/* Progress indicator */}
        <div className="mx-auto mb-12 max-w-3xl">
          <div className="relative mb-4">
            <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-200" />
            <div
              className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-purple-600 transition-all duration-300"
              style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }} 
            />
            <div className="relative flex justify-between">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${i <= step
                      ? "border-purple-600 bg-purple-600 text-white"
                      : "border-gray-200 bg-white text-gray-400"}`}
                >
                  {i < step ? <Check className="h-5 w-5" /> : i}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-xs font-medium text-gray-500">
            <span>PERSONAL INFO</span>
            <span>EXPERIENCE</span>
            <span>DOCUMENTS</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <Card className="mx-auto max-w-3xl shadow-xl border-gray-100">
              <CardHeader className="bg-gray-50/50">
                <CardTitle className="text-2xl text-purple-900">
                  {step === 1 && "Personal Information"}
                  {step === 2 && "Experience & Background"}
                  {step === 3 && "Document Upload"}
                </CardTitle>
                <CardDescription>
                  {step === 1 && "Please provide your basic contact and demographic information"}
                  {step === 2 && "Tell us about your educational background and pageant aspirations"}
                  {step === 3 && "Upload required photos and identification documents"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        control={control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First name *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Jane" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      <FormField
                        control={control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last name *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Doe" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} placeholder="jane@example.com" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      <FormField
                        control={control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone number *</FormLabel>
                            <FormControl>
                              <Input type="tel" {...field} placeholder="+265 888 000 000" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        control={control}
                        name="dob"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth *</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      <FormField
                        control={control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age *</FormLabel>
                            <FormControl>
                              <Select onValueChange={(val) => field.onChange(parseInt(val))} defaultValue={field.value?.toString()}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 12 }, (_, i) => 18 + i).map(age => (
                                    <SelectItem key={age} value={age.toString()}>{age} years</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                    </div>

                    <FormField
                      control={control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="123 Street Name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        control={control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City / District *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Lilongwe" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      <FormField
                        control={control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Malawi">Malawi</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        control={control}
                        name="education"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Education *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="secondary">MSCE or Equivalent</SelectItem>
                                <SelectItem value="certificate">Certificate</SelectItem>
                                <SelectItem value="diploma">Diploma</SelectItem>
                                <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                                <SelectItem value="masters">Master's Degree</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                      <FormField
                        control={control}
                        name="occupation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current occupation *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Software Engineer / Student" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                      control={control}
                      name="languages"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Languages spoken *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Chichewa, English" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    <FormField
                      control={control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (cm) *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                              placeholder="170" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <FormField
                      control={control}
                      name="previousPageants"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Previous pageant experience</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="None / Miss Teen 2022" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                    <FormField
                      control={control}
                      name="whyJoin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Why do you want to join this pageant? *</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Describe your motivation and platform"
                              className="min-h-[120px]" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                      control={control}
                      name="headshotPhoto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Headshot Photo *</FormLabel>
                          <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-purple-200">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-3 text-purple-400" />
                                <p className="text-xs text-gray-500">{field.value?.name || "Select JPEG/PNG (Max 5MB)"}</p>
                              </div>
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange("headshotPhoto", e.target.files)} />
                            </label>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )} />

                    <FormField
                      control={control}
                      name="fullLengthPhoto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Length Photo *</FormLabel>
                          <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-purple-200">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-3 text-purple-400" />
                                <p className="text-xs text-gray-500">{field.value?.name || "Select JPEG/PNG (Max 5MB)"}</p>
                              </div>
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange("fullLengthPhoto", e.target.files)} />
                            </label>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                      control={control}
                      name="consentletter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Consent Letter *</FormLabel>
                          <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-purple-200">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-3 text-purple-400" />
                                <p className="text-xs text-gray-500">{field.value?.name || "Select PDF (Max 2MB)"}</p>
                              </div>
                              <input type="file" className="hidden" accept="application/pdf" onChange={(e) => handleFileChange("consentletter", e.target.files)} />
                            </label>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )} />

                    <FormField
                      control={control}
                      name="idProof"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID Proof *</FormLabel>
                          <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-purple-200">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-3 text-purple-400" />
                                <p className="text-xs text-gray-500">{field.value?.name || "Select PDF/Image (Max 2MB)"}</p>
                              </div>
                              <input type="file" className="hidden" accept="image/*,application/pdf" onChange={(e) => handleFileChange("idProof", e.target.files)} />
                            </label>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <FormField
                      control={control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-purple-50/20 border-purple-100">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-purple-900">
                              I agree to the terms and conditions *
                            </FormLabel>
                            <p className="text-xs text-gray-500">
                              By checking this box, you agree to our{" "}
                              <Link href="/terms" className="text-purple-600 hover:underline">
                                Contestant Agreement
                              </Link>{" "}
                              and privacy policy.
                            </p>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between bg-gray-50/50 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={step === 1}
                  className="border-gray-200"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                {step < totalSteps ? (
                  <Button type="button" onClick={nextStep} className="bg-purple-600 hover:bg-purple-700">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting} className="bg-purple-600 hover:bg-purple-700">
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </form>
        </Form>
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Need help with your application?{" "}
            <Link href="/contact" className="text-purple-600 hover:underline font-medium">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
