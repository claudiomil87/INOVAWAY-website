import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "img-src 'self' data: https:",
      "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com https://challenges.cloudflare.com https://iqrucqeanmbdpscohtoj.supabase.co",
      "frame-src 'self' https://challenges.cloudflare.com",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "base-uri 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/en/blog/ia-para-vendas-whatsapp',
        destination: '/en/blog/ai-whatsapp-sales-guide-2026',
        permanent: true,
      },
      {
        source: '/en/blog/ai-agents-hotelaria-hospitalidade',
        destination: '/en/blog/ai-agents-hospitality-hotels-2026',
        permanent: true,
      },
      {
        source: '/en/blog/ai-agents-restaurantes-negocios-locais',
        destination: '/en/blog/ai-agents-restaurants-local-business-2026',
        permanent: true,
      },
    ];
  },

  webpack(config) {
    config.plugins = config.plugins || [];
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { VeliteWebpackPlugin } = require("velite/webpack");
    config.plugins.unshift(new VeliteWebpackPlugin());

    // Resolve @velite alias to the generated velite output directory
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@velite": require("path").resolve(__dirname, ".velite"),
    };

    return config;
  },
};

export default withNextIntl(nextConfig);
