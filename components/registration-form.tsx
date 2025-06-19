"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, Upload } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { submitRegistration } from "@/app/pageant/register/action"

export default function RegistrationForm() {
  const [date, setDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClientSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true)
    // The actual submission is handled by the server action
    // This is just for UI feedback
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-8">
        <h2 className="font-playfair text-3xl font-bold text-[#212224] mb-6 text-center">
          Miss Malawi 2025 Registration
        </h2>

        <form action={submitRegistration} onSubmit={handleClientSubmit} className="space-y-8">
          {/* Personal Information */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <Label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Select your date of birth</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => {
                        setDate(newDate)
                        // Set the hidden input value for form submission
                        if (newDate) {
                          const input = document.getElementById("dob-hidden") as HTMLInputElement
                          if (input) input.value = format(newDate, "yyyy-MM-dd")
                        }
                      }}
                      initialFocus
                      disabled={(date) => {
                        // Disable dates that would make the person younger than 18 or older than 26
                        const today = new Date()
                        const minDate = new Date()
                        minDate.setFullYear(today.getFullYear() - 26)
                        const maxDate = new Date()
                        maxDate.setFullYear(today.getFullYear() - 18)
                        return date > maxDate || date < minDate
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <input
                  id="dob-hidden"
                  name="dob"
                  type="hidden"
                  value={date ? format(date, "yyyy-MM-dd") : ""}
                  required
                />
              </div>
              <div>
                <Label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
                  Nationality <span className="text-red-500">*</span>
                </Label>
                <Input id="nationality" name="nationality" defaultValue="Malawian" required className="w-full" />
              </div>
              <div>
                <Label htmlFor="id-number" className="block text-sm font-medium text-gray-700 mb-1">
                  National ID Number <span className="text-red-500">*</span>
                </Label>
                <Input id="id-number" name="idNumber" required className="w-full" />
              </div>
              <div>
                <Label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                  Occupation/Profession <span className="text-red-500">*</span>
                </Label>
                <Input id="occupation" name="occupation" required className="w-full" />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input id="email" name="email" type="email" required className="w-full" />
              </div>
              <div>
                <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input id="phone" name="phone" type="tel" required className="w-full" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Physical Address <span className="text-red-500">*</span>
                </Label>
                <Textarea id="address" name="address" required className="w-full" />
              </div>
              <div>
                <Label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City/Town <span className="text-red-500">*</span>
                </Label>
                <Input id="city" name="city" required className="w-full" />
              </div>
              <div>
                <Label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                  District <span className="text-red-500">*</span>
                </Label>
                <Select name="district">
                  <SelectTrigger id="district">
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blantyre">Blantyre</SelectItem>
                    <SelectItem value="lilongwe">Lilongwe</SelectItem>
                    <SelectItem value="mzuzu">Mzuzu</SelectItem>
                    <SelectItem value="zomba">Zomba</SelectItem>
                    <SelectItem value="kasungu">Kasungu</SelectItem>
                    <SelectItem value="mangochi">Mangochi</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Education & Background */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Education & Background</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                  Highest Level of Education <span className="text-red-500">*</span>
                </Label>
                <Select name="education">
                  <SelectTrigger id="education">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="msce">MSCE (Malawi School Certificate of Education)</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                    <SelectItem value="masters">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
                  Institution Name <span className="text-red-500">*</span>
                </Label>
                <Input id="institution" name="institution" required className="w-full" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="languages" className="block text-sm font-medium text-gray-700 mb-1">
                  Languages Spoken <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="languages"
                  name="languages"
                  required
                  className="w-full"
                  placeholder="e.g., Chichewa, English, Tumbuka"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                  Special Skills or Talents
                </Label>
                <Textarea
                  id="skills"
                  name="skills"
                  className="w-full"
                  placeholder="Please list any special skills or talents you have (e.g., singing, dancing, public speaking)"
                />
              </div>
            </div>
          </div>

          {/* Pageant Information */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Pageant Information</h3>
            <div className="space-y-6">
              <div>
                <Label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                  Previous Pageant Experience
                </Label>
                <RadioGroup defaultValue="no" name="experience" className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="experience-yes" />
                    <Label htmlFor="experience-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="experience-no" />
                    <Label htmlFor="experience-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="pageants" className="block text-sm font-medium text-gray-700 mb-1">
                  If yes, please list previous pageants and achievements
                </Label>
                <Textarea
                  id="pageants"
                  name="pageants"
                  className="w-full"
                  placeholder="e.g., Miss University 2023 - 1st Runner Up"
                />
              </div>

              <div>
                <Label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-1">
                  Social Impact Platform/Cause <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="platform"
                  name="platform"
                  required
                  className="w-full"
                  placeholder="Describe the social cause or issue you are passionate about and would promote as Miss Malawi"
                />
              </div>

              <div>
                <Label htmlFor="why" className="block text-sm font-medium text-gray-700 mb-1">
                  Why do you want to be Miss Malawi? <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="why"
                  name="why"
                  required
                  className="w-full"
                  placeholder="Explain your motivation for participating in the Miss Malawi pageant"
                />
              </div>

              <div>
                <Label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Audition Region <span className="text-red-500">*</span>
                </Label>
                <Select name="region">
                  <SelectTrigger id="region">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="northern">Northern Region (Mzuzu)</SelectItem>
                    <SelectItem value="central">Central Region (Lilongwe)</SelectItem>
                    <SelectItem value="southern">Southern Region (Blantyre)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Photos</h3>
            <p className="text-gray-600 mb-4">
              Please upload recent photos of yourself. One headshot and one full-length photo.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="headshot" className="block text-sm font-medium text-gray-700 mb-1">
                  Headshot Photo <span className="text-red-500">*</span>
                </Label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="headshot-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-[#212224] hover:text-[#212224]/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#212224]"
                      >
                        <span>Upload a file</span>
                        <input
                          id="headshot-upload"
                          name="headshot-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="fullbody" className="block text-sm font-medium text-gray-700 mb-1">
                  Full-Length Photo <span className="text-red-500">*</span>
                </Label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="fullbody-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-[#212224] hover:text-[#212224]/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#212224]"
                      >
                        <span>Upload a file</span>
                        <input
                          id="fullbody-upload"
                          name="fullbody-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Terms and Conditions</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <Checkbox id="terms" name="terms" required />
                </div>
                <div className="ml-3 text-sm">
                  <Label htmlFor="terms" className="text-gray-700">
                    I confirm that I meet all the eligibility criteria for Miss Malawi 2025 and that all information
                    provided is accurate and truthful. <span className="text-red-500">*</span>
                  </Label>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <Checkbox id="rules" name="rules" required />
                </div>
                <div className="ml-3 text-sm">
                  <Label htmlFor="rules" className="text-gray-700">
                    I agree to abide by all rules and regulations of the Miss Malawi pageant and accept the judges'
                    decision as final. <span className="text-red-500">*</span>
                  </Label>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <Checkbox id="media" name="media" required />
                </div>
                <div className="ml-3 text-sm">
                  <Label htmlFor="media" className="text-gray-700">
                    I grant permission for my photos and information to be used for promotional purposes related to the
                    Miss Malawi pageant. <span className="text-red-500">*</span>
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-[#212224] hover:bg-[#212224]/90 text-lg py-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Registration"}
            </Button>
            <p className="text-center text-sm text-gray-500 mt-4">
              For any questions or assistance, please contact us at registration@missmalawi.com
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
