import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { AboutShort } from "@/components/sections/AboutShort";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getDictionary, locales, defaultLocale, type Locale } from "@/dictionaries";

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
  const dict = await getDictionary(locale);
  const baseUrl = "https://yudhahafiz.com";

  return {
    title: dict.metadata.home.title,
    description: dict.metadata.home.description,
    alternates: {
      canonical: locale === "id" ? baseUrl : `${baseUrl}/en`,
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero dict={dict} lang={locale} />
      <Services dict={dict} />
      <FeaturedProjects dict={dict} lang={locale} />
      <AboutShort dict={dict} lang={locale} />
      <ContactCTA dict={dict} />
    </>
  );
}
