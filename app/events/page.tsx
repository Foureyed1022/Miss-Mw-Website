// import PageHeader from "@/components/page-header"

// export default function EventsPage() {
//   return (
//     <div className="flex flex-col w-full">
//       <PageHeader title="Miss Malawi 2026 Calendar of Events" description="Official calendar for Miss Malawi 2026 programme" />

//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4 md:px-6">
//           <div className="prose prose-lg max-w-none">
//             <h2 className="font-playfair text-2xl font-bold text-emerald-800 mb-6 uppercase">
//               Miss Malawi 2026 Official Calendar
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
//               {/* JUNE 2026 */}
//               <div className="bg-white rounded-2xl shadow-sm border border-purple/10 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
//                 <div className="bg-gradient-to-r from-purple/10 to-purple/5 px-6 py-5 border-b border-purple/10 group-hover:from-purple/15 group-hover:to-purple/5 transition-colors duration-300">
//                   <h3 className="font-playfair text-2xl font-bold text-purple tracking-wide">JUNE 2026</h3>
//                 </div>
//                 <div className="p-6 flex-1 bg-zinc-50/50">
//                   <ul className="space-y-5 list-none text-gray-700">
//                     <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple before:rounded-full before:shadow-[0_0_8px_rgba(131,41,183,0.5)]">
//                       <span className="font-bold text-gray-900 block">Mid June</span>
//                       <span className="block font-medium text-purple mb-1">Regional Auditions Begin</span>
//                       <p className="text-sm text-gray-600 leading-relaxed">
//                         Auditions across Malawi: Lilongwe, Blantyre, Mzuzu, Zomba, and other regional centres.
//                       </p>
//                     </li>
//                     <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple before:rounded-full before:shadow-[0_0_8px_rgba(131,41,183,0.5)]">
//                       <span className="font-bold text-gray-900 block">Late June</span>
//                       <span className="block font-medium text-purple mb-1">Regional Auditions Continue</span>
//                       <p className="text-sm text-gray-600 leading-relaxed">
//                         Second round of regional auditions with content and behind-the-scenes coverage.
//                       </p>
//                     </li>
//                     <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple before:rounded-full before:shadow-[0_0_8px_rgba(131,41,183,0.5)]">
//                       <span className="font-bold text-gray-900 block">Late June</span>
//                       <span className="block font-medium text-purple mb-1">National Finalists Announced</span>
//                       <p className="text-sm text-gray-600 leading-relaxed">
//                         Top finalists selected and publicly announced via press conference and social media.
//                       </p>
//                     </li>
//                   </ul>
//                 </div>
//               </div>

//               {/* JULY 2026 */}
//               <div className="bg-white rounded-2xl shadow-sm border border-purple/10 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
//                 <div className="bg-gradient-to-r from-purple/10 to-purple/5 px-6 py-5 border-b border-purple/10 group-hover:from-purple/15 group-hover:to-purple/5 transition-colors duration-300">
//                   <h3 className="font-playfair text-2xl font-bold text-purple tracking-wide">JULY 2026</h3>
//                 </div>
//                 <div className="p-6 flex-1 bg-zinc-50/50">
//                   <ul className="space-y-5 list-none text-gray-700">
//                     <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple before:rounded-full before:shadow-[0_0_8px_rgba(131,41,183,0.5)]">
//                       <span className="font-bold text-gray-900 block">Early July</span>
//                       <span className="block font-medium text-purple mb-1">Pre-Departure Preparation</span>
//                       <p className="text-sm text-gray-600 leading-relaxed">
//                         Final preparation, protocol briefings, wardrobe, and media coverage before departure.
//                       </p>
//                     </li>
//                     <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple before:rounded-full before:shadow-[0_0_8px_rgba(131,41,183,0.5)]">
//                       <span className="font-bold text-gray-900 block">Mid July</span>
//                       <span className="block font-medium text-purple mb-1">Announcement of Top 30</span>
//                     </li>
//                     <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple before:rounded-full before:shadow-[0_0_8px_rgba(131,41,183,0.5)]">
//                       <span className="font-bold text-gray-900 block">Late July</span>
//                       <span className="block font-medium text-purple mb-1">Thandi Departs</span>
//                       <p className="text-sm text-gray-600 leading-relaxed">Miss Malawi 2025 departs for Miss Supranational to represent Malawi.</p>
//                     </li>
//                     <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple before:rounded-full before:shadow-[0_0_8px_rgba(131,41,183,0.5)]">
//                       <span className="font-bold text-gray-900 block">Late July</span>
//                       <span className="block font-medium text-purple mb-1">Finalists Training Begins</span>
//                       <p className="text-sm text-gray-600 leading-relaxed">Structured development programme for all 2026 finalists.</p>
//                     </li>
//                   </ul>
//                 </div>
//               </div>

