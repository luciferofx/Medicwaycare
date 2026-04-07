import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaStar } from "react-icons/fa";
import { Sparkles, MapPin, Activity, Brain, CheckCircle2 } from "lucide-react";

const STATIC_OPINIONS = [
  {
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Aarav Sharma",
    text: "The clinical therapy path at MedicwayCare was a sanctuary for my mental health. Navigating severe anxiety in the corporate world of Delhi was tough, but their CBT specialists provided the evidence-based tools I needed for a sustainable recovery.",
    location: "New Delhi, India",
    treatment: "Anxiety & Corporate Wellness",
  },
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
    name: "Ananya Iyer",
    text: "I was skeptical about trauma recovery, but the compassionate approach of the team in Chennai changed my life. The personalized mindfulness protocols helped me reconnect with myself in ways I never thought possible.",
    location: "Chennai, India",
    treatment: "Post-Traumatic Recovery",
  },
  {
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    name: "Dr. Sameer Varma",
    text: "As a medical professional, I value clinical precision. Their approach to depression management combines traditional therapy with modern neuro-wellness techniques. Truly a benchmark for mental healthcare in Mumbai.",
    location: "Mumbai, India",
    treatment: "Clinical Depression Path",
  },
  {
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Neha Gupta",
    text: "The clinical support team guided me through every step of cognitive behavioral therapy. My panic attacks have significantly reduced, and I feel like I'm finally in control of my life again.",
    location: "Bengaluru, India",
    treatment: "Cognitive Behavioral Therapy",
  },
  {
    image: "https://randomuser.me/api/portraits/men/68.jpg",
    name: "Rahul Verma",
    text: "Finding a compassionate clinical psychologist in Pune was challenging. MedicwayCare connected me with a specialist who understood my specific needs without judgment.",
    location: "Pune, India",
    treatment: "Stress & Anger Management",
  }
];

const sliderVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
    filter: "blur(10px)",
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.5 },
      scale: { duration: 0.5 },
      filter: { duration: 0.5 }
    }
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    scale: 0.95,
    filter: "blur(10px)",
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.4 },
      filter: { duration: 0.4 }
    }
  })
};

const PatientOpinions = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const particleY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const opinionIndex = Math.abs(page % STATIC_OPINIONS.length);
  const currentOpinion = STATIC_OPINIONS[opinionIndex];

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 10000);
    return () => clearInterval(interval);
  }, [page]);

  return (
    <section ref={containerRef} className="relative py-32 bg-[#0a192f] overflow-hidden">
      {/* ── CINEMATIC BACKGROUND ── */}
      <motion.div style={{ y: particleY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-[10%] text-blue-500/10"><Activity size={200} /></div>
        <div className="absolute bottom-20 right-[15%] text-cyan-500/5 rotate-12"><Brain size={300} /></div>
        <div className="absolute top-[20%] right-[25%] w-2 h-2 bg-blue-400/40 rounded-full shadow-[0_0_15px_rgba(96,165,250,1)] animate-ping" />
        <div className="absolute bottom-[25%] left-[20%] w-3 h-3 bg-cyan-400/30 rounded-full shadow-[0_0_20px_rgba(34,211,238,1)] animate-pulse" />
      </motion.div>

      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#0a2a55]/50 border border-blue-400/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6 backdrop-blur-xl"
          >
            <Sparkles size={14} className="animate-pulse" />
            Voices of Resilience
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight tracking-tighter mb-6"
          >
            Clinical Journeys <br />
            To <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Recovery</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-blue-100/40 max-w-2xl mx-auto font-medium"
          >
            Real accounts from individuals who reclaimed their mental well-being with our network of specialized clinicians.
          </motion.p>
        </div>

        {/* ── CINEMATIC SLIDER ── */}
        <div className="relative h-[650px] sm:h-[500px] lg:h-[450px] w-full max-w-5xl mx-auto flex items-center justify-center perspective-[1000px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={sliderVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full h-full bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col md:flex-row group"
            >
              {/* Image Section */}
              <div className="w-full md:w-5/12 h-64 md:h-full relative overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a192f] via-transparent to-transparent z-10 opacity-60" />
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 10, ease: "easeOut" }}
                  src={currentOpinion.image}
                  alt={currentOpinion.name}
                  className="w-full h-full object-cover filter grayscale-[50%] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-6 left-6 z-20 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" size={16} />
                  ))}
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative">
                {/* Large Background Quote mark */}
                <FaQuoteLeft className="absolute top-8 right-8 text-white/5 text-8xl pointer-events-none" />
                
                <h3 className="text-2xl md:text-3xl font-['Lora',serif] font-medium text-white italic leading-relaxed mb-10 tracking-wide">
                  "{currentOpinion.text}"
                </h3>

                <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                       {currentOpinion.name}
                       <CheckCircle2 size={16} className="text-cyan-400" />
                    </h4>
                    <p className="text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-1">
                      {currentOpinion.treatment}
                    </p>
                    <p className="text-slate-400 text-sm flex items-center gap-1">
                      <MapPin size={14} /> {currentOpinion.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── CONTROLS ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-16 relative z-20">
           {/* Dots */}
           <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-4 rounded-full border border-white/10">
             {STATIC_OPINIONS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                     setPage([i, i > opinionIndex ? 1 : -1]);
                  }}
                  className={`h-1.5 transition-all duration-500 rounded-full ${
                    i === opinionIndex 
                      ? "w-8 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" 
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
             ))}
           </div>
           
           {/* Arrows */}
           <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(-1)}
                className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md transition-all"
              >
                <FaChevronLeft />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(1)}
                className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md transition-all"
              >
                <FaChevronRight />
              </motion.button>
           </div>
        </div>
      </div>
    </section>
  );
};

export default PatientOpinions;
