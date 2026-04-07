import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  User, 
  Building2, 
  Stethoscope, 
  MessageSquare, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Activity, 
  Pill,
  ArrowRight,
  ShieldCheck,
  Search
} from "lucide-react";
import { useGetHospitalsQuery } from "../rtk/slices/hospitalApiSlice";
import { useGetDoctorsQuery } from "../rtk/slices/doctorApi";
import { useCreateBookingMutation } from "../rtk/slices/bookingApiSlice";
import { Helmet } from "react-helmet";

export default function BookingFlow() {
  const { hospitalId, doctorId } = useParams();
  const navigate = useNavigate();

  // RTK Query hooks
  const { data: hospitalsData, isLoading: hospitalsLoading, error: hospitalsError } = useGetHospitalsQuery({ limit: 10000 });
  const { data: doctorsData, isLoading: doctorsLoading, error: doctorsError } = useGetDoctorsQuery({
    limit: 10000,
    hospital: hospitalId || undefined
  });
  const [createBooking, { isLoading: bookingLoading }] = useCreateBookingMutation();

  const [step, setStep] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [bookingType, setBookingType] = useState(""); // "appointment" or "query"

  // Unified data extraction with robust fallbacks
  const getHospitals = () => {
    if (!hospitalsData?.data) return [];
    if (Array.isArray(hospitalsData.data)) return hospitalsData.data;
    if (Array.isArray(hospitalsData.data.data)) return hospitalsData.data.data;
    return [];
  };

  const getDoctors = () => {
    if (!doctorsData?.data) return [];
    if (Array.isArray(doctorsData.data)) return doctorsData.data;
    if (Array.isArray(doctorsData.data.data)) return doctorsData.data.data;
    return [];
  };

  const hospitals = getHospitals();
  const doctors = getDoctors();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: "",
    doctorId: doctorId || "",
    hospital: "",
    hospitalId: hospitalId || "",
    date: "",
    time: "",
    message: "",
    type: "appointment"
  });

  // Pre-fill patient data if logged in
  useEffect(() => {
    const token = localStorage.getItem('patientToken');
    const patientRaw = localStorage.getItem('patientData');
    if (token && patientRaw) {
      try {
        const patient = JSON.parse(patientRaw);
        setIsLoggedIn(true);
        setPatientData(patient);
        setFormData(prev => ({
          ...prev,
          name: `${patient.firstName} ${patient.lastName}`,
          email: patient.email,
          phone: patient.phone
        }));
      } catch (e) {}
    }
  }, []);

  // Update form if URL params change or data loads
  useEffect(() => {
    if (hospitalId && hospitals.length > 0) {
      const selectedHospital = hospitals.find(h => h._id === hospitalId);
      if (selectedHospital) {
        setFormData(prev => ({ ...prev, hospitalId, hospital: selectedHospital.name }));
      }
    }
  }, [hospitalId, hospitals]);

  useEffect(() => {
    if (doctorId && doctors.length > 0) {
      const selectedDoctor = doctors.find(d => d._id === doctorId);
      if (selectedDoctor) {
        setFormData(prev => ({ ...prev, doctorId, doctor: selectedDoctor.name }));
      }
    }
  }, [doctorId, doctors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleHospitalChange = (e) => {
    const id = e.target.value;
    const selected = hospitals.find(h => h._id === id);
    setFormData(prev => ({
      ...prev,
      hospitalId: id,
      hospital: selected ? selected.name : "",
      doctorId: "", 
      doctor: ""
    }));
  };

  const handleDoctorChange = (e) => {
    const id = e.target.value;
    const selected = doctors.find(d => d._id === id);
    setFormData(prev => ({
      ...prev,
      doctorId: id,
      doctor: selected ? selected.name : ""
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleBookingTypeSelect = (type) => {
    setBookingType(type);
    setFormData(prev => ({ ...prev, type }));
    nextStep();
  };

  const handleConfirmBooking = async () => {
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        doctor: formData.doctorId || undefined,
        hospital: formData.hospitalId,
        date: formData.type === 'appointment' ? formData.date : null,
        time: formData.type === 'appointment' ? formData.time : null,
        message: formData.message,
        type: formData.type,
        patientId: isLoggedIn ? patientData.id : null
      };

      await createBooking(payload).unwrap();
      setStep(4); // Success Step
    } catch (error) {
      alert("Failed to process booking. Please check your connection.");
    }
  };

  if (hospitalsLoading || doctorsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafc]">
        <div className="relative">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full" />
          <Activity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600 w-6 h-6 animate-pulse" />
        </div>
        <p className="mt-6 text-slate-500 font-bold uppercase tracking-widest text-[10px]">Configuring Medical Environment</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Secure Medical Booking | MedicwayCare</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
      </Helmet>

      <div className="min-h-screen bg-[#f8fafc] font-['Plus_Jakarta_Sans',sans-serif] pt-32 pb-24 overflow-hidden relative">
        
        {/* Decorative Background Elements */}
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-40 right-[10%] opacity-[0.03] text-blue-900 pointer-events-none"><Stethoscope size={300} /></motion.div>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute bottom-20 left-[5%] opacity-[0.02] text-blue-900 pointer-events-none"><Activity size={400} /></motion.div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6">
              <ShieldCheck className="w-3.5 h-3.5" /> Secure Diagnostic Portal
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 font-['Lora',serif]">
              {step === 4 ? "Booking Confirmed" : "Schedule Consultation"}
            </h1>
            <p className="text-slate-500 max-w-lg mx-auto">Connect with our specialized psychologists and clinical centers in three simple steps.</p>
          </div>

          {/* Progress Indicator */}
          {step < 4 && (
            <div className="max-w-md mx-auto mb-16 relative">
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 -translate-y-1/2" />
              <div className="relative flex justify-between">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg ${step >= i ? 'bg-[#0a2a55] text-white scale-110 shadow-blue-950/20' : 'bg-white text-slate-300 border border-slate-100'}`}>
                      {step > i ? <CheckCircle2 className="w-6 h-6" /> : <span className="font-bold text-sm">{i}</span>}
                    </div>
                    <span className={`absolute -bottom-8 whitespace-nowrap text-[10px] font-black uppercase tracking-widest ${step >= i ? 'text-blue-900' : 'text-slate-300'}`}>
                      {i === 1 ? "Option" : i === 2 ? "Details" : "Confirm"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Flow Container */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 md:p-14 relative overflow-hidden">
             
             <AnimatePresence mode="wait">
                {/* STEP 1: SELECT TYPE */}
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                     <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold text-slate-800 font-['Lora',serif] mb-2">How can we help you today?</h2>
                        <p className="text-slate-400 text-sm">Choose the service type that fits your current needs.</p>
                     </div>
                     
                     <div className="grid md:grid-cols-2 gap-6">
                        <button 
                          onClick={() => handleBookingTypeSelect("appointment")}
                          className="group relative p-8 bg-slate-50 rounded-[2rem] border-2 border-transparent hover:border-blue-200 hover:bg-white hover:shadow-2xl transition-all duration-500 text-left overflow-hidden"
                        >
                           <div className="relative z-10">
                              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                 <Calendar size={28} />
                              </div>
                              <h3 className="text-xl font-bold text-slate-900 mb-2">Book Appointment</h3>
                              <p className="text-slate-500 text-sm leading-relaxed mb-6">Schedule a direct session at one of our clinical centers.</p>
                              <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-tighter">
                                 Select Mode <ChevronRight className="w-4 h-4" />
                              </div>
                           </div>
                           <Calendar className="absolute -bottom-6 -right-6 text-blue-600/5 group-hover:scale-125 transition-transform" size={140} />
                        </button>

                        <button 
                          onClick={() => handleBookingTypeSelect("query")}
                          className="group relative p-8 bg-slate-50 rounded-[2rem] border-2 border-transparent hover:border-[#0a2a55]/10 hover:bg-white hover:shadow-2xl transition-all duration-500 text-left overflow-hidden"
                        >
                           <div className="relative z-10">
                              <div className="w-14 h-14 bg-slate-200 text-slate-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                 <MessageSquare size={28} />
                              </div>
                              <h3 className="text-xl font-bold text-slate-900 mb-2">General Inquiry</h3>
                              <p className="text-slate-500 text-sm leading-relaxed mb-6">Ask questions about our psychotherapy treatments or clinics.</p>
                              <div className="flex items-center gap-2 text-slate-500 font-black text-[10px] uppercase tracking-tighter">
                                 Select Mode <ChevronRight className="w-4 h-4" />
                              </div>
                           </div>
                           <MessageSquare className="absolute -bottom-6 -right-6 text-slate-900/5 group-hover:scale-125 transition-transform" size={140} />
                        </button>
                     </div>
                  </motion.div>
                )}

                {/* STEP 2: DETAILS */}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                     <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                           <User size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">Review Clinical Information</h2>
                     </div>

                     <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-1 space-y-4">
                           <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Patient Details</div>
                           <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-100 font-medium" />
                           <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-100 font-medium" />
                           <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-100 font-medium" />
                        </div>

                        <div className="md:col-span-2 space-y-4">
                           <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Visit Configuration</div>
                           <div className="grid md:grid-cols-2 gap-4">
                              <select value={formData.hospitalId} onChange={handleHospitalChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-100 font-medium">
                                 <option value="">Select Center</option>
                                 {hospitals.map(h => <option key={h._id} value={h._id}>{h.name}</option>)}
                              </select>
                              <select value={formData.doctorId} onChange={handleDoctorChange} disabled={!formData.hospitalId} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-100 font-medium disabled:opacity-50">
                                 <option value="">Select Professional</option>
                                 {doctors.map(d => <option key={d._id} value={d._id}>Dr. {d.name}</option>)}
                              </select>
                           </div>

                           {bookingType === "appointment" && (
                             <div className="grid grid-cols-2 gap-4">
                                <input type="date" name="date" value={formData.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-100 font-medium" />
                                <input type="time" name="time" value={formData.time} onChange={handleChange} className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-100 font-medium" />
                             </div>
                           )}

                           <textarea name="message" value={formData.message} onChange={handleChange} placeholder={bookingType === "appointment" ? "Any specific symptoms or requests?" : "Please describe your query in detail..."} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-100 font-medium h-32 resize-none" />
                        </div>
                     </div>

                     <div className="flex justify-between pt-10 border-t border-slate-50">
                        <button onClick={prevStep} className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-600 transition-colors">
                           <ChevronLeft size={16} /> Previous
                        </button>
                        <button 
                          onClick={nextStep}
                          disabled={!formData.name || !formData.hospitalId || !formData.doctorId}
                          className="bg-[#0a2a55] text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-900/10 hover:bg-[#1565c0] transition-all disabled:opacity-50 disabled:grayscale"
                        >
                           Preview Summary
                        </button>
                     </div>
                  </motion.div>
                )}

                {/* STEP 3: CONFIRMATION */}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                     <div className="bg-slate-50 rounded-[2rem] p-10 border border-slate-100">
                        <h2 className="text-xl font-black uppercase tracking-[0.2em] text-slate-400 mb-8 text-center underline decoration-blue-200 underline-offset-8">Booking Summary</h2>
                        
                        <div className="grid md:grid-cols-2 gap-10">
                           <div className="space-y-6">
                              <div>
                                 <label className="text-[10px] font-black uppercase tracking-widest text-blue-600/50 block mb-1">Patient</label>
                                 <p className="font-bold text-slate-800 text-lg leading-tight">{formData.name}</p>
                                 <p className="text-slate-500 text-sm">{formData.email} • {formData.phone}</p>
                              </div>
                              <div>
                                 <label className="text-[10px] font-black uppercase tracking-widest text-blue-600/50 block mb-1">Clinical Center</label>
                                 <p className="font-bold text-slate-800">{formData.hospital}</p>
                              </div>
                           </div>
                           <div className="space-y-6">
                              <div>
                                 <label className="text-[10px] font-black uppercase tracking-widest text-blue-600/50 block mb-1">Psychologist</label>
                                 <p className="font-bold text-slate-800">Dr. {formData.doctor}</p>
                              </div>
                              {bookingType === "appointment" && (
                                <div>
                                   <label className="text-[10px] font-black uppercase tracking-widest text-blue-600/50 block mb-1">Appointment Slot</label>
                                   <p className="font-bold text-slate-800">{formData.date} at {formData.time}</p>
                                </div>
                              )}
                           </div>
                        </div>

                        {formData.message && (
                          <div className="mt-8 pt-8 border-t border-slate-200/50">
                             <label className="text-[10px] font-black uppercase tracking-widest text-blue-600/50 block mb-2">Message Payload</label>
                             <p className="text-slate-600 italic leading-relaxed text-sm">"{formData.message}"</p>
                          </div>
                        )}
                     </div>

                     <div className="flex flex-col gap-4">
                        <button 
                          onClick={handleConfirmBooking}
                          disabled={bookingLoading}
                          className="w-full py-5 bg-[#0a2a55] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-blue-900/20 hover:bg-[#1565c0] transition-all flex items-center justify-center gap-3"
                        >
                           {bookingLoading ? <Activity className="animate-spin" /> : <><CheckCircle2 size={16} /> Finalize Booking Request</>}
                        </button>
                        <button onClick={prevStep} className="text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-600 transition-colors">
                           Return to Edit
                        </button>
                     </div>
                  </motion.div>
                )}

                {/* STEP 4: SUCCESS */}
                {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                     <div className="w-24 h-24 bg-green-50 text-green-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-100">
                        <CheckCircle2 size={48} />
                     </div>
                     <h2 className="text-3xl font-extrabold text-slate-900 mb-4 font-['Lora',serif]">Request Transmitted</h2>
                     <p className="text-slate-500 max-w-sm mx-auto mb-10 leading-relaxed">
                        Your clinical consultation request has been successfully recorded. Our specialists will review the details and contact you shortly.
                     </p>
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/" className="bg-[#0a2a55] text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/10">Return Home</Link>
                        <button onClick={() => setStep(1)} className="bg-slate-50 text-slate-600 px-10 py-4 rounded-xl border border-slate-100 font-bold transition-all">New Request</button>
                     </div>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>

          {/* Footer Assistance */}
          <div className="mt-12 text-center text-slate-400 flex flex-col md:flex-row items-center justify-center gap-6">
             <div className="flex items-center gap-2">
                <Building2 size={16} className="text-blue-200" />
                <span className="text-[10px] font-black uppercase tracking-widest">Medical Grade Security</span>
             </div>
             <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-200" />
             <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-blue-200" />
                <span className="text-[10px] font-black uppercase tracking-widest">Data Privacy Compliant</span>
             </div>
             <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-200" />
             <div className="flex items-center gap-2">
                <Activity size={16} className="text-blue-200" />
                <span className="text-[10px] font-black uppercase tracking-widest">24/7 Clinical Support</span>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}