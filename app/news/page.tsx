import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import PageHeader from "@/components/page-header"

export default function NewsPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHeader title="News & Blog" description="Stay updated with the latest from Miss Malawi Foundation" />

      {/* Featured Article */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=1000&width=800"
                alt="Miss Malawi 2022 Crowned"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <div className="flex items-center mr-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>August 20, 2022</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>Admin</span>
                </div>
              </div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-emerald-800 mb-6">
                Jescar Mponda Crowned Miss Malawi 2022
              </h2>
              <p className="text-gray-700 mb-6 text-lg">
                In a dazzling ceremony held at the Bingu International Convention Centre in Lilongwe, 23-year-old Jescar
                Mponda was crowned Miss Malawi 2022. The event, which brought together beauty, intelligence, and
                advocacy, saw Mponda emerge victorious among 12 finalists from across the country.
              </p>
              <p className="text-gray-700 mb-6 text-lg">
                Mponda, who impressed the judges with her eloquence, poise, and commitment to girls' education, will
                serve as a cultural ambassador for Malawi and lead various social impact initiatives during her reign.
              </p>
              <Button className="bg-emerald-800 hover:bg-emerald-700">
                Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* News & Blog Articles */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="font-playfair text-3xl font-bold text-emerald-800 mb-8">Latest News</h2>

              <div className="space-y-8">
                <ArticleCard
                  image="/placeholder.svg?height=400&width=600"
                  title="Miss Malawi Foundation Launches Girls Education Initiative"
                  excerpt="The Miss Malawi Foundation has launched a new initiative aimed at supporting girls' education in rural communities across the country. The program will provide scholarships, mentorship, and resources to help girls stay in school and pursue their dreams."
                  date="July 15, 2022"
                  author="Communications Team"
                />

                <ArticleCard
                  image="/placeholder.svg?height=400&width=600"
                  title="Regional Auditions for Miss Malawi 2023 Announced"
                  excerpt="The Miss Malawi Organization has announced dates for regional auditions for the 2023 pageant. Auditions will be held in the Northern, Central, and Southern regions of Malawi, with the first event scheduled for January in Mzuzu."
                  date="June 28, 2022"
                  author="Events Coordinator"
                />

                <ArticleCard
                  image="/placeholder.svg?height=400&width=600"
                  title="Miss Malawi Partners with Ministry of Health for Women's Health Campaign"
                  excerpt="In a significant move to address women's health issues, the Miss Malawi Foundation has partnered with the Ministry of Health to launch a nationwide awareness campaign. The initiative will focus on reproductive health, maternal care, and preventive healthcare."
                  date="May 12, 2022"
                  author="Health Programs Director"
                />

                <ArticleCard
                  image="/placeholder.svg?height=400&width=600"
                  title="Cultural Heritage Preservation Workshop Held in Zomba"
                  excerpt="The Miss Malawi Foundation recently organized a Cultural Heritage Preservation Workshop in Zomba. The event brought together cultural experts, traditional leaders, and young people to discuss strategies for preserving and promoting Malawi's rich cultural heritage."
                  date="April 5, 2022"
                  author="Cultural Programs Coordinator"
                />

                <ArticleCard
                  image="/placeholder.svg?height=400&width=600"
                  title="Miss Malawi 2018 Completes Successful Reign"
                  excerpt="Tiwonge Munthali, Miss Malawi 2018, has completed her reign, leaving behind a legacy of impactful projects and initiatives. During her tenure, Munthali focused on environmental conservation, establishing tree-planting campaigns across the country."
                  date="March 18, 2022"
                  author="Admin"
                />
              </div>

              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="border-emerald-800 text-emerald-800 hover:bg-emerald-50">
                  Load More Articles
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Search */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Search</h3>
                <div className="flex">
                  <Input type="text" placeholder="Search articles..." className="rounded-r-none" />
                  <Button className="bg-emerald-800 hover:bg-emerald-700 rounded-l-none">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-700 hover:text-emerald-800 flex justify-between items-center">
                      <span>Pageant News</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">12</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-700 hover:text-emerald-800 flex justify-between items-center">
                      <span>Programs & Initiatives</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">8</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-700 hover:text-emerald-800 flex justify-between items-center">
                      <span>Success Stories</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">5</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-700 hover:text-emerald-800 flex justify-between items-center">
                      <span>Events & Activities</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">10</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-700 hover:text-emerald-800 flex justify-between items-center">
                      <span>International News</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">3</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  <RecentPost
                    image="/placeholder.svg?height=100&width=100"
                    title="Miss Malawi Foundation Launches Girls Education Initiative"
                    date="July 15, 2022"
                  />
                  <RecentPost
                    image="/placeholder.svg?height=100&width=100"
                    title="Regional Auditions for Miss Malawi 2023 Announced"
                    date="June 28, 2022"
                  />
                  <RecentPost
                    image="/placeholder.svg?height=100&width=100"
                    title="Miss Malawi Partners with Ministry of Health for Women's Health Campaign"
                    date="May 12, 2022"
                  />
                  <RecentPost
                    image="/placeholder.svg?height=100&width=100"
                    title="Cultural Heritage Preservation Workshop Held in Zomba"
                    date="April 5, 2022"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="#"
                    className="bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-800 px-3 py-1 rounded-full text-sm"
                  >
                    Miss Malawi
                  </Link>
                  <Link
                    href="#"
                    className="bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-800 px-3 py-1 rounded-full text-sm"
                  >
                    Pageant
                  </Link>
                  <Link
                    href="#"
                    className="bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-800 px-3 py-1 rounded-full text-sm"
                  >
                    Education
                  </Link>
                  <Link
                    href="#"
                    className="bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-800 px-3 py-1 rounded-full text-sm"
                  >
                    Health
                  </Link>
                  <Link
                    href="#"
                    className="bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-800 px-3 py-1 rounded-full text-sm"
                  >
                    Culture
                  </Link>
                  <Link
                    href="#"
                    className="bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-800 px-3 py-1 rounded-full text-sm"
                  >
                    Empowerment
                  </Link>
                  <Link
                    href="#"
                    className="bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-800 px-3 py-1 rounded-full text-sm"
                  >
                    Leadership
                  </Link>
                  <Link
                    href="#"
                    className="bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-800 px-3 py-1 rounded-full text-sm"
                  >
                    Community
                  </Link>
                  <Link
                    href="#"
                    className="bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-800 px-3 py-1 rounded-full text-sm"
                  >
                    Miss World
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-emerald-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-8">
              Stay updated with the latest news, events, and stories from Miss Malawi Foundation. Subscribe to our
              newsletter for regular updates delivered directly to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button className="bg-gold hover:bg-gold/90 text-black whitespace-nowrap">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

interface ArticleCardProps {
  image: string
  title: string
  excerpt: string
  date: string
  author: string
}

function ArticleCard({ image, title, excerpt, date, author }: ArticleCardProps) {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative h-64 md:h-full">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
        <div className="p-6 md:col-span-2">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <div className="flex items-center mr-4">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{date}</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{author}</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
          <p className="text-gray-700 mb-4">{excerpt}</p>
          <Link href="#" className="text-emerald-800 font-medium inline-flex items-center hover:text-emerald-700">
            Read More <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}

interface RecentPostProps {
  image: string
  title: string
  date: string
}

function RecentPost({ image, title, date }: RecentPostProps) {
  return (
    <Link href="#" className="flex items-start group">
      <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="ml-3">
        <h4 className="text-sm font-medium text-gray-900 group-hover:text-emerald-800 line-clamp-2">{title}</h4>
        <p className="text-xs text-gray-500 mt-1">{date}</p>
      </div>
    </Link>
  )
}
