
import { MotionConfig } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { servicesDetails } from "../../../data/services/detail.js";
import { SERVICES } from "../../../data/services/list.js";

import ServiceDetailHero from "./ServiceDetailHero.jsx";
import ServiceOverview from "./ServiceOverview.jsx";
import ServiceProcess from "./ServiceProcess.jsx";
import ServiceFAQs from "./ServiceFAQs.jsx";
import CTA from "../CTA/CTA.jsx";

const theme = {
  "--ink": "#0F1B26",
  "--paper": "#EEF1F4",
  "--steel": "#4B5B6A",
  "--line": "#D5DBE1",
  "--blue": "#2F6BFF",
  "--amber": "#FFB020",
};

const fontCss = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

.vm-service {
  font-family: 'IBM Plex Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
  width: 100%;
  min-height: 100vh;
  color: var(--ink);
  background: #ffffff;
}

.vm-service .vm-display {
  font-family: 'Bricolage Grotesque', 'IBM Plex Sans', system-ui, sans-serif;
}

.vm-service section {
  scroll-margin-top: 100px;
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
`;

export default function ServiceDetailPage({ serviceId: forcedServiceId }) {
  const { id } = useParams();

  const serviceId = forcedServiceId || id;

  const detailService = servicesDetails[serviceId];

  const listService = SERVICES.find(
    (item) => item.id === serviceId
  );

  const service = detailService
    ? {
        ...detailService,
        id: serviceId,
        title: listService?.title || detailService.title,
      }
    : null;

  if (!service) {
    return (
      <main
        className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-5 text-center"
        style={theme}
      >
        <h1 className="text-3xl font-bold text-[var(--ink)]">
          Service Not Found
        </h1>

        <p className="max-w-lg text-[var(--steel)]">
          The service you are looking for does not exist or may have been moved.
        </p>

        <Link
          to="/services"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--blue)] px-6 py-3 font-semibold text-white transition hover:bg-[#4A7FFF]"
        >
          Browse All Services
          <ArrowRight className="h-5 w-5" />
        </Link>
      </main>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <style>{fontCss}</style>

      <main
        className="vm-service w-full overflow-x-hidden"
        style={theme}
      >
        <div className="relative">
          <ServiceDetailHero service={service} />
        </div>

        <ServiceOverview service={service} />
        <ServiceProcess service={service} />
        <ServiceFAQs service={service} />

        <div className="mb-16">
          <CTA />
        </div>
      </main>
    </MotionConfig>
  );
}