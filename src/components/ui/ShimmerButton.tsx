"use client";
import Link from "next/link";
import { ReactNode } from "react";

interface ShimmerButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function ShimmerButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: ShimmerButtonProps) {
  const base =
    "relative inline-flex items-center justify-center overflow-hidden rounded-lg px-8 py-4 text-base font-bold transition-all duration-300 select-none";

  const primaryStyle = {
    background: "linear-gradient(135deg, #00FF41, #00CC33)",
    color: "#0F172A",
    boxShadow: "0 0 0 transparent",
  };

  const secondaryStyle = {
    background: "transparent",
    border: "2px solid transparent",
    backgroundClip: "padding-box",
    color: "white",
  };

  const inner = (
    <span
      className={`${base} ${
        variant === "primary"
          ? "shimmer-btn hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,65,0.5)]"
          : "border border-white/20 bg-white/5 hover:border-[#00FF41]/60 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(0,255,65,0.2)]"
      } ${className}`}
      style={variant === "primary" ? primaryStyle : secondaryStyle}
    >
      {children}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {inner}
      </Link>
    );
  }

  return (
    <button onClick={onClick} type="button" className="inline-block">
      {inner}
    </button>
  );
}
