import { Routes, Route, useLocation } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Careers from './pages/Careers';
import CareerDetail from './pages/CareerDetail';
import Contact from './pages/Contact';
import Schedule from './pages/Schedule';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import MedinaCaseStudy from './pages/MedinaCaseStudy';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPosts from './pages/admin/AdminPosts';
import AdminProjects from './pages/admin/AdminProjects';
import AdminHero from './pages/admin/AdminHero';
import AdminJobs from './pages/admin/AdminJobs';
import AdminMessages from './pages/admin/AdminMessages';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminMedia from './pages/admin/AdminMedia';
import AdminSettings from './pages/admin/AdminSettings';

export default function App() {
  const location = useLocation();
  const bare =
    location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <div className="flex min-h-screen flex-col">
      {!bare && <Header />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:slug" element={<CareerDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="posts" element={<AdminPosts />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="hero" element={<AdminHero />} />
            <Route path="jobs" element={<AdminJobs />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          <Route path="/case-studies/medina-digital-health-platform" element={<MedinaCaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!bare && <Footer />}
      {!bare && <FloatingContact />}
    </div>
  );
}
