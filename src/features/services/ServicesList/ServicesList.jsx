
import { motion } from "framer-motion";
import { ArrowUpRight, Factory, Layers3, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import "./servicesList.css";

import productionParts from "../../../assets/images/Services/Icons/productionParts.webp";
import cncMilling from "../../../assets/images/Services/Icons/CNC Precision Milling.webp";
import cncTurning from "../../../assets/images/Services/Icons/CNC Precision Turning.webp";
import cncSlidingHeadTurning from "../../../assets/images/Services/Icons/CNC Sliding Head Turning.webp";
import cncPartsProcurement from "../../../assets/images/Services/Icons/cncpartsprocurement.webp";

import { SERVICES } from "../../../data/services/list.js";

const serviceVisuals = {
  "industrial-3d-printing": {
    image: productionParts,
    icon: Factory,
    tag: "Industrial 3D Printing",
    category: "3d-printing",
  },
  "cnc-precision-turning": {
    image: cncTurning,
    icon: Factory,
    tag: "CNC Precision Turning",
    category: "cnc-machines",
  },
  "cnc-precision-milling": {
    image: cncMilling,
    icon: Wrench,
    tag: "CNC Precision Milling",
    category: "cnc-machines",
  },
  "cnc-sliding-head-turning": {
    image: cncSlidingHeadTurning,
    icon: Factory,
    tag: "CNC Sliding Head Turning",
    category: "cnc-machines",
  },
  procurement: {
    image: cncPartsProcurement,
    icon: Layers3,
    tag: "CNC Parts Procurement",
    category: "procurement",
  },
};

const categoryContent = {
  all: {
    eyebrow: "WHAT WE DO",
    title: "Precision at",
    highlight: "every stage.",
    description:
      "From the first idea to the final component, we combine advanced manufacturing with practical engineering to deliver parts built for purpose.",
  },
  "3d-printing": {
    eyebrow: "3D PRINTING SERVICES",
    title: "Industrial",
    highlight: "3D printing.",
    description:
      "Professional-grade 3D printing for precision components, industrial applications and demanding manufacturing requirements.",
  },
  "cnc-machines": {
    eyebrow: "CNC MACHINING SERVICES",
    title: "Precision CNC",
    highlight: "solutions.",
    description:
      "Explore precision turning, milling and sliding head turning for accurate, dependable components.",
  },
  procurement: {
    eyebrow: "PROCUREMENT SERVICES",
    title: "CNC parts",
    highlight: "procurement.",
    description:
      "Source precision CNC parts through specialized manufacturing partners, with coordinated quality checks and reliable delivery.",
  },
};

const headingContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const headingItem = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: index * 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function ServicesList({ category = "all" }) {
  const content = categoryContent[category] || categoryContent.all;

  const services = SERVICES.filter((service) => {
    const visual = serviceVisuals[service.id];

    return visual && (category === "all" || visual.category === category);
  });

  return (
    <section className="services-list">
      <div className="services-list__top-line" />

      <div className="container">
        <motion.div
          className="services-list__heading"
          variants={headingContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="services-list__eyebrow"
            variants={headingItem}
          >
            <span />
            {content.eyebrow}
          </motion.div>

          <div className="services-list__heading-row">
            <motion.h2 variants={headingItem}>
              {content.title} <span>{content.highlight}</span>
            </motion.h2>

            <motion.p variants={headingItem}>
              {content.description}
            </motion.p>
          </div>
        </motion.div>

        <div className="services-list__grid">
          {services.map((service, index) => {
            const visual = serviceVisuals[service.id];
            const Icon = visual.icon;

            const detailPath =
              service.id === "procurement"
                ? "/services/procurement/details"
                : `/services/${service.id}`;

            return (
              <motion.article
                className="service-card"
                key={service.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
              >
                <div className="service-card__image">
                  <img
                    src={visual.image}
                    alt={visual.tag}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    decoding="async"
                  />

                  <div className="service-card__overlay" />

                  <span className="service-card__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="service-card__icon">
                    <Icon size={18} strokeWidth={1.6} />
                  </div>

                  <span className="service-card__tag">
                    {visual.tag}
                  </span>
                </div>

                <div className="service-card__content">
                  <div className="service-card__text">
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                  </div>

                  <Link
                    to={detailPath}
                    className="service-card__link"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    <span>Explore Service</span>

                    <span className="service-card__arrow">
                      <ArrowUpRight size={15} strokeWidth={1.7} />
                    </span>
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        {services.length === 0 && (
          <p className="services-list__empty">
            Services for this category will be available soon.
          </p>
        )}
      </div>
    </section>
  );
}