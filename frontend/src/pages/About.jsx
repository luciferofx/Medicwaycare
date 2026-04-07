import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Stethoscope, Users, Target, Rocket, ShieldCheck, Heart, Activity, Pill, Clock, Mail, Phone } from 'lucide-react';
import { Helmet } from 'react-helmet';

export default function About() {
  const data = {
    title: 'Transforming Mental Health Care',
    subtitle: "Empowering your journey towards mental well-being and emotional balance with evidence-based clinical psychology.",
    missionTitle: 'Our Dedicated Mission',
    missionDescription:
      'At MedicwayCare, we are committed to bridging the gap in mental healthcare by providing a specialized platform for clinical psychology. We connect individuals with world-renowned psychologists and advanced therapy centers, ensuring every person receives the compassionate, professional support they deserve.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    highlights: [
      { 
        icon: <Target className="w-6 h-6" />, 
        title: 'Precision Care', 
        text: 'Tailored therapeutic approaches for unique mental health needs.' 
      },
      { 
        icon: <ShieldCheck className="w-6 h-6" />, 
        title: 'Confidentiality', 
        text: 'Your privacy is our priority. We maintain the highest ethical standards.' 
      },
      { 
        icon: <Rocket className="w-6 h-6" />, 
        title: 'Future Focused', 
        text: 'Combining traditional therapy with modern psychological research.' 
      },
    ],
    stats: [
      { label: 'Verified Clinics', value: '150+' },
      { label: 'Expert Doctors', value: '500+' },
      { label: 'Success Stories', value: '10k+' },
      { label: 'Support Hours', value: '24/7' },
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <>
      <Helmet>
        <title>About MedicwayCare - Premium Clinical Psychology Services</title>
        <meta name="description" content="Discover the mission behind MedicwayCare. We provide premium clinical psychology support, connecting you with top-tier mental health professionals." />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
      </Helmet>

      <style>{`
        @keyframes subtle-float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .stat-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          transition: all 0.3s ease;
        }
        .stat-card:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-5px);
        }
        .about-card {
          background: white;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 10px 40px rgba(10, 42, 85, 0.05);
          border: 1px solid rgba(13, 42, 85, 0.06);
          height: 100%;
          transition: all 0.4s ease;
        }
        .about-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(10, 42, 85, 0.1);
        }
        .medical-svg {
          position: absolute;
          opacity: 0.03;
          color: white;
          pointer-events: none;
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Plus Jakarta Sans', sans-serif", overflowX: 'hidden' }}>
        
        {/* Hero Section */}
        <section style={{ background: 'linear-gradient(135deg, #05162e 0%, #0a2a55 50%, #1565c0 100%)', padding: '140px 24px 100px', position: 'relative', overflow: 'hidden' }}>
          {/* Animated Background Icons */}
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="medical-svg" style={{ top: '10%', left: '5%' }}><Activity size={220} /></motion.div>
          <motion.div animate={{ y: [0, -40, 0] }} transition={{ duration: 12, repeat: Infinity }} className="medical-svg" style={{ bottom: '10%', right: '8%' }}><Stethoscope size={180} /></motion.div>
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 15, repeat: Infinity }} className="medical-svg" style={{ top: '20%', right: '15%' }}><Heart size={140} /></motion.div>

          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/30 bg-white/10 text-blue-200 text-xs font-bold uppercase tracking-widest mb-8"
            >
              <HeartPulse size={14} /> Our Professional Story
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
              style={{ fontFamily: "'Lora', serif", fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', color: 'white', fontWeight: 600, lineHeight: 1.1, marginBottom: '24px' }}
            >
              {data.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.4 }}
              style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.75)', maxWidth: '700px', margin: '0 auto 60px', lineHeight: 1.8 }}
            >
              {data.subtitle}
            </motion.p>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            >
              {data.stats.map((stat, i) => (
                <motion.div key={i} variants={itemVariants} className="stat-card">
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '4px' }}>{stat.value}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Transition Wave */}
        <div style={{ marginTop: '-2px', lineHeight: 0 }}>
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H1440V100C1440 100 1080 0 720 0C360 0 0 100 0 100V0Z" fill="url(#navyGrad)"/>
            <defs>
              <linearGradient id="navyGrad" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#05162e"/>
                <stop offset="0.5" stopColor="#0a2a55"/>
                <stop offset="1" stopColor="#1565c0"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Mission Section */}
        <section style={{ padding: '100px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ position: 'relative' }}
              >
                <div style={{ position: 'absolute', top: '-30px', left: '-30px', width: '100px', height: '100px', background: 'rgba(21, 101, 192, 0.1)', borderRadius: '50%', zIndex: 0 }} />
                <div style={{ border: '12px solid white', borderRadius: '32px', boxShadow: '0 30px 60px rgba(10,42,85,0.1)', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
                  <img src={data.image} alt="Mental Health Professional" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  style={{ position: 'absolute', bottom: '30px', right: '-20px', background: 'white', padding: '24px', borderRadius: '20px', boxShadow: '0 15px 40px rgba(0,0,0,0.1)', zIndex: 2, display: 'flex', alignItems: 'center', gap: '15px' }}
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#0a2a55' }}>Fully Accredited</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Verified Psychology Experts</div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 style={{ fontFamily: "'Lora', serif", fontSize: '2.5rem', color: '#0a2a55', fontWeight: 600, marginBottom: '24px' }}>
                  {data.missionTitle}
                </h2>
                <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #0a2a55, #1565c0)', borderRadius: '2px', marginBottom: '32px' }} />
                <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.8, marginBottom: '40px' }}>
                  {data.missionDescription}
                </p>

                <div className="grid sm:grid-cols-1 gap-6">
                  {data.highlights.map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 10 }}
                      className="flex items-start gap-6 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0a2a55', marginBottom: '4px' }}>{item.title}</h4>
                        <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.6 }}>{item.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section style={{ background: '#f1f5f9', padding: '100px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '70px' }}
            >
              <h2 style={{ fontFamily: "'Lora', serif", fontSize: '2.5rem', color: '#0a2a55', fontWeight: 600, marginBottom: '20px' }}>Our Core Commitment</h2>
              <p style={{ maxWidth: '700px', margin: '0 auto', color: '#64748b', fontSize: '1.1rem', lineHeight: 1.8 }}>
                We believe that everyone deserves access to quality mental health care. Our platform is designed to empower individuals with the tools they need to foster resilience, emotional strength, and overall well-being.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Compassionate Listening', text: 'Every story is unique. We provide a space where voices are heard without judgment.', icon: <Heart className="text-rose-500" /> },
                { title: 'Expert Guidance', text: 'Our network consists of certified clinical psychologists with years of proven expertise.', icon: <Users className="text-blue-500" /> },
                { title: 'Progress Tracking', text: 'Monitor your emotional growth with evidence-based assessments and regular check-ins.', icon: <Activity className="text-emerald-500" /> }
              ].map((card, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="about-card"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 text-2xl border border-slate-100">
                    {card.icon}
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0a2a55', marginBottom: '16px' }}>{card.title}</h3>
                  <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '1rem' }}>{card.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Strip */}
        <section style={{ padding: '80px 24px', background: 'white' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="bg-slate-900 rounded-[40px] p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
               <div className="relative z-10 text-center md:text-left">
                  <h2 style={{ fontFamily: "'Lora', serif", fontSize: '2.2rem', color: 'white', fontWeight: 600, marginBottom: '12px' }}>Ready to Start?</h2>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>Our compassionate support team is ready to assist you any time.</p>
               </div>
               <div className="flex flex-wrap justify-center gap-6 relative z-10">
                  <div className="flex items-center gap-4 group">
                     <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                        <Mail />
                     </div>
                     <div>
                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>Email Us</div>
                        <div style={{ color: 'white', fontWeight: 700 }}>care@medicwaycare.in</div>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                     <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        <Phone />
                     </div>
                     <div>
                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>WhatsApp</div>
                        <div style={{ color: 'white', fontWeight: 700 }}>+91 93547 99090</div>
                     </div>
                  </div>
               </div>
               {/* Decorative Circles */}
               <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'rgba(21, 101, 192, 0.1)', borderRadius: '50%' }} />
               <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '150px', height: '150px', background: 'rgba(21, 101, 192, 0.05)', borderRadius: '50%' }} />
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
