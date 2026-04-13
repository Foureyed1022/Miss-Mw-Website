"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"
import PageHeader from "@/components/page-header"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError(false)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Contact Us" description="Get in touch with the Miss Malawi Foundation team" />

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ContactCard
              icon={<MapPin className="h-8 w-8 text-purple" />}
              title="Our Location"
              details={["HewKam House, Area 43, Plot 43/1314", "Miss Malawi, P.O Box 143", "Capital City, Malawi"]}
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
              <h2 className="font-playfair text-[#7C3AED]xl font-bold text-emerald-800 mb-6">Send Us a Message</h2>
              <p className="text-gray-700 mb-8">
                Have questions, suggestions, or want to get involved with Miss Malawi Foundation? Fill out the form
                below, and our team will get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                </div>

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
                    className="w-full"
                  />
                </div>

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
                    className="w-full min-h-[150px]"
                  />
                </div>

                {submitSuccess && (
                  <div className="bg-purple-50 text-purple-800 px-4 py-3 rounded">
                    Your message has been sent successfully. We'll get back to you soon!
                  </div>
                )}

                {submitError && (
                  <div className="bg-red-50 text-red-800 px-4 py-3 rounded">
                    There was an error sending your message. Please try again later.
                  </div>
                )}

                <Button
                  type="submit"
                  className="bg-emerald-800 hover:bg-emerald-700 w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Map */}
            <div>
              <h2 className="font-playfair text-[#7C3AED] font-bold text-emerald-800 mb-6">Find Us</h2>
              <div className="bg-white p-2 rounded-lg shadow-sm h-[400px]">
                {/* This would be replaced with an actual map component */}
                <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                  <p className="text-gray-500">Interactive Map Would Be Displayed Here</p>
                </div>
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
          <div className="text-[#7C3AED]enter mb-12">
            <h2 className="font-playfair text-[#7C3AED]xl md:text-4xl font-bold text-emerald-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about contacting and working with Miss Malawi Foundation
            </p>
            <div className="w-24 h-1 bg-purple mx-auto mt-4"></div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <FAQ
                question="How can I apply to participate in the Miss Malawi pageant?"
                answer="To apply for the Miss Malawi pageant, you can fill out the application form on our website during the application period, or visit one of our designated application centers in major cities. For more details, please visit the Pageant page or contact us directly."
              />
              <FAQ
                question="I want to volunteer with Miss Malawi Foundation. How do I get involved?"
                answer="We welcome volunteers who are passionate about our mission! Please fill out the contact form above, specifying your interest in volunteering, or email us at volunteers@missmalawi.com. We'll get back to you with information about current volunteer opportunities."
              />
              <FAQ
                question="How can my organization partner with Miss Malawi Foundation?"
                answer="We're always open to partnerships that align with our mission and values. Please send us a detailed proposal through the contact form or email partnerships@missmalawi.com. Our team will review your proposal and contact you to discuss potential collaboration opportunities."
              />
              <FAQ
                question="I'm a journalist/media professional. How can I arrange an interview or press coverage?"
                answer="For media inquiries, interviews, or press coverage, please contact our Communications Director at media@missmalawi.com or call +265 996 263 843. Please provide details about your media outlet and the specific information or interview you're requesting."
              />
              <FAQ
                question="How can I make a donation to support Miss Malawi Foundation's programs?"
                answer="You can make donations through our website's Donate page, which accepts various payment methods. For corporate donations or sponsorships, please contact us directly at donations@missmalawi.com or call our office for more information."
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
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 text-[#7C3AED]enter">
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

