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
      // Blog redirects (slug PT -> EN)
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

      // SEO Content Pruning — ROI Cluster
      {
        source: '/blog/roi-ia-empresas-brasileiras-dados-estatisticas-reais',
        destination: '/blog/roi-ai-agents-numeros-reais',
        permanent: true,
      },
      {
        source: '/en/blog/ai-roi-brazilian-companies-real-data-statistics',
        destination: '/en/blog/ai-agents-roi-real-numbers',
        permanent: true,
      },
      {
        source: '/blog/como-medir-roi-ia-empresa-kpis-praticos-pmes',
        destination: '/blog/roi-ai-agents-numeros-reais',
        permanent: true,
      },
      {
        source: '/en/blog/how-measure-ai-roi-company-kpis-smes',
        destination: '/en/blog/ai-agents-roi-real-numbers',
        permanent: true,
      },

      // SEO Content Pruning — Custo/TCO Cluster
      {
        source: '/blog/quanto-custa-implementar-ia-empresa-planos-precos',
        destination: '/blog/quanto-custa-implementar-ai-agents',
        permanent: true,
      },
      {
        source: '/en/blog/how-much-cost-implement-ai-company-pricing-plans',
        destination: '/en/blog/how-much-ai-agents-cost',
        permanent: true,
      },
      {
        source: '/blog/tco-ia-custo-total-real-alem-preco-ferramenta',
        destination: '/blog/quanto-custa-implementar-ai-agents',
        permanent: true,
      },
      {
        source: '/en/blog/ai-tco-total-cost-ownership-beyond-tool-price',
        destination: '/en/blog/how-much-ai-agents-cost',
        permanent: true,
      },

      // SEO Content Pruning — Multi-agent Cluster
      {
        source: '/blog/multiagentes-ia-equipes-agentes-problemas-complexos',
        destination: '/blog/multi-agent-ai-protocolos-mcp-a2a-roi',
        permanent: true,
      },
      {
        source: '/en/blog/multi-agent-ai-teams-solving-complex-problems',
        destination: '/en/blog/multi-agent-ai-protocols-mcp-a2a-roi',
        permanent: true,
      },

      // SEO Content Pruning — Plataformas Cluster
      {
        source: '/blog/como-escolher-plataforma-agentes-ia-empresa',
        destination: '/blog/plataformas-agentes-ia-gratuitas-pmes',
        permanent: true,
      },
      {
        source: '/en/blog/how-to-choose-ai-agent-platform-business',
        destination: '/en/blog/free-ai-agent-platforms-small-business',
        permanent: true,
      },
      {
        source: '/blog/ia-pequenas-empresas-sem-programacao-ferramentas',
        destination: '/blog/plataformas-agentes-ia-gratuitas-pmes',
        permanent: true,
      },
      {
        source: '/en/blog/ai-small-business-no-code-accessible-tools',
        destination: '/en/blog/free-ai-agent-platforms-small-business',
        permanent: true,
      },

      // SEO Content Pruning — Saúde Cluster
      {
        source: '/blog/agente-ia-clinica-medica-agendamentos-automaticos',
        destination: '/blog/ia-saude-automacao-hospitalar-atendimento-paciente',
        permanent: true,
      },
      {
        source: '/en/blog/ai-agent-medical-clinic-automated-scheduling',
        destination: '/en/blog/ai-healthcare-hospital-automation-patient-care',
        permanent: true,
      },
      // SEO: Slugs em inglês redirecionam para slugs em português no locale EN
      {
        source: '/en/contact',
        destination: '/en/contato',
        permanent: true,
      },
      {
        source: '/en/about',
        destination: '/en/sobre',
        permanent: true,
      },
      {
        source: '/en/services',
        destination: '/en/servicos',
        permanent: true,
      },
      {
        source: '/en/products',
        destination: '/en/produtos',
        permanent: true,
      },
      {
        source: '/en/privacy',
        destination: '/en/privacidade',
        permanent: true,
      },
      {
        source: '/en/terms',
        destination: '/en/termos',
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
