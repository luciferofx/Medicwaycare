import { motion } from "framer-motion";
import { Brain, Globe, ShieldCheck, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaEdit,
  FaFacebookF,
  FaHeart,
  FaInstagram,
  FaLinkedin,
  FaSave,
  FaTimes,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import url_prefix from "../data/variable";
import { useAuth } from "../hooks/useAuth";

// Layout variants for staggered entrance
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Footer() {
  const { isAuthenticated, getToken } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const defaultContent = {
    about: "MedicwayCare is a global leader in clinical psychology and mental wellness, connecting individuals with world-class specialists and therapeutic sanctuaries. We are dedicated to evidence-based recovery and compassionate clinical excellence.",
    partners: [
      { name: "Clinical Partnership", url: "/contact" },
      { name: "Research Internships", url: "/contact" },
      { name: "Specialist Careers", url: "/contact" },
      { name: "Global Outreach", url: "/contact" },
    ],
    attribution: "ankurdigital.in",
    attributionUrl: "https://inamulportfolio-rho.vercel.app/",
    social: {
      facebook: "#",
      instagram: "#",
      youtube: "#",
      linkedin: "#",
      twitter: "#",
      whatsapp: "https://wa.me/919354799090"
    }
  };

  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    const fetchFooterContent = async () => {
      try {
        const response = await fetch(`${url_prefix}/admin/content?page=global&section=footer`);
        const result = await response.json();
        
        if (result.success && result.data.length > 0) {
          const newContent = { ...defaultContent };
          result.data.forEach(item => {
            if (item.key === 'about') newContent.about = item.value;
            if (item.key === 'attribution') newContent.attribution = item.value;
            if (item.key === 'attributionUrl') newContent.attributionUrl = item.value;
            if (item.key.startsWith('partner_')) {
              const [_, index, type] = item.key.split('_');
              if (newContent.partners[index]) {
                newContent.partners[index][type] = item.value;
              }
            }
            if (item.key.startsWith('social_')) {
              const type = item.key.replace('social_', '');
              if (newContent.social[type] !== undefined) {
                 newContent.social[type] = item.value;
              }
            }
          });
          setContent(newContent);
        }
      } catch (e) {
        console.error("Error fetching footer content", e);
      }
    };
    fetchFooterContent();
  }, []);

  const handleSave = async () => {
    const token = getToken();
    const saveItems = [
      { key: 'about', value: content.about },
      { key: 'attribution', value: content.attribution },
      { key: 'attributionUrl', value: content.attributionUrl },
      ...content.partners.flatMap((p, i) => [
        { key: `partner_${i}_name`, value: p.name },
        { key: `partner_${i}_url`, value: p.url }
      ]),
      ...Object.entries(content.social).map(([key, value]) => ({
        key: `social_${key}`,
        value: value
      }))
    ];

    try {
      const promises = saveItems.map(item => 
        fetch(`${url_prefix}/admin/content`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            page: 'global', section: 'footer', key: item.key, value: item.value, language: 'EN'
          })
        })
      );
      await Promise.all(promises);
      toast.success("Footer updated!");
      setIsEditing(false);
    } catch (e) {
      toast.error("Failed to save to server.");
    }
  };

  const updatePartner = (index, field, value) => {
    const newPartners = [...content.partners];
    newPartners[index][field] = value;
    setContent({ ...content, partners: newPartners });
  };

  const updateSocial = (network, value) => {
    setContent({ ...content, social: { ...content.social, [network]: value } });
  };

  return (
    <footer className="bg-[#0a192f] text-white pt-32 pb-12 px-6 md:px-16 relative overflow-hidden">
      {/* ── CINEMATIC BACKGROUND ELEMENTS ── */}
      {/* Top Border Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
      
      {/* Background Mesh Light Shift */}
      <motion.div 
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"
      />

      {/* Floating Particles (Orbs) */}
      {[...Array(5)].map((_, i) => (
        <motion.div
           key={i}
           initial={{ opacity: 0, x: Math.random() * 1000, y: Math.random() * 1000 }}
           animate={{ 
             y: [Math.random() * 1000, Math.random() * 1000],
             x: [Math.random() * 1000, Math.random() * 1000],
             opacity: [0.05, 0.15, 0.05]
           }}
           transition={{ 
             duration: 15 + Math.random() * 10, 
             repeat: Infinity, 
             ease: "linear" 
           }}
           className="absolute w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"
        />
      ))}

      {/* ── FLOATING CLINICAL ICONS ── */}
      <motion.div 
        animate={{ 
          y: [0, -30, 0], 
          opacity: [0.1, 0.2, 0.1],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 left-[8%] text-blue-500/10 pointer-events-none hidden lg:block"
      >
        <Brain size={160} strokeWidth={1} />
      </motion.div>
      <motion.div 
        animate={{ 
          y: [0, 35, 0], 
          opacity: [0.05, 0.15, 0.05],
          rotate: [0, -8, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-60 right-[12%] text-white/5 pointer-events-none hidden lg:block"
      >
        <FaHeart size={140} strokeWidth={1} />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-24"
        >
          
          {/* Brand & About */}
          <motion.div variants={staggerItem} className="lg:col-span-4">
            <Link to="/" className="inline-block mb-10 group relative">
               <span className="text-4xl font-black tracking-tighter text-white font-['Lora',serif]">
                 Medicway<span className="text-blue-400 group-hover:text-cyan-400 transition-colors">Care</span>
               </span>
               <motion.div 
                 className="h-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full mt-1" 
                 initial={{ width: 0 }}
                 whileInView={{ width: "100%" }}
                 transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                 viewport={{ once: true }}
               />
               <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all" />
            </Link>
            {isEditing ? (
              <textarea
                value={content.about}
                onChange={(e) => setContent({ ...content, about: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-blue-100/70 focus:outline-none focus:border-blue-500 h-36 backdrop-blur-md mb-6"
              />
            ) : (
              <p className="text-blue-100/60 leading-relaxed font-medium mb-10 text-lg">
                {content.about}
              </p>
            )}
            
            {isEditing ? (
              <div className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                 <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-2">Social Links</p>
                 {Object.entries({ facebook: FaFacebookF, instagram: FaInstagram, youtube: FaYoutube, linkedin: FaLinkedin, twitter: FaTwitter }).map(([network, Icon]) => (
                    <div key={network} className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                          <Icon size={14} />
                       </div>
                       <input
                         type="text"
                         value={content.social[network] || ""}
                         onChange={(e) => updateSocial(network, e.target.value)}
                         className="flex-1 bg-transparent border-b border-white/20 px-2 py-1 text-xs text-white focus:outline-none focus:border-blue-500"
                         placeholder={`${network} URL`}
                       />
                    </div>
                 ))}
              </div>
            ) : (
              <div className="flex gap-4">
                {[
                  { Icon: FaFacebookF, url: content.social.facebook },
                  { Icon: FaInstagram, url: content.social.instagram },
                  { Icon: FaYoutube, url: content.social.youtube },
                  { Icon: FaLinkedin, url: content.social.linkedin },
                  { Icon: FaTwitter, url: content.social.twitter }
                ].map(({ Icon, url }, i) => (
                  url && url !== "#" && (
                    <motion.a 
                      whileHover={{ 
                        scale: 1.15, 
                        backgroundColor: "rgba(59, 130, 246, 0.9)",
                        boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" 
                      }}
                      whileTap={{ scale: 0.9 }}
                      key={i} 
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-blue-400/50 transition-all duration-300 backdrop-blur-md"
                    >
                      <Icon size={18} />
                    </motion.a>
                  )
                ))}
              </div>
            )}
          </motion.div>

          {/* Clinical Navigation */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-16">
            <motion.div variants={staggerItem} className="space-y-8">
              <h3 className="text-white font-bold uppercase tracking-[0.3em] text-[10px] flex items-center gap-3">
                <span className="w-8 h-px bg-blue-500/60" />
                Clinical Path
              </h3>
              <ul className="space-y-5 text-blue-100/60 font-semibold text-sm">
                <li><Link to="/doctors" className="hover:text-white hover:pl-2 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover:bg-blue-400 group-hover:scale-125 transition-all" />
                  Our Specialists
                </Link></li>
                <li><Link to="/hospitals" className="hover:text-white hover:pl-2 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover:bg-blue-400 group-hover:scale-125 transition-all" />
                  Sanctuaries & Clinics
                </Link></li>
                <li><Link to="/services" className="hover:text-white hover:pl-2 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover:bg-blue-400 group-hover:scale-125 transition-all" />
                  Therapeutic Paths
                </Link></li>
                <li><Link to="/book" className="hover:text-white hover:pl-2 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover:bg-blue-400 group-hover:scale-125 transition-all" />
                  Book Consultation
                </Link></li>
              </ul>
            </motion.div>

            <motion.div variants={staggerItem} className="space-y-8">
              <h3 className="text-white font-bold uppercase tracking-[0.3em] text-[10px] flex items-center gap-3">
                <span className="w-8 h-px bg-emerald-500/60" />
                Partnership
              </h3>
              <ul className="space-y-5 text-blue-100/60 font-semibold text-sm">
                {content.partners.map((partner, index) => (
                  <li key={index}>
                    {isEditing ? (
                        <input
                            type="text"
                            value={partner.name}
                            onChange={(e) => updatePartner(index, "name", e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 w-full"
                        />
                    ) : (
                        <Link to={partner.url} className="hover:text-white hover:pl-2 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 group-hover:bg-emerald-400 group-hover:scale-125 transition-all" />
                          {partner.name}
                        </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={staggerItem} className="space-y-8">
              <h3 className="text-white font-bold uppercase tracking-[0.3em] text-[10px] flex items-center gap-3">
                <span className="w-8 h-px bg-purple-500/60" />
                Global Presence
              </h3>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                {[
                  { name: "India", code: "in" },
                  { name: "UK", code: "gb" },
                  { name: "USA", code: "us" },
                  { name: "UAE", code: "ae" },
                  { name: "Turkey", code: "tr" },
                  { name: "Germany", code: "de" },
                ].map((dest) => (
                  <motion.div 
                    key={dest.code} 
                    whileHover={{ x: 5, color: "#fff" }}
                    className="flex items-center gap-3 text-blue-100/60 text-xs font-bold hover:text-white cursor-pointer transition-colors group"
                  >
                    <div className="relative overflow-hidden rounded-sm shadow-md">
                      <img src={`https://flagcdn.com/w20/${dest.code}.png`} alt={dest.name} className="w-6 h-auto grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <span>{dest.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── CLINICAL ASSURANCE BANNER (SHIMMERING) ── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-[3rem] p-10 md:p-14 mb-20 flex flex-col md:flex-row items-center justify-between gap-12 group hover:bg-white/[0.08] transition-all duration-700 backdrop-blur-xl relative overflow-hidden shadow-2xl shadow-blue-900/40"
        >
           {/* Shimmer Streak Overlay */}
           <motion.div 
             animate={{ x: ["-100%", "200%"] }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
             className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] pointer-events-none"
           />
           
           <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-500 to-cyan-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
           <div className="flex items-center gap-8 relative z-10">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600/20 to-cyan-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
                 <Star size={40} strokeWidth={1.5} className="drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              </div>
              <div className="max-w-md">
                <h4 className="text-3xl font-black text-white mb-2 tracking-tight">Clinical Excellence Assured</h4>
                <p className="text-blue-100/50 text-sm font-semibold leading-relaxed">Connecting you with board-certified clinical psychologists and therapeutic sanctuaries worldwide for evidence-based recovery.</p>
              </div>
           </div>
           <motion.a
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 25px 60px rgba(59, 130, 246, 0.4)",
                backgroundColor: "#2563eb"
              }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/919354799090"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-xs rounded-[2rem] shadow-2xl shadow-blue-500/30 transition-all flex items-center gap-4 relative z-10"
            >
              <FaWhatsapp size={22} className="animate-pulse" /> Direct Assistance
           </motion.a>
        </motion.div>

        {/* ── BOTTOM BAR (PULSING LOGO/ATTRIBUTION) ── */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center gap-12 pt-16 border-t border-white/5 text-[10px] font-bold uppercase tracking-[0.3em] text-blue-100/30 w-full"
        >
           <div className="flex flex-col md:flex-row items-center w-full justify-between gap-10">
             <p className="hover:text-blue-100/60 transition-colors whitespace-nowrap">© {new Date().getFullYear()} MedicwayCare Path. Holistic Excellence.</p>
             <div className="flex items-center gap-10 flex-wrap justify-center">
                <a href="#" className="hover:text-cyan-400 transition-all duration-300">Privacy Policy</a>
                <a href="#" className="hover:text-cyan-400 transition-all duration-300">Terms of Service</a>
                <a href="#" className="hover:text-red-400 transition-all duration-300">Clinical Disclosure</a>
             </div>
           </div>
           
           <div className="flex flex-col items-center gap-6 pb-12 w-full">
              <span className="text-white/10 text-[9px] font-black tracking-[0.6em] mb-2 animate-pulse">DESIGNED & CRAFTED BY</span>
              {isEditing ? (
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    value={content.attribution}
                    onChange={(e) => setContent({ ...content, attribution: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-xs text-white w-56 focus:outline-none focus:border-blue-500 normal-case tracking-normal font-medium backdrop-blur-md"
                    placeholder="Agency Name"
                  />
                  <input
                    type="text"
                    value={content.attributionUrl}
                    onChange={(e) => setContent({ ...content, attributionUrl: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-xs text-white w-64 focus:outline-none focus:border-blue-500 normal-case tracking-normal font-medium backdrop-blur-md"
                    placeholder="URL (https://...)"
                  />
                </div>
              ) : (
                <motion.a 
                  initial={{ opacity: 0.8 }}
                  whileHover={{ 
                    scale: 1.08, 
                    letterSpacing: "0.55em",
                    opacity: 1,
                    textShadow: "0 0 15px rgba(0,255,255,0.8)"
                  }}
                  href={content.attributionUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-cyan-400 hover:text-white transition-all duration-700 text-[11px] tracking-[0.45em] bg-white/[0.03] px-14 py-5 rounded-full border border-cyan-400/20 shadow-[0_0_30px_rgba(0,255,255,0.1)] hover:shadow-[0_0_60px_rgba(0,255,255,0.5)] backdrop-blur-xl font-black relative overflow-hidden group"
                >
                  <motion.div 
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent skew-x-[-30deg]"
                  />
                  {content.attribution.toUpperCase()}
                </motion.a>
              )}
           </div>
        </motion.div>

      </div>

      {/* ── ADMIN QUICK ACTION ── */}
      {isAuthenticated && (
        <div className="fixed bottom-10 left-10 z-50 flex flex-col gap-4">
           {!isEditing ? (
             <motion.button 
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsEditing(true)} 
              className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-cyan-500 text-white rounded-full shadow-[0_15px_40px_rgba(37,99,235,0.5)] flex items-center justify-center text-xl transition-all"
             >
               <FaEdit />
             </motion.button>
           ) : (
             <div className="flex flex-col gap-4">
               <motion.button 
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 onClick={handleSave} 
                 className="w-14 h-14 bg-emerald-500 text-white rounded-full shadow-2xl flex items-center justify-center text-xl"
               >
                 <FaSave />
               </motion.button>
               <motion.button 
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 onClick={() => setIsEditing(false)} 
                 className="w-14 h-14 bg-red-500 text-white rounded-full shadow-2xl flex items-center justify-center text-xl"
               >
                 <FaTimes />
               </motion.button>
             </div>
           )}
        </div>
      )}
    </footer>
  );
}
