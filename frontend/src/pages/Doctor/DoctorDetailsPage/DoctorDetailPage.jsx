import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaAward,
  FaCalendarCheck,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhone,
  FaSpinner,
  FaStar,
  FaStethoscope,
  FaGraduationCap,
  FaBriefcase,
  FaImages,
  FaAddressCard,
  FaChevronRight,
  FaChevronLeft,
  FaHeart,
  FaShieldAlt,
  FaQuoteLeft
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetDoctorsDetailQuery } from "@/rtk/slices/commanApiSlice";
import { CountryFlag } from "@/helper/countryFlags";
import { DEFAULT_DOCTOR_DATA } from "@/constants/doctorHospitalConstants.js";
import { Helmet } from "react-helmet";

const TABS = [
  { id: "overview", label: "Overview", icon: <FaStethoscope /> },
  { id: "education", label: "Education", icon: <FaGraduationCap /> },
  { id: "experience", label: "Experience", icon: <FaBriefcase /> },
  { id: "gallery", label: "Gallery", icon: <FaImages /> },
  { id: "contact", label: "Contact", icon: <FaAddressCard /> },
];

const DoctorDetails = () => {
  const { slug, id } = useParams();
  const navigate = useNavigate();

  const lookupParam = slug || id;
  const { data, isLoading, error } = useGetDoctorsDetailQuery({ slug: lookupParam });

  const [activeTab, setActiveTab] = useState("overview");
  const [galleryIndex, setGalleryIndex] = useState(0);

  /* ── Loading State ── */
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border-4 border-blue-100 border-t-[#0a2a55] rounded-full mb-6" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Accessing Medical Faculty</p>
      </div>
    );
  }

  /* ── Error State ── */
  if (error || !data?.data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] px-6 text-center">
        <div className="w-24 h-24 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center text-4xl mb-8 shadow-lg shadow-red-100">
          <FaStethoscope />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4 font-['Lora',serif]">Profile Under Clinical Review</h2>
        <p className="text-slate-500 max-w-sm mx-auto mb-10 leading-relaxed font-medium">This specialist profile is currently being updated by our clinical directors. Please check back shortly.</p>
        <button onClick={() => navigate("/doctors")} className="bg-[#0a2a55] text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-blue-900/20 hover:bg-[#1565c0] transition-all">← Back to Directory</button>
      </div>
    );
  }

  const rawDoctor = data.data;

  // Clean name logic to avoid Dr. Dr. suffix
  const getCleanName = (name) => {
    if (!name) return "";
    const cleaned = name.trim();
    // Case insensitive check for "dr" prefix
    if (/^dr\.?\s+/i.test(cleaned)) return cleaned;
    return `Dr. ${cleaned}`;
  };

  const doctorName = getCleanName(rawDoctor?.name);

  // Merge with fallbacks
  const doctor = {
    ...DEFAULT_DOCTOR_DATA,
    ...rawDoctor,
    name: doctorName.replace(/^Dr\.\s+/i, ""), // Store base name for internal use if needed, but we'll use cleaned
    location: { ...DEFAULT_DOCTOR_DATA.location, ...rawDoctor.location },
    educationAndTraining: (rawDoctor.educationAndTraining?.length > 0) ? rawDoctor.educationAndTraining : DEFAULT_DOCTOR_DATA.educationAndTraining,
    about: rawDoctor.about || DEFAULT_DOCTOR_DATA.about,
    workExperience: rawDoctor.workExperience || DEFAULT_DOCTOR_DATA.workExperience,
  };

  const bookUrl = `/book/${doctor.hospital?._id || ""}/${doctor._id || ""}`;

  return (
    <>
      <Helmet>
        <title>{doctorName} | Medical Specialist | MedicwayCare</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
      </Helmet>

      <div className="min-h-screen bg-[#f8fafc] font-['Plus_Jakarta_Sans',sans-serif] pb-24 relative overflow-hidden">
        
        {/* Animated Background Elements */}
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-60 right-[5%] opacity-[0.03] text-blue-900 pointer-events-none"><FaStethoscope size={280} /></motion.div>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 70, repeat: Infinity, ease: "linear" }} className="absolute bottom-10 left-[5%] opacity-[0.02] text-blue-900 pointer-events-none"><FaAward size={350} /></motion.div>

        {/* ── STICKY BREADCRUMB ── */}
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
           <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
              <button onClick={() => navigate("/doctors")} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-all">
                 <FaArrowLeft className="text-xs" /> Back to specialists
              </button>
              <div className="flex items-center gap-4">
                 <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Available for consultation
                 </div>
                 <Link to={bookUrl} className="bg-[#0a2a55] text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#1565c0] transition-all shadow-lg shadow-blue-950/10">Book Slot</Link>
              </div>
           </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10 lg:py-14">

          {/* ── PREMIUM HERO PROFILE ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden mb-12">
             {/* Navy Gradient Banner */}
             <div className="h-48 md:h-64 bg-gradient-to-br from-[#05162e] via-[#0a2a55] to-[#1565c0] relative overflow-hidden">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.05 }} className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                <div className="absolute top-10 right-10 opacity-10 flex gap-10">
                   <FaStethoscope size={120} className="text-white rotate-12" />
                </div>
             </div>

             {/* Profile Meta Area */}
             <div className="px-8 md:px-16 pb-12 relative">
                <div className="flex flex-col md:flex-row md:items-end gap-8 -mt-20 md:-mt-24">
                   {/* Avatar Frame */}
                   <div className="relative group mx-auto md:mx-0">
                      <div className="w-40 h-40 md:w-56 md:h-56 rounded-[2.5rem] bg-white p-2.5 shadow-2xl shadow-blue-900/10 transition-transform duration-500 group-hover:scale-[1.02]">
                         <img 
                           src={doctor.image?.publicURL || doctor.image || "/doctor-placeholder.jpg"} 
                           alt={doctor.name} 
                           className="w-full h-full object-cover rounded-[2rem] border border-slate-50"
                         />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-3 rounded-2xl border-4 border-white shadow-xl">
                         <FaShieldAlt className="text-xl" />
                      </div>
                   </div>

                   {/* Title Area */}
                   <div className="flex-1 text-center md:text-left mb-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                         <div>
                             <h1 className="text-3xl md:text-5xl font-black leading-tight font-['Lora',serif] text-white drop-shadow-sm tracking-tight">
                                {doctorName}
                             </h1>
                            <div className="mt-4 inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100/50 shadow-sm">
                               <FaStethoscope size={10} className="animate-pulse" /> {doctor.categoryId?.category_name || "Specialist Faculty"}
                            </div>
                         </div>
                         <Link to={bookUrl} className="hidden md:flex items-center gap-3 bg-gradient-to-br from-[#0a2a55] to-[#1565c0] text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:shadow-2xl hover:shadow-blue-900/30 transition-all active:scale-95">
                            <FaCalendarCheck size={16} /> Book Consultation
                         </Link>
                      </div>

                      {/* Quick Meta Row */}
                      <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                         <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 px-4 py-2 rounded-xl text-xs font-bold text-amber-700">
                            <FaStar className="animate-pulse" /> 4.9 <span className="text-amber-500/50 font-medium">(120 Reviews)</span>
                         </div>
                         <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-xs font-bold text-slate-600">
                            <FaAward className="text-blue-600" /> {doctor.experience || 10}+ Years
                         </div>
                         <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-xl text-xs font-bold text-blue-700">
                            <FaMapMarkerAlt /> {doctor.location.city || "Mumbai"}
                            {doctor.location.country && <CountryFlag name={doctor.location.country} width={16} className="shadow-sm rounded-sm ml-1" />}
                         </div>
                      </div>
                   </div>
                </div>

                {/* Subspecialty Strip */}
                {doctor.subCategoryId?.length > 0 && (
                  <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-2 max-w-2xl">
                     {doctor.subCategoryId.map((sub) => (
                       <span key={sub._id} className="px-4 py-2 bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 border border-slate-100 hover:border-blue-200 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                          {sub.subcategory_name}
                       </span>
                     ))}
                  </div>
                )}
             </div>
          </motion.div>

          {/* ── MAIN CONTENT LAYOUT ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
             
             {/* LEFT SIDE: TABBED INFORMATION */}
             <div className="lg:col-span-8">
                <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden min-h-[600px] flex flex-col">
                   {/* Modern Tab Bar */}
                   <div className="flex overflow-x-auto bg-slate-50/50 p-3 gap-2 scrollbar-none border-b border-slate-50">
                      {TABS.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center gap-3 px-7 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id 
                            ? "bg-[#0a2a55] text-white shadow-xl shadow-blue-900/20" 
                            : "text-slate-400 hover:bg-white hover:text-slate-600"}`}
                        >
                           <span className="text-sm">{tab.icon}</span> {tab.label}
                        </button>
                      ))}
                   </div>

                   {/* Content Render Area */}
                   <div className="p-8 md:p-14 flex-1">
                      <AnimatePresence mode="wait">
                         <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
                            
                            {/* OVERVIEW TAB */}
                            {activeTab === "overview" && (
                              <div className="space-y-12">
                                 <div>
                                    <div className="flex items-center gap-3 mb-6">
                                       <FaQuoteLeft className="text-blue-100" size={32} />
                                       <h2 className="text-2xl font-bold text-slate-800 font-['Lora',serif]">About Dr. {doctor.name}</h2>
                                    </div>
                                    <p className="text-slate-600 leading-[2] text-lg font-['Lora',serif] italic opacity-80 pl-6 border-l-4 border-blue-600/10">
                                       "{doctor.about || "Clinical history profile pending."}"
                                    </p>
                                 </div>

                                 {doctor.medicalProblems?.length > 0 && (
                                   <div>
                                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-3">
                                         <span className="w-8 h-[1px] bg-slate-100" /> Specialist Expertise
                                      </h3>
                                      <div className="grid sm:grid-cols-2 gap-3">
                                         {doctor.medicalProblems.map((p, i) => (
                                           <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all group">
                                              <div className="w-2 h-2 rounded-full bg-blue-600 group-hover:scale-150 transition-transform" />
                                              <span className="text-sm font-bold text-slate-700">{p}</span>
                                           </div>
                                         ))}
                                      </div>
                                   </div>
                                 )}

                                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6">
                                    {[
                                      { label: "Clinic Track", value: doctor.experience ? `${doctor.experience}+ Yers` : "—", color: "blue" },
                                      { label: "Trust Score", value: "4.9 / 5", color: "amber" },
                                      { label: "Impact", value: "1.2k+ Case", color: "emerald" },
                                    ].map((stat) => (
                                      <div key={stat.label} className="bg-slate-50/50 rounded-3xl p-6 text-center border border-slate-100 hover:shadow-lg hover:shadow-slate-100 transition-all">
                                         <p className="text-2xl font-black text-slate-800 mb-1">{stat.value}</p>
                                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                                      </div>
                                    ))}
                                 </div>
                              </div>
                            )}

                            {/* EDUCATION TAB */}
                            {activeTab === "education" && (
                              <div className="space-y-10">
                                 <h2 className="text-2xl font-bold text-slate-800 font-['Lora',serif] mb-10">Academic Excellence</h2>
                                 {doctor.educationAndTraining?.length > 0 ? (
                                   <div className="relative pl-8 space-y-12">
                                      <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-slate-100" />
                                      {doctor.educationAndTraining.map((edu, i) => (
                                        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={i} className="relative">
                                           <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-white border-4 border-blue-600 shadow-lg" />
                                           <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-xl transition-all">
                                              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                                 <div>
                                                    <p className="text-xl font-bold text-slate-800 mb-1 font-['Lora',serif]">{edu.degree}</p>
                                                    <p className="text-blue-600 text-sm font-bold uppercase tracking-wider">{edu.institute}</p>
                                                 </div>
                                                 {edu.year && (
                                                   <span className="px-4 py-1.5 bg-blue-600 text-white rounded-xl text-[10px] font-black tracking-widest shadow-lg shadow-blue-950/20">
                                                      {edu.year}
                                                   </span>
                                                 )}
                                              </div>
                                           </div>
                                        </motion.div>
                                      ))}
                                   </div>
                                 ) : (
                                   <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Educational Records Pending</p>
                                   </div>
                                 )}
                              </div>
                            )}

                            {/* EXPERIENCE TAB */}
                            {activeTab === "experience" && (
                              <div className="space-y-8">
                                 <h2 className="text-2xl font-bold text-slate-800 font-['Lora',serif] mb-6">Clinical Narrative</h2>
                                 {doctor.workExperience ? (
                                   <div className="bg-[#f1f5f9] rounded-[2.5rem] p-10 md:p-14 border border-slate-100 relative overflow-hidden group">
                                      <FaQuoteLeft className="absolute top-8 right-8 text-slate-200/50 group-hover:scale-125 transition-transform" size={60} />
                                      <p className="text-slate-600 leading-[2.2] text-lg lg:text-xl font-['Lora',serif] whitespace-pre-line relative z-10 italic">
                                         {doctor.workExperience}
                                      </p>
                                   </div>
                                 ) : (
                                   <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Experience History Pending</p>
                                   </div>
                                 )}
                              </div>
                            )}

                            {/* GALLERY TAB */}
                            {activeTab === "gallery" && (
                              <div>
                                 <h2 className="text-2xl font-bold text-slate-800 font-['Lora',serif] mb-8">Clinical Gallery</h2>
                                 {doctor.gallery?.length > 0 ? (
                                   <div className="space-y-6">
                                      <motion.div key={galleryIndex} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-[3rem] overflow-hidden border border-slate-100 shadow-2xl relative h-80 md:h-[450px]">
                                         <img src={doctor.gallery[galleryIndex].publicURL || doctor.gallery[galleryIndex]} className="w-full h-full object-cover" alt="Gallery" />
                                         <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                      </motion.div>
                                      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
                                         {doctor.gallery.map((img, i) => (
                                           <button key={i} onClick={() => setGalleryIndex(i)} className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden transition-all duration-300 border-4 ${galleryIndex === i ? 'border-blue-600 scale-105 shadow-xl shadow-blue-900/20' : 'border-white opacity-60 hover:opacity-100 shadow-md'}`}>
                                              <img src={img.publicURL || img} className="w-full h-full object-cover" alt="thumb" />
                                           </button>
                                         ))}
                                      </div>
                                   </div>
                                 ) : (
                                   <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Diagnostic Gallery Empty</p>
                                   </div>
                                 )}
                              </div>
                            )}

                            {/* CONTACT TAB */}
                            {activeTab === "contact" && (
                              <div className="space-y-10">
                                 <h2 className="text-2xl font-bold text-slate-800 font-['Lora',serif] mb-8">Engagement Channels</h2>
                                 <div className="grid gap-6">
                                    {[
                                      { icon: <FaPhone />, label: "Direct Clinical Line", value: doctor.phone, href: `tel:${doctor.phone}`, color: "blue" },
                                      { icon: <FaEnvelope />, label: "Professional Correspondence", value: doctor.email, href: `mailto:${doctor.email}`, color: "slate" },
                                      { icon: <FaGlobe />, label: "Introduction Series", value: "Watch via Verified Channel", href: doctor.youtubeVideo?.url, target: "_blank", color: "red" },
                                    ].map((c, i) => c.value && (
                                      <a key={i} href={c.href} target={c.target} className="flex items-center gap-6 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-2xl transition-all group">
                                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-all group-hover:scale-110 ${c.color === 'blue' ? 'bg-blue-100 text-blue-600' : c.color === 'red' ? 'bg-red-50 text-red-500' : 'bg-slate-200 text-slate-700'}`}>
                                            {c.icon}
                                         </div>
                                         <div className="flex-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{c.label}</p>
                                            <p className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{c.value}</p>
                                         </div>
                                         <FaArrowLeft className="rotate-180 text-slate-300 group-hover:text-blue-600 transition-all group-hover:translate-x-2" />
                                      </a>
                                    ))}
                                 </div>
                              </div>
                            )}

                         </motion.div>
                      </AnimatePresence>
                   </div>
                </div>
             </div>

             {/* RIGHT SIDE: SYNCED SIDEBAR */}
             <div className="lg:col-span-4 space-y-8">
                
                {/* Booking Widget Card */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-[#0a2a55] rounded-[3rem] shadow-2xl shadow-blue-900/30 overflow-hidden text-white sticky top-24">
                   <div className="p-10 text-center relative overflow-hidden">
                      <FaStethoscope className="absolute -top-10 -right-10 opacity-5" size={200} />
                      <div className="relative z-10">
                         <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                            <FaCalendarCheck size={28} />
                         </div>
                         <h3 className="text-2xl font-bold font-['Lora',serif] mb-6">Expert <br/>Consultation</h3>
                         <div className="space-y-4 mb-10">
                            <div className="flex items-center gap-3 text-sm text-blue-200/70 border-b border-white/5 pb-4">
                               <FaStar className="text-amber-400" /> Rated 4.9 by Verified Entities
                            </div>
                            <div className="flex items-center gap-3 text-sm text-blue-200/70 border-b border-white/5 pb-4">
                               <FaAward /> Trusted Professional Track
                            </div>
                            <div className="flex items-center gap-3 text-sm text-blue-200/70">
                               <FaShieldAlt className="text-blue-400" /> Data Privacy Guaranteed
                            </div>
                         </div>
                         <Link to={bookUrl} className="w-full py-5 bg-white text-[#0a2a55] rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                            Secure New Slot <FaArrowLeft className="rotate-180" />
                         </Link>
                      </div>
                   </div>
                </motion.div>

                {/* Regional Logic Card */}
                {doctor.location && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-[3rem] shadow-sm border border-slate-100 p-10">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-3">
                        <FaMapMarkerAlt className="text-blue-600" /> Geographic Point
                     </h3>
                     <div className="space-y-4">
                        <p className="text-lg font-bold text-slate-800 leading-tight font-['Lora',serif]">{doctor.location.address || "Healthcare Excellence Center"}</p>
                        <div className="flex flex-col gap-2 text-sm text-slate-500 font-medium">
                           <span>{doctor.location.city}, {doctor.location.state}</span>
                           <div className="flex items-center gap-2">
                              {doctor.location.country && <CountryFlag name={doctor.location.country} width={18} className="rounded-sm" />}
                              <span>{doctor.location.country} {doctor.location.zipCode && `• ${doctor.location.zipCode}`}</span>
                           </div>
                        </div>
                     </div>
                  </motion.div>
                )}

                {/* Clinical Affiliation Card */}
                {doctor.hospital && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-[3rem] shadow-sm border border-slate-100 p-8 flex items-center justify-between group">
                     <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                           <FaAward size={24} />
                        </div>
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Clinical Hub</p>
                           <Link to={`/hospital/${doctor.hospital.slug}`} className="text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors uppercase tracking-tighter block">{doctor.hospital.name}</Link>
                        </div>
                     </div>
                     <FaChevronRight className="text-slate-200 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
                  </motion.div>
                )}
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDetails;
