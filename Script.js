/**
 * Namma Concrete - Main JavaScript File
 * A Scorpions Group Venture
 */

// Concrete Rates configuration (₹ per m³)
const CONCRETE_RATES = {
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

const CONCRETE_DETAILS = {
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

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Header Scroll Effect
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Logo Click Scroll to Top
  const logoBtn = document.getElementById("logo-btn");
  if (logoBtn) {
    logoBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });

    document.querySelectorAll(".mobile-nav-link").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
      });
    });
  }

  // 3. Render Grade Catalog Cards
  const catalogGrid = document.getElementById("catalog-grid");
  if (catalogGrid) {
    catalogGrid.innerHTML = "";
    Object.keys(CONCRETE_RATES).forEach(grade => {
      const rate = CONCRETE_RATES[grade];
      const details = CONCRETE_DETAILS[grade] || { desc: "Specialized concrete mix", useCase: "Structural applications" };
      const isPopular = grade === "M20" || grade === "M25";

      const cardHTML = `
        <div class="grade-card">
          ${isPopular ? '<div class="popular-badge">Most Popular</div>' : ''}
          <div class="grade-card-header">
            <h3 class="grade-title">${grade}</h3>
            <div class="text-right">
              <span class="grade-price">₹${rate.toLocaleString('en-IN')}</span>
              <span class="grade-unit">per m³</span>
            </div>
          </div>
          <div class="grade-body">
            <p class="grade-desc">${details.desc}</p>
            <p class="grade-usecase">
              <strong>Ideal for:</strong>
              ${details.useCase}
            </p>
          </div>
          <button class="btn btn-catalog order-grade-btn" data-grade="${grade}">
            Order ${grade}
          </button>
        </div>
      `;
      catalogGrid.insertAdjacentHTML("beforeend", cardHTML);
    });
  }

  // 4. Populate Grade Select options in Order Modal
  const orderGradeSelect = document.getElementById("order-grade");
  if (orderGradeSelect) {
    orderGradeSelect.innerHTML = "";
    Object.entries(CONCRETE_RATES).forEach(([grade, rate]) => {
      const option = document.createElement("option");
      option.value = grade;
      option.textContent = `${grade} - ₹${rate.toLocaleString('en-IN')}/m³`;
      orderGradeSelect.appendChild(option);
    });
  }

  // 5. Order Modal Logic & Live Price Estimate
  const modal = document.getElementById("order-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const orderForm = document.getElementById("order-form");
  const orderQtyInput = document.getElementById("order-qty");
  const estimatePriceEl = document.getElementById("estimate-price");
  const deliveryDateInput = document.getElementById("delivery-date");
  const modalSuccessScreen = document.getElementById("modal-success-screen");
  const closeSuccessBtn = document.getElementById("close-success-btn");

  // Set min date to today
  if (deliveryDateInput) {
    const today = new Date().toISOString().split("T")[0];
    deliveryDateInput.min = today;
  }

  function calculateEstimate() {
    const selectedGrade = orderGradeSelect ? orderGradeSelect.value : "M20";
    const qty = orderQtyInput ? parseFloat(orderQtyInput.value) || 0 : 0;
    const unitPrice = CONCRETE_RATES[selectedGrade] || 0;
    const totalPrice = qty > 0 ? qty * unitPrice : 0;
    
    if (estimatePriceEl) {
      estimatePriceEl.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
    }
  }

  if (orderGradeSelect) orderGradeSelect.addEventListener("change", calculateEstimate);
  if (orderQtyInput) orderQtyInput.addEventListener("input", calculateEstimate);

  function openModal(presetGrade = null) {
    if (presetGrade && orderGradeSelect) {
      orderGradeSelect.value = presetGrade;
    }
    calculateEstimate();
    if (modal) {
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
      if (modalSuccessScreen) modalSuccessScreen.classList.add("hidden");
      if (orderForm) {
        orderForm.reset();
        orderForm.classList.remove("hidden");
      }
    }
  }

  // Global listeners to open modal
  document.addEventListener("click", (e) => {
    const targetBtn = e.target.closest(".open-order-modal, .order-grade-btn");
    if (targetBtn) {
      e.preventDefault();
      const presetGrade = targetBtn.getAttribute("data-grade") || null;
      openModal(presetGrade);
    }
  });

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }
  if (closeSuccessBtn) closeSuccessBtn.addEventListener("click", closeModal);

  // Handle Order Form Submit
  if (orderForm) {
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById("submit-order-btn");
      if (submitBtn) submitBtn.disabled = true;

      setTimeout(() => {
        if (orderForm) orderForm.classList.add("hidden");
        if (modalSuccessScreen) modalSuccessScreen.classList.remove("hidden");
        if (submitBtn) submitBtn.disabled = false;
      }, 600);
    });
  }

  // 6. Contact Form Submission Handling
  const contactForm = document.getElementById("contact-form");
  const contactSuccess = document.getElementById("contact-success");
  const resetContactBtn = document.getElementById("reset-contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      contactForm.classList.add("hidden");
      if (contactSuccess) contactSuccess.classList.remove("hidden");
    });
  }

  if (resetContactBtn) {
    resetContactBtn.addEventListener("click", () => {
      if (contactForm) {
        contactForm.reset();
        contactForm.classList.remove("hidden");
      }
      if (contactSuccess) contactSuccess.classList.add("hidden");
    });
  }

  // 7. Scroll Reveal Animations (Intersection Observer)
  const observerOptions = { threshold: 0.1 };
  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".animate-on-scroll").forEach(el => {
    scrollObserver.observe(el);
  });

  // 8. Footer Current Year
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
