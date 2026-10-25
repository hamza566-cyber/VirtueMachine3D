import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./FloatingActions.css";

/* =========================================
   EMAIL ICON
========================================= */

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <path
      d="M3 6.5C3 5.67 3.67 5 4.5 5h15c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z"
      fill="#16c868"
    />
    <path
      d="m4 6 8 6 8-6"
      stroke="#fff"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* =========================================
   WHATSAPP ICON
========================================= */

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <path
      d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.06-1.33A10 10 0 1 0 12 2Z"
      fill="#16c868"
    />
    <path
      d="M8.6 7.2c.2-.45.4-.46.6-.47h.5c.16 0 .38-.06.6.46.22.53.75 1.83.82 1.96.07.14.11.3.02.48-.09.18-.14.29-.27.44-.14.16-.29.35-.41.47-.14.14-.28.28-.12.55.16.27.7 1.15 1.5 1.87 1.04.93 1.9 1.22 2.17 1.36.27.14.43.12.58-.07.16-.2.68-.79.86-1.06.18-.27.36-.22.6-.13.25.09 1.6.75 1.87.89.27.14.45.2.52.32.07.12.07.68-.16 1.34-.23.66-1.34 1.29-1.86 1.34-.48.05-1.05.24-3.6-.8-3.05-1.24-4.98-4.27-5.13-4.47-.15-.2-1.23-1.63-1.23-3.11 0-1.48.78-2.2 1.05-2.5Z"
      fill="#fff"
    />
  </svg>
);

/* =========================================
   LOCATION ICON
========================================= */

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <path
      d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"
      fill="#16c868"
    />
    <circle cx="12" cy="9" r="2.5" fill="#fff" />
  </svg>
);

/* =========================================
   FLOATING ACTIONS DATA
========================================= */

const ACTIONS = [
  {
    key: "email",
    label: "E-mail",
    icon: <EmailIcon />,
    detail: "hello@virtuemechanics.com",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: <WhatsAppIcon />,
    detail: "000000000",
  },
  {
    key: "location",
    label: "Location",
    icon: <LocationIcon />,
    detail: "Perth | London",
  },
];

/* =========================================
   HERO SELECTORS
========================================= */

const HERO_SELECTORS = [
  ".hero",
  ".hero-section",
  ".hero-container",
  ".hero-banner",
  ".page-hero",
  ".home-hero",
  ".about-hero",
  ".services-hero",
  ".contact-hero",
  ".careers-hero",
  ".career-hero",
  ".faq-hero",
  ".blog-hero",
  ".blogs-hero",
  ".terms-hero",
  ".privacy-hero",
  ".privacy-policy-hero",
  "[data-hero]",
  "[data-hero-section]",
  "[class*='blog'][class*='hero']",
  "[class*='blogs'][class*='hero']",
  "[class*='faq'][class*='hero']",
  "[class*='career'][class*='hero']",
  "[class*='-hero']",
  "[class^='hero-']",
];

/* =========================================
   FOOTER SELECTORS
========================================= */

const FOOTER_SELECTORS = [
  "footer",
  ".footer",
  ".site-footer",
  ".footer-section",
  ".footer-container",
  "[data-footer]",
  "[data-footer-section]",
];

/* =========================================
   FLOATING ACTIONS COMPONENT
========================================= */

export default function FloatingActions() {
  const [openKey, setOpenKey] = useState(null);
  const [isHidden, setIsHidden] = useState(true);

  const location = useLocation();

  useEffect(() => {
    let frameId = null;

    const isElementVisible = (element) => {
      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);

      if (
        style.display === "none" ||
        style.visibility === "hidden" ||
        Number(style.opacity) === 0
      ) {
        return false;
      }

      return (
        rect.width > 0 &&
        rect.height > 0 &&
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0
      );
    };

    const checkVisibility = () => {
      frameId = null;

      const heroes = document.querySelectorAll(
        HERO_SELECTORS.join(", ")
      );

      const footers = document.querySelectorAll(
        FOOTER_SELECTORS.join(", ")
      );

      const heroVisible = Array.from(heroes).some(
        isElementVisible
      );

      const footerVisible = Array.from(footers).some(
        isElementVisible
      );

      setIsHidden(heroVisible || footerVisible);
    };

    const scheduleCheck = () => {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(checkVisibility);
    };

    // Recheck after the page renders.
    checkVisibility();

    // Check when the user scrolls or resizes the window.
    window.addEventListener("scroll", scheduleCheck, {
      passive: true,
    });

    window.addEventListener("resize", scheduleCheck);
    window.addEventListener("load", scheduleCheck);

    // Detect dynamically rendered page sections.
    const observer = new MutationObserver(scheduleCheck);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("scroll", scheduleCheck);
      window.removeEventListener("resize", scheduleCheck);
      window.removeEventListener("load", scheduleCheck);

      observer.disconnect();

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [location.pathname]);

  // Hide actions over every detected hero and footer.
  if (isHidden) {
    return null;
  }

  return (
    <div className="fa-container">
      {ACTIONS.map((action) => {
        const isOpen = openKey === action.key;

        return (
          <div
            key={action.key}
            className={`fa-row ${
              isOpen ? "fa-row--open" : ""
            }`}
            onMouseEnter={() => setOpenKey(action.key)}
            onMouseLeave={() => setOpenKey(null)}
          >
            <div className="fa-detail">
              <span className="fa-detail__text">
                {action.detail}
              </span>
            </div>

            <div className="fa-pill">
              <span className="fa-pill__icon">
                {action.icon}
              </span>

              <span className="fa-pill__label">
                {action.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}