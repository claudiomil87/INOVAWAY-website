"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

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
  const [mounted, setMounted] = useState(false);

  // Wait for client mount (portal needs document.body)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key + lock body scroll
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

  if (!open || !mounted) return null;

  // Use createPortal to render OUTSIDE the header (avoids backdrop-filter stacking context issues)
  return createPortal(
    <>
      {/* Overlay — covers entire screen */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9998,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      />

      {/* Drawer — solid background, all inline styles for maximum reliability */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "320px",
          maxWidth: "85vw",
          zIndex: 9999,
          backgroundColor: "#0F172A",
          boxShadow: "-8px 0 32px rgba(0, 0, 0, 0.5)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            backgroundColor: "#0F172A",
          }}
        >
          <span
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#FFFFFF",
            }}
          >
            Menu
          </span>
          <button
            onClick={onClose}
            aria-label="Fechar menu"
            style={{
              padding: "4px",
              color: "rgba(255, 255, 255, 0.6)",
              cursor: "pointer",
              background: "none",
              border: "none",
            }}
          >
            <svg
              width="24"
              height="24"
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

        {/* Navigation links */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            padding: "24px 16px",
            backgroundColor: "#0F172A",
            flex: 1,
          }}
        >
          {links.map((link) => {
            const isHighlight = link.label === "Você está pronto?";
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "14px 16px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: isHighlight ? 700 : 500,
                  color: isHighlight ? "#00FF41" : "rgba(255, 255, 255, 0.85)",
                  textDecoration: "none",
                  transition: "background-color 0.2s",
                  textShadow: isHighlight
                    ? "0 0 8px rgba(0, 255, 65, 0.4)"
                    : "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA button at bottom */}
        <div
          style={{
            padding: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            backgroundColor: "#0F172A",
            marginTop: "auto",
          }}
        >
          <Link
            href="/contato"
            onClick={onClose}
            style={{
              display: "block",
              width: "100%",
              padding: "14px 16px",
              borderRadius: "8px",
              textAlign: "center",
              fontSize: "15px",
              fontWeight: 700,
              backgroundColor: "#00FF41",
              color: "#0F172A",
              textDecoration: "none",
              boxShadow: "0 0 20px rgba(0, 255, 65, 0.3)",
            }}
          >
            Começar agora →
          </Link>
        </div>
      </div>
    </>,
    document.body
  );
}
