import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Eye,
  Heart,
  Search,
  Filter,
  Grid,
  List,
  ArrowRight,
  Activity,
  Stethoscope,
  Pill,
  X,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { useGetBlogsQuery, useGetBlogCategoriesQuery, useGetBlogTagsQuery } from '../rtk/slices/blogApiSlice';
import MedicalExpertForm from '../components/MedicalExpertForm';

// ── Shared Blog Card ──
const BlogCard = ({ blog, viewMode }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (viewMode === 'list') {
    return (
      <motion.div variants={cardVariants}>
        <Link
          to={`/blog/${blog.slug}`}
          className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-slate-100/10 p-5 md:p-6"
        >
          <div className="flex flex-col md:flex-row gap-6 md:items-center">
            {/* Image Container */}
            <div className="relative flex-shrink-0 w-full md:w-56 h-40 rounded-xl overflow-hidden shadow-sm">
              {blog.featuredImage ? (
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <span className="text-blue-600/30 text-4xl font-black">
                    {blog.title.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              {blog.isFeatured && (
                <div className="absolute top-3 left-3 bg-blue-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase shadow-lg shadow-blue-600/30">
                  Featured
                </div>
              )}
            </div>

            {/* Content Container */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{blog.readTime} min read</span>
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors leading-snug font-['Lora',serif]">
                {blog.title}
              </h3>

              <p className="text-slate-500 mb-4 line-clamp-2 text-sm leading-relaxed">{blog.excerpt}</p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                <div className="flex gap-2">
                  {blog.categories && blog.categories.slice(0, 1).map((category, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[11px] font-bold tracking-wide"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-blue-600 font-bold text-sm tracking-tight">
                  View Article
                  <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div variants={cardVariants}>
      <Link
        to={`/blog/${blog.slug}`}
        className="group block bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 flex flex-col h-full"
      >
        {/* Featured Image */}
        <div className="relative overflow-hidden h-52">
          {blog.featuredImage ? (
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
              <span className="text-blue-600/30 text-5xl font-black">
                {blog.title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {blog.isFeatured && (
            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold tracking-widest uppercase shadow-lg shadow-blue-600/30">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-7 flex flex-col flex-1">
          {/* Categories and Stats */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              {blog.categories && blog.categories.slice(0, 1).map((category, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold tracking-wider uppercase border border-blue-100"
                >
                  {category}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
              <div className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>{blog.views || 0}</span>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2 font-['Lora',serif]">
            {blog.title}
          </h3>

          <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
            {blog.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
            <div className="flex items-center gap-2.5 text-xs font-bold text-slate-400">
              <Calendar className="w-4 h-4 text-blue-600/40" />
              <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
            </div>
            <div className="text-blue-600 group-hover:bg-blue-600 group-hover:text-white w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// ── Main Page Component ──
const BlogListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedTag, setSelectedTag] = useState(searchParams.get('tag') || '');

  const { data: blogsData, isLoading, isError } = useGetBlogsQuery({
    search: searchTerm,
    category: selectedCategory,
    tag: selectedTag,
    page: 1,
    limit: 12
  });

  const { data: categoriesData } = useGetBlogCategoriesQuery();
  const { data: tagsData } = useGetBlogTagsQuery();

  const blogs = blogsData?.data || [];
  const categories = categoriesData?.data || [];
  const tags = tagsData?.data || [];

  const updateURL = (params) => {
    const newParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
    });
    setSearchParams(newParams);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateURL({
      search: searchTerm,
      category: selectedCategory,
      tag: selectedTag
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedTag('');
    setSearchParams({});
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  return (
    <>
      <Helmet>
        <title>Health Insights & Medical Articles | MedicwayCare Blog</title>
        <meta name="description" content="Discover premium articles on mental health, psychotherapy, and clinical wellness from MedicwayCare specialists." />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
      </Helmet>

      <style>{`
        .bg-medical-grid {
          background-image: radial-gradient(#64748b 0.5px, transparent 0.5px);
          background-size: 24px 24px;
        }
        .search-container {
          box-shadow: 0 10px 40px -10px rgba(10, 42, 85, 0.15);
          transition: all 0.3s ease;
        }
        .search-container:focus-within {
          box-shadow: 0 15px 50px -10px rgba(10, 42, 85, 0.25);
          transform: translateY(-2px);
        }
      `}</style>

      <div className="min-h-screen bg-[#f8fafc] font-['Plus_Jakarta_Sans',sans-serif]">
        
        {/* Premium Hero Section */}
        <section className="relative pt-32 pb-24 bg-gradient-to-br from-[#05162e] via-[#0a2a55] to-[#1565c0] overflow-hidden">
          {/* Animated Background Icons */}
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 70, repeat: Infinity, ease: "linear" }} className="absolute opacity-[0.03] text-white top-10 left-10 pointer-events-none"><Activity size={240} /></motion.div>
          <motion.div animate={{ y: [0, -30, 0] }} transition={{ duration: 15, repeat: Infinity }} className="absolute opacity-[0.04] text-white bottom-10 right-1/4 pointer-events-none"><Stethoscope size={200} /></motion.div>
          <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 20, repeat: Infinity }} className="absolute opacity-[0.03] text-white top-1/2 right-10 pointer-events-none"><Pill size={160} /></motion.div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-blue-400/20 bg-white/5 text-blue-200 text-[11px] font-bold uppercase tracking-[0.2em] mb-8"
              >
                <Activity className="w-3.5 h-3.5" /> Medical Knowledge Hub
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-extrabold text-white mb-6 font-['Lora',serif] leading-tight"
              >
                Expert Clinical <span className="text-blue-300 italic">Psychology</span> Insights
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl text-blue-100/70 max-w-2xl mx-auto mb-12 leading-relaxed"
              >
                Explore evidence-based therapy guides, professional mental health advice, and medical research from our clinical experts.
              </motion.p>

              {/* Enhanced Search Form */}
              <motion.form 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.5 }}
                onSubmit={handleSearch} 
                className="max-w-2xl mx-auto relative group"
              >
                <div className="flex bg-white rounded-2xl overflow-hidden p-1.5 search-container border border-white/10">
                  <div className="flex-1 relative flex items-center">
                    <Search className="absolute left-5 text-slate-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="text"
                      placeholder="Search therapy topics or articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-14 pr-6 py-4 rounded-xl outline-none text-slate-800 placeholder:text-slate-400 font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#0a2a55] hover:bg-[#1565c0] text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-xl shadow-blue-900/20"
                  >
                    Search
                  </button>
                </div>
              </motion.form>

              {/* Quick Stats Filtered by Category Labels */}
              <div className="flex flex-wrap justify-center gap-3 mt-10">
                {['Psychotherapy', 'Mental Wellness', 'Recovery', 'Case Studies'].map((q, i) => (
                  <button key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white/50 hover:bg-white/10 hover:text-white transition-all">
                    # {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Floating Content Separator Wave */}
        <div className="relative h-20 -mt-10 overflow-hidden pointer-events-none z-20">
          <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 100" fill="none">
            <path d="M0 100C360 0 720 0 1080 0C1260 0 1350 50 1440 100V100H0Z" fill="#f8fafc" />
          </svg>
        </div>

        {/* Main Content Area */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Premium Sidebar Filters */}
              <div className="lg:col-span-4">
                <div className="sticky top-24 space-y-8">
                  
                  {/* Category Filter */}
                  <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2.5 mb-6 text-slate-800">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <Filter className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-black uppercase tracking-widest">Categories</h3>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setSelectedCategory('');
                          updateURL({ ...Object.fromEntries(searchParams), category: '' });
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                          selectedCategory === '' 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                            : 'text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        All Categories
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat._id}
                          onClick={() => {
                            setSelectedCategory(cat._id);
                            updateURL({ ...Object.fromEntries(searchParams), category: cat._id });
                          }}
                          className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold group flex items-center justify-between transition-all ${
                            selectedCategory === cat._id 
                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 px-5' 
                              : 'text-slate-500 hover:bg-slate-50'
                          }`}
                        >
                          <span className="truncate">{cat._id}</span>
                          <span className={`${selectedCategory === cat._id ? 'text-white/50' : 'text-slate-300 group-hover:text-blue-300'} text-[10px]`}>
                            ({cat.count})
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Topic Tags Tag Cloud */}
                  <div className="bg-[#0a2a55] rounded-3xl p-8 text-white relative overflow-hidden group">
                    <Activity className="absolute -bottom-10 -right-10 opacity-10 blur-sm group-hover:scale-110 transition-transform duration-1000" size={140} />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-blue-300">Popular Topics</h3>
                    <div className="flex flex-wrap gap-2 relative z-10">
                      {tags.slice(0, 12).map((tag) => (
                        <button
                          key={tag._id}
                          onClick={() => {
                            setSelectedTag(tag._id);
                            updateURL({ ...Object.fromEntries(searchParams), tag: tag._id });
                          }}
                          className={`px-3 py-2 rounded-xl text-[10px] font-bold tracking-tight transition-all border ${
                            selectedTag === tag._id
                              ? 'bg-white text-blue-900 border-white'
                              : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {tag._id}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ── SIDEBAR: MEDICAL EXPERT FORM ── */}
                  <MedicalExpertForm />

                  {/* Reset Button */}
                  {(searchTerm || selectedCategory || selectedTag) && (
                    <button
                      onClick={clearFilters}
                      className="w-full bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" /> Reset Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Main Content Listing Grid */}
              <div className="lg:col-span-8">
                {/* View Controls & Info */}
                <div className="bg-white rounded-[2.5rem] p-5 shadow-sm border border-slate-100 mb-10 flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 rounded-xl transition-all ${
                        viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 rounded-xl transition-all ${
                        viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="hidden sm:block text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ">
                      Discovery <span className="text-blue-600">Mode</span>
                    </div>
                    <div className="h-6 w-[1px] bg-slate-100 hidden sm:block mx-1" />
                    <div className="text-xs font-bold text-slate-500 whitespace-nowrap">
                       <span className="text-blue-600">{blogsData?.pagination?.total || 0}</span> Results Found
                    </div>
                  </div>
                </div>

                {/* Loading State Skeleton */}
                {isLoading && (
                  <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" : "space-y-8"}>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm animate-pulse">
                        <div className="h-48 bg-slate-100" />
                        <div className="p-6 space-y-4">
                          <div className="h-4 bg-slate-50 w-1/4 rounded-full" />
                          <div className="h-7 bg-slate-100 w-full rounded-lg" />
                          <div className="h-16 bg-slate-50 w-full rounded-lg" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Error State */}
                {isError && (
                  <div className="bg-white rounded-[3rem] p-16 text-center shadow-sm border border-slate-100">
                    <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <X size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Connection Issues</h3>
                    <p className="text-slate-500 mb-8 max-w-sm mx-auto">We're having trouble retrieving the latest medical insights right now.</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="bg-[#0a2a55] hover:bg-[#1565c0] text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-900/20"
                    >
                      Retry Connection
                    </button>
                  </div>
                )}

                {/* Blogs List Display */}
                <AnimatePresence mode="wait">
                  {!isLoading && !isError && (
                    <motion.div
                      key={viewMode + (blogs.length > 0)}
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {blogs.length === 0 ? (
                        <div className="bg-white rounded-[3rem] p-16 text-center border border-dashed border-slate-200">
                          <div className="w-20 h-20 bg-blue-50 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search size={32} />
                          </div>
                          <h3 className="text-2xl font-bold text-slate-800 mb-2">No Matching Insights</h3>
                          <p className="text-slate-500 mb-10 max-w-sm mx-auto">None of our articles match your current search or filter criteria.</p>
                          <button
                            onClick={clearFilters}
                            className="text-blue-600 font-black uppercase text-xs tracking-widest hover:underline"
                          >
                            Return to full library
                          </button>
                        </div>
                      ) : (
                        <div className={
                          viewMode === 'grid'
                            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                            : "space-y-8"
                        }>
                          {blogs.map((blog) => (
                            <BlogCard
                              key={blog._id}
                              blog={blog}
                              viewMode={viewMode}
                            />
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Modern Pagination Navigation */}
                {blogsData?.pagination?.pages > 1 && (
                  <div className="mt-16 flex items-center justify-center gap-4">
                    <button className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex gap-2">
                       {[1, 2, 3].map(p => (
                         <button key={p} className={`w-12 h-12 rounded-2xl font-bold text-sm transition-all shadow-sm ${p === 1 ? 'bg-blue-600 text-white shadow-blue-600/20' : 'bg-white border border-slate-100 text-slate-500 hover:border-blue-200'}`}>
                           {p}
                         </button>
                       ))}
                    </div>
                    <button className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Global CTA Section */}
        <section className="pb-24 px-6">
           <div className="max-w-7xl mx-auto">
             <div className="bg-[#05162e] rounded-[4rem] p-12 md:p-20 relative overflow-hidden text-center md:text-left">
                <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 10, repeat: Infinity }} className="absolute -bottom-20 -right-20 pointer-events-none"><Pill size={300} className="text-blue-500" /></motion.div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                   <div>
                      <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 font-['Lora',serif] leading-tight">
                        Personalized Therapy <br/> <span className="text-blue-400">Just for You.</span>
                      </h2>
                      <p className="text-blue-100/60 text-lg max-w-lg leading-relaxed mb-0">Our expert psychologists are ready to provide the specialized clinical care you need to begin your recovery.</p>
                   </div>
                   <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                      <Link to="/doctors" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl shadow-blue-600/20 text-center">Talk to Specialist</Link>
                      <Link to="/contact" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all text-center">About Services</Link>
                   </div>
                </div>
             </div>
           </div>
        </section>

      </div>
    </>
  );
};

export default BlogListing;