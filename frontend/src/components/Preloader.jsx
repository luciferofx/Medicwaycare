import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Sparkles, Brain } from 'lucide-react';

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Standard loading delay to ensure smooth transition
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0a192f] overflow-hidden"
        >
          {/* ── CINEMATIC BACKGROUND ── */}
          <div className="absolute inset-0 pointer-events-none">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-400/5 rounded-full blur-[100px] mix-blend-screen" />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center">
            
            {/* Pulsing Clinical Icon Assembly */}
            <div className="relative mb-8 flex items-center justify-center">
               <motion.div
                 animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                 className="absolute w-24 h-24 rounded-full border border-cyan-400/30"
               />
               <motion.div
                 animate={{ scale: [1, 2], opacity: [0.8, 0] }}
                 transition={{ duration: 2, delay: 0.3, repeat: Infinity, ease: "easeOut" }}
                 className="absolute w-24 h-24 rounded-full border border-blue-500/20"
               />
               
               <div className="relative w-24 h-24 bg-gradient-to-tr from-[#0a2a55] to-[#1e3a8a] rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(34,211,238,0.2)] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-30deg] animate-[shine_2s_ease-out_infinite]" />
                  <Brain strokeWidth={1} className="w-12 h-12 text-cyan-400" />
                  <Activity className="absolute bottom-2 right-2 w-5 h-5 text-blue-300 opacity-50" />
               </div>
            </div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                 <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                 <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 tracking-tighter">
                   MedicwayCare
                 </h1>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mx-auto my-4 max-w-[200px]"
              />

              <p className="text-cyan-400/80 text-[10px] font-black tracking-[0.4em] uppercase">
                Compassion In Every Beat
              </p>
            </motion.div>

            {/* Premium Loading Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 w-48 h-1 bg-white/5 rounded-full overflow-hidden border border-white/5"
            >
               <motion.div
                 initial={{ x: "-100%" }}
                 animate={{ x: "0%" }}
                 transition={{ duration: 2, ease: "circOut" }}
                 className="w-full h-full bg-gradient-to-r from-blue-600 to-cyan-400 relative"
               >
                  <div className="absolute top-0 right-0 w-8 h-full bg-white/40 blur-[2px]" />
               </motion.div>
            </motion.div>

            <motion.div
               animate={{ opacity: [0.3, 1, 0.3] }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
               className="mt-4 text-[9px] font-bold text-slate-500 uppercase tracking-widest"
            >
               Initializing Protocol...
            </motion.div>
          </div>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;