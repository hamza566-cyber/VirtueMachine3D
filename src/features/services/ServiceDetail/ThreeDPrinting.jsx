import ServicesHero from "@/features/services/Hero/ServicesHero";
import ServicesList from "@/features/services/ServicesList/ServicesList";
import ServicesProcess from "@/features/services/Process/ServicesProcess";
import CTA from "@/features/services/CTA/CTA";

export default function ThreeDPrinting() {
  return (
    <main>
      <ServicesHero />
      <ServicesList category="3d-printing" />
      <ServicesProcess />
      <CTA />
    </main>
  );
}