//               {/* AUGUST 2026 */}
//               <div className="bg-white rounded-2xl shadow-sm border border-purple/10 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
//                 <div className="bg-gradient-to-r from-purple/10 to-purple/5 px-6 py-5 border-b border-purple/10 group-hover:from-purple/15 group-hover:to-purple/5 transition-colors duration-300">
//                   <h3 className="font-playfair text-2xl font-bold text-purple tracking-wide">AUGUST 2026</h3>
//                 </div>
//                 <div className="p-6 flex-1 bg-zinc-50/50">
//                   <ul className="space-y-4 list-none text-gray-700">
//                     <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple before:rounded-full before:shadow-[0_0_8px_rgba(131,41,183,0.5)]">
//                       <span className="block text-gray-800 font-bold">Finalists Training: Month 1</span>
//                       <span className="block text-sm text-gray-500 mt-0.5">Public speaking, leadership, civic engagement, wellness</span>
//                     </li>
//                     <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple before:rounded-full before:shadow-[0_0_8px_rgba(131,41,183,0.5)]">
//                       <span className="block text-gray-800 font-bold">Opening of Voting Lines</span>
//                       <span className="block text-sm text-gray-500 mt-0.5">Fan favourite voting opens at MWK 2,000.00</span>
//                     </li>
//                     <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple before:rounded-full before:shadow-[0_0_8px_rgba(131,41,183,0.5)]">
//                       <span className="block text-gray-800 font-bold">Ticket Sales & Content</span>
//                       <span className="block text-sm text-gray-500 mt-0.5">Preliminary event tickets open & weekly docuseries begins</span>
//                     </li>
//                     <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple before:rounded-full before:shadow-[0_0_8px_rgba(131,41,183,0.5)]">
//                       <span className="block text-gray-800 font-bold">Community Outreach</span>
//                       <span className="block text-sm text-gray-500 mt-0.5">Finalists conduct community service and advocacy visits</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>

//               {/* SEPTEMBER 2026 */}
//               <div className="bg-white rounded-2xl shadow-sm border border-purple/10 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
//                 <div className="bg-gradient-to-r from-purple/10 to-purple/5 px-6 py-5 border-b border-purple/10 group-hover:from-purple/15 group-hover:to-purple/5 transition-colors duration-300">
//                   <h3 className="font-playfair text-2xl font-bold text-purple tracking-wide">SEPTEMBER 2026</h3>
//                 </div>
//                 <div className="p-6 flex-1 bg-zinc-50/50">
//                   <ul className="space-y-4 list-none text-gray-700">
//                     <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple before:rounded-full before:shadow-[0_0_8px_rgba(131,41,183,0.5)]">
//                       <span className="block font-bold text-gray-900 mb-1">Miss Malawi Masterclass Series</span>
//                       <p className="text-sm text-gray-600 leading-relaxed">
//                         Multi-day masterclass covering career, business, media presence, mental health, and empowerment.
//                       </p>
//                     </li>
//                     <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple before:rounded-full before:shadow-[0_0_8px_rgba(131,41,183,0.5)]">
//                       <span className="block font-bold text-gray-900 mb-1">Guest Speaker Series</span>
//                       <p className="text-sm text-gray-600 leading-relaxed">Prominent Malawian women leaders mentor finalists.</p>
//                     </li>
//                     <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple before:rounded-full before:shadow-[0_0_8px_rgba(131,41,183,0.5)]">
//                       <span className="block font-bold text-gray-900 mb-1">Preliminary Event</span>
//                       <p className="text-sm text-gray-600 leading-relaxed">
//                         In-house event streamed online with a small audience of about 100 people.
//                       </p>
//                     </li>
//                   </ul>
//                 </div>
//               </div>

