import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const BASE_URL = "https://inovaway.org";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  const title = isEn
    ? "INOVAWAY — Your 24/7 AI Team"
    : "INOVAWAY — AI Agents que trabalham 24/7 para seu negócio";
  const description = isEn
    ? "AI agency for small and medium businesses. Websites, marketing, security and automation. Results in 30 days."
    : "Agência de AI Agents autônomos. Sites, chatbots, automações e mais — entregues em horas, não semanas.";

  const canonical = isEn ? `${BASE_URL}/en` : BASE_URL;

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: title,
      template: "%s | INOVAWAY",
    },
    description,
    keywords: isEn
      ? [
          "AI Agents",
          "automation",
          "chatbot",
          "websites",
          "artificial intelligence",
          "INOVAWAY",
          "digital agency",
          "AI",
          "sales funnel",
        ]
      : [
          "AI Agents",
          "automação",
          "chatbot",
          "sites",
          "inteligência artificial",
          "INOVAWAY",
          "agência digital",
          "IA",
          "funil de vendas",
        ],
    authors: [{ name: "INOVAWAY", url: BASE_URL }],
    creator: "INOVAWAY",
    publisher: "INOVAWAY",
    alternates: {
      canonical,
      languages: {
        "pt-BR": BASE_URL,
        en: `${BASE_URL}/en`,
        "x-default": BASE_URL,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "INOVAWAY",
      title,
      description,
      locale: isEn ? "en_US" : "pt_BR",
      alternateLocale: isEn ? "pt_BR" : "en_US",
      images: [
        {
          url: isEn ? "/og-en.png" : "/og-pt.png",
          width: 1200,
          height: 630,
          alt: isEn ? "INOVAWAY — Your 24/7 AI Team" : "INOVAWAY — Seu Time de IA 24/7",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [isEn ? "/og-en.png" : "/og-pt.png"],
      creator: "@inovaway",
      site: "@inovaway",
    },
    manifest: "/manifest.json",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "32x32" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
  };
}

function getOrganizationSchema(locale: string) {
  const description = locale === "en"
    ? "AI agency for small and medium businesses. Websites, chatbots, automations and more — delivered in hours, not weeks."
    : "Agência de AI Agents autônomos. Sites, chatbots, automações e mais — entregues em horas, não semanas.";
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "INOVAWAY",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Portuguese", "English"],
    },
    sameAs: ["https://instagram.com/inovaway", "https://linkedin.com/company/inovaway"],
  };
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "INOVAWAY",
  url: BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure the locale is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const htmlLang = locale === "pt" ? "pt-BR" : locale;
  const organizationSchema = getOrganizationSchema(locale);

  return (
    <html
      lang={htmlLang}
      className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen bg-navy font-sans antialiased overflow-x-hidden">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 overflow-x-hidden">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
