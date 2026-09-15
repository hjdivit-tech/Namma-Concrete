/**
 * Namma Concrete - Main JavaScript File
 * A Scorpions Group Venture
 */

// Concrete Grades list (M5 to M40)
const CONCRETE_GRADES = ["M5", "M10", "M15", "M20", "M25", "M30", "M35", "M40"];

const CONCRETE_DETAILS = {
  "M5": { desc: "Low-strength lean concrete mix", useCase: "Levelling courses, foundation bedding, non-structural base layer" },
  "M10": { desc: "Basic non-structural mix", useCase: "PCC works, blinding concrete, levelling courses" },
  "M15": { desc: "Light-duty fill concrete", useCase: "Plain cement concrete, non-structural fills" },
  "M20": { desc: "Standard structural mix", useCase: "Residential slabs, footings, columns (most popular)" },
  "M25": { desc: "Enhanced structural mix", useCase: "Commercial structures, beams, foundations" },
  "M30": { desc: "Heavy-duty load bearing", useCase: "High-load beams, bridges, industrial floors" },
  "M35": { desc: "High-strength specialized mix", useCase: "Pre-stressed concrete, heavy infrastructure" },
  "M40": { desc: "Advanced structural grade", useCase: "High-strength columns, elevated structures" },
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
    CONCRETE_GRADES.forEach(grade => {
      const details = CONCRETE_DETAILS[grade] || { desc: "Specialized concrete mix", useCase: "Structural applications" };
      const isPopular = grade === "M20" || grade === "M25";
      const gradeClass = grade === "M20" ? "grade-card-m20" : (grade === "M25" ? "grade-card-m25" : "secondary-grade-card");

      const cardHTML = `
        <div class="grade-card ${gradeClass}">
          ${isPopular ? '<div class="popular-badge">Most Popular</div>' : ''}
          <div class="grade-card-header">
            <h3 class="grade-title">${grade}</h3>
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

    // Design Mix special card
    const designMixCard = `
      <div class="grade-card design-mix-card">
        <div class="design-mix-badge">Custom</div>
        <div class="grade-card-header">
          <h3 class="grade-title design-mix-title">Design Mix</h3>
        </div>
        <div class="grade-body">
          <p class="grade-desc">Engineer your own concrete formulation</p>
          <p class="grade-usecase">
            <strong>Ideal for:</strong>
            Specialized structural projects, research, and performance-critical applications requiring custom mix proportions.
          </p>
        </div>
        <button class="btn btn-catalog btn-design-mix open-design-mix-modal">
          Configure Mix
        </button>
      </div>
    `;
    catalogGrid.insertAdjacentHTML("beforeend", designMixCard);
  }

  // Toggle More Grades button on mobile
  const toggleMoreBtn = document.getElementById("toggle-more-grades-btn");
  const moreGradesText = document.getElementById("more-grades-text");
  if (toggleMoreBtn && catalogGrid) {
    toggleMoreBtn.addEventListener("click", () => {
      catalogGrid.classList.toggle("expanded");
      const isExpanded = catalogGrid.classList.contains("expanded");
      if (moreGradesText) {
        moreGradesText.textContent = isExpanded ? "Show Less Grades" : "View All Grades";
      }
    });
  }

  // Toggle More Comparison Points on mobile (Know More)
  const toggleCompMoreBtn = document.getElementById("toggle-comp-more-btn");
  const compMoreText = document.getElementById("comp-more-text");
  const compGrid = document.querySelector(".comparison-grid");
  if (toggleCompMoreBtn && compGrid) {
    toggleCompMoreBtn.addEventListener("click", () => {
      compGrid.classList.toggle("expanded");
      const isExpanded = compGrid.classList.contains("expanded");
      if (compMoreText) {
        compMoreText.textContent = isExpanded ? "Show Less" : "Know More";
      }
    });
  }
  // ============================================================
  // Language Toggle (EN / KN) — RMC vs Conventional section
  // Paste this inside your existing DOMContentLoaded callback in
  // Script.js — right after the "Toggle More Comparison Points on
  // mobile (Know More)" block works well. Does not touch that logic.
  // ============================================================

  const rmcSection = document.getElementById("rmc-vs-conventional");
  const langToggleEn = document.getElementById("lang-toggle-en");
  const langToggleKn = document.getElementById("lang-toggle-kn");

  if (rmcSection && langToggleEn && langToggleKn) {
    const applyLang = (lang) => {
      const nodes = rmcSection.querySelectorAll("[data-en]");
      nodes.forEach((el) => {
        const value = el.getAttribute(lang === "en" ? "data-en" : "data-kn");
        if (value === null) return;
        // Values containing markup (e.g. the h2's nested <span class="text-primary">)
        // need innerHTML; everything else is plain text.
        if (value.indexOf("<") !== -1) {
          el.innerHTML = value;
        } else {
          el.textContent = value;
        }
      });

      langToggleEn.classList.toggle("active", lang === "en");
      langToggleKn.classList.toggle("active", lang === "kn");
    };

    langToggleEn.addEventListener("click", () => applyLang("en"));
    langToggleKn.addEventListener("click", () => applyLang("kn"));

    // Default language on load
    applyLang("en");
  }

  // 4. Populate Grade Select options in Order Modal
  const orderGradeSelect = document.getElementById("order-grade");
  if (orderGradeSelect) {
    orderGradeSelect.innerHTML = "";
    CONCRETE_GRADES.forEach(grade => {
      const option = document.createElement("option");
      option.value = grade;
      option.textContent = grade;
      orderGradeSelect.appendChild(option);
    });
  }

  // 5. Order Modal Logic
  const modal = document.getElementById("order-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const orderForm = document.getElementById("order-form");
  const deliveryDateInput = document.getElementById("delivery-date");
  const modalSuccessScreen = document.getElementById("modal-success-screen");
  const closeSuccessBtn = document.getElementById("close-success-btn");

  // Set min date to today
  if (deliveryDateInput) {
    const today = new Date().toISOString().split("T")[0];
    deliveryDateInput.min = today;
  }

  function openModal(presetGrade = null) {
    if (presetGrade && orderGradeSelect) {
      orderGradeSelect.value = presetGrade;
    }
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
  const NAMMA_WHATSAPP_NUMBER = "919844872892"; // Call center number for order alerts

  function formatDateForMessage(isoDate) {
    if (!isoDate) return "Not specified";
    const parts = isoDate.split("-");
    if (parts.length !== 3) return isoDate;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [year, month, day] = parts;
    return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;
  }

  function sendOrderToWhatsApp() {
    const grade = orderGradeSelect ? orderGradeSelect.value : "Not specified";
    const qty = document.getElementById("order-qty")?.value || "Not specified";
    const name = document.getElementById("customer-name")?.value || "Not specified";
    const phone = document.getElementById("customer-phone")?.value || "Not specified";
    const date = formatDateForMessage(document.getElementById("delivery-date")?.value);
    const address = document.getElementById("delivery-addr")?.value || "Not specified";

    const message =
      `*New Concrete Order - Namma Concrete*\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Grade:* ${grade}\n` +
      `*Quantity:* ${qty} m³\n` +
      `*Preferred Date:* ${date}\n` +
      `*Site Address:* ${address}`;

    const waUrl = `https://wa.me/${NAMMA_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }

  if (orderForm) {
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById("submit-order-btn");
      if (submitBtn) submitBtn.disabled = true;

      sendOrderToWhatsApp();

      setTimeout(() => {
        if (orderForm) orderForm.classList.add("hidden");
        if (modalSuccessScreen) modalSuccessScreen.classList.remove("hidden");
        if (submitBtn) submitBtn.disabled = false;
      }, 600);
    });
  }

  // 6. Design Mix Modal Logic
  const designMixModal = document.getElementById("design-mix-modal");
  const closeDesignMixBtn = document.getElementById("close-design-mix-modal");
  const designMixForm = document.getElementById("design-mix-form");
  const designMixSuccess = document.getElementById("design-mix-success");
  const closeDesignMixSuccess = document.getElementById("close-design-mix-success");

  function openDesignMixModal() {
    if (designMixModal) {
      designMixModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }
  }

  function closeDesignMixModal() {
    if (designMixModal) {
      designMixModal.classList.add("hidden");
      document.body.style.overflow = "auto";
      if (designMixSuccess) designMixSuccess.classList.add("hidden");
      if (designMixForm) {
        designMixForm.reset();
        designMixForm.classList.remove("hidden");
      }
    }
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest(".open-design-mix-modal")) {
      e.preventDefault();
      openDesignMixModal();
    }
  });

  if (closeDesignMixBtn) closeDesignMixBtn.addEventListener("click", closeDesignMixModal);
  if (designMixModal) {
    designMixModal.addEventListener("click", (e) => {
      if (e.target === designMixModal) closeDesignMixModal();
    });
  }
  if (closeDesignMixSuccess) closeDesignMixSuccess.addEventListener("click", closeDesignMixModal);

  if (designMixForm) {
    designMixForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById("submit-design-mix-btn");
      if (submitBtn) submitBtn.disabled = true;
      setTimeout(() => {
        designMixForm.classList.add("hidden");
        if (designMixSuccess) designMixSuccess.classList.remove("hidden");
        if (submitBtn) submitBtn.disabled = false;
      }, 600);
    });
  }

  // 7. Contact Form Submission Handling
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

  // 9. FAQ Accordion Logic
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const isActive = question.classList.contains('active');

      // Close all other FAQs
      document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('active');
        if (q.nextElementSibling) {
          q.nextElementSibling.style.maxHeight = null;
        }
      });

      // If clicked wasn't active, open it
      if (!isActive) {
        question.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // 10. Policy Modal Logic (Terms & Conditions / Privacy Policy)
  const policyModal = document.getElementById("policy-modal");
  const openTermsBtn = document.getElementById("open-terms-modal");
  const openPrivacyBtn = document.getElementById("open-privacy-modal");
  const closePolicyBtn = document.getElementById("close-policy-modal");
  const closePolicyFooterBtn = document.getElementById("close-policy-btn");

  const tabTermsBtn = document.getElementById("tab-terms-btn");
  const tabPrivacyBtn = document.getElementById("tab-privacy-btn");
  const termsTabContent = document.getElementById("terms-tab-content");
  const privacyTabContent = document.getElementById("privacy-tab-content");

  function showTermsTab() {
    if (tabTermsBtn && tabPrivacyBtn && termsTabContent && privacyTabContent) {
      tabTermsBtn.classList.add("active");
      tabPrivacyBtn.classList.remove("active");
      termsTabContent.classList.add("active");
      privacyTabContent.classList.remove("active");
    }
  }

  function showPrivacyTab() {
    if (tabTermsBtn && tabPrivacyBtn && termsTabContent && privacyTabContent) {
      tabPrivacyBtn.classList.add("active");
      tabTermsBtn.classList.remove("active");
      privacyTabContent.classList.add("active");
      termsTabContent.classList.remove("active");
    }
  }

  if (openTermsBtn && policyModal) {
    openTermsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showTermsTab();
      policyModal.classList.remove("hidden");
    });
  }

  if (openPrivacyBtn && policyModal) {
    openPrivacyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showPrivacyTab();
      policyModal.classList.remove("hidden");
    });
  }

  if (tabTermsBtn) tabTermsBtn.addEventListener("click", showTermsTab);
  if (tabPrivacyBtn) tabPrivacyBtn.addEventListener("click", showPrivacyTab);

  const closePolicy = () => {
    if (policyModal) policyModal.classList.add("hidden");
  };

  if (closePolicyBtn) closePolicyBtn.addEventListener("click", closePolicy);
  if (closePolicyFooterBtn) closePolicyFooterBtn.addEventListener("click", closePolicy);

  if (policyModal) {
    policyModal.addEventListener("click", (e) => {
      if (e.target === policyModal) closePolicy();
    });
  }
});
