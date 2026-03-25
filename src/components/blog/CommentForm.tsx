'use client';

import { useState, useEffect, useRef } from 'react';

// ── Turnstile types (no npm package needed — loaded via script tag) ──────────
declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId: string) => string | undefined;
    };
  }
}

interface OptimisticFormData {
  author_name: string;
  author_email: string;
  author_company?: string;
  content: string;
  consent_lgpd: boolean;
  consent_marketing: boolean;
  website: string;
  _ts: number;
  _turnstile?: string;
  parent_id?: string;
}

interface CommentFormProps {
  postSlug: string;
  locale: string;
  parentId?: string;
  /** New optimistic submit handler from BlogComments */
  onOptimisticSubmit?: (data: OptimisticFormData, onReset: () => void) => Promise<void>;
  /** Legacy success callback — kept for backwards compat with reply forms */
  onSuccess?: () => void;
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();

export default function CommentForm({
  postSlug,
  locale,
  parentId,
  onOptimisticSubmit,
  onSuccess,
}: CommentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    author_name: '',
    author_email: '',
    author_company: '',
    content: '',
    consent_lgpd: true,
    consent_marketing: false,
    website: '', // honeypot
  });

  // Timing honeypot: record when the form was mounted
  const formLoadTime = useRef<number>(Date.now());

  // Turnstile widget
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | undefined>(undefined);

  // Load Turnstile script if site key is configured
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;

    const scriptId = 'cf-turnstile-script';
    if (document.getElementById(scriptId)) {
      // Script already loaded — render widget if container exists
      if (turnstileRef.current && !turnstileWidgetId.current && window.turnstile) {
        turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: 'dark',
          callback: (token: string) => setTurnstileToken(token),
          'expired-callback': () => setTurnstileToken(undefined),
        });
      }
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (turnstileRef.current && window.turnstile) {
        turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: 'dark',
          callback: (token: string) => setTurnstileToken(token),
          'expired-callback': () => setTurnstileToken(undefined),
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const resetForm = () => {
    setFormData({
      author_name: '',
      author_email: '',
      author_company: '',
      content: '',
      consent_lgpd: true,
      consent_marketing: false,
      website: '',
    });
    setTurnstileToken(undefined);
    formLoadTime.current = Date.now(); // reset timing
    if (turnstileWidgetId.current && window.turnstile) {
      window.turnstile.reset(turnstileWidgetId.current);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.consent_lgpd) return;
    if (!formData.content.trim()) return;

    setIsSubmitting(true);

    const submitData: OptimisticFormData = {
      author_name: formData.author_name,
      author_email: formData.author_email,
      author_company: formData.author_company || undefined,
      content: formData.content,
      consent_lgpd: formData.consent_lgpd,
      consent_marketing: formData.consent_marketing,
      website: formData.website,
      _ts: formLoadTime.current,
      _turnstile: turnstileToken,
      parent_id: parentId,
    };

    try {
      if (onOptimisticSubmit) {
        await onOptimisticSubmit(submitData, () => {
          resetForm();
          onSuccess?.();
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Classic honeypot — hidden from users, bots fill it */}
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        style={{ position: 'absolute', left: '-9999px', opacity: 0, tabIndex: -1 } as React.CSSProperties}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Timing honeypot — hidden timestamp (no user interaction needed) */}
      <input type="hidden" name="_ts" value={formLoadTime.current} readOnly />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="author_name" className="block text-sm font-medium text-slate-400 mb-1">
            {locale === 'pt' ? 'Nome *' : 'Name *'}
          </label>
          <input
            type="text"
            id="author_name"
            name="author_name"
            value={formData.author_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-colors"
            placeholder={locale === 'pt' ? 'Seu nome' : 'Your name'}
          />
        </div>

        <div>
          <label htmlFor="author_email" className="block text-sm font-medium text-slate-400 mb-1">
            {locale === 'pt' ? 'Email *' : 'Email *'}
          </label>
          <input
            type="email"
            id="author_email"
            name="author_email"
            value={formData.author_email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-colors"
            placeholder={locale === 'pt' ? 'seu@email.com' : 'your@email.com'}
          />
        </div>
      </div>

      <div>
        <label htmlFor="author_company" className="block text-sm font-medium text-slate-400 mb-1">
          {locale === 'pt' ? 'Empresa (opcional)' : 'Company (optional)'}
        </label>
        <input
          type="text"
          id="author_company"
          name="author_company"
          value={formData.author_company}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-colors"
          placeholder={locale === 'pt' ? 'Sua empresa' : 'Your company'}
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-slate-400 mb-1">
          {locale === 'pt' ? 'Comentário *' : 'Comment *'}
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-colors resize-vertical"
          placeholder={locale === 'pt' ? 'Escreva seu comentário...' : 'Write your comment...'}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <input
            id="consent_lgpd"
            name="consent_lgpd"
            type="checkbox"
            checked={formData.consent_lgpd}
            onChange={handleChange}
            required
            className="mt-0.5 w-4 h-4 accent-cyan-500 bg-slate-900/50 border-slate-700 rounded cursor-pointer"
          />
          <label htmlFor="consent_lgpd" className="text-sm text-slate-400 cursor-pointer leading-relaxed">
            {locale === 'pt'
              ? 'Aceito os termos de privacidade e autorizo o tratamento dos meus dados conforme a LGPD. *'
              : 'I accept the privacy terms and authorize the processing of my data according to GDPR. *'}
          </label>
        </div>

        <div className="flex items-start gap-3">
          <input
            id="consent_marketing"
            name="consent_marketing"
            type="checkbox"
            checked={formData.consent_marketing}
            onChange={handleChange}
            className="mt-0.5 w-4 h-4 accent-cyan-500 bg-slate-900/50 border-slate-700 rounded cursor-pointer"
          />
          <label htmlFor="consent_marketing" className="text-sm text-slate-400 cursor-pointer leading-relaxed">
            {locale === 'pt'
              ? 'Quero receber conteúdos e novidades da INOVAWAY (opcional)'
              : 'I want to receive content and news from INOVAWAY (optional)'}
          </label>
        </div>
      </div>

      {/* Cloudflare Turnstile — rendered only if NEXT_PUBLIC_TURNSTILE_SITE_KEY is set */}
      {TURNSTILE_SITE_KEY && (
        <div ref={turnstileRef} className="cf-turnstile" />
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg px-6 py-3 text-base font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, #00FF41, #06B6D4)",
            color: "#0F172A",
          }}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {locale === 'pt' ? 'Enviando...' : 'Sending...'}
            </span>
          ) : locale === 'pt' ? (
            'Enviar Comentário'
          ) : (
            'Send Comment'
          )}
        </button>
      </div>
    </form>
  );
}
