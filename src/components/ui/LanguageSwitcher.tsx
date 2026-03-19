'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslationSlug } from '@/contexts/TranslationContext';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const [isPending, setIsPending] = useState(false);
  const { translationSlug } = useTranslationSlug();

  const targetLocale = locale === 'pt' ? 'en' : 'pt';
  const label = locale === 'pt' ? '🇺🇸 EN' : '🇧🇷 PT';

  function handleSwitch() {
    if (isPending) return;
    setIsPending(true);

    // Save cookie for 1 year
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;

    const currentPath = window.location.pathname;
    let newPath: string;

    // Check if we're on a blog post page and have a translationSlug
    // Blog post pattern: /blog/[slug] (PT) or /en/blog/[slug] (EN)
    const blogPostMatch = currentPath.match(/^(\/en)?\/blog\/([^/]+)\/?$/);

    if (blogPostMatch && translationSlug) {
      // Use the translationSlug for cross-locale navigation
      if (targetLocale === 'en') {
        newPath = `/en/blog/${translationSlug}`;
      } else {
        newPath = `/blog/${translationSlug}`;
      }
    } else {
      // Default behavior for non-blog-post pages
      if (targetLocale === 'en') {
        const cleanPath = currentPath.replace(/^\/en(\/|$)/, '/');
        newPath = `/en${cleanPath === '/' ? '' : cleanPath}`;
      } else {
        newPath = currentPath.replace(/^\/en(\/|$)/, '/') || '/';
      }
    }

    window.location.href = newPath;
  }

  return (
    <motion.button
      onClick={handleSwitch}
      disabled={isPending}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '6px 12px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        background: 'transparent',
        color: isPending ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.85)',
        fontSize: '13px',
        fontWeight: 600,
        cursor: isPending ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        letterSpacing: '0.02em',
      }}
      onMouseEnter={(e) => {
        if (!isPending) {
          e.currentTarget.style.borderColor = '#00FF41';
          e.currentTarget.style.color = '#00FF41';
          e.currentTarget.style.boxShadow = '0 0 12px rgba(0, 255, 65, 0.25)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        e.currentTarget.style.color = isPending ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.85)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      aria-label={`Switch to ${targetLocale.toUpperCase()}`}
    >
      {label}
    </motion.button>
  );
}
