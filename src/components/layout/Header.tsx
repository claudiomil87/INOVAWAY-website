"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import MobileNav from "./MobileNav";

const navLinks = [
  { href: "/servicos", label: "Serviços" },
  { href: "/produtos", label: "Nosso Time" },
  { href: "/sobre", label: "Sobre nós" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const allNavLinks = [
    ...navLinks,
    { href: "/contato", label: "Você está pronto?" },
  ];

  return (
    <header
      className="fixed top-0 w-full z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(15, 23, 42, 0.95)"
          : "rgba(15, 23, 42, 0.9)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 group"
        >
          <Image
            src="/logos/inovaway-wordmark.png"
            alt="INOVAWAY"
            width={140}
            height={40}
            priority
            className="h-9 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.6)]"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-white/70 transition-colors hover:text-white group py-1"
            >
              {link.label}
              {/* Animated underline */}
              <span
                className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                style={{ backgroundColor: "#00FF41" }}
              />
            </Link>
          ))}
          {/* "Você está pronto?" — destaque especial */}
          <Link
            href="/contato"
            className="relative text-sm font-semibold py-1 group transition-all duration-300"
            style={{ color: "#00FF41", textShadow: "0 0 8px rgba(0,255,65,0.4)" }}
          >
            Você está pronto?
            <span
              className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
              style={{ backgroundColor: "#00FF41" }}
            />
          </Link>
        </nav>

        {/* CTA — desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contato"
            className="rounded-lg px-4 py-2 text-sm font-bold transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #00FF41, #06B6D4)",
              color: "#0F172A",
            }}
          >
            Começar agora →
          </Link>
        </div>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden flex flex-col items-center justify-center gap-[5px] rounded-md p-2 text-white/70 hover:text-white w-10 h-10"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          <span
            className="block h-0.5 w-5 bg-current transition-all duration-300 origin-center"
            style={{
              transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }}
          />
          <span
            className="block h-0.5 w-5 bg-current transition-all duration-300"
            style={{ opacity: mobileOpen ? 0 : 1, transform: mobileOpen ? "translateX(-8px)" : "none" }}
          />
          <span
            className="block h-0.5 w-5 bg-current transition-all duration-300 origin-center"
            style={{
              transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      <MobileNav
        links={allNavLinks}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}
