import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

/* ===== ADMIN IMPORTS ===== */
import AdminLayout from "./admin/Index";
import AdminDashboardPage from "./admin/Dashbaord/AdminDashboard";
import AdminLogin from "./components/admin/AdminLogin";
import DoctorTable from "./admin/Doctor/DoctoreList";
import LanguageSetting from "./admin/adminSetting/LanguageSetting";
import CountrySetting from "./admin/adminSetting/CountrySetting";

/* ===== PUBLIC IMPORTS ===== */
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import Appointment from "./pages/Appointment";
import BookingFlow from "./pages/BookingFlow";
import Contact from "./pages/Contact";
import DoctorDetails from "./pages/DoctorDetails";
import Home from "./pages/Home";
import HospitalHome from "./pages/Hospital/HospitalHome";
import HospitalDetailPage from "./pages/Hospital/HospitalDetailPage";
import DoctorHome from "./pages/Doctor/DoctorHome";
import DoctorDetailPage from "./pages/Doctor/DoctorDetailsPage/DoctorDetailPage";
import BlogListing from "./pages/BlogListing";
import BlogDetail from "./pages/BlogDetail";

/* ===== PATIENT ===== */
import PatientDashboardp from "./components/patient/PatientDashboard";
import PatientLogin from "./components/patient/PatientLogin";
import PatientRegister from "./components/patient/PatientRegister";

/* ===== REACT ROUTER ===== */
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import BiodataApp from "./p1";
import CategoryManagement from "./admin/adminSetting/CategorySetting";
import SubcategoryManagement from "./admin/adminSetting/subCategoryManagement";
import DoctorManagement from "./admin/Doctor/DoctorManagement";
import HospitalManagement from "./admin/Hospital/Hospital";
import HospitalList from "./admin/Hospital/HospitalList";
import BlogManagement from "./admin/Blog/BlogManagement";
import BlogForm from "./admin/Blog/BlogForm";
import SEOManagement from "./admin/SEO/SEOManagement";
import ContactManagement from "./admin/Contact/ContactManagement";
import AppointmentManagement from "./admin/Appointment/AppointmentManagement";
import Host from "./pages/webrtc/Host";
import Viewer from "./pages/webrtc/Viewer";
import PsychiatricServicesDetails from "./pages/ClinicalPsychology";
import Preloader from "./components/Preloader";
import ScrollToTop from "./components/ScrollToTop";

/* ===== CINEMATIC WRAPPER ===== */
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

/* ===== LAYOUTS ===== */
const PublicLayout = () => (
  <div className="min-h-screen flex flex-col text-gray-800 bg-white">
    <Header />
    <main className="flex-grow">
      {/* Outlet is inside App.jsx's AnimatePresence logic */}
      <Outlet />
    </main>
    <Footer />
  </div>
);

/* ===== APP ===== */
export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // Faster clinical preloader
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;

  return (
    <AuthProvider>
      <ScrollToTop />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            background: "#0a2a55",
            color: "#fff",
            borderRadius: "12px",
          },
        }}
      />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* ================= PUBLIC ROUTES ================= */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/doctors" element={<PageTransition><DoctorHome /></PageTransition>} />
            <Route path="/doctor/:slug" element={<PageTransition><DoctorDetailPage /></PageTransition>} />
            <Route path="/doctors/:id" element={<PageTransition><DoctorDetailPage /></PageTransition>} />
            <Route path="/hospitals" element={<PageTransition><HospitalHome /></PageTransition>} />
            <Route path="/hospital/:slug" element={<PageTransition><HospitalDetailPage /></PageTransition>} />
            <Route path="/book/:hospitalId?/:doctorId?" element={<PageTransition><BookingFlow /></PageTransition>} />
            <Route path="/booking" element={<PageTransition><BookingFlow /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/appointment" element={<PageTransition><Appointment /></PageTransition>} />
            <Route path="/appoitment" element={<PageTransition><Appointment /></PageTransition>} />
            <Route path="/blog" element={<PageTransition><BlogListing /></PageTransition>} />
            <Route path="/blog/:slug" element={<PageTransition><BlogDetail /></PageTransition>} />
            <Route path="/specialities/:name" element={<PageTransition><PsychiatricServicesDetails /></PageTransition>} />
            <Route path='/service/:name' element={<PageTransition><PsychiatricServicesDetails /></PageTransition>} />
            <Route path="/host" element={<PageTransition><Host /></PageTransition>} />
            <Route path="/view" element={<PageTransition><Viewer /></PageTransition>} />
            <Route path="/bio-data" element={<PageTransition><BiodataApp /></PageTransition>} />
          </Route>

          {/* ================= ADMIN ROUTES (No Transitions for speed) ================= */}
          <Route path="/admin/login" element={
            <ProtectedRoute requireAuth={false}>
              <AdminLogin />
            </ProtectedRoute>
          } />

          <Route path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="doctors/list" element={<DoctorTable />} />
            <Route path="doctors-add" element={<DoctorManagement />} />
            <Route path="hospitals-add" element={<HospitalManagement />} />
            <Route path="hospitals/list" element={<HospitalList />} />
            <Route path="master/countries" element={<CountrySetting />} />
            <Route path="hospital/language-setting" element={<LanguageSetting />} />
            <Route path="master/categories" element={<CategoryManagement />} />
            <Route path="master/sub-categories" element={<SubcategoryManagement />} />
            <Route path="blogs" element={<BlogManagement />} />
            <Route path="blogs/create" element={<BlogForm />} />
            <Route path="blogs/edit/:id" element={<BlogForm />} />
            <Route path="contacts" element={<ContactManagement />} />
            <Route path="appointments" element={<AppointmentManagement />} />
            <Route path="seo" element={<SEOManagement />} />
          </Route>

          {/* ================= PATIENT ROUTES ================= */}
          <Route path="/patient/login" element={<PatientLogin />} />
          <Route path="/patient/register" element={<PatientRegister />} />
          <Route path="/patient/dashboard" element={<PatientDashboardp />} />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}
