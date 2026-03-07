import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Script from "next/script";

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

export const viewport: Viewport = {
  themeColor: "#0F172A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://inovaway.org"),
  title: {
    default: "INOVAWAY — AI Agents que trabalham 24/7 para seu negócio",
    template: "%s | INOVAWAY",
  },
  description:
    "Agência de AI Agents autônomos. Sites, chatbots, automações e mais — entregues em horas, não semanas.",
  keywords: [
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
  authors: [{ name: "INOVAWAY", url: "https://inovaway.org" }],
  creator: "INOVAWAY",
  publisher: "INOVAWAY",
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
    locale: "pt_BR",
    url: "https://inovaway.org",
    siteName: "INOVAWAY",
    title: "INOVAWAY — AI Agents que trabalham 24/7 para seu negócio",
    description:
      "Agência de AI Agents autônomos. Sites, chatbots, automações e mais — entregues em horas, não semanas.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "INOVAWAY — AI Agents 24/7",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "INOVAWAY — AI Agents que trabalham 24/7 para seu negócio",
    description:
      "Agência de AI Agents autônomos. Sites, chatbots, automações e mais — entregues em horas, não semanas.",
    images: ["/og-image.png"],
    creator: "@inovaway",
    site: "@inovaway",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "INOVAWAY",
  url: "https://inovaway.org",
  logo: "https://inovaway.org/logo.png",
  description:
    "Agência de AI Agents autônomos. Sites, chatbots, automações e mais — entregues em horas, não semanas.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "Portuguese",
  },
  sameAs: ["https://instagram.com/inovaway", "https://linkedin.com/company/inovaway"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "INOVAWAY",
  url: "https://inovaway.org",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://inovaway.org/?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
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
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
