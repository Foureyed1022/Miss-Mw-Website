'use client';

import { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  Image as ImageIcon,
  Loader2,
  X,
  Check
} from 'lucide-react';
import { NewsArticle } from '@/types';
import { ConfirmationDialog } from './ConfirmationDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import toast from 'react-hot-toast';

interface NewsManagementProps {
  articles: NewsArticle[];
  onAddArticle: (article: Omit<NewsArticle, 'id'>) => Promise<void>;
  onUpdateArticle: (id: string, updates: Partial<NewsArticle>) => Promise<void>;
  onDeleteArticle: (id: string) => Promise<void>;
}

const CATEGORIES = [
  "Pageant News",
  "Programs & Initiatives",
  "Success Stories",
  "Events & Activities",
  "International News"
];

export default function NewsManagement({
  articles,
  onAddArticle,
  onUpdateArticle,
  onDeleteArticle
}: NewsManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [viewingArticle, setViewingArticle] = useState<NewsArticle | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: CATEGORIES[0],
    author: 'Admin',
    readTime: '5 min read',
    image: '',
    featured: false,
    tags: '' // Comma separated in UI
  });

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        body: uploadData
      });
      const data = await response.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, image: data.url }));
        toast.success('Image uploaded successfully');
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message || 'Image upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: CATEGORIES[0],
      author: 'Admin',
      readTime: '5 min read',
      image: '',
      featured: false,
      tags: ''
    });
    setEditingArticle(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (article: NewsArticle) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      author: article.author,
      readTime: article.readTime,
      image: article.image,
      featured: article.featured || false,
      tags: article.tags?.join(', ') || ''
    });
    setIsDialogOpen(true);
  };

  const handleOpenView = (article: NewsArticle) => {
    setViewingArticle(article);
    setIsViewDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      toast.error('Please upload an image first');
      return;
    }

    setIsSubmitting(true);
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

      const articleData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        author: formData.author,
        readTime: formData.readTime,
        image: formData.image,
        featured: formData.featured,
        tags: tagsArray,
        date: editingArticle ? editingArticle.date : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      };

      if (editingArticle) {
        await onUpdateArticle(editingArticle.id, articleData);
        toast.success('Article updated successfully');
      } else {
        await onAddArticle(articleData);
        toast.success('Article published successfully');
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error(editingArticle ? 'Failed to update article' : 'Failed to publish article');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setArticleToDelete(id)
    setIsConfirmOpen(true)
  }

  const handleDelete = async () => {
    if (!articleToDelete) return
    setIsDeleting(articleToDelete)
    try {
      await onDeleteArticle(articleToDelete)
      toast.success('Article deleted')
    } catch (error) {
      toast.error('Failed to delete article')
    } finally {
      setIsDeleting(null)
      setIsConfirmOpen(false)
      setArticleToDelete(null)
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-[#3D3B48]">News & Blog Management</h1>
          <p className="text-gray-500 mt-1">Manage all your website articles and blog posts.</p>
        </div>
        <Button
          onClick={handleOpenAdd}
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white flex gap-2"
        >
          <Plus className="h-4 w-4" />
          Add New Article
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search articles..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden border group">
                <div className="aspect-video relative overflow-hidden bg-gray-100">
                  {article.image ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <ImageIcon className="h-8 w-8" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {article.featured && (
                      <Badge className="bg-[#7C3AED] text-white text-[10px] font-bold border-none">
                        FEATURED
                      </Badge>
                    )}
                    <Badge variant="secondary" className="bg-white/90 text-[#7C3AED] text-[10px] font-bold border-none">
                      {article.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-bold text-gray-800 line-clamp-2 min-h-[3rem] group-hover:text-[#7C3AED] transition-colors">
                      {article.title}
                    </h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex gap-2 cursor-pointer" onClick={() => handleOpenView(article)}>
                          <Eye className="h-4 w-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex gap-2 cursor-pointer" onClick={() => handleOpenEdit(article)}>
                          <Edit2 className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex gap-2 text-red-600 focus:text-red-600 cursor-pointer"
                          onClick={() => handleDeleteClick(article.id)}
                          disabled={isDeleting === article.id}
                        >
                          {isDeleting === article.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed h-10">
                    {article.excerpt}
                  </p>

                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">#{tag}</span>
                      ))}
                      {article.tags.length > 3 && <span className="text-[10px] text-gray-400">+{article.tags.length - 3}</span>}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-gray-400 pt-4 border-t">
                    <span className="flex items-center gap-1 font-medium text-gray-500">
                      <div className="w-4 h-4 rounded-full bg-violet-100 flex items-center justify-center text-[8px] text-violet-700">
                        {article.author.charAt(0)}
                      </div>
                      {article.author}
                    </span>
                    <span>{article.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredArticles.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <div className="inline-flex items-center justify-center p-4 bg-gray-50 rounded-full mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">No articles found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Article Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair font-bold text-[#3D3B48]">
              {editingArticle ? 'Edit Article' : 'Create New Article'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <Label htmlFor="title">Article Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter a catchy title..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={val => setFormData(prev => ({ ...prev, category: val }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="readTime">Read Time</Label>
                  <Input
                    id="readTime"
                    value={formData.readTime}
                    onChange={e => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                    placeholder="e.g. 5 min read"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={e => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="e.g. Miss Malawi, Pageant, Empowerment"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Short Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="A brief summary for the news list..."
                  required
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="content">Full Content</Label>
                  <span className="text-[10px] text-gray-400">Use double line breaks for paragraphs</span>
                </div>
                <Textarea
                  id="content"
                  className="min-h-[300px]"
                  value={formData.content}
                  onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="The full article text goes here..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Featured Image</Label>
                  <div className="mt-2">
                    {formData.image ? (
                      <div className="relative aspect-video rounded-lg border overflow-hidden bg-gray-50 group">
                        <img src={formData.image} className="object-cover w-full h-full" alt="Preview" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                            className="bg-red-500 text-white rounded-full p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <Label
                        htmlFor="image-upload"
                        className={`
                          flex flex-col items-center justify-center aspect-video rounded-lg border border-dashed border-gray-300 cursor-pointer hover:border-[#7C3AED] hover:bg-violet-50 transition-all
                          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                      >
                        {isUploading ? (
                          <Loader2 className="h-8 w-8 animate-spin text-[#7C3AED]" />
                        ) : (
                          <>
                            <div className="p-3 bg-violet-50 rounded-full mb-2">
                              <ImageIcon className="h-6 w-6 text-[#7C3AED]" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">Click to upload image</span>
                            <span className="text-xs text-gray-400 mt-1">Recommended: 1200x800px</span>
                          </>
                        )}
                        <Input
                          id="image-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                        />
                      </Label>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Settings</Label>
                  <div
                    className={`
                      flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors
                      ${formData.featured ? 'border-[#7C3AED] bg-violet-50' : 'border-gray-200'}
                    `}
                    onClick={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-800">Featured Article</span>
                      <span className="text-xs text-gray-500">Show prominently on the homepage and news list</span>
                    </div>
                    <div className={`w-10 h-6 rounded-full relative transition-colors ${formData.featured ? 'bg-[#7C3AED]' : 'bg-gray-200'}`}>
                      <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${formData.featured ? 'translate-x-4' : ''}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="pt-6 border-t gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isUploading || isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white min-w-[120px]"
                disabled={isUploading || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  editingArticle ? 'Update Article' : 'Publish Article'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Article Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
          {viewingArticle && <DialogTitle className="sr-only">{viewingArticle.title}</DialogTitle>}
          {viewingArticle && (
            <div className="flex flex-col">
              <div className="relative aspect-[21/9] w-full bg-gray-100">
                <img src={viewingArticle.image} className="w-full h-full object-cover" alt={viewingArticle.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <button
                  onClick={() => setIsViewDialogOpen(false)}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors backdrop-blur-sm"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="absolute bottom-6 left-8 right-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-[#7C3AED] text-white border-none">{viewingArticle.category}</Badge>
                    <span className="text-white/80 text-xs font-medium">{viewingArticle.readTime}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white leading-tight">
                    {viewingArticle.title}
                  </h2>
                </div>
              </div>
              <div className="p-8 md:p-10 space-y-8">
                <div className="flex items-center justify-between border-b pb-6 text-sm text-gray-500">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-sm font-bold text-violet-700">
                      {viewingArticle.author.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900">{viewingArticle.author}</span>
                      <span>Published on {viewingArticle.date}</span>
                    </div>
                  </div>
                  {viewingArticle.featured && (
                    <div className="flex items-center gap-1 text-[#7C3AED] font-bold text-[10px] uppercase tracking-wider bg-violet-50 px-3 py-1 rounded-full">
                      <Check className="h-3 w-3" /> Featured Article
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="italic text-lg text-gray-600 border-l-4 border-violet-200 pl-6 py-2 leading-relaxed font-medium">
                    {viewingArticle.excerpt}
                  </div>

                  <div className="text-gray-700 leading-relaxed text-lg space-y-6">
                    {viewingArticle.content.split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

                {viewingArticle.tags && viewingArticle.tags.length > 0 && (
                  <div className="pt-8 border-t flex flex-wrap gap-2">
                    <span className="text-sm font-bold text-gray-900 mr-2 flex items-center">TAGS:</span>
                    {viewingArticle.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-gray-500 hover:bg-gray-50 uppercase text-[10px] py-1 px-3">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="pt-10 flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsViewDialogOpen(false)}
                  >
                    Close Preview
                  </Button>
                  <Button
                    className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
                    onClick={() => {
                      setIsViewDialogOpen(false);
                      handleOpenEdit(viewingArticle);
                    }}
                  >
                    Edit Article
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={handleDelete}
        title="Delete Article"
        description="Are you sure you want to delete this article? This action cannot be undone."
        isLoading={isDeleting !== null}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}
