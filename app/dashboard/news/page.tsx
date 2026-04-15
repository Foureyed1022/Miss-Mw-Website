"use client"

import { useEffect, useState } from "react"
import NewsManagement from "@/components/NewsManagement"
import { NewsArticle } from "@/types"
import { subscribeToNewsArticles, addNewsArticle, updateNewsArticle, deleteNewsArticle } from "@/lib/firestore"
import { Loader2 } from "lucide-react"
import toast from "react-hot-toast"

export default function NewsManagementPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeToNewsArticles(
      (data) => {
        setArticles(data)
        setIsLoading(false)
      },
      (error) => {
        console.error("Error loading news articles:", error)
        toast.error("Failed to load news articles")
        setIsLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  const handleAddArticle = async (article: Omit<NewsArticle, 'id'>) => {
    const id = await addNewsArticle(article)
    if (!id) throw new Error('Unable to add article')
    // Listener will update state
  }

  const handleUpdateArticle = async (id: string, updates: Partial<NewsArticle>) => {
    const success = await updateNewsArticle(id, updates)
    if (!success) throw new Error('Unable to update article')
    // Listener will update state
  }

  const handleDeleteArticle = async (id: string) => {
    const success = await deleteNewsArticle(id)
    if (!success) throw new Error('Unable to delete article')
    // Listener will update state
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

