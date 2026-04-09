import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { AboutShort } from "@/components/sections/AboutShort";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Yudha Hafiz | Fullstack Developer — Web Apps, AI & Automation",
  description:
    "Yudha Hafiz is a Fullstack Developer specializing in Web Apps, Automation, and AI Integration. Based in Indonesia. Available for remote projects.",
  alternates: {
    canonical: "https://yudhahafiz.com",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedProjects />
      <AboutShort />
      <ContactCTA />
    </>
  );
}
