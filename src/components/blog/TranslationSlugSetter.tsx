'use client';

import { useEffect } from 'react';
import { useTranslationSlug } from '@/contexts/TranslationContext';

interface Props {
  translationSlug: string | null;
}

/**
 * Sets the translationSlug in context so the LanguageSwitcher
 * can build the correct cross-locale URL on blog post pages.
 */
export default function TranslationSlugSetter({ translationSlug }: Props) {
  const { setTranslationSlug } = useTranslationSlug();

  useEffect(() => {
    setTranslationSlug(translationSlug);
    return () => setTranslationSlug(null); // cleanup on unmount
  }, [translationSlug, setTranslationSlug]);

  return null;
}
