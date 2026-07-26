import React, { useState, useEffect } from "react";

interface NavbarProps {
  onOrderClick: () => void;
}

export function Navbar({ onOrderClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-secondary py-3 shadow-lg" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex flex-col cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <span className={`font-heading font-bold text-2xl tracking-wide ${scrolled ? "text-white" : "text-secondary dark:text-white"}`}>
            NAMMA CONCRETE
          </span>
          <span className={`text-[10px] tracking-widest uppercase font-semibold ${scrolled ? "text-primary" : "text-primary"}`}>
            A Scorpions Group Venture
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {["about", "products", "projects", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className={`text-sm font-semibold uppercase tracking-wider transition-colors hover:text-primary ${
                scrolled ? "text-gray-300" : "text-secondary dark:text-gray-300"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <button
          onClick={onOrderClick}
          className="bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm px-6 py-3 hover:bg-amber-400 transition-colors shadow-lg active:scale-95"
        >
          Order Concrete
        </button>
      </div>
    </header>
  );
}
