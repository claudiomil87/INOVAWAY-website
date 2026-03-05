import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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

export const metadata: Metadata = {
  title: {
    default: "INOVAWAY — Tecnologia que transforma",
    template: "%s | INOVAWAY",
  },
  description:
    "INOVAWAY é uma empresa de tecnologia especializada em soluções inovadoras para negócios digitais.",
  keywords: ["tecnologia", "inovação", "software", "digital", "INOVAWAY"],
  authors: [{ name: "INOVAWAY" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "INOVAWAY",
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
      <body className="min-h-screen bg-navy font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
