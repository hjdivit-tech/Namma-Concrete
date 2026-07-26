import React from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { CONCRETE_RATES, CONCRETE_DETAILS } from "@/config/rates";

interface GradeCatalogProps {
  onOrderClick: () => void;
}

export function GradeCatalog({ onOrderClick }: GradeCatalogProps) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const grades = Object.keys(CONCRETE_RATES).sort((a, b) => {
    // Sort M10, M15, M20 numerically
    return parseInt(a.replace('M', '')) - parseInt(b.replace('M', ''));
  });

  return (
    <section id="products" className="py-24 bg-secondary text-white relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 md:px-6" ref={ref}>
        <div className={`text-center max-w-3xl mx-auto mb-16 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 uppercase tracking-tight">
            Premium <span className="text-primary">Concrete Grades</span>
          </h2>
          <p className="text-lg text-gray-400">
            Engineered to perfection. Our rates are transparent and competitive. Select the right grade for your structural requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grades.map((grade, i) => {
            const delay = Math.min(i * 100, 500); // Stagger reveal
            const details = CONCRETE_DETAILS[grade];
            const isPopular = grade === "M20" || grade === "M25";

            return (
              <div 
                key={grade}
                className={`bg-white/5 border border-white/10 p-6 flex flex-col transition-all duration-500 hover:bg-white/10 hover:border-primary/50 relative ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
                style={{ transitionDelay: `${isVisible ? delay : 0}ms` }}
              >
                {isPopular && (
                  <div className="absolute -top-3 -right-3 bg-primary text-secondary text-xs font-bold uppercase tracking-wider py-1 px-3 shadow-lg">
                    Most Popular
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-4xl font-heading font-bold text-white">{grade}</h3>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary">₹{CONCRETE_RATES[grade].toLocaleString('en-IN')}</span>
                    <span className="block text-xs text-gray-400 uppercase tracking-wider">per m³</span>
                  </div>
                </div>
                
                <div className="flex-grow">
                  <p className="text-white font-medium mb-2">{details?.desc}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    <span className="text-gray-300 font-semibold block mb-1">Ideal for:</span>
                    {details?.useCase}
                  </p>
                </div>

                <button 
                  onClick={onOrderClick}
                  className="mt-8 w-full bg-white/10 text-white font-bold py-3 uppercase tracking-wider text-sm hover:bg-primary hover:text-secondary transition-colors"
                >
                  Order {grade}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
