"use client";

import Image from "next/image";
import logo from "@/public/logo.png";

interface PageHeaderProps {
  title: string
  description?: string
}

export default function PageHeader({ title, description }: PageHeaderProps) {
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
      <section
        className="relative pt-32 pb-24 overflow-hidden text-white"
        style={{ background: 'linear-gradient(135deg, #6D28D9 0%, #311B6F 100%)' }}
      >
      <div className="absolute inset-0 opacity-15">
        <div
          className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/90 flex items-center justify-center"
          style={{ animation: 'circle1Anim 2s ease-in-out infinite alternate' }}
        >
          <Image src={logo} alt="Miss Malawi Logo" width={50} height={50} className="object-contain" />
        </div>
        <div
          className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-white/90 flex items-center justify-center"
          style={{ animation: 'circle2Anim 3s ease-in-out infinite' }}
        >
          <Image src={logo} alt="Miss Malawi Logo" width={40} height={40} className="object-contain" />
        </div>
        <div
          className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-[#C4B5FD]"
          style={{ animation: 'circle3Anim 5s linear infinite, circle3Float 7s ease-in-out infinite' }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-20 h-20 rounded-full bg-[#7C3AED]"
          style={{ animation: 'circle4Anim 8s linear infinite' }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-12 h-12 rounded-full bg-[#A78BFA]"
          style={{ animation: 'circle5Anim 2s ease-in-out infinite alternate' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-purple-200/80">Miss Malawi 2026</p>
        <h1 className="mx-auto max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold leading-tight">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-purple-100/90 leading-8">
            {description}
          </p>
        )}
      </div>
    </section>
    </>
  )
}

