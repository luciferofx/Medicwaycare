import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaMapMarkerAlt, FaStar, FaShieldAlt, FaCalendarCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CountryFlag } from "../helper/countryFlags";
import { Building2, ChevronRight, Stethoscope } from "lucide-react";

export default function HospitalCard({ hospital }) {
  const [hovered, setHovered] = useState(false);

  const imageUrl = hospital.photo?.publicURL
    || hospital.photo
    || hospital.image?.publicURL
    || hospital.image
    || "https://res.cloudinary.com/dffu99p56/image/upload/v1741203525/hospitals/image/hospital-placeholder.jpg";

  const rating = hospital.rating || 4.5;

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -10, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-[2rem] overflow-hidden bg-white flex flex-col h-full border border-slate-100 shadow-lg transition-all duration-500"
      style={{
        boxShadow: hovered
          ? "0 0 0 2px rgba(6,182,212,0.3), 0 30px 80px rgba(10,42,85,0.15)"
          : "0 4px 24px rgba(0,0,0,0.07)"
      }}
    >
      {/* ── IMAGE ── */}
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={hospital.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://res.cloudinary.com/dffu99p56/image/upload/v1741203525/hospitals/image/hospital-placeholder.jpg";
          }}
        />

        {/* Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2a55]/80 via-[#0a2a55]/10 to-transparent" />

        {/* Shine Sweep */}
        <motion.div
          initial={{ x: "-100%", skewX: -15 }}
          animate={hovered ? { x: "250%" } : { x: "-100%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full pointer-events-none"
        />

        {/* Rating Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm shadow-lg px-3 py-1.5 rounded-xl text-[11px] font-black text-[#0a2a55] border border-amber-100 flex items-center gap-1.5">
          <FaStar className="text-amber-400" size={11} />
          {rating}
        </div>

        {/* ACCREDITED BADGE — shimmering */}
        <div className="absolute top-4 right-4 overflow-hidden rounded-xl">
          <div className="relative bg-blue-600 text-white text-[9px] font-black uppercase tracking-wider px-3 py-1.5 flex items-center gap-1.5">
            <FaShieldAlt size={10} />
            Accredited
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-15deg]"
            />
          </div>
        </div>

        {/* Specialty pills */}
        <div className="absolute bottom-4 left-3 right-3">
          <div className="flex flex-wrap gap-1.5">
            {hospital.specialties && Array.isArray(hospital.specialties) ? (
              <>
                {hospital.specialties.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="text-[9px] font-black px-2 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-[#0a2a55] border border-blue-100 uppercase tracking-wide"
                  >
                    {s}
                  </span>
                ))}
                {hospital.specialties.length > 3 && (
                  <span className="text-[9px] px-2 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-slate-600 border border-slate-100 font-bold">
                    +{hospital.specialties.length - 3}
                  </span>
                )}
              </>
            ) : (
              <span className="text-[9px] font-black px-2 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-[#0a2a55] uppercase tracking-wide">
                General Healthcare
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── INFO SECTION ── */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-black text-[#0a2a55] leading-tight group-hover:text-blue-600 transition-colors duration-300 tracking-tight">
              {hospital.name}
            </h3>
          </div>
          <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 ml-3 border border-blue-100">
            <Building2 size={18} className="text-blue-500" />
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 w-fit">
          <FaMapMarkerAlt className="text-blue-400" size={11} />
          <span className="flex items-center gap-1.5 font-semibold">
            {hospital.country && <CountryFlag name={hospital.country} width={14} className="shadow-sm flex-shrink-0 rounded-sm" />}
            {hospital.city}{hospital.country && `, ${hospital.country}`}
          </span>
        </div>

        {/* Blurb */}
        <p className="text-sm text-slate-400 mb-5 flex-1 line-clamp-2 leading-relaxed font-medium">
          {hospital.blurb || `World-class healthcare facility offering specialized medical expertise and compassionate patient care.`}
        </p>

        {/* ── QUICK BOOK HOVER PANEL ── */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 5, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Stethoscope size={14} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-400">
                    International Patients Welcome
                  </p>
                  <p className="text-[11px] font-bold text-[#0a2a55] flex items-center gap-1.5 mt-0.5">
                    <FaCalendarCheck className="text-emerald-500" size={11} />
                    Free Initial Consultation
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── ACTION BUTTONS ── */}
        <div className="flex gap-3 mt-auto pt-4 border-t border-slate-50">
          <Link
            to={`/hospital/${hospital.slug || hospital._id}`}
            className="flex-1 text-center py-3 text-[11px] font-black text-slate-500 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all duration-300 border border-slate-200/50 uppercase tracking-widest"
          >
            View Facility
          </Link>

          <motion.div className="flex-[1.5]" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to={`/book/${hospital._id}`}
              className="flex w-full items-center justify-center gap-2 py-3 text-[11px] font-black bg-[#0a2a55] text-white rounded-2xl shadow-xl shadow-blue-900/20 hover:shadow-blue-500/30 hover:bg-blue-700 transition-all duration-300 uppercase tracking-widest"
            >
              Book Now <ChevronRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}