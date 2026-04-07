import React from "react";
import { Helmet } from 'react-helmet';
import AppointmentForm from "../components/AppointmentForm";
import { motion } from "framer-motion";
import { Stethoscope, ShieldCheck, Activity, Calendar } from "lucide-react";

export default function Appointment() {
  return (
    <>
      <Helmet>
        <title>Book an Appointment | Secure Diagnostic Portal | MedicwayCare</title>
        <meta name="description" content="Schedule an appointment with expert doctors and healthcare professionals. Book your consultation easily on MedicwayCare." />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
      </Helmet>

      <div className="min-h-screen bg-[#f8fafc] font-['Plus_Jakarta_Sans',sans-serif] pt-32 pb-24 overflow-hidden relative">
        
        {/* Background Elements */}
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-40 right-[10%] opacity-[0.03] text-blue-900 pointer-events-none"><Stethoscope size={300} /></motion.div>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute bottom-20 left-[5%] opacity-[0.02] text-blue-900 pointer-events-none"><Activity size={400} /></motion.div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6">
              <ShieldCheck className="w-3.5 h-3.5" /> Clinical Engagement Portal
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 font-['Lora',serif]">
              Quick Appointment request
            </h1>
            <p className="text-slate-500 max-w-lg mx-auto">Provide your details below to schedule a direct consultation with our diagnostic professionals.</p>
          </div>

          {/* Form Container */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 md:p-14 relative overflow-hidden"
          >
             <div className="absolute top-0 left-0 w-2 h-full bg-[#0a2a55]" />
             <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                   <Calendar size={24} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Appointment Configuration</h2>
             </div>
             
             <AppointmentForm />

             {/* Footer Assistance */}
             <div className="mt-12 pt-8 border-t border-slate-50 text-center">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                   Data transmitted via secure clinical channel
                </p>
             </div>
          </motion.div>

          <div className="mt-12 text-center text-slate-400 flex flex-col md:flex-row items-center justify-center gap-6">
             <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-blue-200" />
                <span className="text-[10px] font-black uppercase tracking-widest">HIPAA Compliant Protocol</span>
             </div>
             <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-200" />
             <div className="flex items-center gap-2">
                <Activity size={16} className="text-blue-200" />
                <span className="text-[10px] font-black uppercase tracking-widest">Real-time Review</span>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
