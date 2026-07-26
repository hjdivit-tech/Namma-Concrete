import React from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

import projRes from "@assets/generated_images/project-residential.jpg";
import projHwy from "@assets/generated_images/project-highway.jpg";
import projIT from "@assets/generated_images/project-itpark.jpg";
import projCom from "@assets/generated_images/project-commercial.jpg";
import projWh from "@assets/generated_images/project-warehouse.jpg";
import projBr from "@assets/generated_images/project-bridge.jpg";

const PROJECTS = [
  { img: projRes, title: "Residential Complex", location: "Mysore", grade: "M20 / M25" },
  { img: projHwy, title: "Highway Overpass", location: "NHAI Project", grade: "M35 / M40" },
  { img: projIT, title: "IT Park Foundation", location: "Infosys Campus", grade: "M30" },
  { img: projCom, title: "Commercial Tower", location: "Hubballi", grade: "M40" },
  { img: projWh, title: "Industrial Warehouse", location: "Peenya", grade: "M25 / M30" },
  { img: projBr, title: "River Bridge", location: "PWD Karnataka", grade: "M45 / M50" },
];

export function ProjectShowcase() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.05 });

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6" ref={ref}>
        <div className={`text-center max-w-3xl mx-auto mb-16 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary mb-6 uppercase tracking-tight">
            Our <span className="text-primary">Legacy</span> in Concrete
          </h2>
          <p className="text-lg text-muted-foreground">
            From residential foundations to monumental infrastructure. We power Karnataka's growth with uncompromising strength.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {PROJECTS.map((project, i) => {
            const delay = i * 100;
            return (
              <div 
                key={i} 
                className={`relative aspect-[4/3] group overflow-hidden bg-secondary transform transition-all duration-700 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                style={{ transitionDelay: `${isVisible ? delay : 0}ms` }}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${project.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block bg-primary text-secondary text-xs font-bold px-2 py-1 uppercase tracking-wider mb-2">
                    {project.grade}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-gray-300 text-sm">{project.location}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
