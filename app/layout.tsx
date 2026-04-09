import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yudhahafiz.com"),
  title: {
    default: "Yudha Hafiz | Fullstack Developer — Web Apps, AI & Automation",
    template: "%s | Yudha Hafiz",
  },
  description:
    "Yudha Hafiz is a Fullstack Developer specializing in Web Apps, Automation, and AI Integration that drives real business impact. Based in Indonesia.",
  keywords: [
    "Yudha Hafiz",
    "Yudha Hafiz developer",
    "Yudha Hafiz fullstack",
    "AI developer Indonesia",
    "fullstack developer Indonesia",
    "web developer Indonesia",
    "Next.js developer",
  ],
  authors: [{ name: "Yudha Hafiz", url: "https://yudhahafiz.com" }],
  creator: "Yudha Hafiz",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yudhahafiz.com",
    siteName: "Yudha Hafiz",
    title: "Yudha Hafiz | Fullstack Developer — Web Apps, AI & Automation",
    description:
      "Fullstack Developer specializing in Web Apps, Automation, and AI Integration that drives real business impact.",
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
    title: "Yudha Hafiz | Fullstack Developer",
    description:
      "Fullstack Developer specializing in Web Apps, Automation, and AI Integration.",
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
    apple: [
      { url: "/images/apple-touch-icon.png" },
    ],
  },
  alternates: {
    canonical: "https://yudhahafiz.com",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yudha Hafiz",
  jobTitle: "Fullstack Developer",
  url: "https://yudhahafiz.com",
  description:
    "Fullstack Developer specializing in Web Apps, Automation, and AI Integration",
  sameAs: [
    "https://github.com/Blawness",
    "https://www.linkedin.com/in/yudha-hafiz/",
    "https://www.instagram.com/yudha_hafiz"
  ],
  knowsAbout: [
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
    "AI Integration",
    "Web Automation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
