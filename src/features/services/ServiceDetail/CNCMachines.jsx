
import ServicesHero from "@/features/services/Hero/ServicesHero";
import ServicesList from "@/features/services/ServicesList/ServicesList";
import ServicesProcess from "@/features/services/Process/ServicesProcess";
import CTA from "@/features/services/CTA/CTA";

export default function CNCMachines() {
  return (
    <main>
      <ServicesHero />
      <ServicesList category="cnc-machines" />
      <CTA />
      <ServicesProcess />
    </main>
  );
}
