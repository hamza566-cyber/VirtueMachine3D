
import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES_DROPDOWN } from "../../../data/navigation.js";
import "./ServicesDropdown.css";

export default function ServicesDropdown({ open, onClose }) {
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !ref.current?.contains(event.target) &&
        !event.target.closest(".navbar__services")
      ) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    onClose();
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          className="servicesmenu"
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{
            duration: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="servicesmenu__heading">
            <span>OUR SERVICES</span>
            <span className="servicesmenu__line" />
          </div>

          <div className="servicesmenu__list">
            {SERVICES_DROPDOWN.map((service, index) => (
              <NavLink
                key={service.to}
                to={service.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `servicesmenu__item ${
                    isActive ? "is-active" : ""
                  }`
                }
              >
                <span className="servicesmenu__number">
                  0{index + 1}
                </span>

                <span className="servicesmenu__label">
                  {service.label}
                </span>

                <ArrowUpRight
                  size={16}
                  className="servicesmenu__arrow"
                />
              </NavLink>
            ))}
          </div>

          <div className="servicesmenu__footer">
            Engineering solutions, built around your needs.
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