//               {/* OCTOBER 2026 */}
//               <div className="bg-white rounded-2xl shadow-sm border border-purple/10 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
//                 <div className="bg-gradient-to-r from-purple/10 to-purple/5 px-6 py-5 border-b border-purple/10 group-hover:from-purple/15 group-hover:to-purple/5 transition-colors duration-300">
//                   <h3 className="font-playfair text-2xl font-bold text-purple tracking-wide">OCTOBER 2026</h3>
//                 </div>
//                 <div className="p-6 flex-1 bg-zinc-50/50">
//                   <ul className="space-y-4 list-none text-gray-700">
//                     <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple before:rounded-full before:shadow-[0_0_8px_rgba(131,41,183,0.5)]">
//                       <span className="block text-gray-800 font-bold">Finalists Final Preparations</span>
//                       <span className="block text-sm text-gray-500 mt-0.5">Styling, choreography, rehearsals, and programme development</span>
//                     </li>
//                     <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple before:rounded-full before:shadow-[0_0_8px_rgba(131,41,183,0.5)]">
//                       <span className="block text-gray-800 font-bold">Grand Finale Ticketing & Voting</span>
//                       <span className="block text-sm text-gray-500 mt-0.5">Ticket sales open and Voting opens for Fan Favourite Top 5</span>
//                     </li>
//                     <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple before:rounded-full before:shadow-[0_0_8px_rgba(131,41,183,0.5)]">
//                       <span className="block text-gray-800 font-bold">Masterclass Sessions</span>
//                       <span className="block text-sm text-gray-500 mt-0.5">Sessions with Alice Rowlands Musukwa</span>
//                     </li>
//                     <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple before:rounded-full before:shadow-[0_0_8px_rgba(131,41,183,0.5)]">
//                       <span className="block text-gray-800 font-bold">Sponsor Activations</span>
//                       <span className="block text-sm text-gray-500 mt-0.5">Corporate sponsor events, branded content, and photoshoots</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>

//               {/* NOVEMBER 2026 */}
//               <div className="bg-white rounded-2xl shadow-sm border border-purple/10 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
//                 <div className="bg-gradient-to-r from-purple/10 to-purple/5 px-6 py-5 border-b border-purple/10 group-hover:from-purple/15 group-hover:to-purple/5 transition-colors duration-300">
//                   <h3 className="font-playfair text-2xl font-bold text-purple tracking-wide">NOVEMBER 2026</h3>
//                 </div>
//                 <div className="p-6 flex-1 bg-zinc-50/50">
//                   <ul className="space-y-4 list-none text-gray-700">
//                     <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple before:rounded-full before:shadow-[0_0_8px_rgba(131,41,183,0.5)]">
//                       <span className="font-bold text-gray-900 block">Early Nov</span>
//                       <span className="block font-medium text-purple mb-1">Final Styling Sessions</span>
//                       <p className="text-sm text-gray-600 leading-relaxed">Wardrobe checks and finalisation of vendor payments.</p>
//                     </li>
//                     <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple before:rounded-full before:shadow-[0_0_8px_rgba(131,41,183,0.5)]">
//                       <span className="font-bold text-gray-900 block">Mid Nov</span>
//                       <span className="block font-medium text-purple mb-1">Miss Malawi Intensive Bootcamp</span>
//                       <p className="text-sm text-gray-600 leading-relaxed">
//                         Residential bootcamp on performance, talent, catwalk, speech, and confidence.
//                       </p>
//                     </li>
//                     <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple before:rounded-full before:shadow-[0_0_8px_rgba(131,41,183,0.5)]">
//                       <span className="font-bold text-gray-900 block">Late Nov</span>
//                       <span className="block font-medium text-purple mb-1">Grand Finale Rehearsals</span>
//                       <p className="text-sm text-gray-600 leading-relaxed">Full production rehearsals at Griffin Sayenda.</p>
//                     </li>
//                   </ul>
//                 </div>
//               </div>

