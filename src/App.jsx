
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout.jsx";
import Home from "@/pages/Home/Home.jsx";
import About from "@/pages/About/About.jsx";
import Services from "@/pages/Services/Services.jsx";
import ServiceDetailPage from "@/features/services/ServiceDetail/ServiceDetailPage.jsx";
import Pricing from "@/pages/Pricing/Pricing.jsx";
import FAQ from "@/pages/FAQ/FAQ.jsx";
import Blog from "@/pages/Blog/Blog.jsx";
import BlogArticlePage from "@/pages/Blog/BlogArticlePage.jsx";
import Contact from "@/pages/Contact/Contact.jsx";
import Terms from "@/pages/Terms/Terms.jsx";
import PrivacyPolicy from "@/pages/PrivacyPolicy/PrivacyPolicy.jsx";

import ThreeDPrinting from "@/features/services/ServiceDetail/ThreeDPrinting.jsx";
import CNCMachines from "@/features/services/ServiceDetail/CNCMachines.jsx";
import Procurement from "@/features/services/ServiceDetail/Procurement.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/services" element={<Services />} />

        <Route
          path="/services/3d-printing"
          element={<ThreeDPrinting />}
        />

        <Route
          path="/services/cnc-machines"
          element={<CNCMachines />}
        />

        <Route
          path="/services/procurement"
          element={<Procurement />}
        />

        <Route
          path="/services/procurement/details"
          element={<ServiceDetailPage serviceId="procurement" />}
        />

        <Route
          path="/services/:id"
          element={<ServiceDetailPage />}
        />

        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogArticlePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}