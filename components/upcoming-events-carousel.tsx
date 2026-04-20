"use client"

import React, { useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Calendar, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const monthlyEvents = [
  {
    month: "May 2026",
    events: [
      { date: "May 30", title: "Applications & Registrations Close", location: "National" }
    ]
  },
  {
    month: "June 2026",
    events: [
      { date: "Mid June", title: "Regional Auditions Begin", location: "Regional Centres" },
      { date: "Late June", title: "Regional Auditions Continue", location: "Regional Centres" },
      { date: "Late June", title: "National Finalists Announced", location: "National" }
    ]
  },
  {
    month: "July 2026",
    events: [
      { date: "Early July", title: "Pre-Departure Prep for Thandi", location: "National" },
      { date: "Mid July", title: "Announcement of Top 30", location: "National" },
      { date: "Late July", title: "Thandi Departs for Miss Supranational", location: "International" },
      { date: "Late July", title: "Finalists Training Programme Begins", location: "National" }
    ]
  },
  {
    month: "August 2026",
    events: [
      { date: "August", title: "Finalists Training: Month 1", location: "National" },
      { date: "August", title: "Opening of Voting Lines", location: "Digital" },
      { date: "August", title: "Community Outreach by Finalists", location: "Various Locations" }
    ]
  },
  {
    month: "September 2026",
    events: [
      { date: "September", title: "Miss Malawi Masterclass Series", location: "National" },
      { date: "September", title: "Preliminary Event", location: "Online / Streaming" }
    ]
  },
  {
    month: "October 2026",
    events: [
      { date: "October", title: "Finalists Final Preparations", location: "National" },
      { date: "October", title: "Ticket Sales Open for Grand Finale", location: "National" }
    ]
  },
  {
    month: "November 2026",
    events: [
      { date: "Mid Nov", title: "Miss Malawi Intensive Bootcamp", location: "Residential" },
      { date: "Last Week", title: "Grand Finale Rehearsals Begin", location: "Griffin Sayenda" }
    ]
  },
  {
    month: "December 2026",
    events: [
      { date: "Early Dec", title: "Final Dress Rehearsals", location: "Griffin Sayenda" },
      { date: "December", title: "MISS MALAWI 2026 GRAND FINALE", location: "Griffin Sayenda, Blantyre" }
    ]
  }
]

export default function UpcomingEventsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {monthlyEvents.map((monthData, index) => (
            <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4 py-4">
              <div className="bg-white h-full p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col">
                <div className="text-purple font-bold text-lg mb-4 border-b border-purple/10 pb-2">
                  {monthData.month}
                </div>

                <div className="space-y-6 flex-grow">
                  {monthData.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="space-y-2">
                      <div className="flex items-center text-sm font-medium text-purple">
                        <Calendar className="h-4 w-4 mr-2" />
                        {event.date}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 leading-tight">
                        {event.title}
                      </h4>
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                    </div>
                  ))}
                </div>

                {/* <div className="mt-8 pt-6 border-t border-gray-100">
                  <Button variant="link" className="p-0 h-auto text-purple hover:text-purple/80 group/btn">
                    Details <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-purple hover:bg-purple hover:text-white transition-colors z-10 hidden md:flex"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-purple hover:bg-purple hover:text-white transition-colors z-10 hidden md:flex"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Mobile Indicator */}
      <div className="flex justify-center mt-6 space-x-2 md:hidden">
        {monthlyEvents.map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-purple/20" />
        ))}
      </div>
    </div>
  )
}
