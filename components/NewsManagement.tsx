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
  X
} from 'lucide-react';
import { NewsArticle } from '@/types';
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
import toast from 'react-hot-toast';

interface NewsManagementProps {
  articles: NewsArticle[];
  onAddArticle: (article: Omit<NewsArticle, 'id'>) => Promise<void>;
  onUpdateArticle: (id: string, updates: Partial<NewsArticle>) => Promise<void>;
  onDeleteArticle: (id: string) => Promise<void>;
}

export default function NewsManagement({
  articles,
  onAddArticle,
  onUpdateArticle,
  onDeleteArticle
}: NewsManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Pageant',
    author: 'Admin',
    readTime: '5 min read',
    image: '',
    featured: false
  });

  const categories = ['Pageant', 'Community', 'Fashion', 'Events', 'Winners'];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      toast.error('Please upload an image first');
      return;
    }

    try {
      await onAddArticle({
        ...formData,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      });
      setIsAddDialogOpen(false);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: 'Pageant',
        author: 'Admin',
        readTime: '5 min read',
        image: '',
        featured: false
      });
      toast.success('Article published successfully');
    } catch (error) {
      toast.error('Failed to publish article');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    setIsDeleting(id);
    try {
      await onDeleteArticle(id);
      toast.success('Article deleted');
    } catch (error) {
      toast.error('Failed to delete article');
    } finally {
      setIsDeleting(null);
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
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-[#9C8653] hover:bg-[#8A7542] text-white flex gap-2"
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
                  {categories.map(cat => (
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
                  {article.featured && (
                    <div className="absolute top-2 left-2 bg-[#9C8653] text-white text-[10px] font-bold px-2 py-1 rounded">
                      FEATURED
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="text-[#9C8653] text-xs font-bold uppercase">{article.category}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex gap-2">
                          <Eye className="h-4 w-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex gap-2">
                          <Edit2 className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="flex gap-2 text-red-600 focus:text-red-600"
                          onClick={() => handleDelete(article.id)}
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
                  <h3 className="font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-[#9C8653] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 pt-4 border-t">
                    <span>{article.author}</span>
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

      {/* Add Article Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair font-bold text-[#3D3B48]">Create New Article</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="title">Article Title</Label>
                <Input 
                  id="title" 
                  value={formData.title}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
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
                    {categories.map(cat => (
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
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="excerpt">Short Excerpt</Label>
                <Textarea 
                  id="excerpt" 
                  value={formData.excerpt}
                  onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  required 
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="content">Full Content</Label>
                <Textarea 
                  id="content" 
                  className="min-h-[200px]"
                  value={formData.content}
                  onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  required 
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Featured Image</Label>
                <div className="mt-2 flex items-center gap-4">
                  {formData.image ? (
                    <div className="relative h-20 w-32 rounded border overflow-hidden">
                      <img src={formData.image} className="object-cover w-full h-full" alt="Preview" />
                      <button 
                        onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                        className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <Label 
                      htmlFor="image-upload" 
                      className={`
                        flex flex-col items-center justify-center h-20 w-32 rounded border border-dashed border-gray-300 cursor-pointer hover:border-[#9C8653] transition-colors
                        ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                    >
                      {isUploading ? <Loader2 className="h-5 w-5 animate-spin text-[#9C8653]" /> : <Plus className="h-5 w-5 text-gray-400" />}
                      <span className="text-[10px] text-gray-400 mt-1">{isUploading ? 'Uploading...' : 'Upload'}</span>
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
            </div>
            <DialogFooter className="pt-4 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAddDialogOpen(false)}
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-[#9C8653] hover:bg-[#8A7542] text-white"
                disabled={isUploading}
              >
                Publish Article
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
