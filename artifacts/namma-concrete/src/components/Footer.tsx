import React from "react";
import { Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#111] text-gray-400 py-12 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <span className="font-heading font-bold text-2xl text-white tracking-wide block mb-1">
              NAMMA CONCRETE
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-primary">
              A Scorpions Group Venture
            </span>
          </div>

          <div className="flex space-x-6 mb-6 md:mb-0">
            <a href="#" className="text-gray-500 hover:text-primary transition-colors">
              <span className="sr-only">Instagram</span>
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} Namma Concrete. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
