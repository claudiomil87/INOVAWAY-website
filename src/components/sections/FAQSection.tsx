"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { getFAQs } from "@/lib/faq-data";

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
      className="border-b"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-base font-medium text-white/90">{q}</span>
        <ChevronDown
          className="h-5 w-5 shrink-0 text-[#00FF41] transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-white/60">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface FAQSectionProps {
  slug?: string;
  /** Override title (uses translation key 'title' by default) */
  title?: string;
  /** Override gradient title segment (uses translation key 'titleGradient' by default) */
  titleGradient?: string;
}

export default function FAQSection({ slug, title, titleGradient }: FAQSectionProps) {
  const t = useTranslations("FAQSection");
  const locale = useLocale();

  // If a slug is provided and has matching FAQs, use them; otherwise fall back to translations
  const slugFAQs = slug ? getFAQs(slug, locale) : [];
  const useSlug = slug && slugFAQs.length > 0;

  type NormalizedFAQ = { question: string; answer: string };
  const translationFAQs: NormalizedFAQ[] = Array.from({ length: 5 }, (_, i) => ({
    question: t(`faqs.${i}.q`),
    answer: t(`faqs.${i}.a`),
  }));

  const faqs: NormalizedFAQ[] = useSlug ? slugFAQs : translationFAQs;

  const displayTitle = title ?? t("title");
  const displayGradient = titleGradient ?? t("titleGradient");

  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {displayTitle}{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #00FF41, #06B6D4)",
              }}
            >
              {displayGradient}
            </span>
          </h2>
        </motion.div>

        <div className="rounded-2xl border border-white/10 bg-[#1E293B]/50 px-6 md:px-10">
          {faqs.map((item, i) => (
            <FAQItem key={i} q={item.question} a={item.answer} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
