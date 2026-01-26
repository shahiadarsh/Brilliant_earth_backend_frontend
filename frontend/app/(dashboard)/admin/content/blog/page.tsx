"use client"

import React, { useState } from 'react'
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    FileText,
    BarChart2,
    Calendar,
    User,
    Eye,
    Clock,
    Edit3,
    X,
    Layout,
    Tag,
    Globe
} from 'lucide-react'

const initialPosts = [
    {
        id: 1,
        title: "The Ultimate Guide to Round Cut Diamonds",
        author: "Sarah Johnson",
        status: "Published",
        date: "Oct 10, 2023",
        reads: "1.2k",
        category: "Guides",
        image: "https://images.unsplash.com/photo-1600003014608-c2ccc1570a65?auto=format&fit=crop&q=80&w=400&h=250"
    },
    {
        id: 2,
        title: "Why Lab-Grown Diamonds are the Future",
        author: "Mark Davis",
        status: "Draft",
        date: "Oct 12, 2023",
        reads: "0",
        category: "Educate",
        image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=400&h=250"
    },
    {
        id: 3,
        title: "Top 5 Engagement Ring Trends for 2024",
        author: "Elena Rodriguez",
        status: "Scheduled",
        date: "Oct 15, 2023",
        reads: "450",
        category: "Trends",
        image: "https://images.unsplash.com/photo-1620138478149-6bb627b0b8c6?auto=format&fit=crop&q=80&w=400&h=250"
    },
]

import {
    useGetBlogsQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation
} from '@/lib/redux/slices/blogsApiSlice'
import { toast } from 'sonner'

