'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const targetLocale = locale === 'pt' ? 'en' : 'pt';
  const label = locale === 'pt' ? '🇺🇸 EN' : '🇧🇷 PT';

  function handleSwitch() {
    // Save cookie for 1 year
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;

    startTransition(() => {
      router.replace(pathname, { locale: targetLocale });
    });
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