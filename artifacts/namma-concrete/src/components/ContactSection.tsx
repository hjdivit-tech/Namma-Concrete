import React, { useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { MapPin, Phone, MessageCircle } from "lucide-react";

export function ContactSection() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  
  // Controlled inputs
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    requirement: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    
    try {
      // Replace REPLACE_ME with your Formspree form ID
      const response = await fetch("https://formspree.io/f/REPLACE_ME", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setFormStatus("success");
        setFormData({ name: "", phone: "", requirement: "" });
      } else {
        setFormStatus("error");
      }
    } catch (err) {
      setFormStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-secondary relative">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Contact Form & Info */}
        <div className="py-24 px-6 md:px-12 lg:px-24 flex flex-col justify-center" ref={ref}>
          <div className={`transform transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
            <h2 className="text-4xl font-heading font-bold text-white mb-6 uppercase tracking-tight">
              Request a <span className="text-primary">Callback</span>
            </h2>
            <p className="text-gray-400 mb-10 max-w-md">
              Need a custom quote or technical consultation? Leave your details and our structural engineers will get back to you.
            </p>

            {formStatus === "success" ? (
              <div className="bg-primary/20 border border-primary p-6 mb-10">
                <h3 className="text-primary font-bold text-lg mb-2">Request Received</h3>
                <p className="text-gray-300 text-sm">Thank you. Our team will contact you shortly.</p>
                <button onClick={() => setFormStatus("idle")} className="mt-4 text-primary text-sm font-semibold hover:underline">
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 mb-12 max-w-md">
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                    placeholder="Your Name / Company" 
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-gray-500" 
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">Phone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    required 
                    placeholder="Phone Number" 
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-gray-500" 
                  />
                </div>
                <div>
                  <label htmlFor="requirement" className="sr-only">Requirement</label>
                  <textarea 
                    id="requirement" 
                    name="requirement" 
                    value={formData.requirement}
                    onChange={handleChange}
                    rows={3} 
                    placeholder="Brief Requirement (e.g. M25 for residential slab, approx 50m³)" 
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-gray-500 resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={formStatus === "submitting"}
                  className="w-full bg-primary text-secondary font-bold uppercase tracking-wider py-4 hover:bg-amber-400 transition-colors disabled:opacity-50"
                >
                  {formStatus === "submitting" ? "Sending..." : "Request Callback"}
                </button>
                {formStatus === "error" && (
                  <p className="text-red-400 text-sm mt-2">Something went wrong. Please try again or call us.</p>
                )}
              </form>
            )}

            <div className="space-y-4">
              <a href="tel:+919999999999" className="flex items-center text-gray-300 hover:text-primary transition-colors group">
                <div className="w-10 h-10 bg-white/5 flex items-center justify-center mr-4 group-hover:bg-primary/20">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Call Us (24/7)</p>
                  <p className="font-bold">+91 99999 99999</p>
                </div>
              </a>
              
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-[#25D366] transition-colors group">
                <div className="w-10 h-10 bg-white/5 flex items-center justify-center mr-4 group-hover:bg-[#25D366]/20">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">WhatsApp</p>
                  <p className="font-bold">Chat with Sales</p>
                </div>
              </a>
              
              <div className="flex items-center text-gray-300">
                <div className="w-10 h-10 bg-white/5 flex items-center justify-center mr-4">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Plant Location</p>
                  <p className="text-sm">Mysore, Karnataka<br/>(A Scorpions Group Venture)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="h-[400px] lg:h-auto min-h-[400px] relative filter grayscale contrast-125">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3897.780882543682!2d76.63526231480614!3d12.295810290981846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf700285754d91%3A0xb3da42e9c23f7283!2sMysuru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            title="Plant Location"
            className="absolute inset-0"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
