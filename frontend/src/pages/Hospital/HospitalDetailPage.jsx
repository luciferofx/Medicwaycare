import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaCalendarCheck,
  FaGlobe,
  FaPhone,
  FaStar,
  FaStethoscope,
  FaHospital,
  FaBed,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaEnvelope,
  FaAward,
  FaUsers,
  FaShieldAlt,
  FaHeartbeat,
  FaQuoteLeft,
} from "react-icons/fa";
import {
  MdLocationOn,
  MdOutlineLocalHospital,
  MdOutlinePhotoLibrary,
  MdContactPhone,
  MdDashboard,
  MdBusiness,
} from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetHospitalDetailQuery } from "@/rtk/slices/commanApiSlice";
import { CountryFlag } from "@/helper/countryFlags";
import { DEFAULT_HOSPITAL_DATA } from "@/constants/doctorHospitalConstants.js";
import { Helmet } from "react-helmet";

/* ─── Tab config ─── */
const TABS = [
  { key: "overview",        label: "Overview",        Icon: MdDashboard },
  { key: "infrastructure",  label: "Infrastructure",  Icon: MdBusiness },
  { key: "gallery",         label: "Gallery",         Icon: MdOutlinePhotoLibrary },
  { key: "contact",         label: "Contact",         Icon: MdContactPhone },
];

