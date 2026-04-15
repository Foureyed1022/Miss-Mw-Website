"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import PageHeader from "@/components/page-header"
import { saveContactMessage } from "@/lib/firestore"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError(null)

    try {
      const payload: {
        firstName: string
        lastName: string
        email: string
        subject: string
        message: string
        phone?: string
      } = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      }

      if (formData.phone.trim()) {
        payload.phone = formData.phone.trim()
      }

      const id = await saveContactMessage(payload)

      if (id) {
        setSubmitSuccess(true)
        setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" })
      } else {
        setSubmitError("We couldn't send your message. Please try again later.")
      }
    } catch (err) {
      console.error("Contact form error:", err)
      setSubmitError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Contact Us" description="Get in touch with the Miss Malawi Organization team" />

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ContactCard
              icon={<MapPin className="h-8 w-8 text-purple" />}
              title="Our Location"
              details={["HewKam House, Area 43, Plot 43/1314", "Miss Malawi, P.O Box 143", "Lilongwe, Malawi"]}
            />
            <ContactCard
              icon={<Phone className="h-8 w-8 text-purple" />}
              title="Phone Numbers"
              details={["+265 996 263 843", "+265 882 922 062"]}
            />
            <ContactCard
              icon={<Mail className="h-8 w-8 text-purple" />}
              title="Email Address"
              details={["info@missmw.org"]}
            />
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-playfair text-3xl font-bold text-emerald-800 mb-6">Send Us a Message</h2>
              <p className="text-gray-700 mb-8">
                Have questions, suggestions, or want to get involved with Miss Malawi Organization? Fill out the form
                below, and our team will get back to you as soon as possible.
              </p>

              {submitSuccess ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 mb-6">
                    <CheckCircle className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 font-playfair">Message Sent!</h3>
                  <p className="text-gray-600 max-w-sm mb-6">
                    Thank you for reaching out. Our team will get back to you very soon.
                  </p>
                  <Button
                    onClick={() => setSubmitSuccess(false)}
                    variant="outline"
                    className="border-emerald-700 text-emerald-700 hover:bg-emerald-50"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="First Name"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Last Name"
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Email & Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-gray-400 font-normal">(optional)</span>
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="What is this about?"
                      className="w-full"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Write your message here..."
                      className="w-full min-h-[150px]"
                    />
                  </div>

                  {/* Error */}
                  {submitError && (
                    <div className="flex items-start gap-3 bg-red-50 text-red-800 px-4 py-3 rounded-lg border border-red-100">
                      <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                      <p className="text-sm">{submitError}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="bg-emerald-800 hover:bg-emerald-700 w-full sm:w-auto gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Map */}
            <div>
              <h2 className="font-playfair text-[#7C3AED] font-bold text-emerald-800 mb-6">Find Us</h2>
              <div className="bg-white p-2 rounded-lg shadow-sm h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d173.65100088019176!2d33.789898331581114!3d-13.920577196882421!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2smw!4v1776172427996!5m2!1sen!2smw"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "0.5rem" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Miss Malawi Organization Location"
                ></iframe>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Office Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Monday - Friday:</span>
                    <span className="text-gray-900 font-medium">8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Saturday:</span>
                    <span className="text-gray-900 font-medium">9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Sunday:</span>
                    <span className="text-gray-900 font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about contacting and working with Miss Malawi Organization
            </p>
            <div className="w-24 h-1 bg-purple mx-auto mt-4"></div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <FAQ
                question="How can I apply to participate in the Miss Malawi pageant?"
                answer="To apply for the Miss Malawi pageant, you can fill out the application form on our website during the application period. For more details, please visit the Pageant page or contact us directly."
              />
              <FAQ
                question="How can my organization partner with Miss Malawi Organization?"
                answer="We're always open to partnerships that align with our mission and values. Please send us a detailed proposal through the contact form or email partnerships@missmw.org. Our team will review your proposal and contact you to discuss potential collaboration opportunities."
              />
              <FAQ
                question="I'm a journalist/media professional. How can I arrange an interview or press coverage?"
                answer="For media inquiries, interviews, or press coverage, please contact our Public Relations Officer at pr@missmw.org . Please provide details about your media outlet and the specific information or interview you're requesting."
              />
              <FAQ
                question="How can I make a donation to support Miss Malawi Organization's programs?"
                answer="You can make donations through our website's Donate page, which accepts various payment methods. For corporate donations or sponsorships, please contact us directly at info@missmw.org or call our office for more information."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

interface ContactCardProps {
  icon: React.ReactNode
  title: string
  details: string[]
}

function ContactCard({ icon, title, details }: ContactCardProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-4 text-gray-900">{title}</h3>
      <div className="space-y-2">
        {details.map((detail, index) => (
          <p key={index} className="text-gray-700">
            {detail}
          </p>
        ))}
      </div>
    </div>
  )
}

interface FAQProps {
  question: string
  answer: string
}

function FAQ({ question, answer }: FAQProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-bold text-gray-900 mb-2">{question}</h3>
      <p className="text-gray-700">{answer}</p>
    </div>
  )
}
