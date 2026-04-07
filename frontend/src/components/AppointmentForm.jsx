import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, Stethoscope, Calendar, CheckCircle2, Send } from "lucide-react";

export default function AppointmentForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: "",
    date: "",
  });
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    toast.success("Engagement request Transmitted", {
      style: {
        borderRadius: '1rem',
        background: '#0a2a55',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }
    });
    setSuccess(true);
  }

  const InputField = ({ icon: Icon, label, name, type = "text", required = false }) => (
    <div className="space-y-1.5 group">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 group-focus-within:text-blue-600 transition-colors">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
          <Icon size={18} />
        </div>
        <input
          name={name}
          type={type}
          value={form[name]}
          onChange={handleChange}
          required={required}
          placeholder={`Specify ${label.toLowerCase()}`}
          className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-200 transition-all font-medium text-slate-900 placeholder:text-slate-300 shadow-sm"
        />
      </div>
    </div>
  );

  return (
    <div className="relative font-['Plus_Jakarta_Sans',sans-serif]">
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="text-center py-12 px-6"
          >
            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-100 border border-green-100">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4 font-['Lora',serif]">Transmission Successful</h2>
            <p className="text-slate-500 max-w-sm mx-auto mb-10 leading-relaxed font-medium">
               Your appointment request has been encrypted and sent to our diagnostic coordinators. We will reach out within 2-4 hours.
            </p>
            <button 
              onClick={() => setSuccess(false)}
              className="px-10 py-4 bg-[#0a2a55] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-blue-900/10 hover:bg-[#1565c0] transition-all"
            >
              Back to portal
            </button>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            onSubmit={handleSubmit} 
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <InputField icon={User} label="Patient Name" name="name" required />
              <InputField icon={Mail} label="Email Address" name="email" type="email" required />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <InputField icon={Phone} label="Contact Number" name="phone" required />
              <InputField icon={Stethoscope} label="Specialist Choice" name="doctor" />
            </div>

            <div className="pt-2">
              <InputField icon={Calendar} label="Target Engagement Date" name="date" type="date" />
            </div>

            <div className="pt-8">
              <button className="w-full relative group">
                 <div className="absolute inset-0 bg-[#0a2a55] rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                 <div className="relative bg-[#0a2a55] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 transition-all group-hover:bg-[#1565c0] active:scale-95">
                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
                    Request Engagement Slot
                 </div>
              </button>
            </div>

            <div className="flex items-center justify-center gap-6 mt-10">
               <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200" /> AES-256 Encryption
               </div>
               <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200" /> Verified Clinical Hub
               </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
