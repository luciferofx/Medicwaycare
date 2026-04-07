import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { Activity, Users, Building, CalendarCheck } from "lucide-react";

const statsVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

export default function Stats() {
  const stats = [
    { 
      label: "Expert Doctors", 
      end: 320, 
      suffix: "+", 
      icon: <Users className="w-5 h-5 text-cyan-400" />
    },
    { 
      label: "Accredited Hospitals", 
      end: 110, 
      suffix: "+", 
      icon: <Building className="w-5 h-5 text-cyan-400" />
    },
    { 
      label: "Successful Recoveries", 
      end: 15400, 
      suffix: "+", 
      icon: <CalendarCheck className="w-5 h-5 text-cyan-400" />
    },
  ];

  return (
    <section className="relative py-20 bg-[#0a2a55] overflow-hidden">
      {/* ── CINEMATIC BACKGROUND ── */}
      {/* Heartbeat SVG Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <svg width="100%" height="200" viewBox="0 0 1000 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <motion.path
            d="M0 100 L100 100 L120 40 L140 160 L160 100 L300 100 L320 20 L340 180 L360 100 L500 100 L520 60 L540 140 L560 100 L1000 100"
            stroke="#00f5ff"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 1], 
              opacity: [0, 1, 0],
              x: [0, 100]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "linear",
              times: [0, 0.8, 1] 
            }}
          />
        </svg>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-400/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none" />

      {/* ── SECTION CONTENT ── */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={statsVariants}
              className="relative group text-center"
            >
              {/* Metric Card */}
              <div className="flex flex-col items-center">
                {/* Icon Container */}
                <div className="mb-4 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-blue-500/20 group-hover:border-blue-400/30 transition-all duration-500">
                  {s.icon}
                </div>

                {/* Number Display */}
                <div className="flex items-baseline justify-center gap-1">
                  <div className="text-5xl md:text-6xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(0,245,255,0.4)]">
                    <CountUp 
                      end={s.end} 
                      duration={3} 
                      separator="," 
                      enableScrollSpy={true}
                      scrollSpyOnce={true}
                    />
                  </div>
                  <span className="text-2xl md:text-3xl font-bold text-cyan-400">{s.suffix}</span>
                </div>

                {/* Label */}
                <p className="mt-4 text-blue-100/40 text-[10px] font-black uppercase tracking-[0.4em] group-hover:text-cyan-400/60 transition-colors">
                  {s.label}
                </p>

                {/* Divider Line (Only desktop, not after last) */}
                {i < 2 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes heartbeat {
          0% { transform: scale(1); opacity: 0.1; }
          15% { transform: scale(1.1); opacity: 0.3; }
          30% { transform: scale(1); opacity: 0.1; }
        }
        .animate-heartbeat {
          animation: heartbeat 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
