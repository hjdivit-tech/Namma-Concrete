import React from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { ShieldCheck, Target, Hammer, Award } from "lucide-react";

export function About() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className={`transform transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary mb-6 uppercase tracking-tight">
              Strength <span className="text-primary">Engineered</span> for Mysore
            </h2>
            <div className="w-20 h-2 bg-primary mb-8" />
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Namma Concrete, a Scorpions Group venture, operates a state-of-the-art batching plant right here in Mysore, Karnataka. We don't just mix cement and aggregates — we engineer structural integrity tailored for every unique project.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              From residential footings to heavy infrastructure, our fully automated plant ensures absolute precision in every pour. 
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="border-l-4 border-primary pl-4">
                <p className="text-3xl font-heading font-bold text-secondary mb-1">500+</p>
                <p className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">Projects Delivered</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="text-3xl font-heading font-bold text-secondary mb-1">M10–M50</p>
                <p className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">Grades Available</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="text-3xl font-heading font-bold text-secondary mb-1">100%</p>
                <p className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">Automated Batching</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="text-3xl font-heading font-bold text-secondary mb-1">24hr</p>
                <p className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">Delivery Available</p>
              </div>
            </div>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 transform transition-all duration-1000 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
            {[
              { icon: ShieldCheck, title: "Quality Assured", desc: "IS 456 code compliant mixes with rigorous testing." },
              { icon: Target, title: "Precision Batching", desc: "Fully automated plant ensures exact material proportions." },
              { icon: Award, title: "Certified Lab", desc: "In-house cube testing lab with trained technical staff." },
              { icon: Hammer, title: "Built to Code", desc: "IS certification in progress for all standard grades." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 shadow-sm border border-border hover:border-primary transition-colors group">
                <feature.icon className="w-10 h-10 text-secondary mb-4 group-hover:text-primary transition-colors" />
                <h3 className="text-xl font-heading font-bold text-secondary mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
