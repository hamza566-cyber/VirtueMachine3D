
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  ChevronDown,
  Search as SearchIcon,
  X,
} from "lucide-react";
import Logo from "../Logo/Logo.jsx";
import Button from "../../../components/ui/Button.jsx";
import {
  NAV_LINKS,
  PAGES_DROPDOWN,
} from "../../../data/navigation.js";
import { useScrolled } from "../../../hooks/useScrolled.js";
import PagesDropdown from "./PagesDropdown.jsx";
import ServicesDropdown from "./ServicesDropdown.jsx";
import MobileMenu from "./MobileMenu.jsx";
import SearchComponent from "./Search.jsx";
import "./navbar.css";
import "./mobilemenu.css";

export default function Navbar() {
  const scrolled = useScrolled(30);
  const location = useLocation();

  const [pagesOpen, setPagesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePagesOpen, setMobilePagesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setPagesOpen(false);
    setServicesOpen(false);
    setMobilePagesOpen(false);
    setMobileServicesOpen(false);
    setSearchOpen(false);
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1100) {
        setMobileOpen(false);
        setMobilePagesOpen(false);
        setMobileServicesOpen(false);
      } else {
        setPagesOpen(false);
        setServicesOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setPagesOpen(false);
        setServicesOpen(false);
        setMobileOpen(false);
        setMobilePagesOpen(false);
        setMobileServicesOpen(false);
        setSearchOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const pagesIsActive = PAGES_DROPDOWN.some((item) => {
    const base = item.to.split("#")[0];
    return location.pathname === base && base !== "/";
  });

  const servicesIsActive =
    location.pathname === "/services" ||
    location.pathname.startsWith("/services/");

  const handleMobileOpen = () => {
    setPagesOpen(false);
    setServicesOpen(false);
    setSearchOpen(false);
    setMobileOpen(true);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
    setMobilePagesOpen(false);
    setMobileServicesOpen(false);
  };

  const handlePagesEnter = () => {
    if (window.innerWidth > 1100) {
      setServicesOpen(false);
      setPagesOpen(true);
    }
  };

  const handleServicesEnter = () => {
    if (window.innerWidth > 1100) {
      setPagesOpen(false);
      setServicesOpen(true);
    }
  };

  const handleDropdownLeave = () => {
    setPagesOpen(false);
    setServicesOpen(false);
  };

  return (
    <>
      <header
        className={`navbar on-dark ${
          scrolled ? "navbar--scrolled" : ""
        } ${mobileOpen ? "navbar--menu-open" : ""}`}
      >
        <div className="navbar__inner">
          <div className="navbar__plate">
            <Logo />
          </div>

          <nav className="navbar__nav" aria-label="Primary">
            <ul>
              {NAV_LINKS.map((link) => (
                <li
                  key={link.to}
                  className={
                    link.label === "Services"
                      ? `navbar__services ${
                          servicesOpen ? "is-open" : ""
                        }`
                      : ""
                  }
                  onMouseEnter={
                    link.label === "Services"
                      ? handleServicesEnter
                      : undefined
                  }
                  onMouseLeave={
                    link.label === "Services"
                      ? handleDropdownLeave
                      : undefined
                  }
                >
                  {link.label === "Services" ? (
                    <>
                      <button
                        type="button"
                        className={`navbar__link navbar__link--btn ${
                          servicesIsActive ? "is-active" : ""
                        } ${servicesOpen ? "is-open" : ""}`}
                        aria-expanded={servicesOpen}
                        aria-haspopup="true"
                        onFocus={handleServicesEnter}
                        onClick={() => {
                          if (window.innerWidth <= 1100) {
                            setServicesOpen((value) => !value);
                          }
                        }}
                      >
                        Services
                        <ChevronDown
                          size={14}
                          className="navbar__chevron"
                        />
                      </button>

                      <ServicesDropdown
                        open={servicesOpen}
                        onClose={() => setServicesOpen(false)}
                      />
                    </>
                  ) : (
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      className={({ isActive }) =>
                        `navbar__link ${
                          isActive ? "is-active" : ""
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  )}
                </li>
              ))}

              <li
                className={`navbar__pages ${
                  pagesOpen ? "is-open" : ""
                }`}
                onMouseEnter={handlePagesEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  className={`navbar__link navbar__link--btn ${
                    pagesIsActive ? "is-active" : ""
                  } ${pagesOpen ? "is-open" : ""}`}
                  aria-expanded={pagesOpen}
                  aria-haspopup="true"
                  onFocus={handlePagesEnter}
                  onClick={() => {
                    if (window.innerWidth <= 1100) {
                      setPagesOpen((value) => !value);
                    }
                  }}
                >
                  Pages
                  <ChevronDown
                    size={14}
                    className="navbar__chevron"
                  />
                </button>

                <PagesDropdown
                  open={pagesOpen}
                  onClose={() => setPagesOpen(false)}
                />
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `navbar__link ${
                      isActive ? "is-active" : ""
                    }`
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="navbar__right">
            <div className="navbar__search">
              <button
                type="button"
                className="navbar__search-button"
                aria-label="Open search"
                aria-expanded={searchOpen}
                onClick={() => {
                  setPagesOpen(false);
                  setServicesOpen(false);
                  setSearchOpen((value) => !value);
                }}
              >
                {searchOpen ? (
                  <X size={19} strokeWidth={2.1} />
                ) : (
                  <SearchIcon size={19} strokeWidth={2.1} />
                )}
              </button>

              {searchOpen && (
                <SearchComponent
                  onClose={() => setSearchOpen(false)}
                />
              )}
            </div>

            <Button
              to="/contact"
              size="sm"
              className="navbar__cta"
            >
              Get a Quote
            </Button>

            <button
              type="button"
              className={`navbar__burger ${
                mobileOpen ? "is-open" : ""
              }`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={
                mobileOpen ? handleMobileClose : handleMobileOpen
              }
            >
              <span className="navbar__burger-lines" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={handleMobileClose}
        pagesOpen={mobilePagesOpen}
        onTogglePages={() =>
          setMobilePagesOpen((value) => !value)
        }
        servicesOpen={mobileServicesOpen}
        onToggleServices={() =>
          setMobileServicesOpen((value) => !value)
        }
      />
    </>
  );
}
