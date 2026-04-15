"use client"

import { useEffect, useState, useMemo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Calendar,
  Search,
  User,
  Tag as TagIcon,
  X,
  Clock,
  ChevronRight
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import PageHeader from "@/components/page-header"
import { NewsArticle } from "@/types"
import { getNewsArticles, subscribeToNewsArticles } from "@/lib/firestore"

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [readingArticle, setReadingArticle] = useState<NewsArticle | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = subscribeToNewsArticles(
      (data) => {
        setArticles(data)
        setIsLoading(false)
      },
      (error) => {
        console.error("Failed to load news articles:", error)
        setIsLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  // Derive dynamic categories and tags
  const categoriesMap = useMemo(() => {
    const map = new Map<string, number>()
    articles.forEach(art => {
      if (art.category) {
        map.set(art.category, (map.get(art.category) || 0) + 1)
      }
    })
    return Array.from(map.entries())
  }, [articles])

  const allTags = useMemo(() => {
    const set = new Set<string>()
    articles.forEach(art => {
      art.tags?.forEach(tag => set.add(tag))
    })
    return Array.from(set).sort()
  }, [articles])

  // Filtering logic
  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory ? art.category === selectedCategory : true
      const matchesTag = selectedTag ? art.tags?.includes(selectedTag) : true
      return matchesSearch && matchesCategory && matchesTag
    })
  }, [articles, searchTerm, selectedCategory, selectedTag])

  // Featured article
  const featuredArticle = useMemo(() => {
    // If filtering, don't show a "featured" layout at top perhaps? 
    // Or just pick the first featured from the full list.
    return articles.find(article => article.featured) || articles[0]
  }, [articles])

  const articleList = filteredArticles.filter(art => art.id !== featuredArticle?.id)

  const handleReadArticle = (article: NewsArticle) => {
    setReadingArticle(article);
    setIsModalOpen(true);
  }

  // Related articles for the modal
  const relatedArticles = useMemo(() => {
    if (!readingArticle) return []
    return articles
      .filter(art => art.id !== readingArticle.id && art.category === readingArticle.category)
      .slice(0, 3)
  }, [articles, readingArticle])

  if (isLoading) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-white">
        <PageHeader title="News & Blog" description="Stay updated with the latest from Miss Malawi Organization" />
        <div className="flex-1 flex items-center justify-center p-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-purple border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium tracking-wide">Fetching latest stories...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full bg-white font-sans">
      <PageHeader title="News & Blog" description="Stay updated with the latest from Miss Malawi Organization" />

      {/* Hero Section - Featured Article */}
      {!selectedCategory && !selectedTag && !searchTerm && featuredArticle && (
        <section className="py-12 md:py-20 border-b border-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <div className="relative aspect-[16/10] md:aspect-[21/10] rounded-2xl overflow-hidden shadow-2xl group">
                  <Image
                    src={featuredArticle.image || "/placeholder.svg"}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purple text-white border-none px-3 py-1 text-xs uppercase tracking-widest font-bold">
                      Featured
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <span className="text-purple">{featuredArticle.category}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{featuredArticle.date}</span>
                </div>
                <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
                <div className="pt-4">
                  <Button
                    onClick={() => handleReadArticle(featuredArticle)}
                    className="bg-purple hover:bg-black text-white px-8 py-6 rounded-full text-lg font-bold transition-all transform hover:translate-x-1"
                  >
                    Read Full Story <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Layout */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Sidebar (Left on Desktop) */}
            <aside className="lg:col-span-3 space-y-10 order-2 lg:order-1">
              {/* Search */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Search className="h-4 w-4 text-purple" /> Search
                </h3>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-4 pr-10 py-6 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all outline-none"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Categories</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left flex justify-between items-center py-2 px-3 rounded-xl transition-all ${!selectedCategory ? 'bg-purple/10 text-purple font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <span>All Articles</span>
                    <span className="text-xs opacity-60">{articles.length}</span>
                  </button>
                  {categoriesMap.map(([name, count]) => (
                    <button
                      key={name}
                      onClick={() => {
                        setSelectedCategory(name);
                        setSelectedTag(null);
                      }}
                      className={`w-full text-left flex justify-between items-center py-2 px-3 rounded-xl transition-all ${selectedCategory === name ? 'bg-purple/10 text-purple font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <span className="truncate">{name}</span>
                      <span className="text-xs opacity-60">{count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Browse by Tags */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <TagIcon className="h-4 w-4 text-purple" /> Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSelectedTag(selectedTag === tag ? null : tag);
                        setSelectedCategory(null);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-all border ${selectedTag === tag ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-100 hover:border-purple hover:text-purple'}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Articles Feed (Right on Desktop) */}
            <main className="lg:col-span-9 space-y-12 order-1 lg:order-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-8">
                <div>
                  <h2 className="text-3xl font-playfair font-bold text-gray-900">
                    {selectedCategory ? selectedCategory : selectedTag ? `Tag: ${selectedTag}` : "Latest Updates"}
                  </h2>
                  <p className="text-gray-500 mt-1">
                    Showing {filteredArticles.length} stories found
                  </p>
                </div>
                {(selectedCategory || selectedTag || searchTerm) && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedTag(null);
                      setSearchTerm("");
                    }}
                    className="text-purple hover:bg-purple/10 font-bold"
                  >
                    <X className="mr-2 h-4 w-4" /> Reset Filters
                  </Button>
                )}
              </div>

              {filteredArticles.length === 0 ? (
                <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                  <div className="p-6 bg-gray-50 rounded-full inline-block mb-4">
                    <Search className="h-10 w-10 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">No stories matches your search</h3>
                  <p className="text-gray-500 mt-2">Try adjusting your keywords or filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onClick={() => handleReadArticle(article)}
                    />
                  ))}
                </div>
              )}

              {filteredArticles.length > 6 && (
                <div className="pt-8 flex justify-center">
                  <Button variant="outline" className="rounded-full px-10 py-6 border-2 border-gray-100 text-gray-600 hover:border-purple hover:text-purple font-bold">
                    Load More Articles
                  </Button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Full Article Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto p-0 border-none shadow-2xl rounded-3xl">
          {readingArticle && <DialogTitle>{readingArticle.title}</DialogTitle>}
          {readingArticle && (
            <div className="flex flex-col">
              <div className="relative aspect-[21/10] w-full">
                <Image
                  src={readingArticle.image || "/placeholder.svg"}
                  alt={readingArticle.title}
                  fill
                  className="object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-purple text-white border-none py-1.5 px-4 rounded-full text-xs font-bold tracking-widest uppercase">
                      {readingArticle.category}
                    </Badge>
                    <div className="flex items-center text-white/80 text-xs font-bold gap-1 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                      <Clock className="h-3 w-3" /> {readingArticle.readTime}
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white leading-tight">
                    {readingArticle.title}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 p-8 md:p-12">
                {/* Main Content Area */}
                <div className="lg:col-span-8 space-y-10">
                  <div className="flex items-center gap-6 text-sm py-6 border-y border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple/10 flex items-center justify-center text-purple font-bold border border-purple/20">
                        {readingArticle.author.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 tracking-tight">{readingArticle.author}</span>
                        <span className="text-xs text-gray-400 font-medium">Author</span>
                      </div>
                    </div>
                    <div className="h-8 w-px bg-gray-100"></div>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 tracking-tight">{readingArticle.date}</span>
                      <span className="text-xs text-gray-400 font-medium">Published</span>
                    </div>
                  </div>

                  <div className="prose prose-lg max-w-none">
                    <div className="text-xl text-gray-600 font-medium leading-relaxed italic border-l-4 border-purple/30 pl-6 mb-10">
                      {readingArticle.excerpt}
                    </div>

                    <div className="text-gray-700 leading-relaxed text-lg space-y-8">
                      {readingArticle.content.split('\n\n').map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </div>

                  {readingArticle.tags && readingArticle.tags.length > 0 && (
                    <div className="pt-10 border-t border-gray-50 flex flex-wrap gap-2">
                      {readingArticle.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-black text-purple border-2 border-purple/10 uppercase tracking-widest px-3 py-1 rounded-full bg-purple/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Related Side Area */}
                <div className="lg:col-span-4">
                  <div className="sticky top-0 space-y-10">
                    <div>
                      <h4 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                        <span className="h-1 w-6 bg-purple rounded-full"></span> Related Stories
                      </h4>
                      <div className="space-y-8">
                        {relatedArticles.map(art => (
                          <button
                            key={art.id}
                            onClick={() => setReadingArticle(art)}
                            className="group text-left w-full space-y-3"
                          >
                            <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-100">
                              <Image src={art.image || "/placeholder.svg"} fill alt={art.title} className="object-contain transition-transform group-hover:scale-105" />
                              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                            </div>
                            <h5 className="font-bold text-gray-900 group-hover:text-purple transition-colors line-clamp-2 leading-snug">
                              {art.title}
                            </h5>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-between">
                              {art.date}
                              <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                            </span>
                          </button>
                        ))}
                        {relatedArticles.length === 0 && (
                          <p className="text-sm text-gray-400 italic">No related articles in this category.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface ArticleCardProps {
  article: NewsArticle
  onClick: () => void
}

function ArticleCard({ article, onClick }: ArticleCardProps) {
  return (
    <article
      onClick={onClick}
      className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:border-purple/20 transition-all duration-500 cursor-pointer flex flex-col"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          fill
          className="object-contain transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-300" />
        <div className="absolute top-6 left-6">
          <Badge className="bg-white/90 backdrop-blur-md text-[#7C3AED] border-none px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
            {article.category}
          </Badge>
        </div>
      </div>
      <div className="p-8 md:p-10 flex-1 flex flex-col">
        <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3 text-purple" /> {article.date}
          </span>
          <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3 w-3" /> {article.readTime}
          </span>
        </div>
        <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4 group-hover:text-purple transition-colors leading-tight line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-500 line-clamp-3 mb-8 leading-relaxed">
          {article.excerpt}
        </p>
        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
          <span className="text-purple font-bold text-sm inline-flex items-center group-hover:underline">
            Keep Reading <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
          <div className="flex items-center gap-2 group-hover:scale-105 transition-transform">
            <div className="w-8 h-8 rounded-full bg-violet-50 flex items-center justify-center text-violet-700 font-bold text-[10px] border border-violet-100">
              {article.author.charAt(0)}
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{article.author}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
