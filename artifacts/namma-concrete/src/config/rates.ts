// PRICING: Edit values below and redeploy to update rates.
// No admin panel — rates are hardcoded in this file only.
// All values in ₹ per cubic meter (m³)
export const CONCRETE_RATES: Record<string, number> = {
  "M10": 4200,
  "M15": 4500,
  "M20": 4900,
  "M25": 5300,
  "M30": 5700,
  "M35": 6100,
  "M40": 6500,
  "M45": 6900,
  "M50": 7300,
};

export const CONCRETE_DETAILS: Record<string, { desc: string, useCase: string }> = {
  "M10": { desc: "Basic non-structural mix", useCase: "PCC works, blinding concrete, levelling courses" },
  "M15": { desc: "Light-duty fill concrete", useCase: "Plain cement concrete, non-structural fills" },
  "M20": { desc: "Standard structural mix", useCase: "Residential slabs, footings, columns (most popular)" },
  "M25": { desc: "Enhanced structural mix", useCase: "Commercial structures, beams, foundations" },
  "M30": { desc: "Heavy-duty load bearing", useCase: "High-load beams, bridges, industrial floors" },
  "M35": { desc: "High-strength specialized", useCase: "Pre-stressed concrete, heavy infrastructure" },
  "M40": { desc: "Advanced structural grade", useCase: "High-strength columns, elevated structures" },
  "M45": { desc: "Premium specialized mix", useCase: "Special structural applications" },
  "M50": { desc: "Ultra-high performance", useCase: "High-performance concrete, specialized projects" },
};