export default function BlogManagement() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("All Status")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingPost, setEditingPost] = useState<any>(null)
    const [modalTab, setModalTab] = useState<'content' | 'media' | 'seo'>('content')

    // API Hooks
    const { data: blogsData, isLoading } = useGetBlogsQuery({
        title: searchTerm || undefined,
        status: filterStatus === 'All Status' ? undefined : filterStatus,
        sort: '-createdAt'
    })
    const [createBlog] = useCreateBlogMutation()
    const [updateBlog] = useUpdateBlogMutation()
    const [deleteBlog] = useDeleteBlogMutation()

    const [newPost, setNewPost] = useState({
        title: "",
        slug: "",
        author: "Admin",
        status: "Draft",
        category: "Education",
        tags: [] as string[],
        excerpt: "",
        content: "",
        metaTitle: "",
        metaDescription: "",
        keywords: "",
        readTime: "5 min",
        image: ""
    })
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>("")

    const posts = blogsData?.data?.blogs || []

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setSelectedImage(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm("Delete this article?")) {
            try {
                await deleteBlog(id).unwrap()
                toast.success("Article deleted")
            } catch (err) {
                toast.error("Failed to delete article")
            }
        }
    }

    const handleEdit = (post: any) => {
        setEditingPost(post)
        setNewPost({
            title: post.title || "",
            slug: post.slug || "",
            author: post.author || "Admin",
            status: post.status || "Draft",
            category: post.category || "Education",
            tags: post.tags || [],
            excerpt: post.excerpt || "",
            content: post.content || "",
            metaTitle: post.metaTitle || "",
            metaDescription: post.metaDescription || "",
            keywords: post.keywords || "",
            readTime: post.readTime || "5 min",
            image: post.image || ""
        })
        setImagePreview(post.image || "")
        setIsModalOpen(true)
    }

    const handleAddPost = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()

            const slug = newPost.slug || newPost.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

            formData.append('title', newPost.title)
            formData.append('slug', slug)
            formData.append('author', newPost.author)
            formData.append('status', newPost.status)
            formData.append('category', newPost.category)
            formData.append('excerpt', newPost.excerpt)
            formData.append('content', newPost.content)
            formData.append('metaTitle', newPost.metaTitle)
            formData.append('metaDescription', newPost.metaDescription)
            formData.append('keywords', newPost.keywords)
            formData.append('readTime', newPost.readTime)

            newPost.tags.forEach(tag => formData.append('tags[]', tag))

            if (selectedImage) {
                formData.append('image', selectedImage)
            }

            if (editingPost) {
                await updateBlog({ id: editingPost._id, data: formData }).unwrap()
                toast.success("Article updated successfully")
            } else {
                await createBlog(formData).unwrap()
                toast.success("Article saved successfully")
            }

            setIsModalOpen(false)
            setEditingPost(null)
            setNewPost({
                title: "", slug: "", author: "Admin", status: "Draft", category: "Education",
                tags: [], excerpt: "", content: "", metaTitle: "", metaDescription: "", keywords: "", readTime: "5 min",
                image: ""
            })
            setSelectedImage(null)
            setImagePreview("")
            setModalTab('content')
        } catch (err: any) {
            toast.error(err.data?.message || err.message || "Failed to save article")
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-slate-900 leading-tight">Blog Management</h1>
                    <p className="text-slate-500 mt-1 text-sm">Create and manage educational content for your customers.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingPost(null)
                        setNewPost({
                            title: "", slug: "", author: "Admin", status: "Draft", category: "Education",
                            tags: [], excerpt: "", content: "", metaTitle: "", metaDescription: "", keywords: "", readTime: "5 min",
                            image: ""
                        })
                        setImagePreview("")
                        setIsModalOpen(true)
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-[#163E3E] text-white rounded-lg text-sm font-medium hover:bg-[#123333] transition-all shadow-md"
                >
                    <Plus className="w-4 h-4" /> New Article
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Articles", value: posts.length.toString(), icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Published", value: posts.filter((p: any) => p.status === 'Published').length.toString(), icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Drafts", value: posts.filter((p: any) => p.status === 'Draft').length.toString(), icon: Edit3, color: "text-amber-600", bg: "bg-amber-50" },
                    { label: "Total Reads", value: "2.4k", icon: BarChart2, color: "text-purple-600", bg: "bg-purple-50" }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-2xl font-serif text-slate-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Display */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="search"
                        placeholder="Search articles by title..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#163E3E]/20 transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-[#163E3E]/20 transition-all"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option>All Status</option>
                    <option>Published</option>
                    <option>Draft</option>
                    <option>Scheduled</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="col-span-3 p-20 text-center text-slate-400 italic">Loading articles...</div>
                ) : (
                    posts.map((post: any) => (
                        <div key={post._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all">
                            <div className="h-48 overflow-hidden relative">
                                <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={post.title} />
                                <div className="absolute top-4 left-4">
                                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-lg
                                        ${post.status === 'Published' ? 'bg-emerald-500 text-white' :
                                            post.status === 'Draft' ? 'bg-slate-500 text-white' : 'bg-blue-500 text-white'}
                                    `}>
                                        {post.status}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                                        <span>{post.category}</span>
                                        <span>•</span>
                                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="font-serif text-lg text-slate-900 leading-snug group-hover:text-[#163E3E] transition-colors line-clamp-2">{post.title}</h3>
                                    <p className="text-xs text-slate-500 mt-2 italic">By {post.author}</p>
                                </div>
                                <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-50">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1 text-slate-400">
                                            <Eye className="w-3.5 h-3.5" />
                                            <span className="text-[10px] font-bold">{post.reads || 0}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => handleEdit(post)}
                                            className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                {posts.length === 0 && !isLoading && (
                    <div className="col-span-3 p-20 text-center text-slate-400 text-sm italic">No articles found.</div>
                )}
            </div>

            {/* Add New Article Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-serif text-slate-900">Create New Article</h2>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Content Management</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        {/* Modal Tabs */}
                        <div className="flex items-center px-8 border-b border-slate-50 bg-slate-50/30">
                            {[
                                { id: 'content', label: 'Story & Narrative', icon: Layout },
                                { id: 'media', label: 'Media & Tags', icon: Tag },
                                { id: 'seo', label: 'SEO & Meta', icon: Globe }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setModalTab(tab.id as any)}
                                    className={`px-6 py-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all relative
                                        ${modalTab === tab.id ? 'text-[#163E3E]' : 'text-slate-400 hover:text-slate-600'}
                                    `}
                                >
                                    <tab.icon className="w-3.5 h-3.5" />
                                    {tab.label}
                                    {modalTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#163E3E]"></div>}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleAddPost} className="p-8">
                            <div className="max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                                {modalTab === 'content' && (
                                    <div className="space-y-6 animate-in fade-in duration-500">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Main Headline</label>
                                            <input required type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-lg font-serif outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="Enter a compelling title..." value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Article Excerpt (Summary)</label>
                                            <textarea rows={3} className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10 resize-none" placeholder="A brief summary for the blog listing page..." value={newPost.excerpt} onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Content</label>
                                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Markdown Supported</span>
                                            </div>
                                            <textarea rows={10} className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10 resize-none font-mono" placeholder="Write your story here..." value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} />
                                        </div>
                                    </div>
                                )}

                                {modalTab === 'media' && (
                                    <div className="space-y-8 animate-in fade-in duration-500">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Featured Banner</label>
                                                <div
                                                    onClick={() => document.getElementById('blog-image')?.click()}
                                                    className="aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-[#163E3E]/30 transition-all cursor-pointer group relative overflow-hidden"
                                                >
                                                    <input
                                                        type="file"
                                                        id="blog-image"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleImageChange}
                                                    />
                                                    {imagePreview ? (
                                                        <img src={imagePreview} className="w-full h-full object-cover" alt="preview" />
                                                    ) : (
                                                        <>
                                                            <Layout className="w-8 h-8 text-slate-200 group-hover:text-[#163E3E]/40 transition-colors" />
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upload Cover Image</p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="space-y-6">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Primary Category</label>
                                                    <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10 cursor-pointer" value={newPost.category} onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}>
                                                        <option>Education</option><option>Guides</option><option>Trends</option><option>Events</option><option>Lifestyle</option>
                                                    </select>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Author Name</label>
                                                        <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm" placeholder="Sarah Johnson" value={newPost.author} onChange={(e) => setNewPost({ ...newPost, author: e.target.value })} />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estimated Read Time</label>
                                                        <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm" placeholder="5 min" value={newPost.readTime} onChange={(e) => setNewPost({ ...newPost, readTime: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="space-y-4 pt-2">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Article Tags</label>
                                                    <div className="flex flex-wrap gap-2">
                                                        {["Diamond Guide", "Lab Grown", "Sustainability", "Weddings", "Jewelry Care"].map((tag) => (
                                                            <button
                                                                key={tag}
                                                                type="button"
                                                                onClick={() => {
                                                                    const exists = newPost.tags.includes(tag)
                                                                    setNewPost({
                                                                        ...newPost,
                                                                        tags: exists ? newPost.tags.filter(t => t !== tag) : [...newPost.tags, tag]
                                                                    })
                                                                }}
                                                                className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider border transition-all
                                                                    ${newPost.tags.includes(tag) ? 'bg-[#163E3E] border-[#163E3E] text-white' : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'}
                                                                `}
                                                            >
                                                                {tag}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {modalTab === 'seo' && (
                                    <div className="space-y-6 animate-in fade-in duration-500">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">URL Slug</label>
                                                <div className="flex items-center bg-slate-50 rounded-xl overflow-hidden shadow-inner border border-slate-100">
                                                    <span className="pl-5 text-[10px] text-slate-400 font-bold tracking-tight">/blog/</span>
                                                    <input type="text" className="flex-1 px-2 py-4 bg-transparent border-none text-sm outline-none" placeholder="ultimate-guide-round-cut" value={newPost.slug} onChange={(e) => setNewPost({ ...newPost, slug: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Publish Status</label>
                                                <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm cursor-pointer" value={newPost.status} onChange={(e) => setNewPost({ ...newPost, status: e.target.value })}>
                                                    <option>Draft</option><option>Published</option><option>Scheduled</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Meta Title</label>
                                            <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="Search engine title..." value={newPost.metaTitle} onChange={(e) => setNewPost({ ...newPost, metaTitle: e.target.value })} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Meta Description</label>
                                            <textarea rows={3} className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10 resize-none" placeholder="Search engine snippet..." value={newPost.metaDescription} onChange={(e) => setNewPost({ ...newPost, metaDescription: e.target.value })} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SEO Keywords</label>
                                            <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="e.g. diamonds guide, round cut training, sustainable jewelry" value={newPost.keywords} onChange={(e) => setNewPost({ ...newPost, keywords: e.target.value })} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-3 pt-8 mt-8 border-t border-slate-50">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-200 transition-all">Save for Later</button>
                                <button type="submit" className="flex-1 px-8 py-4 bg-[#163E3E] text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#123333] transition-all shadow-xl shadow-[#163E3E]/20">Publish Story</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

function CheckCircle(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    )
}
