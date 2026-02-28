"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/utils";
import {
  PRACTICE_NAME,
  PHONE_LAFAYETTE,
  NAV_LINKS,
  SERVICE_LINKS,
} from "@/app/lib/constants";

// ─── Header Component ────────────────────────────────────────────────────────

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // ─── Scroll detection ────────────────────────────────────────────────────

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── Body scroll lock when mobile menu is open ───────────────────────────

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // ─── Close mobile menu on route change ───────────────────────────────────

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  }, [pathname]);

  // ─── Close services dropdown on outside click ────────────────────────────

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isServicesOpen &&
        servicesButtonRef.current &&
        servicesDropdownRef.current &&
        !servicesButtonRef.current.contains(e.target as Node) &&
        !servicesDropdownRef.current.contains(e.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isServicesOpen]);

  // ─── Escape key closes menus ─────────────────────────────────────────────

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
          hamburgerRef.current?.focus();
        }
        if (isServicesOpen) {
          setIsServicesOpen(false);
          servicesButtonRef.current?.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, isServicesOpen]);

  // ─── Focus trap for mobile menu ──────────────────────────────────────────

  useEffect(() => {
    if (!isMobileMenuOpen || !mobileMenuRef.current) return;

    const menu = mobileMenuRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = menu.querySelectorAll(focusableSelector);
      if (focusableElements.length === 0) return;

      const first = focusableElements[0] as HTMLElement;
      const last = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);

    // Focus the close button when menu opens
    const closeButton = menu.querySelector("button") as HTMLElement;
    if (closeButton) {
      closeButton.focus();
    }

    return () => document.removeEventListener("keydown", handleTab);
  }, [isMobileMenuOpen]);

  // ─── Toggle handlers ─────────────────────────────────────────────────────

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const toggleServices = useCallback(() => {
    setIsServicesOpen((prev) => !prev);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const phoneHref = `tel:${PHONE_LAFAYETTE.replace(/[^\d+]/g, "")}`;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/80 shadow-sm backdrop-blur-xl"
          : "bg-white/95"
      )}
    >
      <nav
        className="container flex items-center justify-between py-4 lg:py-5"
        aria-label="Main navigation"
      >
        {/* ── Logo ──────────────────────────────────────────────────────── */}
        <Link
          href="/"
          className="group relative z-50 flex items-baseline gap-1.5"
          aria-label={`${PRACTICE_NAME} — Home`}
        >
          <span className="font-heading text-xl font-bold tracking-tight text-navy-800 transition-colors duration-200 group-hover:text-navy-700 lg:text-2xl">
            Acadiana
          </span>
          <span className="font-heading text-xl font-light tracking-tight text-gold-500 transition-colors duration-200 group-hover:text-gold-400 lg:text-2xl">
            Endodontics
          </span>
        </Link>

        {/* ── Desktop Nav (lg+) ─────────────────────────────────────────── */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) =>
            link.label === "Services" ? (
              <div key={link.href} className="relative">
                <button
                  ref={servicesButtonRef}
                  onClick={toggleServices}
                  onMouseEnter={() => setIsServicesOpen(true)}
                  className={cn(
                    "group relative flex items-center gap-1 px-4 py-2 font-heading text-sm font-medium tracking-wide transition-colors duration-200",
                    isActive(link.href)
                      ? "text-navy-800"
                      : "text-navy-600 hover:text-navy-800"
                  )}
                  aria-expanded={isServicesOpen}
                  aria-haspopup="true"
                >
                  {link.label}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      isServicesOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {/* Underline hover animation */}
                  <span
                    className={cn(
                      "absolute bottom-0 left-4 right-4 h-0.5 origin-left rounded-full bg-gold-400 transition-transform duration-300",
                      isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </button>

                {/* Services dropdown */}
                <div
                  ref={servicesDropdownRef}
                  onMouseLeave={() => setIsServicesOpen(false)}
                  className={cn(
                    "absolute left-0 top-full z-50 mt-1 w-64 origin-top-left rounded-xl border border-steel-100 bg-white py-2 shadow-xl transition-all duration-200",
                    isServicesOpen
                      ? "visible scale-100 opacity-100"
                      : "invisible scale-95 opacity-0"
                  )}
                  role="menu"
                >
                  {/* View all services link */}
                  <Link
                    href="/services"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-navy-800 transition-colors duration-150 hover:bg-gold-50 hover:text-gold-600"
                    role="menuitem"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    All Services
                  </Link>
                  <div className="mx-4 my-1 border-t border-steel-100" />
                  {SERVICE_LINKS.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className={cn(
                        "block px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-gold-50 hover:text-gold-600",
                        pathname === service.href
                          ? "font-medium text-navy-800"
                          : "text-navy-600"
                      )}
                      role="menuitem"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative px-4 py-2 font-heading text-sm font-medium tracking-wide transition-colors duration-200",
                  isActive(link.href)
                    ? "text-navy-800"
                    : "text-navy-600 hover:text-navy-800"
                )}
              >
                {link.label}
                {/* Underline hover animation */}
                <span
                  className={cn(
                    "absolute bottom-0 left-4 right-4 h-0.5 origin-left rounded-full bg-gold-400 transition-transform duration-300",
                    isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            )
          )}
        </div>

        {/* ── Desktop Right: Phone + CTA ────────────────────────────────── */}
        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={phoneHref}
            className="flex items-center gap-2 font-heading text-sm font-medium text-navy-700 transition-colors duration-200 hover:text-gold-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-.65 1.548l-.944.63a.506.506 0 00-.109.67 11.04 11.04 0 005.13 5.13.506.506 0 00.67-.109l.63-.944a1.5 1.5 0 011.548-.65l3.223.716A1.5 1.5 0 0118 14.852V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                clipRule="evenodd"
              />
            </svg>
            {PHONE_LAFAYETTE}
          </a>
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gold-400 px-5 py-2.5 font-heading text-sm font-semibold text-navy-900 shadow-sm transition-all duration-300 hover:bg-gold-500 hover:shadow-md hover:shadow-gold-400/25"
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Request Appointment</span>
          </Link>
        </div>

        {/* ── Mobile Hamburger ──────────────────────────────────────────── */}
        <button
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-navy-50 lg:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className="flex w-5 flex-col items-center gap-1">
            <span
              className={cn(
                "block h-0.5 w-full rounded-full bg-navy-800 transition-all duration-300",
                isMobileMenuOpen && "translate-y-1.5 rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-full rounded-full bg-navy-800 transition-all duration-300",
                isMobileMenuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-full rounded-full bg-navy-800 transition-all duration-300",
                isMobileMenuOpen && "-translate-y-1.5 -rotate-45"
              )}
            />
          </div>
        </button>
      </nav>

      {/* ── Mobile Menu Drawer ────────────────────────────────────────────── */}

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-navy-900/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isMobileMenuOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className={cn(
          "fixed right-0 top-0 z-40 flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-steel-100 px-6 py-5">
          <span className="font-heading text-lg font-bold tracking-tight text-navy-800">
            Menu
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-navy-600 transition-colors duration-200 hover:bg-navy-50 hover:text-navy-800"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Drawer links */}
        <div className="flex-1 px-6 py-6">
          <ul className="space-y-1">
            {NAV_LINKS.map((link, i) =>
              link.label === "Services" ? (
                <li
                  key={link.href}
                  className={cn(
                    "animate-fade-up",
                    `delay-${i + 1}`
                  )}
                  style={{ animationFillMode: "both" }}
                >
                  <button
                    onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-4 py-3 font-heading text-base font-medium tracking-wide transition-colors duration-200",
                      isActive(link.href)
                        ? "bg-gold-50 text-navy-800"
                        : "text-navy-700 hover:bg-gray-50"
                    )}
                    aria-expanded={isMobileServicesOpen}
                  >
                    {link.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={cn(
                        "h-5 w-5 transition-transform duration-200",
                        isMobileServicesOpen && "rotate-180"
                      )}
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {/* Mobile services sub-links */}
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      isMobileServicesOpen
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-gold-200 pl-4">
                      <Link
                        href="/services"
                        className="block rounded-md px-3 py-2 text-sm font-semibold text-navy-800 transition-colors duration-150 hover:bg-gold-50"
                      >
                        All Services
                      </Link>
                      {SERVICE_LINKS.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className={cn(
                            "block rounded-md px-3 py-2 text-sm transition-colors duration-150 hover:bg-gold-50",
                            pathname === service.href
                              ? "font-medium text-navy-800"
                              : "text-navy-600"
                          )}
                        >
                          {service.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              ) : (
                <li
                  key={link.href}
                  className={cn(
                    "animate-fade-up",
                    `delay-${i + 1}`
                  )}
                  style={{ animationFillMode: "both" }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-lg px-4 py-3 font-heading text-base font-medium tracking-wide transition-colors duration-200",
                      isActive(link.href)
                        ? "bg-gold-50 text-navy-800"
                        : "text-navy-700 hover:bg-gray-50"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Drawer footer: Phone + CTA */}
        <div className="border-t border-steel-100 px-6 py-6">
          <a
            href={phoneHref}
            className="mb-4 flex items-center gap-3 rounded-lg px-4 py-3 text-navy-700 transition-colors duration-200 hover:bg-navy-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-gold-500"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-.65 1.548l-.944.63a.506.506 0 00-.109.67 11.04 11.04 0 005.13 5.13.506.506 0 00.67-.109l.63-.944a1.5 1.5 0 011.548-.65l3.223.716A1.5 1.5 0 0118 14.852V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-heading text-sm font-medium">
              {PHONE_LAFAYETTE}
            </span>
          </a>
          <Link
            href="/contact"
            className="btn btn-secondary w-full justify-center text-center"
          >
            Request Appointment
          </Link>
        </div>
      </div>
    </header>
  );
}
