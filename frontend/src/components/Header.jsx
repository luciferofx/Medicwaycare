import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight, Globe, Sparkles } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpeg";

import {
  useGetCountryCategoryDropdownQuery,
  useGetLanguageDropdownQuery,
} from "@/rtk/slices/dropdownApiSlice";
import { CountryFlag } from "@/helper/countryFlags";
import { useLanguage } from "../hooks/useLanguage";

const POPULAR_LANGUAGES = [
  { shortCode: "EN", language_name: "English" },
  { shortCode: "HI", language_name: "Hindi" },
  { shortCode: "RU", language_name: "Russian" },
  { shortCode: "FR", language_name: "French" }
];

const ROW_H = 46;   // country row height  (px)
const LABEL_H = 32;   // "COUNTRIES" header  (px)
const MAX_LIST_H = 320; // max scrollable height for country list

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState(null);
  const [hoverIdx, setHoverIdx] = useState(0);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const location = useLocation();

  const { scrollY } = useScroll();

  // Glassmorphic background transitions
  const headerBg = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.85)"]
  );
  const headerBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(20px)"]);
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 1]);

  const closeTimer = useRef(null);

  const { data } = useGetCountryCategoryDropdownQuery();
  const { data: languageData } = useGetLanguageDropdownQuery();
  const [currentLang, changeLanguage] = useLanguage();
  
  const countries = data?.data?.result ?? [];
  const apiLanguages = languageData?.data ?? [];
  
  const displayLanguages = apiLanguages.length > 0 ? apiLanguages : POPULAR_LANGUAGES;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const openMega = useCallback((lbl) => {
    clearTimeout(closeTimer.current);
    setActiveMega(lbl);
    setHoverIdx(0);
  }, []);
  const closeMega = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMega(null), 180);
  }, []);
  const cancelClose = useCallback(() => clearTimeout(closeTimer.current), []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Hospitals", path: "/hospitals", mega: true },
    { label: "Doctors", path: "/doctors", mega: true },
    { label: "Clinical Psychology", path: "/specialities/therapies" },
  ];

  const hoverCountry = countries[hoverIdx] ?? null;

  return (
    <motion.header
      style={{ 
        backgroundColor: headerBg, 
        backdropFilter: headerBlur,
        WebkitBackdropFilter: headerBlur // for Safari
      }}
      className="fixed w-full z-[900] transition-colors duration-300"
    >
      {/* Glow Bottom Edge */}
      <motion.div 
        style={{ opacity: borderOpacity }}
        className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-6 flex items-center relative" style={{ height: 72 }}>

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 mr-12 group">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: [-5, 5, 0] }}
            className="relative"
          >
            <img
              src={logo}
              alt="MedicwayCare Logo"
              className="w-10 h-10 object-cover rounded-2xl shadow-xl border-2 border-white/50"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500/20 rounded-full blur-sm group-hover:bg-blue-500/40" />
          </motion.div>
          <span className="font-black text-[#0a2a55] text-lg tracking-tighter group-hover:tracking-normal transition-all duration-300">
            Medicway<span className="text-blue-500/70 font-bold">Care</span>
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden lg:flex items-center flex-1 h-full">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            
            return (
              <div
                key={item.label}
                className="relative h-full"
                onMouseEnter={() => item.mega ? openMega(item.label) : null}
                onMouseLeave={() => item.mega ? closeMega() : null}
              >
                <NavLink
                  to={item.path}
                  style={{ height: 72 }}
                  className={`relative flex items-center gap-1.5 px-5 text-[13px] font-black uppercase tracking-widest transition-all duration-300 ${
                    isActive ? "text-[#0a2a55]" : "text-slate-500 hover:text-[#0a2a55]"
                  }`}
                >
                  {item.label}
                  {item.mega && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${activeMega === item.label ? "rotate-180 text-blue-500" : ""}`}
                    />
                  )}
                  {isActive && (
                    <motion.span 
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-4 right-4 h-[3px] bg-blue-500 rounded-t-full shadow-[0_0_10px_rgba(59,130,246,0.6)]" 
                    />
                  )}
                </NavLink>

                {/* ══════════════ MEGA MENU ══════════════ */}
                <AnimatePresence>
                  {item.mega && activeMega === item.label && (
                    <motion.div
                      key="mega"
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      onMouseEnter={cancelClose}
                      onMouseLeave={closeMega}
                      className="absolute left-0 bg-white/95 backdrop-blur-2xl rounded-[2rem] z-50 overflow-hidden"
                      style={{
                        top: "calc(100% - 10px)",
                        minWidth: 6400, // Large to prevent wrap, constrained by container
                        maxWidth: "calc(100vw - 80px)",
                        width: 720,
                        boxShadow: "0 25px 60px rgba(10, 42, 85, 0.15)",
                        border: "1px solid rgba(10, 42, 85, 0.08)",
                      }}
                    >
                      <div className="flex">

                        {/* ─── LEFT: Country list ─── */}
                        <div
                          style={{
                            width: 260,
                            minWidth: 260,
                            flexShrink: 0,
                            borderRight: "1px solid rgba(10, 42, 85, 0.05)",
                            backgroundColor: "rgba(10, 42, 85, 0.02)"
                          }}
                        >
                          <div className="flex items-center px-6" style={{ height: 48 }}>
                            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                              Clinical Locations
                            </span>
                          </div>

                          <div className="overflow-y-auto pr-1" style={{ maxHeight: MAX_LIST_H }}>
                            {countries.map((c, idx) => {
                              const active = hoverIdx === idx;
                              return (
                                <div
                                  key={c.countryId}
                                  style={{ height: 52 }}
                                  onMouseEnter={() => setHoverIdx(idx)}
                                  className={`relative flex items-center gap-4 px-6 cursor-pointer select-none transition-all duration-300 ${
                                    active ? "bg-[#0a2a55] text-white shadow-xl shadow-blue-900/20" : "text-slate-600 hover:bg-blue-50/50"
                                  }`}
                                >
                                  {active && (
                                    <motion.span
                                      layoutId={`indicator-${item.label}`}
                                      className="absolute left-0 top-3 bottom-3 w-1 bg-cyan-400 rounded-r-full"
                                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                  )}
                                  <CountryFlag
                                    slug={c.slugName}
                                    name={c.countryName}
                                    width={24}
                                    className={`flex-shrink-0 rounded-md shadow-md overflow-hidden ${active ? "grayscale-0" : "grayscale"}`}
                                  />
                                  <span className="flex-1 text-[13.5px] font-black tracking-tight truncate">
                                    {c.countryName}
                                  </span>
                                  <ChevronRight
                                    size={14}
                                    className={`transition-transform duration-300 ${active ? "translate-x-1 text-cyan-400" : "text-slate-300"}`}
                                  />
                                </div>
                              );
                            })}
                            <div style={{ height: 16 }} />
                          </div>
                        </div>

                        {/* ─── RIGHT: Specialities ─── */}
                        <div className="flex-1 flex flex-col min-w-0 bg-white">
                          <div className="flex items-center px-8" style={{ height: 48 }}>
                             <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 flex items-center gap-2">
                               Expertise Path <Sparkles size={12} className="text-blue-500" />
                             </span>
                          </div>

                          <AnimatePresence mode="wait">
                            {hoverCountry && (
                              <motion.div
                                key={hoverCountry.countryId}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col flex-1"
                              >
                                <div className="overflow-y-auto px-4" style={{ maxHeight: MAX_LIST_H }}>
                                  <div className="grid grid-cols-2 gap-x-2">
                                    {hoverCountry.categories?.length > 0 ? (
                                      hoverCountry.categories.map((cat) => (
                                        <Link
                                          key={cat.categoryId}
                                          to={
                                            item.label === "Doctors"
                                              ? `/doctors?country=${hoverCountry.slugName}&category=${cat.slugName}`
                                              : `/hospitals?country=${hoverCountry.slugName}&category=${cat.slugName}`
                                          }
                                          onClick={() => setActiveMega(null)}
                                          style={{ height: 48 }}
                                          className="flex items-center justify-between px-4 rounded-xl group hover:bg-blue-50/70 transition-all duration-300"
                                        >
                                          <span className="text-[11px] font-bold tracking-tight text-slate-600 group-hover:text-[#0a2a55]">
                                            {cat.categoryName}
                                          </span>
                                          <ChevronRight
                                            size={12}
                                            className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all"
                                          />
                                        </Link>
                                      ))
                                    ) : (
                                      <div className="col-span-2 flex items-center justify-center py-20 text-sm text-slate-400 italic">
                                        Specialities arriving soon in {hoverCountry.countryName}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {hoverCountry.categories?.length > 0 && (
                                  <div className="px-8 py-5 border-t border-slate-50 flex-shrink-0 mt-auto bg-slate-50/30">
                                    <Link
                                      to={
                                        item.label === "Doctors"
                                          ? `/doctors?country=${hoverCountry.slugName}`
                                          : `/hospitals?country=${hoverCountry.slugName}`
                                      }
                                      onClick={() => setActiveMega(null)}
                                      className="group flex items-center gap-2 text-[12px] font-black text-[#0a2a55] tracking-widest uppercase"
                                    >
                                      All Clinics In {hoverCountry.countryName}
                                      <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform text-blue-500" />
                                    </Link>
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* ── Right Buttons ── */}
        <div className="hidden lg:flex items-center gap-5 ml-auto">
          <div
            className="relative"
            onMouseEnter={() => openMega("lang")}
            onMouseLeave={closeMega}
          >
            <button className={`flex items-center gap-2 text-[13px] font-bold tracking-tight transition-all duration-300 px-4 py-2 rounded-xl ${
              activeMega === "lang" ? "bg-blue-50 text-[#0a2a55]" : "text-slate-600 hover:bg-slate-50"
            }`}>
              <Globe size={15} />
              {displayLanguages.find(l => l.shortCode === currentLang)?.language_name || "Language"}
              <ChevronDown size={12} className={`transition-transform duration-300 ${activeMega === "lang" ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {activeMega === "lang" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={cancelClose}
                  onMouseLeave={closeMega}
                  className="absolute right-0 top-full mt-3 bg-white/95 backdrop-blur-xl rounded-2xl py-2 z-50 ring-1 ring-slate-200 overflow-hidden"
                  style={{ minWidth: 180, boxShadow: "0 15px 40px rgba(0,0,0,0.1)" }}
                >
                  {displayLanguages.map((lang, i) => (
                    <button 
                      key={i} 
                      onClick={() => { changeLanguage(lang.shortCode); closeMega(); }}
                      className={`w-full text-left px-5 py-3 text-[12.5px] font-bold transition-all ${
                        currentLang === lang.shortCode 
                          ? "bg-[#0a2a55] text-white" 
                          : "text-slate-600 hover:bg-blue-50 hover:text-[#0a2a55]"
                      }`}
                    >
                      {lang.language_name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-tr from-[#0a2a55] to-blue-600 text-white text-[13px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:shadow-blue-500/30 transition-all duration-300"
            >
              Get Free Quote
            </Link>
          </motion.div>
        </div>

        {/* ── Mobile Trigger ── */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden p-3 ml-auto rounded-2xl bg-[#0a2a55]/5 text-[#0a2a55] hover:bg-[#0a2a55]/10 transition-colors"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ══════════════ MOBILE MENU ══════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }} 
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-2 max-h-[85vh] overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.mega ? (
                    <div className="mb-2">
                      <button
                        onClick={() => setMobileExpanded((p) => ({ ...p, [item.label]: !p[item.label] }))}
                        className="w-full flex items-center justify-between px-5 py-4 text-[14px] font-black text-slate-900 bg-slate-50 rounded-2xl"
                      >
                        {item.label}
                        <ChevronDown size={18} className={`transition-transform duration-300 ${mobileExpanded[item.label] ? "rotate-180 text-blue-500" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded[item.label] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                            className="pl-4 mt-2 space-y-2"
                          >
                            {countries.map((country) => (
                              <div key={country.countryId}>
                                <button
                                  onClick={() => setMobileExpanded((p) => ({ ...p, [`${item.label}-${country.countryId}`]: !p[`${item.label}-${country.countryId}`] }))}
                                  className={`w-full flex items-center justify-between px-5 py-3.5 text-sm font-bold rounded-xl transition-all ${
                                    mobileExpanded[`${item.label}-${country.countryId}`] ? "bg-blue-50 text-[#0a2a55]" : "text-slate-600"
                                  }`}
                                >
                                  <span className="flex items-center gap-3">
                                    <CountryFlag slug={country.slugName} name={country.countryName} width={20} className="rounded-sm" />
                                    {country.countryName}
                                  </span>
                                  <ChevronDown size={15} className={`transition-transform duration-300 ${mobileExpanded[`${item.label}-${country.countryId}`] ? "rotate-180" : ""}`} />
                                </button>
                                <AnimatePresence>
                                  {mobileExpanded[`${item.label}-${country.countryId}`] && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                                      className="pl-8 py-2 space-y-1"
                                    >
                                      {country.categories?.map((cat) => (
                                        <Link
                                          key={cat.categoryId}
                                          to={item.label === "Doctors" ? `/doctors?country=${country.slugName}&category=${cat.slugName}` : `/hospitals?country=${country.slugName}&category=${cat.slugName}`}
                                          onClick={() => setMobileOpen(false)}
                                          className="block px-4 py-3 text-[13px] font-semibold text-slate-500 hover:text-[#0a2a55] hover:bg-slate-50 rounded-xl"
                                        >
                                          {cat.categoryName}
                                        </Link>
                                      ))}
                                      <Link
                                        to={item.label === "Doctors" ? `/doctors?country=${country.slugName}` : `/hospitals?country=${country.slugName}`}
                                        onClick={() => setMobileOpen(false)}
                                        className="block px-4 py-2 text-xs font-black text-blue-500"
                                      >
                                        View all in {country.countryName} →
                                      </Link>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <NavLink
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) => `block px-5 py-4 text-[14px] font-black rounded-2xl transition-all ${
                        isActive ? "text-[#0a2a55] bg-blue-50" : "text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </NavLink>
                  )}
                </div>
              ))}
              <div className="pt-6">
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center bg-[#0a2a55] text-white py-5 rounded-[2rem] text-sm font-black uppercase tracking-widest shadow-2xl shadow-blue-900/30"
                >
                  Get Free Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