//               {/* DECEMBER 2026 */}
//               <div className="bg-white rounded-2xl shadow-sm border border-purple/10 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full lg:col-span-3">
//                 <div className="bg-gradient-to-r from-purple/10 to-purple/5 px-6 py-5 border-b border-purple/10 group-hover:from-purple/15 group-hover:to-purple/5 transition-colors duration-300">
//                   <h3 className="font-playfair text-2xl font-bold text-purple tracking-wide">DECEMBER 2026</h3>
//                 </div>
//                 <div className="p-6 flex-1 bg-zinc-50/50">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <ul className="space-y-4 list-none text-gray-700">
//                       <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple before:rounded-full before:shadow-[0_0_8px_rgba(131,41,183,0.5)]">
//                         <span className="font-bold text-gray-900 block">Early December</span>
//                         <span className="block font-medium text-purple mb-1">Final Dress Rehearsals</span>
//                         <p className="text-sm text-gray-600 leading-relaxed">Lighting, sound, staging, and full run-throughs.</p>
//                       </li>
//                     </ul>
//                     <ul className="space-y-4 list-none text-gray-700">
//                       <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple before:rounded-full before:shadow-[0_0_8px_rgba(131,41,183,0.5)]">
//                         <span className="font-bold text-gray-900 block">December</span>
//                         <span className="block font-medium text-purple mb-1">GRAND FINALE</span>
//                         <p className="text-sm text-gray-600 leading-relaxed">Griffin Sayenda, national broadcast.</p>
//                       </li>
//                     </ul>
//                     <ul className="space-y-4 list-none text-gray-700">
//                       <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple before:rounded-full before:shadow-[0_0_8px_rgba(131,41,183,0.5)]">
//                         <span className="font-bold text-gray-900 block">Post December</span>
//                         <span className="block font-medium text-purple mb-1">Annual Report</span>
//                         <p className="text-sm text-gray-600 leading-relaxed">Financial reconciliation and 2027 planning to Board & Sponsors.</p>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* KEY DATES */}
//             <div className="mt-16 bg-gray-50 p-8 rounded-lg border border-gray-100">
//               <h2 className="font-playfair text-2xl font-bold text-emerald-800 mb-6 uppercase">Key Dates</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="flex justify-between border-b border-gray-200 pb-2">
//                   <span className="font-bold text-purple">May 30</span>
//                   <span className="text-gray-700">Applications & Registrations Close</span>
//                 </div>
//                 <div className="flex justify-between border-b border-gray-200 pb-2">
//                   <span className="font-bold text-purple">June</span>
//                   <span className="text-gray-700">National Auditions</span>
//                 </div>
//                 <div className="flex justify-between border-b border-gray-200 pb-2">
//                   <span className="font-bold text-purple">July 13-31</span>
//                   <span className="text-gray-700">Thandi at Miss Supranational</span>
//                 </div>
//                 <div className="flex justify-between border-b border-gray-200 pb-2">
//                   <span className="font-bold text-purple">September</span>
//                   <span className="text-gray-700">Miss Malawi Masterclass Series (Lilongwe)</span>
//                 </div>
//                 <div className="flex justify-between border-b border-gray-200 pb-2">
//                   <span className="font-bold text-purple">September</span>
//                   <span className="text-gray-700">Preliminary Event</span>
//                 </div>
//                 <div className="flex justify-between border-b border-gray-200 pb-2">
//                   <span className="font-bold text-purple">October 5-10th</span>
//                   <span className="text-gray-700">Masterclass with Ms. Alice Rowlands Musukwa</span>
//                 </div>
//                 <div className="flex justify-between border-b border-gray-200 pb-2">
//                   <span className="font-bold text-purple">November 30th-December 4th</span>
//                   <span className="text-gray-700">Intensive Bootcamp</span>
//                 </div>
//                 <div className="flex justify-between border-b border-gray-200 pb-2">
//                   <span className="font-bold text-purple">December 5th </span>
//                   <span className="text-gray-700">Grand Finale (Griffin Sayenda, Lilongwe)</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }