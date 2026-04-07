import React, { useEffect, useState } from 'react';
import { 
  FileText, 
  MessageCircle, 
  CreditCard, 
  DollarSign, 
  Users, 
  Building, 
  Clipboard, 
  UserCheck, 
  Truck, 
  Calendar,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Headphones
} from 'lucide-react';
import { motion } from 'framer-motion';
import EditableText from '@/components/EditableText';
import url_prefix from '@/data/variable';
import { FaWhatsapp } from 'react-icons/fa';

// Animation variants for the services grid
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

const ServiceCard = ({ icon: Icon, title, description, isFeatured = false, itemKey }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(10, 42, 85, 0.1)" }}
    className={`relative group rounded-3xl p-8 transition-all duration-300 border h-full flex flex-col ${
      isFeatured 
        ? "bg-gradient-to-br from-[#0a2a55] to-[#1e3a8a] text-white border-blue-400/20 shadow-2xl lg:col-span-2 overflow-hidden" 
        : "bg-white/60 backdrop-blur-md border-slate-100 hover:border-blue-200 shadow-sm"
    }`}
  >
    {/* Featured Background Glow */}
    {isFeatured && (
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-[80px] pointer-events-none -mr-32 -mt-32" />
    )}

    <div className={`flex flex-col ${isFeatured ? "md:flex-row md:items-center" : ""} gap-6 flex-1`}>
      {/* Icon Container */}
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
        isFeatured 
          ? "bg-white/10 text-cyan-400 group-hover:scale-110 group-hover:rotate-6" 
          : "bg-blue-50 text-[#0a2a55] group-hover:bg-[#0a2a55] group-hover:text-white"
      } transition-all duration-500`}>
        <Icon size={28} strokeWidth={isFeatured ? 2.5 : 2} />
      </div>

      <div className="flex-1">
        <h3 className={`font-black text-xl mb-3 tracking-tight ${isFeatured ? "text-white text-2xl md:text-3xl" : "text-[#0a2a55]"}`}>
          {typeof title === 'string' ? (
            <EditableText
              page="home"
              section="services"
              itemKey={`${itemKey}_title`}
              initialValue={title}
              value={title}
              tagName="span"
            />
          ) : title}
        </h3>
        <p className={`text-sm leading-relaxed font-semibold transition-colors ${
          isFeatured ? "text-blue-100/70 text-lg max-w-xl" : "text-slate-500 group-hover:text-slate-600"
        }`}>
          {typeof description === 'string' ? (
            <EditableText
              page="home"
              section="services"
              itemKey={`${itemKey}_description`}
              initialValue={description}
              value={description}
              tagName="p"
            />
          ) : description}
        </p>
      </div>
      
      {isFeatured && (
        <div className="hidden md:block ml-auto">
          <Sparkles className="w-16 h-16 text-cyan-400/20 animate-pulse" />
        </div>
      )}
    </div>
  </motion.div>
);

const ServicesSection = () => {
  const [pageContent, setPageContent] = useState({});
  const [loadingContent, setLoadingContent] = useState(true);

  const getContent = (section, key, defaultValue) => {
    return pageContent[section]?.[key] || defaultValue;
  };

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const response = await fetch(`${url_prefix}/admin/content?page=home`);
        const result = await response.json();
        if (result.success) {
          const map = {};
          result.data.forEach(item => {
            if (!map[item.section]) map[item.section] = {};
            map[item.section][item.key] = item.value;
          });
          setPageContent(map);
        }
      } catch (err) {
        console.error('Error fetching services content', err);
      } finally {
        setLoadingContent(false);
      }
    };
    fetchPageContent();
  }, []);

  // Consolidated & Unique Services List
  const services = [
    {
      key: 'service_1',
      icon: UserCheck,
      title: getContent('services', 'service_1_title', 'Dedicated Case Manager Included'),
      description: getContent('services', 'service_1_description', 'A single point of contact to assist you with appointments, coordination, and support Throughout your treatment.'),
      isFeatured: true
    },
    {
      key: 'service_2',
      icon: Users,
      title: 'Doctor Consultation',
      description: 'Get expert medical opinions and consultations from highly qualified doctors across specialties.',
    },
    {
      key: 'service_3',
      icon: ShieldCheck,
      title: 'Medical Visa Assistance',
      description: 'Complete support with medical visa documentation and approvals for international patients.',
    },
    {
      key: 'service_4',
      icon: Truck,
      title: 'Travel & Logistics',
      description: 'Hassle-free flight bookings and local travel assistance for patients and attendants.',
    },
    {
      key: 'service_5',
      icon: Building,
      title: 'Accommodation',
      description: 'Comfortable and affordable stay arrangements near hospitals during treatment.',
    },
    {
      key: 'service_6',
      icon: Headphones,
      title: 'Nursing & Post Care',
      description: 'Professional nursing support and post-treatment care to ensure smooth recovery.',
    },
    {
      key: 'service_7',
      icon: Calendar,
      title: 'Priority Scheduling',
      description: 'Priority appointment scheduling with hospitals and doctors to avoid delays.',
    },
    {
      key: 'service_8',
      icon: MessageCircle,
      title: 'Interpretation',
      description: 'Multilingual support to bridge communication gaps during consultations.',
    },
    {
      key: 'service_9',
      icon: DollarSign,
      title: 'Money Exchange',
      description: 'Convenient currency exchange services and financial assistance in your city.',
    }
  ];

  return (
    <section className="bg-slate-50 py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] pointer-events-none -ml-40 -mt-40" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-50/50 rounded-full blur-[120px] pointer-events-none -mr-40 -mb-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-[#0a2a55]/5 px-5 py-2 rounded-full text-[#0a2a55] text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-[#0a2a55]/10"
          >
            <Sparkles size={14} className="text-blue-500" />
            Your Medical Concierge
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-black text-[#0a2a55] mb-8 tracking-tighter">
            <EditableText
              page="home"
              section="services_header"
              itemKey="title"
              initialValue="Our Services Cover Every Need"
              value={getContent('services_header', 'title', 'Our Services Cover Every Need')}
              tagName="span"
            />
          </h2>
          
          <p className="text-slate-500 font-semibold text-lg max-w-3xl mx-auto leading-relaxed">
            <EditableText
              page="home"
              section="services_header"
              itemKey="subtitle"
              initialValue="You will be assisted by a dedicated case manager from our team. List of services you can expect from us, for FREE!"
              value={getContent('services_header', 'subtitle', 'You will be assisted by a dedicated case manager from our team. List of services you can expect from us, for FREE!')}
              tagName="span"
            />
          </p>
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {services.map((service) => (
            <ServiceCard
              key={service.key}
              itemKey={service.key}
              icon={service.icon}
              title={service.title}
              description={service.description}
              isFeatured={service.isFeatured}
            />
          ))}
        </motion.div>

        {/* Bottom CTA Area */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col items-center gap-8">
            <motion.a 
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 25px 50px rgba(34, 197, 94, 0.3)" 
              }}
              whileTap={{ scale: 0.98 }}
              href="https://wa.me/919555447404"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-12 py-5 rounded-[2rem] shadow-xl shadow-emerald-500/20 transition-all flex items-center gap-4 text-sm uppercase tracking-[0.2em]"
            >
              <FaWhatsapp size={24} className="animate-pulse" />
              Chat With Our Team
              <ChevronRight size={18} />
            </motion.a>

            <div className="bg-[#0a2a55]/5 border border-slate-100 rounded-3xl p-6 md:px-12 backdrop-blur-md">
              <p className="text-[#0a2a55] font-semibold text-lg flex flex-col md:flex-row items-center gap-3">
                <span className="w-8 h-px bg-emerald-500 hidden md:block" />
                Our help is <span className="bg-emerald-500 text-white px-3 py-1 rounded-lg font-black italic">FREE</span> and by using our services your hospital bill does not increase!
                <span className="w-8 h-px bg-emerald-500 hidden md:block" />
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;