"use client";

import Link from "next/link";
import { useEffect } from "react";

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  links: NavLink[];
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ links, open, onClose }: MobileNavProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed inset-y-0 right-0 z-50 w-80 max-w-full bg-[#0F172A] md:hidden flex flex-col shadow-2xl border-l border-white/10"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <span className="text-lg font-semibold text-white">Menu</span>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-white/60 hover:text-white"
            aria-label="Fechar menu"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-1 px-4 py-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex items-center rounded-md px-4 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-cyan"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="mt-auto px-6 py-6 border-t border-white/10">
          <Link
            href="/contato"
            onClick={onClose}
            className="block w-full rounded-md bg-cyan px-4 py-3 text-center text-sm font-semibold text-navy transition-opacity hover:opacity-90"
          >
            Fale Conosco
          </Link>
        </div>
      </div>
    </>
  );
}
