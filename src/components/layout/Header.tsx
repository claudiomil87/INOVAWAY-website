"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileNav from "./MobileNav";

const navLinks = [
  { href: "/servicos", label: "Serviços" },
  { href: "/produtos", label: "Produtos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-navy/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logos/inovaway-transparent.png"
            alt="INOVAWAY"
            width={140}
            height={40}
            priority
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-cyan"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button — desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contato"
            className="rounded-md bg-cyan px-4 py-2 text-sm font-semibold text-navy transition-opacity hover:opacity-90"
          >
            Fale Conosco
          </Link>
        </div>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden flex items-center justify-center rounded-md p-2 text-white/70 hover:text-white"
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      <MobileNav
        links={navLinks}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}
