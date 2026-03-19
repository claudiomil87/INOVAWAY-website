'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface TranslationContextValue {
  translationSlug: string | null;
  setTranslationSlug: (slug: string | null) => void;
}

const TranslationContext = createContext<TranslationContextValue>({
  translationSlug: null,
  setTranslationSlug: () => {},
});

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [translationSlug, setTranslationSlug] = useState<string | null>(null);

  return (
    <TranslationContext.Provider value={{ translationSlug, setTranslationSlug }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslationSlug() {
  return useContext(TranslationContext);
}
