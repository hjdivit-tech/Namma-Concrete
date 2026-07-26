import React from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

// Using the generated image path
import heroBg from "@assets/generated_images/hero-bg.jpg";

interface HeroProps {
  onOrderClick: () => void;
}

export function Hero({ onOrderClick }: HeroProps) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const scrollToProducts = () => {
    const el = document.getElementById("products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      className="relative h-[100dvh] flex items-center justify-center overflow-hidden bg-secondary"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] ease-out hover:scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-secondary/80 via-secondary/70 to-secondary/90" />

      {/* Content */}
      <div 
        ref={ref}
        className={`relative z-20 container mx-auto px-4 md:px-6 text-center transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white mb-6 uppercase tracking-tight leading-tight">
          Built to Last.<br />
          <span className="text-primary">Delivered to Pour.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-medium">
          Mysore's premium ready-mix concrete supplier. Precision engineered, 
          delivered on time, every time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOrderClick}
            className="w-full sm:w-auto bg-primary text-primary-foreground font-bold text-lg px-8 py-4 hover:bg-amber-400 transition-colors shadow-xl uppercase tracking-wider"
          >
            Order Concrete
          </button>
          
          <button
            onClick={scrollToProducts}
            className="w-full sm:w-auto bg-transparent text-white border-2 border-white/20 font-bold text-lg px-8 py-4 hover:bg-white/10 hover:border-white transition-colors uppercase tracking-wider"
          >
            View Grades
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden md:block">
        <div className="w-[2px] h-16 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}