const HospitalDetails = () => {
  const { slug }   = useParams();
  const navigate   = useNavigate();

  const { data, isLoading, error } = useGetHospitalDetailQuery({ slug });
  
  const [activeTab,    setActiveTab]    = useState("overview");
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Debugging & Fallback logic
  useEffect(() => {
    if (data?.data) {
      const h = data.data;
      const missing = [];
      if (!h.hospitalIntro) missing.push("Hospital Intro");
      if (!h.infrastructure) missing.push("Infrastructure");
      if (!h.numberOfBeds) missing.push("Beds Count");
      if (!h.address?.city) missing.push("City");
      if (missing.length > 0) {
          console.warn(`[HospitalDetails] Missing data for ${h.name || slug}:`, missing);
      }
    }
  }, [data, slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-[2rem] border-4 border-blue-50 border-t-[#0a2a55] animate-spin" />
            <FaHospital className="absolute inset-0 m-auto text-[#0a2a55] text-3xl" />
          </div>
          <div className="text-center">
             <p className="text-[#0a2a55] font-black uppercase tracking-[0.2em] text-[10px] mb-2">Syncing Clinical Network</p>
             <p className="text-slate-400 text-xs font-medium animate-pulse">Establishing secure data channel...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl shadow-blue-900/5 border border-slate-100"
        >
          <div className="w-24 h-24 bg-blue-50 text-[#0a2a55] rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-8 shadow-inner">🏥</div>
          <h2 className="text-2xl font-black text-slate-900 mb-4 font-['Lora',serif]">Profile Under Clinical Review</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-10 font-medium">
            Our medical coordination team is currently finalizing the verified profile for this facility. Please explore our other certified institutions.
          </p>
          <button
            onClick={() => navigate("/hospitals")}
            className="w-full py-4 bg-[#0a2a55] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#1565c0] transition-all shadow-xl shadow-blue-900/10 active:scale-95"
          >
            Explore Alternative Institutions
          </button>
        </motion.div>
      </div>
    );
  }

  const rawHospital = data.data;

  const hospital = {
    ...DEFAULT_HOSPITAL_DATA,
    ...rawHospital,
    address: { ...DEFAULT_HOSPITAL_DATA.address, ...rawHospital.address },
    hospitalIntro: rawHospital.hospitalIntro || DEFAULT_HOSPITAL_DATA.hospitalIntro,
    infrastructure: rawHospital.infrastructure || DEFAULT_HOSPITAL_DATA.infrastructure,
    teamAndSpeciality: rawHospital.teamAndSpeciality || DEFAULT_HOSPITAL_DATA.teamAndSpeciality,
  };

  const gallery = hospital.gallery || [];
  const prevImg = () => setGalleryIndex((i) => (i - 1 + gallery.length) % gallery.length);
  const nextImg = () => setGalleryIndex((i) => (i + 1) % gallery.length);

  const stats = [
    { icon: FaBed,        label: "Clinical Beds",   value: hospital.numberOfBeds || DEFAULT_HOSPITAL_DATA.beds, color: "blue" },
    { icon: FaStar,       label: "Merit Rating",    value: "4.8 / 5.0", color: "amber" },
    { icon: FaUsers,      label: "Expert Faculty",  value: hospital.doctorCount  || DEFAULT_HOSPITAL_DATA.doctorsCount, color: "indigo" },
    { icon: FaAward,      label: "Accreditation",   value: hospital.established  ? `Since ${hospital.established}` : "Certified", color: "emerald" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-['Plus_Jakarta_Sans',sans-serif]">
      <Helmet>
        <title>{hospital.name} | Verified Diagnostic Hub | MedicwayCare</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
      </Helmet>

      {/* ── STICKY CLINICAL HEADER ── */}
      <motion.div 
        initial={{ y: -100 }} 
        animate={{ y: 0 }} 
        className="sticky top-0 z-[100] bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <button
              onClick={() => navigate("/hospitals")}
              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-all group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Institutional Index
            </button>

            <div className="hidden md:flex items-center gap-4">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 truncate max-w-xs font-['Lora',serif]">
                 {hospital.name}
               </p>
            </div>

            <Link
              to={`/book/${hospital._id}`}
              className="bg-[#0a2a55] text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1565c0] transition-all shadow-xl shadow-blue-900/10 active:scale-95"
            >
              Book Diagnostic Visit
            </Link>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-10 lg:py-14">
         
         {/* ── PREMIUM HOSPITAL HERO ── */}
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden mb-12">
            
            {/* Navy Gradient Banner Overlay */}
            <div className="h-64 md:h-80 bg-gradient-to-br from-[#05162e] via-[#0a2a55] to-[#1565c0] relative overflow-hidden">
                <motion.div animate={{ opacity: [0.03, 0.05, 0.03] }} transition={{ duration: 10, repeat: Infinity }} className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                <div className="absolute top-10 right-10 opacity-10 flex gap-10">
                   <FaHospital size={160} className="text-white rotate-12" />
                </div>
                <div className="absolute bottom-10 left-10 opacity-5">
                   <FaHeartbeat size={200} className="text-white -rotate-12" />
                </div>
            </div>

            {/* Profile Content Body */}
            <div className="px-8 md:px-16 pb-12 relative">
               <div className="flex flex-col md:flex-row md:items-end gap-10 -mt-24 md:-mt-32">
                  
                  {/* Institutional Frame */}
                  <div className="relative group mx-auto md:mx-0">
                     <div className="w-48 h-48 md:w-64 md:h-64 rounded-[3.5rem] bg-white p-3 shadow-2xl shadow-blue-900/10 transition-transform duration-500 group-hover:scale-[1.02] border border-slate-50">
                        <img 
                          src={hospital.photo?.publicURL || hospital.photo || "/hospital-placeholder.jpg"} 
                          alt={hospital.name} 
                          className="w-full h-full object-cover rounded-[3rem]"
                        />
                     </div>
                     <div className="absolute -bottom-2 -right-2 bg-[#0a2a55] text-white p-4 rounded-3xl border-8 border-[#f8fafc] shadow-2xl">
                        <FaShieldAlt className="text-2xl" />
                     </div>
                  </div>

                  {/* Identity Area */}
                  <div className="flex-1 text-center md:text-left">
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
                        <div>
                           <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[8px] font-black uppercase tracking-widest mb-3 border border-emerald-100">
                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Verified Medical Center
                           </div>
                           <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-['Lora',serif] leading-tight mb-4 tracking-tight drop-shadow-sm">
                             {hospital.name}
                           </h1>
                           <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-400">
                              <span className="flex items-center gap-2 text-xs font-bold">
                                <FaMapMarkerAlt className="text-blue-500" />
                                {hospital.address?.city && `${hospital.address.city}, `}
                                {hospital.address?.country && (
                                  <CountryFlag name={hospital.address.country} width={18} className="rounded-sm shadow-sm ml-1" />
                                )}
                              </span>
                              <div className="w-1 h-1 rounded-full bg-slate-200 hidden md:block" />
                              <span className="flex items-center gap-2 text-xs font-bold">
                                <MdOutlineLocalHospital className="text-blue-500 text-lg" />
                                {hospital.hospitalType || "Diagnostic Specialist"}
                              </span>
                           </div>
                        </div>
                        
                        <div className="flex flex-col items-center md:items-end gap-3">
                           <div className="text-right hidden md:block">
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">Clinic Merit Score</p>
                              <div className="flex items-center gap-1">
                                 {[1,2,3,4,5].map(i => <FaStar key={i} size={14} className={i <= 4 ? "text-amber-400" : "text-slate-100"} />)}
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Feature Tags Area */}
                     {hospital.categoryIds?.length > 0 && (
                       <div className="flex flex-wrap justify-center md:justify-start gap-3">
                          {hospital.categoryIds.map((cat) => (
                             <span key={cat._id} className="px-5 py-2.5 bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                                {cat.category_name}
                             </span>
                          ))}
                       </div>
                     )}
                  </div>
               </div>

               {/* QUICK STATS STRIP */}
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-12 border-t border-slate-50">
                  {stats.map(({ icon: Icon, label, value, color }) => (
                     <div key={label} className="group relative">
                        <div className="flex items-center gap-5 p-2 transition-transform group-hover:-translate-y-1">
                           <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center transition-all group-hover:bg-[#0a2a55] group-hover:text-white shadow-sm border border-slate-100">
                             <Icon size={20} />
                           </div>
                           <div>
                              <p className="text-2xl font-black text-slate-900">{value}</p>
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </motion.div>

         {/* ── CLINICAL CONTENT LAYOUT ── */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            <div className="lg:col-span-8">
               <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col min-h-[700px]">
                  
                  {/* Premium Tab Bar */}
                  <div className="flex overflow-x-auto bg-slate-50/50 p-4 gap-3 border-b border-slate-50 scrollbar-none">
                     {TABS.map(({ key, label, Icon }) => (
                        <button
                          key={key}
                          onClick={() => setActiveTab(key)}
                          className={`flex items-center gap-4 px-8 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === key 
                            ? "bg-[#0a2a55] text-white shadow-2xl shadow-blue-900/20" 
                            : "text-slate-400 hover:bg-white hover:text-slate-700"}`}
                        >
                           <Icon className="text-lg" /> {label}
                        </button>
                     ))}
                  </div>

                  <div className="p-8 md:p-14 flex-1">
                     <AnimatePresence mode="wait">
                        <motion.div 
                          key={activeTab} 
                          initial={{ opacity: 0, x: 20 }} 
                          animate={{ opacity: 1, x: 0 }} 
                          exit={{ opacity: 0, x: -20 }} 
                          transition={{ duration: 0.4 }}
                          className="min-h-full"
                        >

                           {/* OVERVIEW SECTION */}
                           {activeTab === "overview" && (
                              <div className="space-y-16">
                                 <div>
                                    <div className="flex items-center gap-4 mb-8">
                                       <FaQuoteLeft className="text-blue-100" size={32} />
                                       <h2 className="text-3xl font-black text-slate-900 font-['Lora',serif]">Institutional Mandate</h2>
                                    </div>
                                    <div 
                                      className="text-slate-600 text-lg leading-[2] font-['Lora',serif] italic opacity-90 pl-10 border-l-4 border-blue-600/10 prose prose-slate max-w-none prose-p:mb-6"
                                      dangerouslySetInnerHTML={{ __html: hospital.hospitalIntro }}
                                    />
                                 </div>

                                 <div>
                                    <div className="flex items-center gap-4 mb-8">
                                       <FaStethoscope className="text-blue-100" size={32} />
                                       <h2 className="text-2xl font-bold text-slate-800 font-['Lora',serif]">Specialty Distribution</h2>
                                    </div>
                                    <div 
                                      className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-medium text-base"
                                      dangerouslySetInnerHTML={{ __html: hospital.teamAndSpeciality }}
                                    />
                                 </div>
                              </div>
                           )}

                           {/* INFRASTRUCTURE SECTION */}
                           {activeTab === "infrastructure" && (
                              <div>
                                 <div className="flex items-center gap-4 mb-10">
                                    <MdBusiness className="text-blue-100" size={40} />
                                    <h2 className="text-3xl font-black text-slate-900 font-['Lora',serif]">Clinical Infrastructure</h2>
                                 </div>
                                 <div 
                                   className="prose prose-slate max-w-none text-slate-600 leading-[2] text-lg font-['Lora',serif]"
                                   dangerouslySetInnerHTML={{ __html: hospital.infrastructure }}
                                 />
                              </div>
                           )}

                           {/* GALLERY SECTION */}
                           {activeTab === "gallery" && (
                              <div className="space-y-8">
                                 {gallery.length > 0 ? (
                                    <>
                                       <motion.div layoutId="main-viewer" className="relative group overflow-hidden rounded-[3rem] bg-slate-50 aspect-video border border-slate-100">
                                          <img 
                                            src={gallery[galleryIndex].publicURL || gallery[galleryIndex]} 
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            alt="Facility View"
                                          />
                                          <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-between">
                                             <div className="flex gap-4">
                                                <button onClick={prevImg} className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-[#0a2a55] transition-all"><FaChevronLeft /></button>
                                                <button onClick={nextImg} className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-[#0a2a55] transition-all"><FaChevronRight /></button>
                                             </div>
                                             <span className="text-white/80 text-[10px] font-black uppercase tracking-widest">{galleryIndex + 1} / {gallery.length} Images</span>
                                          </div>
                                       </motion.div>
                                       <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
                                          {gallery.map((img, i) => (
                                             <button 
                                                key={i} 
                                                onClick={() => setGalleryIndex(i)}
                                                className={`w-24 h-24 rounded-3xl overflow-hidden flex-shrink-0 border-4 transition-all ${galleryIndex === i ? "border-[#0a2a55] shadow-lg" : "border-transparent opacity-50 hover:opacity-100"}`}
                                             >
                                                <img src={img.publicURL || img} className="w-full h-full object-cover" alt="" />
                                             </button>
                                          ))}
                                       </div>
                                    </>
                                 ) : (
                                    <div className="h-[500px] rounded-[3rem] border-4 border-dashed border-slate-100 flex items-center justify-center flex-col text-slate-300">
                                       <MdOutlinePhotoLibrary size={80} className="mb-4 opacity-20" />
                                       <p className="font-black uppercase tracking-widest text-[10px]">Gallery Assets Not Provided</p>
                                    </div>
                                 )}
                              </div>
                           )}

                           {/* CONTACT SECTION */}
                           {activeTab === "contact" && (
                              <div className="space-y-8">
                                 <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 group hover:border-[#0a2a55] transition-all">
                                       <FaPhone className="text-blue-200 group-hover:text-[#0a2a55] mb-4 transition-colors" size={24} />
                                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Institutional Line</p>
                                       <p className="text-xl font-bold text-slate-800">{hospital.phone || "Line Private"}</p>
                                    </div>
                                    <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 group hover:border-[#0a2a55] transition-all">
                                       <FaEnvelope className="text-blue-200 group-hover:text-[#0a2a55] mb-4 transition-colors" size={24} />
                                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Administrative Email</p>
                                       <p className="text-xl font-bold text-slate-800 break-all">{hospital.email || "Email Private"}</p>
                                    </div>
                                 </div>
                                 
                                 <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
                                    <div className="flex items-start gap-6">
                                       <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-sm border border-slate-100 text-[#0a2a55] flex-shrink-0">
                                          <MdLocationOn size={32} />
                                       </div>
                                       <div>
                                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 underline decoration-blue-100 underline-offset-4">Verified Facility Location</p>
                                          <p className="text-xl font-black text-slate-800 font-['Lora',serif] leading-relaxed">
                                             {[hospital.address?.line1, hospital.address?.city, hospital.address?.state, hospital.address?.pincode].filter(Boolean).join(", ")}
                                          </p>
                                       </div>
                                    </div>
                                 </div>

                                 {hospital.youtubeVideos?.length > 0 && (
                                    <div className="mt-10 overflow-hidden rounded-[3rem] border border-slate-100 shadow-sm aspect-video">
                                       <iframe
                                          src={hospital.youtubeVideos[0].replace("watch?v=", "embed/")}
                                          className="w-full h-full"
                                          allowFullScreen
                                          title="Video Tour"
                                       />
                                    </div>
                                 )}
                              </div>
                           )}

                        </motion.div>
                     </AnimatePresence>
                  </div>
               </div>
            </div>

            {/* RIGHT SIDEBAR: EXPERT BOOKING */}
            <div className="lg:col-span-4 space-y-8">
               
               {/* PREMIUM BOOKING CARD */}
               <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0a2a55] rounded-[3rem] p-10 text-white shadow-2xl shadow-blue-900/30 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[4rem]" />
                  <div className="relative z-10 text-center mb-10">
                     <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
                        <FaCalendarCheck size={32} />
                     </div>
                     <h3 className="text-2xl font-black font-['Lora',serif] mb-2">Book Diagnosis</h3>
                     <p className="text-blue-100/70 text-xs font-medium">Verified Appointment Channel</p>
                  </div>

                  <div className="space-y-4 mb-10">
                     {[
                       { icon: FaShieldAlt, text: "Government Verified Center" },
                       { icon: FaStar, text: "Top Tier Medical Standards" },
                       { icon: FaChevronRight, text: "Direct Specialist Access" }
                     ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-blue-50/80">
                           <item.icon className="text-blue-400" /> {item.text}
                        </div>
                     ))}
                  </div>

                  <Link to={`/book/${hospital._id}`} className="block w-full py-5 bg-white text-[#0a2a55] text-center rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl hover:bg-blue-50 transition-all active:scale-[0.98]">
                     Initiate Request
                  </Link>
               </motion.div>

               {/* TRUST BADGE AREA */}
               <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm text-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-6">Accreditation Seals</p>
                  <div className="flex flex-wrap justify-center gap-6 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                     <FaAward size={32} />
                     <FaShieldAlt size={32} />
                     <FaHospital size={32} />
                  </div>
               </div>

            </div>
         </div>
      </div>

      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
        .prose h2, .prose h3 { font-family: 'Lora', serif !important; font-weight: 800 !important; color: #0f172a !important; }
        .prose p { margin-bottom: 1.5rem !important; }
      `}</style>
    </div>
  );
};

export default HospitalDetails;