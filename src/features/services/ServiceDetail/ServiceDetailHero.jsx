import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button.jsx";

import productionPartsImage from "../../../assets/images/Services/Icons/productionParts.webp";
import cncMilling from "../../../assets/images/Services/Icons/CNC Precision Milling.webp";
import cncTurning from "../../../assets/images/Services/Icons/CNC Precision Turning.webp";
import cncSlidingHeadTurning from "../../../assets/images/Services/Icons/CNC Sliding Head Turning.webp";
import cncPartsProcurement from "../../../assets/images/Services/Icons/cncpartsprocurement.webp";

const item = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  show: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const maskReveal = {
  hidden: {
    opacity: 0,
    clipPath: "inset(0 100% 0 0)",
  },
  show: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 0.9,
      delay: 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const SERVICE_IMAGES = {
  "industrial-3d-printing": productionPartsImage,
  "cnc-machines": productionPartsImage,
  "cnc-precision-turning": cncTurning,
  "cnc-precision-milling": cncMilling,
  "cnc-sliding-head-turning": cncSlidingHeadTurning,
  procurement: cncPartsProcurement,
  "cnc-procurement": cncPartsProcurement,
  "cnc-parts-procurement": cncPartsProcurement,
};

const DEFAULT_IMAGE = productionPartsImage;

const DEFAULT_HIGHLIGHTS = [
  "Advanced Manufacturing Technologies",
  "Engineering-Grade Materials",
  "Precision Component Manufacturing",
];

const normalizeServiceId = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default function ServiceDetailHero({ service }) {
  const shouldReduceMotion = useReducedMotion();

  if (!service) return null;

  const serviceId = normalizeServiceId(service.id);
  const titleId = normalizeServiceId(service.title);

  const resolvedServiceId = SERVICE_IMAGES[serviceId]
    ? serviceId
    : SERVICE_IMAGES[titleId]
      ? titleId
      : serviceId;

  const isProcurement =
    resolvedServiceId.includes("procurement") ||
    titleId.includes("procurement");

  const headline =
    service.hero?.headline ||
    service.title ||
    "Precision Engineering Services";

  const subtitle =
    service.hero?.sub ||
    service.subtitle ||
    service.desc ||
    service.description ||
    "High-performance manufacturing and engineering solutions tailored to your project requirements.";

  const primaryCta = service.hero?.primaryCta || {
    label: "Get a Quote",
    href: `/contact?service=${encodeURIComponent(
      service.id || service.title || ""
    )}`,
  };

  const secondaryCta = service.hero?.secondaryCta || {
    label: "Explore the Process",
    href: "#process",
  };

  const imageSrc = isProcurement
    ? cncPartsProcurement
    : SERVICE_IMAGES[resolvedServiceId] ||
      service.heroImage ||
      service.image ||
      service.imageUrl ||
      DEFAULT_IMAGE;

  const highlights = (
    service.heroHighlights?.length
      ? service.heroHighlights
      : DEFAULT_HIGHLIGHTS
  )
    .slice(0, 3)
    .map((highlight) =>
      typeof highlight === "string" ? highlight : highlight.text
    )
    .filter(Boolean);

  const handleImageError = (event) => {
    if (event.currentTarget.dataset.fallbackApplied === "true") return;

    event.currentTarget.dataset.fallbackApplied = "true";
    event.currentTarget.src = isProcurement
      ? cncPartsProcurement
      : DEFAULT_IMAGE;
  };

  const animationProps = shouldReduceMotion
    ? {}
    : {
        initial: "hidden",
        animate: "show",
      };

  return (
    <section
      data-hero-section
      className="relative isolate overflow-hidden border-b border-white/10 bg-[#080A08] pt-24 text-[#F5F7F4] sm:pt-28 lg:pt-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-64 w-full max-w-7xl -translate-x-1/2 bg-[#16C868]/5 blur-[100px] sm:h-80 sm:blur-[120px]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 pb-12 sm:gap-10 sm:px-6 sm:pb-16 md:pb-20 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pb-24 xl:px-6">
        <motion.div
          variants={shouldReduceMotion ? undefined : maskReveal}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="show"
          className="relative order-2 min-w-0 lg:order-1 lg:col-span-5"
        >
          <div className="group relative aspect-[5/4] w-full overflow-hidden rounded-sm border border-white/10 bg-[#101410] shadow-2xl sm:aspect-[16/9] lg:aspect-[4/3]">
            <img
              src={imageSrc}
              alt={`${service.title || "Virtue Mechanics"} manufacturing service`}
              onError={handleImageError}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="h-full w-full object-cover object-center brightness-95 contrast-105 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A08]/45 via-transparent to-transparent"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 h-1 w-1/3 bg-[#16C868]"
            />
          </div>
        </motion.div>

        <div className="order-1 flex min-w-0 flex-col justify-center lg:order-2 lg:col-span-7">
          <motion.nav
            aria-label="Breadcrumb"
            variants={item}
            {...animationProps}
            custom={0}
            className="mb-4 flex min-w-0 flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-white/55 sm:mb-6 sm:text-xs sm:tracking-[0.16em]"
          >
            <Link
              to="/services"
              className="shrink-0 transition-colors hover:text-[#16C868]"
            >
              Services
            </Link>

            <ChevronRight
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0 text-[#16C868]"
            />

            <span className="min-w-0 break-words text-white/85">
              {service.title}
            </span>
          </motion.nav>

          <motion.h1
            variants={item}
            {...animationProps}
            custom={1}
            className="vm-display mb-4 break-words text-[clamp(2rem,7vw,3rem)] font-bold leading-[1.08] tracking-tight text-white sm:mb-5 sm:text-4xl md:text-5xl lg:mb-6 lg:text-5xl xl:text-[3.5rem]"
          >
            {headline}
          </motion.h1>

          <motion.p
            variants={item}
            {...animationProps}
            custom={2}
            className="mb-6 max-w-2xl text-sm leading-7 text-[#F5F7F4]/70 sm:mb-7 sm:text-base sm:leading-8 lg:mb-8 lg:text-lg"
          >
            {subtitle}
          </motion.p>

          <motion.div
            variants={item}
            {...animationProps}
            custom={3}
            className="service-hero__actions mb-0 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center"
          >
            <Button
              to={primaryCta.href || "/contact"}
              size="sm"
              className="service-hero__cta w-full justify-center sm:w-auto"
            >
              <span>{primaryCta.label || "Get a Quote"}</span>
            </Button>

            <a
              href={secondaryCta.href || "#process"}
              className="service-hero__secondary-cta inline-flex min-h-11 w-full items-center justify-center gap-2 border border-white/20 px-5 py-3 text-center text-sm font-medium text-white transition-colors duration-300 hover:border-[#16C868] hover:text-[#16C868] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16C868] sm:w-auto"
            >
              {secondaryCta.label || "Explore the Process"}
            </a>
          </motion.div>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:hidden">
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate="show"
          variants={
            shouldReduceMotion
              ? undefined
              : {
                  hidden: { opacity: 0, y: 12 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: 0.1,
                      staggerChildren: 0.12,
                    },
                  },
                }
          }
          className="grid grid-cols-1 gap-0 border-t border-white/10 sm:grid-cols-3 sm:gap-4"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={`${highlight}-${index}`}
              variants={
                shouldReduceMotion
                  ? undefined
                  : {
                      hidden: { opacity: 0, y: 10 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.45 },
                      },
                    }
              }
              className="flex items-start gap-3 border-b border-white/10 py-4 last:border-b-0 sm:border-b-0 sm:py-5"
            >
              <span
                aria-hidden="true"
                className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#16C868] shadow-[0_0_10px_rgba(22,200,104,0.3)]"
              />

              <span className="text-xs leading-6 text-white/70 sm:text-sm">
                {highlight}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}