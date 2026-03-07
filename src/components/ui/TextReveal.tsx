"use client";
import { motion } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
}

export default function TextReveal({ children, className = "" }: TextRevealProps) {
  const words = children.split(" ");

  return (
    <span className={`inline-flex flex-wrap gap-x-2 ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.07 }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
