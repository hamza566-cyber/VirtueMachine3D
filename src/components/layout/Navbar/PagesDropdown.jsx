
import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PAGES_DROPDOWN } from "../../../data/navigation.js";
import "./PagesDropdown.css";

export default function PagesDropdown({ open, onClose }) {
  const ref = useRef(null);
  const location = useLocation();
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        const pagesButton = event.target.closest(".navbar__pages");

        if (!pagesButton) {
          onCloseRef.current();
        }
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onCloseRef.current();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    onCloseRef.current();
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          className="pagesmenu"
          initial={{
            opacity: 0,
            y: -6,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -6,
            scale: 0.98,
          }}
          transition={{
            duration: 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="pagesmenu__list">
            {PAGES_DROPDOWN.map((page) => (
              <NavLink
                key={page.to}
                to={page.to}
                onClick={() => onCloseRef.current()}
                className={({ isActive }) =>
                  `pagesmenu__item ${
                    isActive ? "pagesmenu__item--active" : ""
                  }`
                }
              >
                <span className="pagesmenu__label">
                  {page.label}
                </span>

                <ArrowUpRight
                  className="pagesmenu__arrow"
                  size={14}
                  aria-hidden="true"
                />
              </NavLink>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
