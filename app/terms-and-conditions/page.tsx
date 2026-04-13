import React from "react";
import Link from "next/link";
import { FileText, Shield, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/page-header";

export default function TermsAndConditions() {
  const sections = [
    {
      id: "eligibility",
      title: "1. Eligibility",
      icon: <Shield className="w-6 h-6" />,
      content: "Applicants must meet all eligibility requirements as outlined in the official criteria, including being a female Malawian citizen aged between 18 and 29, single, never married, and with no children. Proof of eligibility must be provided upon request."
    },
    {
      id: "materials",
      title: "2. Application Materials",
      icon: <FileText className="w-6 h-6" />,
      content: "Applicants must submit a completed application form, recent full-body and headshot photos, a 30 second video introduction, a statement of purpose, and any other required documents, including a signed consent form. Incomplete applications will not be considered."
    },
    {
      id: "fee",
      title: "3. Non-Refundable Fee",
      icon: <Scale className="w-6 h-6" />,
      content: "If an application fee is applicable, it is non-refundable under any circumstances."
    },
    {
      id: "conduct",
      title: "4. Conduct and Commitment",
      icon: <Scale className="w-6 h-6" />,
      content: "All applicants must uphold high moral standards, integrity, and a positive public image. Finalists and titleholders are expected to serve as role models and cultural ambassadors for Malawi and must commit to all duties during their reign."
    },
    {
      id: "content",
      title: "5. Use of Content",
      icon: <FileText className="w-6 h-6" />,
      content: "By entering the pageant, applicants grant the organizers permission to use submitted materials (photos, videos, statements) for promotional, marketing, and media purposes, including on social media and broadcast platforms."
    },
    {
      id: "judging",
      title: "6. Selection and Judging",
      icon: <Scale className="w-6 h-6" />,
      content: "The organizers reserve the right to screen, shortlist, and select candidates at their discretion. All decisions made by the judges and organizing committee are final and not subject to appeal."
    },
    {
      id: "safety",
      title: "7. Health and Safety",
      icon: <Shield className="w-6 h-6" />,
      content: "Participants must be in good physical and mental health. The organizers are not liable for any injuries or health issues arising during participation in the pageant."
    },
    {
      id: "disqualification",
      title: "8. Disqualification",
      icon: <Scale className="w-6 h-6" />,
      content: "Any falsified information, breach of conduct, or failure to comply with the pageant rules may result in immediate disqualification without refund or recourse."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F7FB]">
      <PageHeader
        title="Terms & Conditions"
        description="Please read these terms carefully before submitting your application for the Miss Malawi Pageant."
      />

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-50">
          <div className="p-8 md:p-12 space-y-12">
            <div className="prose prose-purple max-w-none">
              <p className="text-gray-600 leading-relaxed italic border-l-4 border-purple-200 pl-4 mb-8">
                By submitting an application to participate in the Miss Malawi Pageant, all applicants agree to the following terms and conditions:
              </p>

              <div className="grid gap-8">
                {sections.map((section) => (
                  <div key={section.id} className="group relative p-6 rounded-xl border border-gray-100 bg-white hover:border-purple-200 hover:shadow-md transition-all">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        {section.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2 font-playfair">
                          {section.title}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-purple-100 text-[#7C3AED]enter">
              <p className="text-gray-500 mb-6 text-sm">
                By applying, you acknowledge and accept all the terms and conditions set forth above.
              </p>
              <Link href="/pageant/register">
                <Button className="bg-[#4B2C5E] hover:bg-[#3A2249] text-white px-8 h-12 rounded-full">
                  Agree & Continue Registration
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

