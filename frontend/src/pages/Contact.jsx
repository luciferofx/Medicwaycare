import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle, Send, User, MessageSquare, Heart, Shield, Award, FileText, Pill, Activity, Stethoscope } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import url_prefix from "../data/variable";

// ── Social Icons ──
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47a2.78 2.78 0 0 0-1.95 1.95A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);
const WhatsappIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

// ── Contact Form ──
function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '', service: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${url_prefix}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '', service: '' });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        alert(data.error || 'Failed to send message');
      }
    } catch (error) {
      alert('Network error, please try again later');
    } finally {
      setLoading(false);
    }
  };

  const services = ["Psychotherapy", "CBT", "Child Psychology", "Relationship Counseling", "Stress Management", "Addiction Therapy", "Trauma Recovery"];

  const inputStyle = (name) => ({
    width: '100%', padding: '13px 14px 13px 42px',
    border: focused === name ? '2px solid #1565c0' : '2px solid #e2e8f0',
    borderRadius: '12px', fontSize: '15px', outline: 'none',
    background: focused === name ? '#f0f9ff' : '#f8fafc',
    color: '#0a2a55', transition: 'all 0.25s', boxSizing: 'border-box', fontFamily: 'inherit'
  });
  const labelStyle = {
    display: 'block', fontSize: '12px', fontWeight: '700',
    color: '#0a2a55', marginBottom: '8px', letterSpacing: '0.07em', textTransform: 'uppercase'
  };
  const iconStyle = (name) => ({
    position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
    color: focused === name ? '#1565c0' : '#94a3b8', transition: 'color 0.2s', zIndex: 1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.form 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onSubmit={handleSubmit} 
      style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
        {[
          { name: 'name', label: 'Full Name', placeholder: 'John Doe', type: 'text', icon: <User size={15} /> },
          { name: 'email', label: 'Email Address', placeholder: 'john@example.com', type: 'email', icon: <Mail size={15} /> }
        ].map(f => (
          <motion.div key={f.name} variants={itemVariants}>
            <label style={labelStyle}>{f.label}</label>
            <div style={{ position: 'relative' }}>
              <span style={iconStyle(f.name)}>{f.icon}</span>
              <input type={f.type} name={f.name} placeholder={f.placeholder} value={formData[f.name]}
                onChange={handleChange} onFocus={() => setFocused(f.name)} onBlur={() => setFocused('')}
                required style={inputStyle(f.name)} />
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
        <motion.div variants={itemVariants}>
          <label style={labelStyle}>Phone Number</label>
          <div style={{ position: 'relative' }}>
            <span style={iconStyle('phone')}><Phone size={15} /></span>
            <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" value={formData.phone}
              onChange={handleChange} onFocus={() => setFocused('phone')} onBlur={() => setFocused('')}
              style={inputStyle('phone')} />
          </div>
        </motion.div>
        <motion.div variants={itemVariants}>
          <label style={labelStyle}>Service Needed</label>
          <div style={{ position: 'relative' }}>
            <select name="service" value={formData.service} onChange={handleChange}
              onFocus={() => setFocused('service')} onBlur={() => setFocused('')}
              style={{ ...inputStyle('service'), padding: '13px 14px', color: formData.service ? '#0a2a55' : '#94a3b8', cursor: 'pointer' }}>
              <option value="">Select a service...</option>
              {services.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <label style={labelStyle}>Subject</label>
        <div style={{ position: 'relative' }}>
          <span style={iconStyle('subject')}><MessageSquare size={15} /></span>
          <input type="text" name="subject" placeholder="How can we help you?" value={formData.subject}
            onChange={handleChange} onFocus={() => setFocused('subject')} onBlur={() => setFocused('')}
            style={inputStyle('subject')} />
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <label style={labelStyle}>Your Message</label>
        <textarea name="message" rows={5}
          placeholder="Describe your mental health needs, questions, or how we can assist you..."
          value={formData.message} onChange={handleChange}
          onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
          required
          style={{
            width: '100%', padding: '14px',
            border: focused === 'message' ? '2px solid #1565c0' : '2px solid #e2e8f0',
            borderRadius: '12px', fontSize: '15px', outline: 'none', resize: 'vertical',
            background: focused === 'message' ? '#f0f9ff' : '#f8fafc',
            color: '#0a2a55', transition: 'all 0.25s', boxSizing: 'border-box',
            fontFamily: 'inherit', lineHeight: '1.6'
          }} />
      </motion.div>

      <motion.button 
        variants={itemVariants}
        whileHover={{ scale: 1.01, boxShadow: '0 15px 40px rgba(10,42,85,0.2)' }}
        whileTap={{ scale: 0.99 }}
        type="submit" 
        style={{
          width: '100%', padding: '16px 32px',
          background: submitted ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #0a2a55, #1565c0)',
          color: 'white', border: 'none', borderRadius: '14px',
          fontSize: '16px', fontWeight: '700', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          transition: 'all 0.3s', letterSpacing: '0.02em',
          boxShadow: submitted ? '0 8px 25px rgba(16,185,129,0.35)' : '0 8px 28px rgba(10,42,85,0.3)',
        }}
        disabled={loading || submitted}
      >
        {loading ? 'Sending...' : submitted ? <><CheckCircle size={20} /> Message Sent Successfully!</> : <><Send size={20} /> Send Message</>}
      </motion.button>
    </motion.form>
  );
}

// ── GST Certificate Badge + Modal ──
function GSTBadge() {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const GSTIN = "07AAKCM4036B1ZS";

  const copyGST = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(GSTIN);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <motion.div 
        onClick={() => setShowModal(true)} 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -4, boxShadow: '0 24px 60px rgba(10,42,85,0.25)' }}
        style={{
          background: 'linear-gradient(135deg, #05162e 0%, #0a2a55 55%, #1565c0 100%)',
          borderRadius: '20px', padding: '24px 26px', cursor: 'pointer',
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 16px 48px rgba(10,42,85,0.15)',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
        <div style={{ position: 'absolute', right: '-10px', top: '50%', transform: 'translateY(-50%)', fontSize: '96px', fontWeight: '900', color: 'rgba(255,255,255,0.06)', lineHeight: 1, pointerEvents: 'none', letterSpacing: '-4px', userSelect: 'none' }}>GST</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '13px', marginBottom: '16px', position: 'relative' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0, background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={20} color="white" />
          </div>
          <div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.62)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Govt. of India — GST Registration</div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: 'white', marginTop: '3px' }}>Medicway Care Pvt. Ltd.</div>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.13)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: '12px', padding: '12px 15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', position: 'relative' }}>
          <div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>GSTIN</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: 'white', letterSpacing: '0.12em', fontFamily: 'monospace' }}>{GSTIN}</div>
          </div>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={copyGST} 
            style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.28)', color: 'white', padding: '7px 13px', borderRadius: '8px', cursor: 'pointer', fontSize: '11px', fontWeight: '700', fontFamily: 'inherit', whiteSpace: 'nowrap' }}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </motion.button>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', position: 'relative' }}>
          {[{ label: 'Active', dot: true }, { label: 'Regular Taxpayer' }, { label: 'New Delhi' }].map((p, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50px', padding: '4px 11px', color: 'rgba(255,255,255,0.85)', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' }}>
              {p.dot && <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />}
              {p.label}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.68)', fontSize: '12px', fontWeight: '600', position: 'relative' }}>
          <FileText size={12} /> View Full Certificate →
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)} 
            style={{ position: 'fixed', inset: 0, background: 'rgba(5,22,46,0.85)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={e => e.stopPropagation()} 
              style={{ background: '#f8fafc', borderRadius: '24px', maxWidth: '740px', width: '100%', maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 40px 100px rgba(5,22,46,0.4)', position: 'relative' }}
            >
              <div style={{ background: 'linear-gradient(135deg, #05162e, #0a2a55)', padding: '24px 28px', borderRadius: '24px 24px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '11px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Shield size={20} color="white" /></div>
                  <div>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.62)', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Form GST REG-06 [See Rule 10(1)]</div>
                    <div style={{ fontSize: '15px', color: 'white', fontWeight: '700' }}>GST Registration Certificate</div>
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit', lineHeight: 1 }}>×</button>
              </div>

              <div style={{ background: 'white', borderBottom: '3px solid #1565c0', padding: '16px 28px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg, #d97706, #f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', boxShadow: '0 4px 12px rgba(245,158,11,0.4)' }}>🇮🇳</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#0a2a55' }}>Government of India</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Goods and Services Tax Network — Registration Certificate</div>
                </div>
                <div style={{ marginLeft: 'auto', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '9px 14px', textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '10px', color: '#1e40af', fontWeight: '700', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Registration No.</div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#1e40af', letterSpacing: '0.1em', marginTop: '2px', fontFamily: 'monospace' }}>{GSTIN}</div>
                </div>
              </div>

              <div style={{ padding: '18px 28px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {[
                      [1, 'Legal Name', <strong style={{ color: '#0a2a55', fontSize: '14px' }}>MEDICWAY CARE PRIVATE LIMITED</strong>],
                      [2, 'Trade Name, if any', 'MEDICWAY CARE PRIVATE LIMITED'],
                      [3, 'Additional Trade Names', <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>—</span>],
                      [4, 'Constitution of Business', <span style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af', padding: '3px 11px', borderRadius: '50px', fontSize: '12px', fontWeight: '600' }}>Private Limited Company</span>],
                      [5, 'Address of Principal Place',
                        <span style={{ lineHeight: '1.7' }}>
                          <strong style={{ display: 'block', color: '#0a2a55' }}>MR-1, 5th Floor, Wing-A</strong>
                          Statesman House, 148, Barakhamba Road<br />New Delhi, Delhi — 110001
                        </span>
                      ],
                      [6, 'Date of Liability', <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>—</span>],
                      [7, 'Period of Validity',
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                          <div><div style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>From</div><div style={{ fontWeight: '700', color: '#0a2a55', fontSize: '14px' }}>07 / 01 / 2026</div></div>
                          <span style={{ color: '#94a3b8' }}>→</span>
                          <div><div style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>To</div><div style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '13px' }}>Not Applicable</div></div>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#dcfce7', border: '1px solid #86efac', color: '#15803d', padding: '4px 11px', borderRadius: '50px', fontSize: '11px', fontWeight: '700' }}>
                            <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a' }} />Active
                          </span>
                        </div>
                      ],
                      [8, 'Type of Registration', <span style={{ background: '#dcfce7', border: '1px solid #86efac', color: '#15803d', padding: '3px 11px', borderRadius: '50px', fontSize: '12px', fontWeight: '700' }}>Regular</span>],
                      [9, 'Particulars of Approving', 'Centre'],
                    ].map(([num, label, val]) => (
                      <tr key={num} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '12px 8px', fontSize: '12px', color: '#64748b', fontWeight: '600', width: '32px', verticalAlign: 'top' }}>{num}</td>
                        <td style={{ padding: '12px 13px', fontSize: '12px', fontWeight: '600', color: '#0a2a55', background: 'rgba(239,246,255,0.4)', width: '185px', verticalAlign: 'top' }}>{label}</td>
                        <td style={{ padding: '12px 13px', fontSize: '13px', color: '#0f172a', verticalAlign: 'top', lineHeight: '1.6' }}>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ margin: '0 28px 18px', background: 'white', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '18px 22px' }}>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>Authorised Signatory</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '13px' }}>
                  {[['Name', 'Sudhanshu Singh'], ['Designation', 'Superintendent'], ['Jurisdictional Office', 'Connaught Place'], ['Date of Issue', '07 / 01 / 2026'], ['Signature Status', '✓ Digitally Signed'], ['Authority', 'GSTN Network']].map(([l, v], i) => (
                    <div key={i}>
                      <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>{l}</div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: i === 4 ? '#1565c0' : '#0a2a55' }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ margin: '0 28px 18px', background: 'white', borderRadius: '13px', border: '1px solid #e2e8f0', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '56px', height: '72px', borderRadius: '8px', background: 'linear-gradient(135deg, #f8fafc, #eff6ff)', border: '2px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>📄</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#0a2a55' }}>Original GST Certificate</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>Government issued · Digitally signed · Form GST REG-06</div>
                  <div style={{ marginTop: '7px', display: 'flex', gap: '7px' }}>
                    <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 9px', borderRadius: '50px', fontSize: '10px', fontWeight: '700' }}>✓ Verified</span>
                    <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '2px 9px', borderRadius: '50px', fontSize: '10px', fontWeight: '600' }}>Official Document</span>
                  </div>
                </div>
                <button onClick={() => window.open('/assets/gst-certificate.png', '_blank')} style={{ background: 'linear-gradient(135deg, #0a2a55, #1565c0)', color: 'white', border: 'none', padding: '9px 18px', borderRadius: '9px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>View Original</button>
              </div>

              <div style={{ margin: '0 28px 26px', background: '#fff9db', border: '1px solid #ffe066', borderRadius: '11px', padding: '12px 16px', fontSize: '12px', color: '#856404', lineHeight: '1.7' }}>
                <strong>📌 Note:</strong> The registration certificate is required to be prominently displayed at all places of business in the State. This is a system generated digitally signed Registration Certificate issued based on the approval of application granted on 07/01/2026 by the jurisdictional authority.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Main Contact Page ──
export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.6, 0.05, -0.01, 0.9],
        staggerChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Helmet>
        <title>Contact MedicwayCare - Clinical Psychology Support</title>
        <meta name="description" content="Contact MedicwayCare for clinical psychology inquiries, therapy consultations, and mental health services. 24/7 support available via phone, email, WhatsApp." />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
      </Helmet>

      <style>{`
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .c-card {
          background: white; border-radius: 20px; padding: 24px;
          box-shadow: 0 4px 24px rgba(10,42,85,0.05);
          border: 1px solid rgba(13,42,85,0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        .c-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(10,42,85,0.12); border-color: rgba(15,101,192,0.3); }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
          color: #93c5fd; padding: 7px 18px; border-radius: 50px;
          font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 28px;
          backdrop-filter: blur(8px);
        }
        .social-btn {
          width: 44px; height: 44px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none; transition: all 0.3s;
        }
        .social-btn:hover { transform: translateY(-4px) rotate(5deg); box-shadow: 0 8px 20px rgba(0,0,0,0.1); }
        .icon-wrap {
          width: 52px; height: 52px; border-radius: 15px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
        }
        .icon-wrap::after {
          content: ""; position: absolute; inset: 0; 
          background: currentColor; opacity: 0.12;
        }
        .section-bar { width: 48px; height: 4px; border-radius: 2px; background: linear-gradient(90deg, #0a2a55, #1565c0); margin: 12px 0 16px; }
        .medical-element {
          position: absolute; pointer-events: none; opacity: 0.04; color: white;
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        {/* Hero */}
        <section style={{ background: 'linear-gradient(135deg, #05162e 0%, #0a2a55 50%, #1565c0 100%)', padding: '120px 24px 90px', position: 'relative', overflow: 'hidden' }}>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="medical-element" style={{ top: '10%', left: '5%' }}><Activity size={200} /></motion.div>
          <motion.div animate={{ y: [0, -30, 0], opacity: [0.03, 0.06, 0.03] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="medical-element" style={{ bottom: '15%', right: '10%' }}><Stethoscope size={160} /></motion.div>
          <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, 15, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="medical-element" style={{ top: '25%', right: '20%' }}><Pill size={120} /></motion.div>

          <div style={{ position: 'absolute', top: '50%', right: '7%', transform: 'translateY(-50%)', opacity: 0.08, pointerEvents: 'none' }}>
            <svg width="280" height="280" viewBox="0 0 100 100" fill="white"><rect x="35" y="5" width="30" height="90" rx="4" /><rect x="5" y="35" width="90" height="30" rx="4" /></svg>
          </div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            <motion.div variants={itemVariants} className="hero-badge">
              <Heart size={14} fill="currentColor" style={{ marginRight: '6px' }} /> Premium Clinical Support
            </motion.div>
            <motion.h1 variants={itemVariants} style={{ fontFamily: "'Lora', serif", fontSize: 'clamp(2.6rem, 7vw, 4.2rem)', fontWeight: '600', color: 'white', margin: '0 0 24px', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              We're Dedicated to Your<br />
              <span style={{ 
                background: 'linear-gradient(90deg, #93c5fd, #e0f2fe, #93c5fd)', 
                backgroundSize: '200% auto', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                animation: 'shimmer 4s linear infinite' 
              }}>Mental Wellness</span>
            </motion.h1>
            <motion.p variants={itemVariants} style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 48px', lineHeight: 1.8 }}>
              Expert psychology consultations and therapy services are just a message away. Connect with our dedicated professionals today.
            </motion.p>
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {['24/7 Availability', 'Expert Guidance', 'Secure & Private', 'Award Winning'].map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', padding: '12px 22px', color: 'white', fontSize: '14px', fontWeight: '700' }}>{s}</div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Main Grid */}
        <section style={{ padding: '80px 24px 120px', marginTop: '-40px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '48px', alignItems: 'start' }}>

              {/* LEFT COLUMN */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
              >
                <div>
                  <h2 style={{ fontFamily: "'Lora', serif", fontSize: '2rem', fontWeight: '600', color: '#0a2a55', margin: 0 }}>Get in Touch</h2>
                  <div className="section-bar" />
                  <p style={{ color: '#64748b', fontSize: '16px', margin: 0, lineHeight: 1.8 }}>Our administrative team is here to help you navigate your mental health care. Reach out via any channel below.</p>
                </div>

                <div style={{ display: 'grid', gap: '20px' }}>
                  {[
                    { icon: <Phone size={22} />, title: 'Call Center', lines: ['+91 93547 99090', '+91 99537 30709'], color: '#1565c0' },
                    { icon: <Mail size={22} />, title: 'Official Email', lines: ['care@medicwaycare.in', 'support@medicwaycare.in'], color: '#0a2a55' },
                    { icon: <MapPin size={22} />, title: 'Visit Office', lines: ['Statesman House, 148, Barakhamba Road', 'New Delhi — 110001'], color: '#ef4444' },
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      className="c-card" 
                      whileHover={{ scale: 1.02 }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}
                    >
                      <div className="icon-wrap" style={{ color: item.color }}>{item.icon}</div>
                      <div>
                        <h3 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: '800', color: '#0a2a55' }}>{item.title}</h3>
                        {item.lines.map((l, j) => <p key={j} style={{ margin: '2px 0', fontSize: '15px', color: '#64748b', fontWeight: '500' }}>{l}</p>)}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <GSTBadge />

                <div className="c-card" style={{ background: '#f8fafc' }}>
                  <h3 style={{ fontFamily: "'Lora', serif", fontSize: '1.1rem', fontWeight: '600', color: '#0a2a55', margin: '0 0 20px' }}>Follow Us</h3>
                  <div style={{ display: 'flex', gap: '14px', marginBottom: '24px' }}>
                    <a href="https://facebook.com" className="social-btn" style={{ background: '#eff6ff', color: '#1565c0' }}><FacebookIcon /></a>
                    <a href="https://instagram.com" className="social-btn" style={{ background: '#fff1f2', color: '#ef4444' }}><InstagramIcon /></a>
                    <a href="https://youtube.com" className="social-btn" style={{ background: '#fef2f2', color: '#dc2626' }}><YoutubeIcon /></a>
                  </div>
                  <motion.a 
                    href="https://wa.me/919354799090" 
                    whileHover={{ scale: 1.03, boxShadow: '0 12px 30px rgba(34,197,94,0.4)' }}
                    whileTap={{ scale: 0.97 }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: 'white', borderRadius: '14px', padding: '16px', textDecoration: 'none', fontWeight: '800', fontSize: '15px', boxShadow: '0 8px 24px rgba(34,197,94,0.3)' }}
                  >
                    <WhatsappIcon /> Instant WhatsApp Chat
                  </motion.a>
                </div>
              </motion.div>

              {/* RIGHT COLUMN: Form */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                style={{ background: 'white', borderRadius: '32px', boxShadow: '0 20px 60px rgba(10,42,85,0.08)', border: '1px solid rgba(13,42,85,0.06)', overflow: 'hidden' }}
              >
                <div style={{ background: 'linear-gradient(135deg, #0a2a55, #1565c0)', padding: '48px 48px 40px', position: 'relative', overflow: 'hidden' }}>
                   <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                   <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '20px' }}>
                     <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <Send size={26} color="white" />
                     </div>
                     <div>
                       <h2 style={{ fontFamily: "'Lora', serif", fontSize: '1.8rem', fontWeight: '600', color: 'white', margin: '0 0 6px' }}>Send Message</h2>
                       <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', margin: 0 }}>Usually responds in under 2 hours</p>
                     </div>
                   </div>
                </div>
                
                <div style={{ padding: '48px' }}>
                  <ContactForm />
                </div>

                <div style={{ background: '#f8fafc', padding: '24px 48px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                   {[{ icon: <Shield size={16} />, text: 'Encrypted' }, { icon: <Clock size={16} />, text: '24/7 Active' }, { icon: <CheckCircle size={16} />, text: 'Verified' }].map((item, i) => (
                     <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '13px', fontWeight: '700' }}>
                       {item.icon} {item.text}
                     </div>
                   ))}
                </div>
              </motion.div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}