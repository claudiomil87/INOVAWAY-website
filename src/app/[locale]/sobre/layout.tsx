import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const BASE_URL = "https://inovaway.org";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.sobre" });
  const isEn = locale === "en";
  const path = "/sobre";
  const canonical = isEn ? `${BASE_URL}/en${path}` : `${BASE_URL}${path}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: {
        "pt-BR": `${BASE_URL}${path}`,
        en: `${BASE_URL}/en${path}`,
        "x-default": `${BASE_URL}${path}`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonical,
      type: "website",
      siteName: "INOVAWAY",
      locale: isEn ? "en_US" : "pt_BR",
      alternateLocale: isEn ? "pt_BR" : "en_US",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og-image.png"],
      creator: "@inovaway",
      site: "@inovaway",
    },
  };
}

export default function SobreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
