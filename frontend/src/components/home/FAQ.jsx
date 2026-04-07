import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaChevronDown, FaPlus, FaMinus } from "react-icons/fa";
import { HelpCircle, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import url_prefix from "../../data/variable";
import { useLanguage } from '../../hooks/useLanguage';

const staticFaqData = [
  {
    _id: "1",
    question: "What therapeutic approaches do you use?",
    answer: "We specialize in evidence-based clinical psychology, including Cognitive Behavioral Therapy (CBT), Mindfulness-Based Stress Reduction (MBSR), and specialized trauma-informed care."
  },
  {
    _id: "2",
    question: "How do I matched with a clinical psychologist?",
    answer: "Our clinical intake team reviews your specific needs and matches you with a specialist who has the exact expertise required for your journey, from anxiety to complex trauma recovery."
  },
  {
    _id: "3",
    question: "Are your sessions confidential?",
    answer: "Absolutely. We adhere to the highest international standards of clinical confidentiality and data protection, ensuring a safe and secure therapeutic environment."
  },
  {
    _id: "4",
    question: "Can I book a remote consultation?",
    answer: "Yes, we offer high-definition, secure video consultations for patients worldwide, allowing you to access top-tier clinical care from the comfort of your sanctuary."
  },
  {
    _id: "5",
    question: "What is the typical duration of a clinical path?",
    answer: "While every journey is unique, our focus is on sustainable recovery. Your specialist will outline a personalized timeline during your initial clinical assessment."
  },
  {
    _id: "6",
    question: "Do you provide crisis support?",
    answer: "Our care coordinators are available 24/7 to assist with logistical support and scheduling, ensuring you have a seamless connection to your clinical team when needed."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqData] = useState(staticFaqData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [language] = useLanguage();
  
  const [headings, setHeadings] = useState({
    heading: "Clinical Clarity",
    subheading: "Everything you need to know about our therapeutic process and clinical standards.",
    h1: 'Still Have Inquiries?',
    h2: 'Our clinical care coordinators are available 24/7 to provide guidance on your mental wellness journey.',
    h3: 'Speak with an Expert',
    h4: 'Inquire via Message'
  });

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const leftColumn = faqData.slice(0, Math.ceil(faqData.length / 2));
  const rightColumn = faqData.slice(Math.ceil(faqData.length / 2));

  return (
    <section className="relative py-24 bg-[#f8fafc] overflow-hidden">
      {/* Decorative Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-3xl -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-50/50 rounded-full blur-3xl -ml-64 -mb-64" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-xs uppercase tracking-widest mb-6"
          >
            <HelpCircle size={14} />
            <span>Support Center</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-[#0a2a55] font-['Lora',serif] mb-6"
          >
            {headings.heading}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto font-medium"
          >
            {headings.subheading}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="space-y-4">
            {leftColumn.map((faq, index) => (
              <FAQItem
                key={faq._id}
                faq={faq}
                index={index}
                isActive={activeIndex === index}
                onClick={() => toggleFAQ(index)}
              />
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {rightColumn.map((faq, index) => (
              <FAQItem
                key={faq._id}
                faq={faq}
                index={index + leftColumn.length}
                isActive={activeIndex === index + leftColumn.length}
                onClick={() => toggleFAQ(index + leftColumn.length)}
              />
            ))}
          </div>
        </div>

        {/* Premium CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 max-w-4xl mx-auto bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 text-blue-50 opacity-10 group-hover:opacity-20 transition-opacity">
             <MessageSquare size={120} />
          </div>
          
          <div className="relative z-10 text-center">
            <h3 className="text-3xl font-black text-[#0a2a55] font-['Lora',serif] mb-6">
              {headings.h1}
            </h3>
            <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto font-medium">
              {headings.h2}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#0a2a55] text-white font-black uppercase tracking-widest text-xs py-5 px-10 rounded-2xl shadow-xl shadow-blue-900/20 active:shadow-none transition-all"
                onClick={() => navigate('/book')}
              >
                {headings.h3}
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-[#0a2a55] text-[#0a2a55] font-black uppercase tracking-widest text-xs py-5 px-10 rounded-2xl hover:bg-[#0a2a55] hover:text-white transition-all"
                onClick={() => navigate('/book')}
              >
                {headings.h4}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FAQItem = ({ faq, index, isActive, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`group cursor-pointer rounded-3xl transition-all duration-500 border ${
        isActive 
          ? "bg-white border-[#0a2a55] shadow-2xl shadow-blue-900/5 scale-[1.02]" 
          : "bg-white border-slate-100 hover:border-slate-300"
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center w-full p-6 text-left">
        <h3 className={`text-lg font-bold transition-colors ${isActive ? "text-[#0a2a55]" : "text-slate-600"}`}>
          {faq.question}
        </h3>
        <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
          isActive ? "bg-[#0a2a55] text-white rotate-180" : "bg-slate-50 text-slate-400 group-hover:bg-blue-50"
        }`}>
          {isActive ? <FaMinus size={12} /> : <FaPlus size={12} />}
        </div>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.3, delay: 0.1 },
              },
            }}
            exit={{
              height: 0, opacity: 0,
              transition: { height: { duration: 0.3 } }
            }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-slate-500 font-medium leading-relaxed border-t border-slate-50 pt-4 mt-2 mx-6">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQ;