import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getDictionary, locales, defaultLocale, type Locale } from "@/dictionaries";
import { notFound } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
  const dict = await getDictionary(locale);
  const baseUrl = "https://yudhahafiz.com";
  const canonical = locale === "id" ? baseUrl : `${baseUrl}/en`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: dict.metadata.home.title,
      template: `%s | Yudha Hafiz`,
    },
    description: dict.metadata.home.description,
    keywords: [
      "Yudha Hafiz",
      "Yudha Hafiz developer",
      "Yudha Hafiz fullstack",
      "AI developer Indonesia",
      "fullstack developer Indonesia",
      "web developer Indonesia",
      "Next.js developer",
    ],
    authors: [{ name: "Yudha Hafiz", url: baseUrl }],
    creator: "Yudha Hafiz",
    openGraph: {
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
      url: canonical,
      siteName: "Yudha Hafiz",
      title: dict.metadata.home.title,
      description: dict.metadata.home.description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Yudha Hafiz — Fullstack Developer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.home.title,
      description: dict.metadata.home.description,
      images: ["/og-image.png"],
      creator: "@yudhahafiz",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/images/apple-touch-icon.png" }],
    },
    alternates: {
      canonical,
      languages: {
        "id": baseUrl,
        "en": `${baseUrl}/en`,
      },
    },
  };
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yudha Hafiz",
  jobTitle: "Fullstack Developer",
  url: "https://yudhahafiz.com",
  description: "Fullstack Developer specializing in Web Apps, Automation, and AI Integration",
  sameAs: [
    "https://github.com/Blawness",
    "https://www.linkedin.com/in/yudha-hafiz/",
    "https://www.instagram.com/yudha_hafiz",
  ],
  knowsAbout: ["Next.js", "TypeScript", "React", "Node.js", "AI Integration", "Web Automation"],
};

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;

  if (!locales.includes(lang as Locale)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} className={`${inter.variable} overflow-x-hidden`} data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased overflow-x-hidden">
        <Navbar dict={dict} lang={locale} />
        <main>{children}</main>
        <Footer dict={dict} lang={locale} />
      </body>
    </html>
  );
}
