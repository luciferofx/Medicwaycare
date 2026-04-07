import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, CheckCircle2, ShieldCheck, LockKeyhole } from 'lucide-react';
import { useCreateContactMutation } from '../rtk/slices/contactApiSlice';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } },
};

const checkmarkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const ContactForm = ({ type = 'contact', serviceType, compact = false }) => {
  const [createContact, { isLoading }] = useCreateContactMutation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email'
  });
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error('Please fill all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      const contactData = {
        ...formData,
        type,
        serviceType: serviceType || (type === 'quote' ? 'general-inquiry' : undefined)
      };

      await createContact(contactData).unwrap();
      toast.success(type === 'quote' ? 'Protocol Initiated successfully!' : 'Message verified & sent successfully!');
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', preferredContact: 'email' });
      setTimeout(() => setSubmitStatus(null), 6000);
    } catch (error) {
      console.error('Contact submission error:', error);
      toast.error('Transmission failed. Please try again.');
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const inputStyles = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-semibold text-[#0a2a55] placeholder:text-slate-400 placeholder:font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all duration-300 outline-none";
  const labelStyles = "block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1";

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-[2rem] shadow-[0_30px_100px_rgba(10,42,85,0.08)] border border-slate-100 p-8 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
        
        <div className="flex items-center gap-3 mb-6">
           <div className="w-10 h-10 bg-blue-50 flex items-center justify-center rounded-xl">
              <ShieldCheck className="text-blue-500 w-5 h-5" />
           </div>
           <div>
             <h3 className="text-xl font-black text-[#0a2a55] tracking-tight">
               {type === 'quote' ? 'Secure Inquiry' : 'Patient Portal'}
             </h3>
             <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">End-to-End Encrypted</p>
           </div>
        </div>

        <AnimatePresence mode="wait">
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-8 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl flex flex-col items-center justify-center text-center gap-3"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <motion.svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <motion.path variants={checkmarkVariants} initial="hidden" animate="visible" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </motion.svg>
              </div>
              <div>
                <span className="block text-emerald-900 font-black text-lg tracking-tight">Protocol Verified</span>
                <span className="text-emerald-700/80 text-xs font-bold uppercase tracking-widest mt-1 block">Request Transmitted Safely</span>
              </div>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-8 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center"
            >
              <span className="text-rose-800 font-bold text-sm">Transmission Failed. Please retry.</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <motion.div variants={itemVariants}>
               <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Legal Name" className={inputStyles} required />
            </motion.div>
            <motion.div variants={itemVariants}>
               <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Secure Email" className={inputStyles} required />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <motion.div variants={itemVariants}>
               <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Contact Number" className={inputStyles} required />
            </motion.div>
            <motion.div variants={itemVariants} className="relative group">
               <select name="preferredContact" value={formData.preferredContact} onChange={handleInputChange} className={`${inputStyles} appearance-none`}>
                 <option value="email">Route via Email</option>
                 <option value="phone">Route via Phone</option>
                 <option value="whatsapp">Route via WhatsApp</option>
               </select>
               <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
               </div>
            </motion.div>
          </div>

          {type === 'quote' && (
            <motion.div variants={itemVariants}>
               <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Required Procedure / Specification" className={inputStyles} />
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
             <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder={type === 'quote' ? 'Provide clinical details...' : 'Describe your request securely...'} rows="3" className={`${inputStyles} resize-none`} required />
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" disabled={isLoading}
            className="w-full bg-[#0a2a55] text-white py-4 px-6 rounded-xl hover:shadow-[0_15px_40px_rgba(10,42,85,0.3)] hover:bg-[#081f3e] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-[11px]"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {type === 'quote' ? 'Transmit Quote Request' : 'Transmit Message'}
              </>
            )}
          </motion.button>
        </motion.form>
      </motion.div>
    );
  }

  // Full-size version
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(10,42,85,0.1)] border border-slate-100 overflow-hidden"
    >
      {/* ── CINEMATIC SECURE HEADER ── */}
      <div className="bg-[#0a2a55] px-10 py-12 text-white relative overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Radar/Pulse effect */}
        <motion.div
           animate={{ scale: [1, 2], opacity: [0.3, 0] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
           className="absolute w-[400px] h-[400px] rounded-full border border-blue-400/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />
        <motion.div
           animate={{ scale: [1, 3], opacity: [0.1, 0] }}
           transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "easeOut" }}
           className="absolute w-[400px] h-[400px] rounded-full border border-blue-400/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />

        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-inner relative">
             <ShieldCheck className="w-8 h-8 text-cyan-400" />
             <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center border-2 border-[#0a2a55]">
                <LockKeyhole className="w-3 h-3 text-[#0a2a55]" />
             </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
            {type === 'quote' ? 'Secure Clinical Request' : 'Patient Support Portal'}
          </h2>
          <p className="text-blue-200/80 text-sm font-medium max-w-lg leading-relaxed">
            {type === 'quote'
              ? 'Submit your medical details securely. Our clinical team maintains strict privacy protocols.'
              : 'Our specialized coordinators are monitoring the channel. Transmission is encrypted.'
            }
          </p>
        </div>
      </div>

      <div className="p-8 sm:p-12">
        <AnimatePresence mode="wait">
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-10"
            >
              <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-5">
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
                  className="bg-white rounded-2xl p-3 shadow-lg shadow-emerald-500/20 flex-shrink-0"
                >
                  <motion.svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <motion.path variants={checkmarkVariants} initial="hidden" animate="visible" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </motion.svg>
                </motion.div>
                <div>
                  <h3 className="text-emerald-900 font-black text-xl tracking-tight mb-1">Protocol Verified</h3>
                  <p className="text-emerald-700/80 font-medium">Your request has been safely transmitted to our medical board. Expect contact within 24 hours.</p>
                </div>
              </div>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-10"
            >
              <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-between">
                <div>
                  <h3 className="text-rose-900 font-black text-lg">Transmission Failed</h3>
                  <p className="text-rose-700/80 font-medium mt-1">Connection anomaly detected. Please try again or use direct emergency lines.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <label className={labelStyles}>Patient Full Name <span className="text-rose-500">*</span></label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={inputStyles} placeholder="Legal identity" required />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className={labelStyles}>Secure Email <span className="text-rose-500">*</span></label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={inputStyles} placeholder="address@domain.com" required />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <label className={labelStyles}>Direct Contact <span className="text-rose-500">*</span></label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={inputStyles} placeholder="+XX (XXX) XXX-XXXX" required />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className={labelStyles}>Routing Preference</label>
              <div className="relative group">
                <select name="preferredContact" value={formData.preferredContact} onChange={handleInputChange} className={`${inputStyles} appearance-none`}>
                  <option value="email">Encrypted Email</option>
                  <option value="phone">Direct Call</option>
                  <option value="whatsapp">Secure WhatsApp Channel</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300 group-hover:text-blue-500 transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                </div>
              </div>
            </motion.div>
          </div>

          {type === 'quote' && (
            <motion.div variants={itemVariants}>
              <label className={labelStyles}>Clinical Focus Identifier</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} className={inputStyles} placeholder="e.g. Cognitive Behavioral Therapy, Neuropsychological Assessment" />
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <label className={labelStyles}>Clinical Request Details <span className="text-rose-500">*</span></label>
            <textarea
              name="message" value={formData.message} onChange={handleInputChange} rows="4"
              className={`${inputStyles} resize-none`}
              placeholder={type === 'quote' ? 'Provide context for the clinical board...' : 'Enter your message...'}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants} className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative group overflow-hidden bg-[#0a2a55] text-white py-4 px-8 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:shadow-[0_20px_50px_rgba(10,42,85,0.3)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-15deg] group-hover:animate-[shine_1.5s_ease-out]" />
              
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/50 border-t-white"></div>
                  Initializing Protocol...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 drop-shadow-sm" />
                  {type === 'quote' ? 'Validate & Transmit Request' : 'Transmit Secure Message'}
                </>
              )}
            </button>
          </motion.div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-slate-100"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
             <div className="flex items-center gap-6 text-[11px] font-black uppercase tracking-widest text-slate-400">
               <div className="flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4 text-emerald-500" />
                 HIPAA Compliant
               </div>
               <div className="flex items-center gap-2">
                 <LockKeyhole className="w-4 h-4 text-blue-500" />
                 256-bit Encryption
               </div>
             </div>
             
             <div className="flex items-center gap-2 text-xs font-bold bg-blue-50 text-blue-600 px-4 py-2 rounded-xl border border-blue-100">
               <Phone className="w-3 h-3" />
               Direct Line: +91 98110 00723
             </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactForm;
