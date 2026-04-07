import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaMapMarkerAlt, FaStar, FaShieldAlt, FaCalendarCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CountryFlag } from "@/helper/countryFlags";
import { GraduationCap, Stethoscope, ChevronRight } from "lucide-react";

export default function DoctorCard({ doc }) {
  const [hovered, setHovered] = useState(false);

  const doctorName = doc?.fullName || doc?.name || `${doc?.firstName || ''} ${doc?.lastName || ''}`.trim() || "Doctor";
  const specialty = doc?.specialty || doc?.categoryData?.name || "Medical Specialist";
  const imageUrl = typeof doc?.photo === 'string' ? doc?.photo
    : (typeof doc?.image === 'string' ? doc?.image
    : (doc?.image?.publicURL || doc?.image?.url || "https://res.cloudinary.com/dffu99p56/image/upload/v1741203525/doctors/image/doctor-placeholder.jpg"));
  const city = doc?.city || doc?.location?.city;
  const country = doc?.country || doc?.location?.country;
  const experience = doc?.experience;
  const rating = doc?.rating || 4.8;

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -10, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-[2rem] overflow-hidden bg-white flex flex-col h-full border border-slate-100 shadow-lg hover:shadow-[0_30px_80px_rgba(10,42,85,0.15)] transition-all duration-500"
      style={{
        boxShadow: hovered
          ? "0 0 0 2px rgba(59,130,246,0.3), 0 30px 80px rgba(10,42,85,0.15)"
          : "0 4px 24px rgba(0,0,0,0.07)"
      }}
    >
      {/* ── IMAGE SECTION ── */}
      <div className="relative h-60 overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={doctorName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://res.cloudinary.com/dffu99p56/image/upload/v1741203525/doctors/image/doctor-placeholder.jpg";
          }}
        />

        {/* Dark Gradient  */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2a55]/80 via-[#0a2a55]/10 to-transparent" />

        {/* Shine Sweep */}
        <motion.div
          initial={{ x: "-100%", skewX: -15 }}
          animate={hovered ? { x: "250%" } : { x: "-100%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full pointer-events-none"
        />

        {/* Experience Badge */}
        {experience !== undefined && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm shadow-lg px-3 py-1.5 rounded-xl text-[11px] font-black text-[#0a2a55] border border-blue-100 flex items-center gap-1.5">
            <GraduationCap size={12} className="text-blue-500" />
            {experience}+ Yrs
          </div>
        )}

        {/* VERIFIED BADGE — shimmering */}
        <div className="absolute top-4 right-4 overflow-hidden rounded-xl">
          <div className="relative bg-emerald-500 text-white text-[9px] font-black uppercase tracking-wider px-3 py-1.5 flex items-center gap-1.5">
            <FaShieldAlt size={10} />
            Verified Expert
            {/* shimmer sweep that repeats */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-15deg]"
            />
          </div>
        </div>

        {/* Specialty pill at the bottom */}
        {specialty && (
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-[10px] uppercase tracking-wider font-black px-3 py-1.5 rounded-xl bg-blue-600/90 backdrop-blur-sm text-white shadow-lg inline-block">
              {specialty}
            </span>
          </div>
        )}
      </div>

      {/* ── INFO SECTION ── */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              size={12}
              className={i < Math.round(rating) ? "text-amber-400" : "text-slate-200"}
            />
          ))}
          <span className="text-[11px] font-bold text-slate-400 ml-1">({rating})</span>
        </div>

        <h3 className="text-xl font-black text-[#0a2a55] mb-1 tracking-tight group-hover:text-blue-600 transition-colors duration-300">
          Dr. {doctorName}
        </h3>

        {/* Location */}
        {(city || country) && (
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 w-fit">
            <FaMapMarkerAlt className="text-blue-400 flex-shrink-0" size={11} />
            <span className="flex items-center gap-1.5 font-semibold">
              {country && <CountryFlag name={country} width={14} className="shadow-xs rounded-sm opacity-90" />}
              {city}{country && `, ${country}`}
            </span>
          </div>
        )}

        <p className="text-sm text-slate-400 leading-relaxed mb-5 line-clamp-2 font-medium flex-1">
          Leading specialist in {specialty || "medical care"} providing personalized treatment and expert consultation.
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
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-400 mb-2">
                  Quick Schedule
                </p>
                <div className="flex items-center gap-2 text-[11px] text-[#0a2a55] font-bold">
                  <FaCalendarCheck className="text-emerald-500" size={12} />
                  Next Available: <span className="text-emerald-600">Today</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── ACTIONS ── */}
        <div className="flex gap-3 mt-auto pt-4 border-t border-slate-50">
          <Link
            to={doc?.slug ? `/doctor/${doc.slug}` : `/doctors/${doc?._id}`}
            className="flex-1 text-center py-3 text-[11px] font-black text-slate-500 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all duration-300 border border-slate-200/50 uppercase tracking-widest"
          >
            View Profile
          </Link>

          <motion.div className="flex-[1.5]" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to={`/book/${doc?.hospital?._id || ''}/${doc?._id || ''}`}
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
