import React from "react";
import Link from "next/link";
import { ArrowLeft, UserCheck, Star, Heart, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContestantAgreement() {
  const points = [
    {
      title: "Moral Integrity",
      description: "Contestants must maintain a high standard of moral conduct, both in public and on social media platforms, during and after the competition.",
      icon: <UserCheck className="w-5 h-5" />
    },
    {
      title: "Commitment to Service",
      description: "Finalists agree to dedicate their time and talent to various community service and cultural initiatives representing Malawi.",
      icon: <Heart className="w-5 h-5" />
    },
    {
      title: "Media Representation",
      description: "You agree to participate in photoshoots, interviews, and promotional events as scheduled by the Miss Malawi Foundation.",
      icon: <Star className="w-5 h-5" />
    },
    {
      title: "Ambassadorial Role",
      description: "Titleholders act as cultural ambassadors, meaning all public statements and appearances must align with the pageant's mission.",
      icon: <Award className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFD]">
      {/* Header */}
      <nav className="border-b border-purple-50 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/pageant/register" className="text-[#4B2C5E] hover:text-[#7C4D9B] flex items-center text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Registration
          </Link>
          <div className="text-xl font-bold font-playfair text-[#4B2C5E]">Miss Malawi</div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-[#7C3AED]enter mb-16">
          <h1 className="text-[#7C3AED]xl font-bold font-playfair text-[#2D1B39] mb-4">Contestant <span className="text-[#A68D55]">Agreement</span></h1>
          <p className="text-gray-500 max-w-xl mx-auto">This agreement outlines the professional relationship and expectations between you and the Miss Malawi Foundation.</p>
        </div>

        <div className="grid gap-12">
          {/* Main Content Card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(75,44,94,0.05)] border border-purple-50">
            <div className="prose prose-purple max-w-none">
              <h2 className="text-2xl font-bold text-[#4B2C5E] mb-6">Terms of Participation</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                As a contestant in the Miss Malawi Pageant, you are entering into a professional commitment to excellence, cultural pride, and community empowerment. This agreement establishes the standards of conduct and responsibilities required of all participants.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {points.map((point, index) => (
                  <div key={index} className="flex space-x-4 p-5 rounded-2xl bg-[#4B2C5E]/[0.02] border border-purple-50 hover:bg-white hover:shadow-lg transition-all">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#4B2C5E] shadow-sm">
                      {point.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2D1B39] mb-1">{point.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#4B2C5E]">Our Commitment to You</h3>
                <p className="text-gray-600 leading-relaxed">
                  The Miss Malawi Foundation commits to providing a safe, fair, and professional environment for all contestants. We will provide mentorship, training, and a platform for you to showcase your talents and champion your cause to the nation.
                </p>
                <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 italic text-amber-900 text-sm">
                  "Empowering young Malawian women through culture, intelligence, and grace."
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-purple-50 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-sm text-gray-400">
                Last Updated: April 2026
              </div>
              <Link href="/pageant/register">
                <Button className="bg-[#4B2C5E] hover:bg-[#3A2249] text-white px-10 h-14 rounded-full shadow-lg shadow-purple-900/10 transition-transform hover:scale-105 active:scale-95 text-lg font-bold">
                  Accept Agreement
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-20 text-[#7C3AED]enter">
        <div className="w-16 h-1 bg-purple-100 mx-auto mb-8 rounded-full"></div>
        <p className="text-purple-300 text-sm uppercase tracking-widest font-bold">Miss Malawi Foundation</p>
      </footer>
    </div>
  );
}

