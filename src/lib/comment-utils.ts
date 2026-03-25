/**
 * Comment Utilities — Spam Detection, Rate Limiting, Sanitization
 */

// ─── Spam Detection ──────────────────────────────────────────────────────────

const SPAM_KEYWORDS = [
  'buy now', 'click here', 'free money', 'make money fast',
  'lose weight', 'casino', 'poker', 'viagra', 'cialis',
  'enlarge', 'adult content', 'xxx', 'payday loan',
  'crypto investment', 'guaranteed profit', 'binary options',
];

const MAX_LINKS_ALLOWED = 3;
const URL_PATTERN = /https?:\/\/[^\s]+/gi;

export interface SpamCheckResult {
  isSpam: boolean;
  reason?: string;
}

/**
 * Basic spam check for comment content.
 * Returns { isSpam: false } if content is clean.
 */
export function checkSpam(content: string): SpamCheckResult {
  const lower = content.toLowerCase();

  // Check for excessive links
  const links = content.match(URL_PATTERN) || [];
  if (links.length > MAX_LINKS_ALLOWED) {
    return { isSpam: true, reason: `Too many links: ${links.length}` };
  }

  // Check for spam keywords
  for (const keyword of SPAM_KEYWORDS) {
    if (lower.includes(keyword)) {
      return { isSpam: true, reason: `Spam keyword detected: ${keyword}` };
    }
  }

  return { isSpam: false };
}

// ─── Input Sanitization ──────────────────────────────────────────────────────

/**
 * Strips HTML tags and dangerous characters for XSS prevention.
 * Does NOT strip markdown — content is rendered as plain text in the frontend.
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // strip script tags
    .replace(/<[^>]*>/g, '') // strip all HTML tags
    .replace(/javascript:/gi, '') // strip JS protocol
    .replace(/on\w+\s*=/gi, '') // strip event handlers
    .trim();
}

/**
 * Validates an email address.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Extracts the client IP from a Next.js request.
 */
export function getClientIp(request: Request): string | null {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || null;
}
