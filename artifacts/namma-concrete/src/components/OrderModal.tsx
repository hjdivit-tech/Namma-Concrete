import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { CONCRETE_RATES } from "@/config/rates";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Controlled form inputs
  const [formData, setFormData] = useState({
    grade: "M20",
    quantity: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    deliveryDate: "",
    deliveryAddress: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const quantityNum = Number(formData.quantity);
  const price = (quantityNum > 0) ? CONCRETE_RATES[formData.grade] * quantityNum : 0;

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setStatus("idle");
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    
    try {
      // Replace REPLACE_ME with actual Formspree form ID before going live
      const response = await fetch("https://formspree.io/f/REPLACE_ME", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          estimatedPrice: price
        })
      });
      
      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  // Get today's date formatted for min attribute (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-secondary/90 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-border flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-heading font-bold text-secondary uppercase tracking-tight">Order Concrete</h2>
            <p className="text-sm text-muted-foreground font-medium text-primary">Direct from Plant</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 transition-colors rounded-full"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-secondary" />
          </button>
        </div>

        <div className="p-6">
          {status === "success" ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-heading font-bold text-secondary mb-2">Order Received</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Thank you! Our technical team will contact you within 2 hours to verify site access and confirm your delivery slot.
              </p>
              <button 
                onClick={onClose}
                className="bg-secondary text-white px-8 py-3 font-bold uppercase tracking-wider text-sm hover:bg-primary transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Selection */}
                <div className="space-y-2">
                  <label htmlFor="grade" className="block text-sm font-bold uppercase tracking-wider text-secondary">
                    Concrete Grade
                  </label>
                  <select 
                    id="grade" 
                    name="grade" 
                    value={formData.grade}
                    onChange={handleChange}
                    className="w-full border border-border p-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-white text-secondary"
                  >
                    {Object.entries(CONCRETE_RATES).map(([g, rate]) => (
                      <option key={g} value={g}>{g} - ₹{rate}/m³</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="quantity" className="block text-sm font-bold uppercase tracking-wider text-secondary">
                    Quantity (m³)
                  </label>
                  <input 
                    type="number" 
                    id="quantity" 
                    name="quantity" 
                    min="1"
                    required
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full border border-border p-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-secondary"
                    placeholder="e.g. 50"
                  />
                </div>
              </div>

              {/* Price Estimate */}
              <div className="bg-background border border-border p-4 flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Live Estimate</span>
                  <span className="text-3xl font-heading font-bold text-secondary">
                    ₹{price.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-right text-xs text-muted-foreground max-w-[150px]">
                  *Estimated Price. Final quote confirmed upon site review.
                </div>
              </div>

              <hr className="border-border" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="customerName" className="block text-sm font-bold uppercase tracking-wider text-secondary">Full Name</label>
                  <input type="text" id="customerName" name="customerName" value={formData.customerName} onChange={handleChange} required className="w-full border border-border p-3 focus:outline-none focus:border-primary transition-colors text-secondary" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="customerPhone" className="block text-sm font-bold uppercase tracking-wider text-secondary">Phone Number</label>
                  <input type="tel" id="customerPhone" name="customerPhone" value={formData.customerPhone} onChange={handleChange} required className="w-full border border-border p-3 focus:outline-none focus:border-primary transition-colors text-secondary" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="customerEmail" className="block text-sm font-bold uppercase tracking-wider text-secondary">Email (Optional)</label>
                  <input type="email" id="customerEmail" name="customerEmail" value={formData.customerEmail} onChange={handleChange} className="w-full border border-border p-3 focus:outline-none focus:border-primary transition-colors text-secondary" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="deliveryDate" className="block text-sm font-bold uppercase tracking-wider text-secondary">Preferred Date</label>
                  <input type="date" id="deliveryDate" name="deliveryDate" min={today} value={formData.deliveryDate} onChange={handleChange} required className="w-full border border-border p-3 focus:outline-none focus:border-primary transition-colors text-secondary" />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="deliveryAddress" className="block text-sm font-bold uppercase tracking-wider text-secondary">Site Address (Mysore Region)</label>
                  <textarea id="deliveryAddress" name="deliveryAddress" value={formData.deliveryAddress} onChange={handleChange} rows={2} required className="w-full border border-border p-3 focus:outline-none focus:border-primary transition-colors resize-none text-secondary"></textarea>
                </div>
              </div>

              {status === "error" && (
                <div className="text-red-600 bg-red-50 p-3 text-sm">
                  Failed to submit order. Please try again or contact us via phone.
                </div>
              )}

              <button 
                type="submit" 
                disabled={status === "submitting" || quantityNum <= 0}
                className="w-full bg-primary text-secondary font-bold uppercase tracking-widest py-4 hover:bg-amber-400 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Processing..." : "Confirm Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
