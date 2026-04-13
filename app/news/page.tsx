"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import PageHeader from "@/components/page-header"
import { NewsArticle } from "@/types"
import { getNewsArticles } from "@/lib/firestore"

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      try {
        const data = await getNewsArticles()
        setArticles(data)
      } catch (error) {
        console.error("Failed to load news articles:", error)
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col w-full">
        <PageHeader title="News & Blog" description="Stay updated with the latest from Miss Malawi Foundation" />
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 text-[#7C3AED]enter text-gray-500">Loading news...</div>
        </section>
      </div>
    )
  }

  if (!articles.length) {
    return (
      <div className="flex flex-col w-full">
        <PageHeader title="News & Blog" description="Stay updated with the latest from Miss Malawi Foundation" />
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 text-[#7C3AED]enter text-gray-500">No news articles available yet.</div>
        </section>
      </div>
    )
  }

  const featuredArticle = articles.find(article => article.featured) || articles[0]
  const articleList = articles.filter(article => article.id !== featuredArticle.id)
  const featuredParagraphs = featuredArticle.content
    ? featuredArticle.content.split("\n\n").slice(0, 3)
    : [featuredArticle.excerpt]

  return (
    <div className="flex flex-col w-full">
      <PageHeader title="News & Blog" description="Stay updated with the latest from Miss Malawi Foundation" />

      {/* Featured Article */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image src={featuredArticle.image || "/placeholder.svg"} alt={featuredArticle.title} fill className="object-cover" />
            </div>
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <div className="flex items-center mr-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{featuredArticle.date}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>{featuredArticle.author}</span>
                </div>
              </div>
              <h2 className="font-playfair text-[#7C3AED]xl md:text-4xl font-bold text-emerald-800 mb-6">{featuredArticle.title}</h2>
              {featuredParagraphs.map((paragraph, idx) => (
                <p key={idx} className="text-gray-700 mb-6 text-lg">
                  {paragraph}
                </p>
              ))}
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
              <h2 className="font-playfair text-[#7C3AED]xl font-bold text-emerald-800 mb-8">Latest News</h2>

              <div className="space-y-8">
                {articleList.map((article) => (
                  <ArticleCard
                    key={article.id}
                    image={article.image}
                    title={article.title}
                    excerpt={article.excerpt}
                    date={article.date}
                    author={article.author}
                  />
                ))}
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
                  {articleList.slice(0, 4).map((article) => (
                    <RecentPost
                      key={article.id}
                      image={article.image}
                      title={article.title}
                      date={article.date}
                    />
                  ))}
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
          <div className="max-w-3xl mx-auto text-[#7C3AED]enter">
            <h2 className="font-playfair text-[#7C3AED]xl md:text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
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
              <Button className="bg-purple hover:bg-purple/90 text-black whitespace-nowrap">Subscribe</Button>
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

