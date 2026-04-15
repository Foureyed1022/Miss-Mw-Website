"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Check, Upload, Video } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { applicationSchema, finalApplicationSchema, ApplicationSchema } from "@/lib/validation";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function RegistrationPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 3;

  const form = useForm<ApplicationSchema>({
    resolver: zodResolver(applicationSchema),
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      age: 18,
      address: "",
      city: "",
      country: "Malawi",
      education: "",
      occupation: "",
      languages: "",
      height: 160,
      previousPageants: "",
      talents: "",
      communityService: "",
      whyJoin: "",
      headshotPhoto: undefined,
      fullLengthPhoto: undefined,
      consentletter: undefined,
      idProof: undefined,
      introVideo: undefined,
      termsAccepted: false,
      paymentMethod: "Paychangu",
    },
  });

  const { trigger, control, setValue, handleSubmit } = form;

  const nextStep = async () => {
    let isValid = false;

    if (step === 1) {
      isValid = await trigger([
        "firstName", "lastName", "email", "phone", "dob", "age",
        "address", "city", "country"
      ]);
    } else if (step === 2) {
      isValid = await trigger([
        "education", "occupation", "height", "whyJoin"
      ]);
    } else if (step === 3) {
      isValid = true;
    }

    if (isValid && step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (data: ApplicationSchema) => {
    setIsSubmitting(true);

    try {
      // Validate with strict schema before submission
      const validatedData = finalApplicationSchema.parse(data);

      const formData = new FormData();

      // Append all form data
      Object.entries(validatedData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, String(value));
          }
        }
      });

      const response = await fetch("/api/application", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit application");
      }

      toast.success("✅ Application Submitted Successfully! You will be redirected to complete your payment. You must enter your First Name, Last Name, and Email exactly as provided.", {
        duration: 5000,
      });

      setTimeout(() => {
        window.location.href = "https://pay.paychangu.com/SC-VziVln";
      }, 5000);

      form.reset();
      setStep(1);
    } catch (error: any) {
      if (error?.issues) {
        const fileErrors = error.issues.filter((issue: any) =>
          ["headshotPhoto", "fullLengthPhoto", "consentletter", "idProof", "introVideo"].some(field => issue.path.includes(field))
        );

        if (fileErrors.length > 0) {
          toast.error('Please upload all required documents and video before submitting');
        } else {
          const errorMessage = error.issues.map((issue: any) => issue.message).join(', ');
          toast.error(`Validation Error: ${errorMessage}`);
        }
      } else {
        toast.error(error.message || "Failed to submit application");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (field: keyof ApplicationSchema, files: FileList | null) => {
    if (files && files.length > 0) {
      setValue(field, files[0]);
      trigger(field);
    } else {
      setValue(field, undefined as any);
    }
  };

  return (
    <>
      <style jsx global>{`
        @keyframes circle1Anim { from { transform: translate(0, 0); } to { transform: translate(20px, 20px); } }
        @keyframes circle2Anim { 0% { transform: translateY(0); } 50% { transform: translateY(-30px); } 100% { transform: translateY(0); } }
        @keyframes circle3Anim { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes circle3Float { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(30px, -20px); } }
        @keyframes circle4Anim { 0% { transform: translate(0, 0); } 25% { transform: translate(50px, 0); } 50% { transform: translate(50px, 50px); } 75% { transform: translate(0, 50px); } 100% { transform: translate(0, 0); } }
        @keyframes circle5Anim { 0% { transform: scale(1); } 100% { transform: scale(1.2); } }
      `}</style>

      <div>
        <section className="relative pt-32 pb-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #6D28D9 0%, #311B6F 100%)' }}>
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full flex items-center justify-center bg-white/90" style={{ animation: 'circle1Anim 2s ease-in-out infinite alternate' }}>
              <Image src={logo} alt="Miss Malawi Logo" width={50} height={50} className="object-contain" />
            </div>
            <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full flex items-center justify-center bg-white/90" style={{ animation: 'circle2Anim 3s ease-in-out infinite' }}>
              <Image src={logo} alt="Miss Malawi Logo" width={40} height={40} className="object-contain" />
            </div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full" style={{ backgroundColor: '#C4B5FD', animation: 'circle3Anim 5s linear infinite, circle3Float 7s ease-in-out infinite' }}></div>
            <div className="absolute top-1/4 right-1/4 w-20 h-20 rounded-full" style={{ backgroundColor: '#7C3AED', animation: 'circle4Anim 8s linear infinite' }}></div>
            <div className="absolute bottom-1/3 left-1/4 w-12 h-12 rounded-full" style={{ backgroundColor: '#A78BFA', animation: 'circle5Anim 2s ease-in-out infinite alternate' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-center">
            <div className="max-w-3xl space-y-5 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-purple-200">Miss Malawi 2026 Registration</p>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight">
                Registration & Application <span className="text-purple-200">Desk</span>
              </h1>
              <p className="text-lg text-purple-100 leading-relaxed">
                Ready to begin your journey to the crown? Complete the application form below to register for <span className="text-purple-200">MISS MALAWI</span> 2026.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="container py-16 mx-auto px-4">
        <div className="mx-auto mb-10 max-w-3xl">
          <div className="relative mb-6">
            <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-purple-200/30" />
            <div className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-purple-400 transition-all duration-300" style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }} />
            <div className="relative flex items-center justify-between gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold ${i <= step ? "border-[#7C3AED] bg-[#7C3AED] text-white" : "border-gray-300 bg-white text-gray-400"}`}>
                  {i < step ? <Check className="h-4 w-4" /> : i}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-purple-700">
            <div className="text-center">Personal Info</div>
            <div className="text-center">Experience</div>
            <div className="text-center">Documents</div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <Card className="mx-auto max-w-4xl shadow-xl border border-purple-100">
              <CardHeader className="bg-purple-50/70">
                <CardTitle className="text-2xl text-purple-900">
                  {step === 1 && "Personal Information"}
                  {step === 2 && "Experience & Background"}
                  {step === 3 && "Document & Video Upload"}
                </CardTitle>
                <CardDescription>
                  {step === 1 && "Please provide your basic contact and demographic information"}
                  {step === 2 && "Tell us about your educational background and aspirations"}
                  {step === 3 && "Upload required photos, documents, and your introductory video"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField control={control} name="firstName" render={({ field }) => (
                        <FormItem><FormLabel>First name *</FormLabel><FormControl><Input {...field} placeholder="Jane" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={control} name="lastName" render={({ field }) => (
                        <FormItem><FormLabel>Last name *</FormLabel><FormControl><Input {...field} placeholder="Doe" /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField control={control} name="email" render={({ field }) => (
                      <FormItem><FormLabel>Email *</FormLabel><FormControl><Input type="email" {...field} placeholder="jane@example.com" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={control} name="phone" render={({ field }) => (
                      <FormItem><FormLabel>Phone number *</FormLabel><FormControl><Input type="tel" {...field} placeholder="+265 888 000 000" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField control={control} name="dob" render={({ field }) => (
                        <FormItem><FormLabel>Date of Birth *</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={control} name="age" render={({ field }) => (
                        <FormItem><FormLabel>Age *</FormLabel><FormControl>
                          <Select onValueChange={(val) => field.onChange(parseInt(val))} defaultValue={field.value?.toString()}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 12 }, (_, i) => 18 + i).map(age => (
                                <SelectItem key={age} value={age.toString()}>{age} years</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField control={control} name="address" render={({ field }) => (
                      <FormItem><FormLabel>Address *</FormLabel><FormControl><Input {...field} placeholder="123 Street Name" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField control={control} name="city" render={({ field }) => (
                        <FormItem><FormLabel>City / District *</FormLabel><FormControl><Input {...field} placeholder="Lilongwe" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={control} name="country" render={({ field }) => (
                        <FormItem><FormLabel>Country *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent><SelectItem value="Malawi">Malawi</SelectItem></SelectContent>
                          </Select>
                          <FormMessage /></FormItem>
                      )} />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <FormField control={control} name="education" render={({ field }) => (
                      <FormItem><FormLabel>Education *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="secondary">MSCE or Equivalent</SelectItem>
                            <SelectItem value="certificate">Certificate</SelectItem>
                            <SelectItem value="diploma">Diploma</SelectItem>
                            <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                            <SelectItem value="masters">Master's Degree</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage /></FormItem>
                    )} />
                    <FormField control={control} name="occupation" render={({ field }) => (
                      <FormItem><FormLabel>Current occupation *</FormLabel><FormControl><Input {...field} placeholder="Software Engineer / Student" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField control={control} name="languages" render={({ field }) => (
                        <FormItem><FormLabel>Languages spoken *</FormLabel><FormControl><Input {...field} placeholder="Chichewa, English" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={control} name="height" render={({ field }) => (
                        <FormItem><FormLabel>Height (cm) *</FormLabel><FormControl><Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} placeholder="170" /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField control={control} name="previousPageants" render={({ field }) => (
                      <FormItem><FormLabel>Previous pageant experience</FormLabel><FormControl><Textarea {...field} placeholder="None / Miss Teen 2022" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={control} name="talents" render={({ field }) => (
                      <FormItem><FormLabel>Special talents or skills</FormLabel><FormControl><Textarea {...field} placeholder="Describe your talents" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={control} name="communityService" render={({ field }) => (
                      <FormItem><FormLabel>Community service or volunteer work</FormLabel><FormControl><Textarea {...field} placeholder="Describe your volunteer work" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={control} name="whyJoin" render={({ field }) => (
                      <FormItem><FormLabel>Why do you want to join this pageant? *</FormLabel><FormControl><Textarea {...field} placeholder="Describe your motivation" className="min-h-[120px]" /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField control={control} name="headshotPhoto" render={({ field }) => (
                        <FormItem><FormLabel>Headshot Photo *</FormLabel>
                          <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                                <p className="text-xs text-gray-500">{field.value?.name || "JPEG/PNG (Max 5MB)"}</p>
                              </div>
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange("headshotPhoto", e.target.files)} />
                            </label>
                          </div>
                          <FormMessage /></FormItem>
                      )} />
                      <FormField control={control} name="fullLengthPhoto" render={({ field }) => (
                        <FormItem><FormLabel>Full Length Photo *</FormLabel>
                          <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                                <p className="text-xs text-gray-500">{field.value?.name || "JPEG/PNG (Max 5MB)"}</p>
                              </div>
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange("fullLengthPhoto", e.target.files)} />
                            </label>
                          </div>
                          <FormMessage /></FormItem>
                      )} />
                    </div>

                    <FormField control={control} name="introVideo" render={({ field }) => (
                      <FormItem><FormLabel>Introductory Video (30s) *</FormLabel>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-[#3D3B48]/5 hover:bg-[#3D3B48]/10 border-[#7C3AED]">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Video className="w-10 h-10 mb-3 text-[#7C3AED]" />
                              <p className="text-sm font-medium text-[#3D3B48]">Upload your 30-second introduction</p>
                              <p className="text-xs text-gray-500 mt-1">{field.value?.name || "MP4, MOV, WebM (Max 50MB)"}</p>
                            </div>
                            <input type="file" className="hidden" accept="video/*" onChange={(e) => handleFileChange("introVideo", e.target.files)} />
                          </label>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1">Tip: Introduce yourself, share your passion, and tell us why you should be the next Miss Malawi.</p>
                        <FormMessage /></FormItem>
                    )} />

                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField control={control} name="consentletter" render={({ field }) => (
                        <FormItem><FormLabel>Consent Letter *</FormLabel>
                          <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300">
                              <div className="flex flex-col items-center justify-center">
                                <Upload className="w-6 h-6 mb-1 text-gray-400" />
                                <p className="text-[10px] text-gray-500">{field.value?.name || "PDF (Max 2MB)"}</p>
                              </div>
                              <input type="file" className="hidden" accept=".pdf" onChange={(e) => handleFileChange("consentletter", e.target.files)} />
                            </label>
                          </div>
                          <FormMessage /></FormItem>
                      )} />
                      <FormField control={control} name="idProof" render={({ field }) => (
                        <FormItem><FormLabel>ID Proof *</FormLabel>
                          <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300">
                              <div className="flex flex-col items-center justify-center">
                                <Upload className="w-6 h-6 mb-1 text-gray-400" />
                                <p className="text-[10px] text-gray-500">{field.value?.name || "PDF/Image (Max 2MB)"}</p>
                              </div>
                              <input type="file" className="hidden" accept="image/*,.pdf" onChange={(e) => handleFileChange("idProof", e.target.files)} />
                            </label>
                          </div>
                          <FormMessage /></FormItem>
                      )} />
                    </div>

                    <div className="rounded-lg border-2 bg-[#3D3B48] p-6 mt-6">
                      <h3 className="font-bold text-white flex items-center text-lg mb-3">
                        <span className="mr-2 text-xl">💳</span> Important Payment Information
                      </h3>
                      <div className="text-white space-y-2 text-sm leading-relaxed">
                        <p className="font-medium">After submitting your application:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>You will be redirected to the secure payment page.</li>
                          <li>Ensure your <span className="text-[#7C3AED] font-bold">First Name</span>, <span className="text-[#7C3AED] font-bold">Last Name</span>, and <span className="text-[#7C3AED] font-bold">Email</span> match your application.</li>
                          <li>Registration Fee: <span className="text-[#7C3AED] font-bold">MWK 30,000</span></li>
                        </ul>
                      </div>
                    </div>

                    <FormField control={control} name="termsAccepted" render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-gray-50/50">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <FormLabel className="text-[#3D3B48] text-sm">
                          I agree to the <Link href="/terms-and-conditions" target="_blank" className="text-purple-600 hover:underline">Terms of Service</Link>, <Link href="/contestant-agreement" target="_blank" className="text-purple-600 hover:underline">Contestant Agreement</Link> and <Link href="/privacy-policy" target="_blank" className="text-purple-600 hover:underline">Privacy Policy</Link> *
                        </FormLabel>
                        <p className="text-[10px] text-gray-500">By checking this box, you agree to our official guidelines and data protection policies.</p>
                        <FormMessage /></FormItem>
                    )} />
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between bg-gray-50/50 pt-6">
                <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1} className="border-gray-200"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                {step < totalSteps ? (
                  <Button type="button" onClick={nextStep} className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white">Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting} className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white">
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </>
  );
}

