import type React from "react"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

interface TeamMemberProps {
  image: string
  name: string
  position: string
}

export default function TeamMember({ image, name, position }: TeamMemberProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group">
      <div className="relative h-80">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        <div className="absolute inset-0 bg-[#212224]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-3">
            <SocialIcon href="#" icon={<Facebook className="h-4 w-4" />} />
            <SocialIcon href="#" icon={<Twitter className="h-4 w-4" />} />
            <SocialIcon href="#" icon={<Instagram className="h-4 w-4" />} />
            <SocialIcon href="#" icon={<Linkedin className="h-4 w-4" />} />
          </div>
        </div>
      </div>
      <div className="p-4 text-center">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-gold">{position}</p>
      </div>
    </div>
  )
}

interface SocialIconProps {
  href: string
  icon: React.ReactNode
}

function SocialIcon({ href, icon }: SocialIconProps) {
  return (
    <Link
      href={href}
      className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-[#212224] hover:bg-gold hover:text-white transition-colors"
    >
      {icon}
    </Link>
  )
}
