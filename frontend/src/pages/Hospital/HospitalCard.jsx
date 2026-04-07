import React from "react";
import { Link } from "react-router-dom";
import {
  Star,
  MapPin,
  Building2,
  Calendar,
  MessageCircle,
  CheckCircle,
  Stethoscope,
  Bed,
} from "lucide-react";
import { CountryFlag } from "@/helper/countryFlags";
import { motion } from "framer-motion";

export default function HospitalCard({ hospital, onBook }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100/50 flex flex-col h-full"
    >
      {/* Image Section with Shine */}
      <div className="relative h-56 bg-gray-50 overflow-hidden">
        <img
          src={hospital?.photo?.publicURL || hospital?.photo || "/placeholder-hospital.jpg"}
          alt={hospital.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Shine Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <motion.div 
            initial={{ x: "-100%", skewX: -25 }}
            whileHover={{ x: "200%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Verified Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-2 shadow-lg border border-white/50">
          <CheckCircle className="w-5 h-5 text-teal-500" />
        </div>

        {/* Category Badge */}
        {hospital.categoryData?.name && (
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center px-3 py-1.5 bg-teal-600/90 backdrop-blur-md text-white rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-lg border border-white/20">
              <Stethoscope className="w-3.5 h-3.5 mr-1.5" />
              {hospital.categoryData.name}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-teal-600 transition-colors duration-300">
            {hospital.name}
          </h3>

          {/* Type Badge */}
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50/50 p-2 rounded-lg border border-gray-100">
            <Building2 className="w-4 h-4 text-teal-500" />
            <span className="font-semibold">{hospital.hospitalType || "Medical Center"}</span>
            {hospital.numberOfBeds && (
              <>
                <span className="text-gray-300">•</span>
                <Bed className="w-4 h-4 text-teal-500" />
                <span className="font-medium">{hospital.numberOfBeds} Beds</span>
              </>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
          <MapPin className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span className="line-clamp-1 flex items-center gap-1.5 font-medium">
            {hospital.countryData?.name && (
              <CountryFlag
                name={hospital.countryData.name}
                slug={hospital.countryData.slug}
                width={18}
                className="shadow-sm rounded-sm"
              />
            )}
            {hospital.address?.city && hospital.address?.state
              ? `${hospital.address.city}, ${hospital.address.state}`
              : hospital.countryData?.name || "Global Location"}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-50">
          <div className="flex bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100 items-center gap-1.5">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-gray-900 text-sm">
              {hospital.rating || "4.8"}
            </span>
          </div>
          <span className="text-xs font-medium text-gray-400">Trusted by 10k+ Patients</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mt-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onBook(hospital)}
            className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 py-3 rounded-xl font-bold text-sm shadow-xl shadow-teal-600/20 hover:shadow-teal-600/40 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Book Consultation
          </motion.button>

          <div className="grid grid-cols-2 gap-3">
            <Link
              to={`/hospital/${hospital.slug}`}
              className="text-center bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2.5 rounded-xl font-bold transition-all border border-gray-200/50 text-xs flex items-center justify-center"
            >
              View Profile
            </Link>
            <motion.a
              whileHover={{ scale: 1.02 }}
              href="https://wa.me/919354799090"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-3 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 text-xs shadow-lg shadow-green-500/10"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              WhatsApp
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}