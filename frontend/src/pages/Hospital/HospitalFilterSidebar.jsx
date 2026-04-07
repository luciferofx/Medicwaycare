import React from "react";
import {
  FaFilter,
  FaSearch,
  FaHospital,
  FaStar,
  FaMoneyBill,
  FaGlobeAsia,
  FaCity,
  FaBed,
  FaTrashAlt,
  FaCheckCircle
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import {
  useGetCategoryListQuery,
  useGetCountryListQuery,
} from "@/rtk/slices/commanApiSlice";
import CountrySelectDropdown from "@/components/CountrySelectDropdown";

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { 
    opacity: 1, 
    x: 0, 
    transition: { type: "spring", stiffness: 300, damping: 24 } 
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export default function HospitalFilterSidebar({ hospitalsCount }) {
  const [searchParams, setSearchParams] = useSearchParams();

  /* ================= API CALLS ================= */
  const { data: categoryData } = useGetCategoryListQuery();
  const { data: countryData } = useGetCountryListQuery();

  /* ================= DATA NORMALIZATION ================= */
  const categories = categoryData?.data?.data || [];
  const countries = countryData?.data?.data || [];

  /* ================= HELPERS ================= */
  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    value ? params.set(key, value) : params.delete(key);
    setSearchParams(params);
  };

  const inputCls = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13px] font-semibold text-[#0a2a55] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all duration-300 outline-none appearance-none";
  const labelCls = "flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-3";
  const iconWrapCls = "w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shadow-sm";

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="bg-white rounded-[2.5rem] shadow-[0_30px_100px_rgba(10,42,85,0.06)] border border-slate-100 overflow-hidden lg:sticky lg:top-24"
    >
      {/* ── CINEMATIC HEADER ── */}
      <div className="bg-[#0a2a55] p-7 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-400/30">
             <FaFilter className="text-cyan-400" />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight">Refine Search</h2>
            <p className="text-[10px] uppercase font-bold tracking-widest text-blue-300/60">Expert Selection</p>
          </div>
        </div>
        <div className="text-right">
           <span className="text-2xl font-black text-cyan-400 leading-none">{hospitalsCount}</span>
           <p className="text-[8px] uppercase font-black tracking-widest text-white/40">Results</p>
        </div>
      </div>

      <div className="p-8 space-y-6">
        
        {/* ================= SEARCH ================= */}
        <motion.div variants={itemVariants}>
          <label className={labelCls}>
            <div className={iconWrapCls}><FaSearch size={12} /></div>
            Clinical Name
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Apollo Hospital"
              defaultValue={searchParams.get("search") || ""}
              onChange={(e) => updateParam("search", e.target.value)}
              className={inputCls}
            />
            {searchParams.get("search") && <FaCheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500" size={14} />}
          </div>
        </motion.div>

        {/* ================= COUNTRY ================= */}
        <motion.div variants={itemVariants}>
          <label className={labelCls}>
            <div className={iconWrapCls}><FaGlobeAsia size={12} /></div>
            Global Region
          </label>
          <div className="clinical-select-root">
            <CountrySelectDropdown
              countries={countries}
              value={searchParams.get("country") || ""}
              onChange={(slug) => updateParam("country", slug)}
            />
          </div>
        </motion.div>

        {/* ================= CITY ================= */}
        <motion.div variants={itemVariants}>
          <label className={labelCls}>
            <div className={iconWrapCls}><FaCity size={12} /></div>
            Metropolitan City
          </label>
          <input
            type="text"
            placeholder="Search by city..."
            defaultValue={searchParams.get("city") || ""}
            onChange={(e) => updateParam("city", e.target.value)}
            className={inputCls}
          />
        </motion.div>

        {/* ================= SPECIALTY ================= */}
        <motion.div variants={itemVariants}>
          <label className={labelCls}>
            <div className={iconWrapCls}><FaHospital size={12} /></div>
            Medical Domain
          </label>
          <div className="relative group">
            <select
              value={searchParams.get("category") || ""}
              onChange={(e) => updateParam("category", e.target.value)}
              className={inputCls}
            >
              <option value="">All Medical Specialities</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.slug}>
                  {cat.category_name}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300 transition-colors group-hover:text-blue-500">
               <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
            </div>
          </div>
        </motion.div>

        {/* ================= RATING ================= */}
        <motion.div variants={itemVariants}>
          <label className={labelCls}>
            <div className={iconWrapCls}><FaStar size={12} /></div>
            Quality Standard
          </label>
          <div className="relative group">
            <select
              value={searchParams.get("rating") || ""}
              onChange={(e) => updateParam("rating", e.target.value)}
              className={inputCls}
            >
              <option value="">Any Satisfaction Level</option>
              <option value="4.5">Gold Standard (4.5+)</option>
              <option value="4">High Rating (4+)</option>
              <option value="3.5">Standard (3.5+)</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
               <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
            </div>
          </div>
        </motion.div>

        {/* ================= PRICE ================= */}
        <motion.div variants={itemVariants}>
          <label className={labelCls}>
            <div className={iconWrapCls}><FaMoneyBill size={12} /></div>
            Tariff Bracket
          </label>
          <div className="relative group">
            <select
              value={searchParams.get("priceRange") || ""}
              onChange={(e) => updateParam("priceRange", e.target.value)}
              className={inputCls}
            >
              <option value="">Global Average</option>
              <option value="budget">Value Care (₹)</option>
              <option value="moderate">Balanced (₹₹)</option>
              <option value="premium">Executive (₹₹₹)</option>
              <option value="luxury">Presidential (₹₹₹₹)</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
               <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
            </div>
          </div>
        </motion.div>

        {/* ================= RESET ================= */}
        <motion.div variants={itemVariants} className="pt-4">
          <button
            onClick={() => setSearchParams({})}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 text-slate-400 py-3.5 rounded-2xl hover:border-red-100 hover:text-rose-500 hover:bg-rose-50 transition-all duration-500 font-black text-xs uppercase tracking-[0.2em]"
          >
            <FaTrashAlt size={12} />
            Reset Systems
          </button>
        </motion.div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
    </motion.div>
  );
}