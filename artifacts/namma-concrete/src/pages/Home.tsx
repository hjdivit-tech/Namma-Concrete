import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { GradeCatalog } from "@/components/GradeCatalog";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { OrderModal } from "@/components/OrderModal";

export default function Home() {
  const [isOrderModalOpen, setIsOrderModalOpen] = React.useState(false);

  return (
    <div className="relative min-h-screen font-sans bg-background text-foreground">
      <Navbar onOrderClick={() => setIsOrderModalOpen(true)} />
      
      <main>
        <Hero onOrderClick={() => setIsOrderModalOpen(true)} />
        <About />
        <GradeCatalog onOrderClick={() => setIsOrderModalOpen(true)} />
        <ProjectShowcase />
        <ContactSection />
      </main>

      <Footer />

      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
      />
    </div>
  );
}
