"use client"

import { useEffect, useState } from "react"
import NewsManagement from "@/components/NewsManagement"
import { NewsArticle } from "@/types"
import { getNewsArticles, addNewsArticle, updateNewsArticle, deleteNewsArticle } from "@/lib/firestore"
import { Loader2 } from "lucide-react"
import toast from "react-hot-toast"

export default function NewsManagementPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true)
      try {
        const data = await getNewsArticles()
        setArticles(data)
      } catch (error) {
        console.error("Error loading news articles:", error)
        toast.error("Failed to load news articles")
      } finally {
        setIsLoading(false)
      }
    }

    loadArticles()
  }, [])

  const handleAddArticle = async (article: Omit<NewsArticle, 'id'>) => {
    const id = await addNewsArticle(article)
    if (!id) {
      throw new Error('Unable to add article')
    }
    setArticles(prev => [{ id, ...article } as NewsArticle, ...prev])
  }

  const handleUpdateArticle = async (id: string, updates: Partial<NewsArticle>) => {
    const success = await updateNewsArticle(id, updates)
    if (!success) {
      throw new Error('Unable to update article')
    }
    setArticles(prev => prev.map(article => article.id === id ? { ...article, ...updates } : article))
  }

  const handleDeleteArticle = async (id: string) => {
    const success = await deleteNewsArticle(id)
    if (!success) {
      throw new Error('Unable to delete article')
    }
    setArticles(prev => prev.filter(article => article.id !== id))
  }

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center p-20">
        <Loader2 className="h-10 w-10 animate-spin text-[#7C3AED]" />
      </div>
    )
  }

  return (
    <NewsManagement
      articles={articles}
      onAddArticle={handleAddArticle}
      onUpdateArticle={handleUpdateArticle}
      onDeleteArticle={handleDeleteArticle}
    />
  )
}

