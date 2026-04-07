import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  MessageSquare,
  Stethoscope,
  Scale,
  Plane,
  HeartPulse,
  Heart,
  Activity,
  ShieldCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import './ProcessFlow.css';

const workflowSteps = [
  {
    step: "Step 01",
    title: "Initial Inquiry",
    desc: "Submit your medical history and specific requirements through our secure portal for expert evaluation.",
    icon: <MessageSquare className="w-6 h-6" />,
    color: "from-blue-600 to-[#0a2a55]",
    animation: "bounce"
  },
  {
    step: "Step 02",
    title: "Expert Evaluation",
    desc: "Our medical board reviews your case to provide tailored treatment options from top-tier institutions.",
    icon: <Stethoscope className="w-6 h-6" />,
    color: "from-blue-500 to-indigo-800",
    animation: "pulse"
  },
  {
    step: "Step 03",
    title: "Comparative Analysis",
    desc: "Receive comprehensive comparisons of costs, facilities, and specialist ratings to make an informed decision.",
    icon: <Scale className="w-6 h-6" />,
    color: "from-blue-700 to-indigo-900",
    animation: "wiggle"
  },
  {
    step: "Step 04",
    title: "Clinical Journey",
    desc: "End-to-end assistance with logistics, from visa processing to luxury recovery arrangements.",
    icon: <Plane className="w-6 h-6" />,
    color: "from-[#1565c0] to-blue-900",
    animation: "glide"
  },
  {
    step: "Step 05",
    title: "Aftercare Protocol",
    desc: "Rigorous post-treatment monitoring and telehealth follow-ups ensuring a seamless recovery path.",
    icon: <Heart className="w-6 h-6 text-white" />,
    color: "from-rose-500 to-rose-700",
    animation: "heartbeat"
  }
];

export default function ProcessFlow() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate the position of the "Pulse Point" along the line
  const pulseY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const iconVariants = {
    bounce: {
      animate: { y: [0, -4, 0] },
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    pulse: {
      animate: { scale: [1, 1.1, 1] },
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    },
    heartbeat: {
      animate: { scale: [1, 1.15, 1] },
      transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
    },
    glide: {
      animate: { x: [-2, 4, -2], rotate: [-5, 8, -5], y: [-1, 2, -1] },
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    },
    wiggle: {
      animate: { rotate: [-3, 3, -3] },
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 bg-slate-50 overflow-hidden">
      {/* ── BACKGROUND ACCENTS ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] border-[40px] border-[#0a2a55] rounded-full"
        />
        <div className="absolute top-1/4 left-10"><Activity size={120} /></div>
        <div className="absolute bottom-1/4 right-10"><ShieldCheck size={120} /></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-4xl mx-auto mb-24 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-blue-50 px-5 py-2 rounded-full text-[#0a2a55] text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-blue-100 shadow-sm"
          >
            <Sparkles size={14} className="text-blue-500 animate-pulse" />
            Operational Framework
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0a2a55] mb-10 leading-tight tracking-tighter"
          >
            Our Seamless <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Clinical Path</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 font-semibold leading-relaxed max-w-2xl mx-auto"
          >
            A rigorous, patient-centric workflow engineered to ensure surgical precision at every stage of your recovery journey.
          </motion.p>
        </div>

        {/* ── WORKFLOW TIMELINE ── */}
        <div className="max-w-5xl mx-auto relative">

          {/* Animated Connective Path with Glow */}
          <div className="absolute left-8 md:left-1/2 md:-ml-[1.5px] top-0 bottom-0 w-[4px] bg-slate-200 overflow-hidden rounded-full shadow-inner">
            <motion.div
              style={{ scaleY: pathLength }}
              className="w-full h-full bg-gradient-to-b from-[#0a2a55] via-blue-500 to-cyan-400 origin-top shadow-[0_0_15px_rgba(59,130,246,0.6)]"
            />
            {/* The Floating Pulse Point */}
            <motion.div
              style={{ top: pulseY }}
              className="absolute left-1/2 -translate-x-1/2 w-4 h-12 bg-white blur-[4px] opacity-60 z-30"
            />
          </div>

          <div className="space-y-20 md:space-y-32">
            {workflowSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Visual Connector Dot */}
                <div className="absolute left-[30px] md:left-1/2 md:-ml-5 top-1/2 -translate-y-1/2 z-20">
                  <motion.div
                    whileInView={{ scale: [0, 1.3, 1], opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="w-10 h-10 rounded-full bg-white border-[4px] border-[#0a2a55] shadow-2xl flex items-center justify-center p-1"
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0a2a55] to-blue-500 shadow-inner" />
                  </motion.div>
                </div>

                {/* Content Side */}
                <div className={`w-full md:w-[45%] ${index % 2 === 0 ? 'pl-24 md:pl-0 md:pr-16 text-left md:text-right' : 'pl-24 md:pl-16 text-left'}`}>
                  <motion.div
                    whileHover={{
                      scale: 1.03,
                      y: -5,
                      boxShadow: "0 40px 80px rgba(10, 42, 85, 0.08)"
                    }}
                    className="bg-white/90 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-xl group transition-all duration-500 hover:border-blue-200 relative"
                  >
                    {/* Step Badge */}
                    <div className={`absolute -top-4 ${index % 2 === 0 ? 'md:right-10' : 'left-10'} bg-[#0a2a55] text-white text-[9px] font-black tracking-widest px-4 py-1.5 rounded-full`}>
                      {item.step}
                    </div>

                    <div className={`mb-8 flex items-center gap-6 ${index % 2 === 0 ? 'md:justify-end' : 'justify-start'}`}>
                      <div className={`w-16 h-16 rounded-[1.75rem] bg-gradient-to-br ${item.color} flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        <motion.div
                          variants={iconVariants}
                          animate={item.animation ? "animate" : undefined}
                          initial={false}
                          custom={item.animation}
                        >
                          {item.icon}
                        </motion.div>
                      </div>
                      <h3 className="text-2xl font-black text-[#0a2a55] tracking-tight group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-slate-500 text-base leading-relaxed font-semibold">
                      {item.desc}
                    </p>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className={`mt-10 flex items-center gap-3 text-[#0a2a55] text-xs font-black uppercase tracking-widest cursor-pointer group/link ${index % 2 === 0 ? 'md:justify-end' : 'justify-start'}`}
                    >
                      Protocol Mastery <ArrowRight size={16} className="text-blue-500 group-hover/link:translate-x-2 transition-transform" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Counter Side (Desktop Only) */}
                <div className="hidden md:flex w-[45%] items-center justify-center pointer-events-none">
                  <motion.div
                    whileHover={{ opacity: 0.15 }}
                    className={`text-[180px] font-black leading-none opacity-[0.03] transition-all duration-1000 text-[#0a2a55] ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}
                  >
                    {index + 1}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── FINAL CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 text-center"
        >
          <div className="inline-block p-1 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(10,42,85,0.1)] border border-slate-100">
            <div className="bg-[#0a2a55] text-white px-16 py-8 rounded-[2rem] flex flex-col sm:flex-row items-center gap-12 group cursor-pointer hover:bg-blue-600 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none" />
              <div className="text-left relative z-10">
                <p className="text-[11px] font-black tracking-[0.25em] text-blue-300 uppercase mb-3">System Ready?</p>
                <p className="text-2xl font-black tracking-tight">Initiate Your Clinical Journey</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#0a2a55] group-hover:scale-110 transition-all duration-500 relative z-10">
                <ArrowRight size={32} />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}