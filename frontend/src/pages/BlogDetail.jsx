import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Eye,
  Heart,
  Share2,
  ArrowLeft,
  User,
  MessageSquare,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Bookmark,
  ChevronRight,
  Activity,
  Award,
  CheckCircle,
  MessageCircle
} from 'lucide-react';
import { useGetBlogBySlugQuery, useAddBlogCommentMutation, useToggleBlogLikeMutation } from '../rtk/slices/blogApiSlice';
import { Helmet } from 'react-helmet';
import MedicalExpertForm from '../components/MedicalExpertForm';

const BlogDetail = () => {
  const { slug } = useParams();
  const [commentText, setCommentText] = useState('');
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false); // Demo state

  const { data: blogData, isLoading, isError } = useGetBlogBySlugQuery(slug);
  const [addComment, { isLoading: commentLoading }] = useAddBlogCommentMutation();
  const [toggleLike, { isLoading: likeLoading }] = useToggleBlogLikeMutation();

  const blog = blogData?.data;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !commentName.trim() || !commentEmail.trim()) {
      alert('Please fill all required fields');
      return;
    }
    try {
      await addComment({
        slug,
        commentData: { text: commentText, name: commentName, email: commentEmail }
      }).unwrap();
      setCommentText(''); setCommentName(''); setCommentEmail('');
      alert('Comment submitted! It will appear after approval.');
    } catch (error) {
      alert('Failed to post comment. Try again later.');
    }
  };

  const handleLike = async () => {
    try {
      setLiked(!liked);
      await toggleLike({ slug, patientId: 'guest' });
    } catch (e) {}
  };

  const shareUrl = window.location.href;
  const shareTitle = blog?.title || '';

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] pt-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-[2rem] p-12 shadow-sm animate-pulse">
            <div className="h-10 bg-slate-100 rounded-lg w-3/4 mb-6" />
            <div className="flex gap-4 mb-10">
              <div className="h-4 bg-slate-100 rounded-full w-32" />
              <div className="h-4 bg-slate-100 rounded-full w-32" />
            </div>
            <div className="h-64 bg-slate-50 rounded-2xl w-full mb-10" />
            <div className="space-y-4">
              <div className="h-4 bg-slate-50 w-full rounded" />
              <div className="h-4 bg-slate-50 w-full rounded" />
              <div className="h-4 bg-slate-50 w-5/6 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="min-h-screen bg-[#f8fafc] pt-40 flex items-center justify-center text-center px-6">
        <div className="max-w-md">
          <div className="text-8xl mb-8">🔍</div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4 font-['Lora',serif]">Article Not Found</h1>
          <p className="text-slate-500 mb-10 leading-relaxed">The clinical insight you're looking for might have been relocated or removed from our knowledge hub.</p>
          <Link to="/blog" className="inline-flex items-center gap-3 bg-[#0a2a55] text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-900/20 hover:bg-[#1565c0] transition-all">
            <ArrowLeft className="w-5 h-5" /> Visit Knowledge Hub
          </Link>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "circOut" } }
  };

  return (
    <>
      <Helmet>
        <title>{blog.title} | Medical Insights | MedicwayCare</title>
        <meta name="description" content={blog.excerpt} />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
      </Helmet>

      <div className="min-h-screen bg-[#f8fafc] font-['Plus_Jakarta_Sans',sans-serif] pb-24">
        
        {/* Navigation Breadcrumb */}
        <div className="pt-24 md:pt-32 pb-4">
           <div className="max-w-6xl mx-auto px-6">
              <nav className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
                 <Link to="/" className="hover:text-blue-600 transition-colors">Portal</Link>
                 <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                 <Link to="/blog" className="hover:text-blue-600 transition-colors">Knowledge Hub</Link>
                 <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                 <span className="text-blue-900 truncate max-w-[200px]">{blog.title}</span>
              </nav>
           </div>
        </div>

        <motion.article 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto px-6"
        >
          {/* TOP SECTION: Header + Form */}
          <div className="grid lg:grid-cols-12 gap-8 mb-12 items-start">
             {/* Article Header & Feature Image */}
             <header className="lg:col-span-7 xl:col-span-8 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
             <div className="relative h-64 md:h-[480px]">
                {blog.featuredImage ? (
                  <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#05162e] to-[#0a2a55] flex items-center justify-center">
                    <Activity className="text-white/10 w-40 h-40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                   <div className="flex gap-3 mb-6">
                      {blog.categories?.map((cat, i) => (
                        <span key={i} className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[10px] font-bold tracking-[0.15em] uppercase border border-blue-400/30 backdrop-blur-md">
                          {cat}
                        </span>
                      ))}
                   </div>
                </div>
             </div>

             <div className="p-8 md:p-14">
                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-[1.15] font-['Lora',serif]">
                  {blog.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-y-6 gap-x-10 border-b border-slate-50 pb-8 mb-8">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                         <User className="w-6 h-6" />
                      </div>
                      <div>
                         <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Published By</div>
                         <div className="text-sm font-bold text-slate-800">{blog.author?.username || 'Medical Director'}</div>
                      </div>
                   </div>

                   <div className="flex items-center gap-3 text-slate-500">
                      <Calendar className="w-5 h-5 text-blue-300" />
                      <span className="text-sm font-bold">{formatDate(blog.publishedAt || blog.createdAt)}</span>
                   </div>

                   <div className="flex items-center gap-3 text-slate-500">
                      <Clock className="w-5 h-5 text-blue-300" />
                      <span className="text-sm font-bold">{blog.readTime} min read</span>
                   </div>

                   <div className="flex items-center gap-3 ml-auto">
                      <button 
                        onClick={handleLike}
                        className={`flex items-center gap-2.5 px-6 py-2.5 rounded-2xl transition-all font-bold text-sm ${liked ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-slate-50 text-slate-600 border border-slate-100 hover:bg-red-50 hover:text-red-600 hover:border-red-100'}`}
                      >
                         <Heart size={18} className={liked ? 'fill-current' : ''} />
                         {blog.likeCount || 0}
                      </button>
                      <button className="p-2.5 bg-slate-50 text-slate-400 rounded-2xl border border-slate-100 hover:text-blue-600 hover:bg-blue-50 transition-all">
                        <Share2 size={18} />
                      </button>
                   </div>
                </div>

                <div className="bg-slate-50/50 rounded-2xl p-8 border-l-[6px] border-blue-600 italic text-slate-600 text-lg leading-relaxed mb-6 font-['Lora',serif]">
                   "{blog.excerpt}"
                </div>
             </div>
             </header>

             {/* ── RIGHT SIDEBAR: EXPERTS CONTACT FORM (MOVED TO TOP) ── */}
             <div className="lg:col-span-5 xl:col-span-4">
                <div className="sticky top-32">
                   <MedicalExpertForm />
                </div>
             </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-8">
             
             {/* Sticky Social Sidebar (Desktop) */}
             <div className="hidden lg:block lg:col-span-1">
                <div className="sticky top-40 flex flex-col items-center gap-5">
                   <div className="w-10 h-[1px] bg-slate-200 mb-2" />
                   <a href={shareLinks.facebook} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm">
                      <Facebook size={18} />
                   </a>
                   <a href={shareLinks.twitter} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all shadow-sm">
                      <Twitter size={18} />
                   </a>
                   <a href={shareLinks.linkedin} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all shadow-sm">
                      <Linkedin size={18} />
                   </a>
                   <button className="w-11 h-11 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#0a2a55] hover:text-white hover:border-[#0a2a55] transition-all shadow-sm">
                      <Bookmark size={18} />
                   </button>
                </div>
             </div>

             {/* Main Article Content */}
             <div className="lg:col-span-11 bg-white rounded-[2.5rem] p-8 md:p-14 shadow-sm border border-slate-100">
                <style>{`
                  .blog-content { line-height: 2; font-size: 1.1rem; color: #334155; }
                  .blog-content p { margin-bottom: 2rem; }
                  .blog-content h2 { font-family: 'Lora', serif; font-size: 2rem; font-weight: 700; color: #0f172a; margin: 3rem 0 1.5rem; line-height: 1.3; }
                  .blog-content h3 { font-family: 'Lora', serif; font-size: 1.5rem; font-weight: 700; color: #0f172a; margin: 2rem 0 1.2rem; }
                  .blog-content ul { list-style-type: none; padding-left: 0; margin-bottom: 2rem; }
                  .blog-content ul li { position: relative; padding-left: 2rem; margin-bottom: 1rem; }
                  .blog-content ul li::before { content: "✓"; position: absolute; left: 0; color: #2563eb; font-weight: 900; }
                  .blog-content blockquote { background: #f8fafc; border-radius: 1.5rem; padding: 2.5rem; border-left: none; font-style: italic; color: #1e3a8a; margin: 3rem 0; font-size: 1.25rem; font-family: 'Lora', serif; position: relative; }
                  .blog-content blockquote::before { content: '"'; position: absolute; top: -10px; left: 20px; font-size: 5rem; color: #bfdbfe; font-family: serif; line-height: 1; }
                  .blog-content img { border-radius: 2rem; margin: 3rem 0; box-shadow: 0 20px 50px rgba(0,0,0,0.1); width: 100%; height: auto; }
                  .blog-content a { color: #1565c0; font-weight: 700; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 4px; }
                  .blog-content a:hover { color: #0a2a55; text-decoration-color: #1565c0; }
                `}</style>
                
                <div 
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                 {/* Tags Strip */}
                 <div className="mt-20 pt-10 border-t border-slate-50 flex flex-wrap gap-3">
                    {blog.tags?.map((tag, i) => (
                      <Link key={i} to={`/blog?tag=${tag}`} className="px-5 py-2.5 bg-slate-50 text-slate-500 rounded-xl text-xs font-bold hover:bg-blue-50 hover:text-blue-600 transition-all">
                        #{tag}
                      </Link>
                    ))}
                 </div>
              </div>
           </div>

          {/* Comments & Interactions */}
          <div className="mt-12 bg-white rounded-[2.5rem] p-8 md:p-14 shadow-sm border border-slate-100">
             <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <MessageSquare className="w-7 h-7" />
                   </div>
                   <div>
                      <h3 className="text-2xl font-extrabold text-slate-900 font-['Lora',serif]">Community Thoughts</h3>
                      <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">{blog.comments?.filter(c => c.isApproved).length || 0} Professional Comments</p>
                   </div>
                </div>
                <button 
                  onClick={() => setShowComments(!showComments)}
                  className="bg-slate-50 hover:bg-slate-100 text-slate-600 px-8 py-3.5 rounded-2xl text-sm font-bold transition-all border border-slate-100"
                >
                  {showComments ? 'Hide Comments' : 'Join Discussion'}
                </button>
             </div>

             <AnimatePresence>
                {showComments && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                     {/* Modern Comment Form */}
                     <form onSubmit={handleCommentSubmit} className="mb-16 bg-[#f8fafc] rounded-3xl p-8 border border-slate-100">
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                              <input 
                                type="text" placeholder="Dr. Jane Smith" 
                                value={commentName} onChange={(e) => setCommentName(e.target.value)}
                                className="w-full px-5 py-4 rounded-xl bg-white border border-slate-100 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all font-medium text-slate-800"
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                              <input 
                                type="email" placeholder="jane@clinic.com" 
                                value={commentEmail} onChange={(e) => setCommentEmail(e.target.value)}
                                className="w-full px-5 py-4 rounded-xl bg-white border border-slate-100 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all font-medium text-slate-800"
                              />
                           </div>
                        </div>
                        <div className="space-y-2 mb-8">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Your Insight or Perspective</label>
                           <textarea 
                             rows="5" placeholder="Share your professional thoughts or questions about this therapeutic approach..."
                             value={commentText} onChange={(e) => setCommentText(e.target.value)}
                             className="w-full px-5 py-4 rounded-xl bg-white border border-slate-100 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all font-medium text-slate-800 resize-none"
                           />
                        </div>
                        <button 
                          disabled={commentLoading}
                          className="w-full py-5 bg-[#0a2a55] hover:bg-[#1565c0] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl shadow-blue-900/10 flex items-center justify-center gap-3"
                        >
                           {commentLoading ? 'Posting...' : <><Send size={16} /> Submit Your Perspective</>}
                        </button>
                     </form>

                     {/* Comments Feed */}
                     <div className="space-y-8">
                        {blog.comments?.filter(c => c.isApproved).map((c, i) => (
                          <div key={i} className="flex gap-6 pb-8 border-b border-slate-50 last:border-0 last:pb-0">
                             <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-blue-600 font-black text-lg shrink-0">
                                {c.name.charAt(0).toUpperCase()}
                             </div>
                             <div>
                                <div className="flex items-center gap-3 mb-2">
                                   <h4 className="font-bold text-slate-800">{c.name}</h4>
                                   <div className="w-1 h-1 rounded-full bg-slate-300" />
                                   <span className="text-xs font-bold text-slate-400">{formatDate(c.createdAt)}</span>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">{c.text}</p>
                             </div>
                          </div>
                        ))}
                        {(!blog.comments || blog.comments.filter(c => c.isApproved).length === 0) && (
                          <div className="text-center py-10 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
                             <MessageCircle className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                             <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">No professional insights shared yet</p>
                          </div>
                        )}
                     </div>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>

          {/* Related Articles Strip */}
          <div className="mt-12 bg-[#0a2a55] rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center md:text-left">
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 rounded-[1.5rem] bg-white/10 flex items-center justify-center text-blue-300 border border-white/10 backdrop-blur-xl">
                      <Award size={32} />
                   </div>
                   <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 font-['Lora',serif]">Seeking Specialized Care?</h3>
                      <p className="text-blue-100/40 text-sm font-bold uppercase tracking-widest leading-relaxed">Our clinical platform connecting 500+ psychologists worldwide</p>
                   </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                   <Link to="/doctors" className="bg-white text-[#0a2a55] px-10 py-5 rounded-2xl font-black tracking-widest text-[10px] uppercase hover:bg-blue-50 transition-all text-center">Find a Specialist</Link>
                   <Link to="/booking" className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black tracking-widest text-[10px] uppercase hover:bg-blue-700 transition-all text-center">Book Consultation</Link>
                </div>
             </div>
             <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity }} className="absolute -top-20 -right-20 opacity-5 pointer-events-none text-white"><Activity size={300} /></motion.div>
          </div>

        </motion.article>
      </div>
    </>
  );
};

export default BlogDetail;