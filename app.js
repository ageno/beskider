const themeToggle = document.querySelector("[data-theme-toggle]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const navBackdrop = document.querySelector("[data-nav-backdrop]");
const navContainer = document.querySelector(".nav");
const navUnderline = document.querySelector("[data-nav-underline]");
const siteHeader = document.querySelector(".site-header");
const navLinks = navMenu ? Array.from(navMenu.querySelectorAll("a[href^=\"#\"]")) : [];
const tabs = document.querySelectorAll(".tabnav-tab[data-tab-target]");
const accordionToggles = document.querySelectorAll(".accordion__toggle");
const modalTriggers = document.querySelectorAll("[data-open-modal]");
const modals = document.querySelectorAll(".modal");
const cookieBanner = document.querySelector("#cookie-banner");
const cookieSettings = document.querySelector("#cookie-settings");
const analyticsToggle = document.querySelector("#analytics-toggle");
const cookieAccept = document.querySelector("[data-cookie-accept]");
const cookieReject = document.querySelector("[data-cookie-reject]");
const cookieSettingsButton = document.querySelector("[data-cookie-settings]");
const cookieSave = document.querySelector("[data-cookie-save]");
const aboutTilt = document.querySelector("[data-about-tilt]");
const ctaPlusCard = document.querySelector(".cta-plus");
const hero = document.querySelector(".hero");
const heroMedia = document.querySelector(".hero__media");
const heroTitleFill = document.querySelector(".hero__title-fill");
const focusableSelectors =
  "a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex='-1'])";

const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
let gaLoaded = false;
let releaseFocus = null;

const THEME_KEY = "beskider-theme";
const VALID_PREFERENCES = ["auto", "light", "dark"];

const getThemePreference = () => {
  const stored = localStorage.getItem(THEME_KEY);
  return VALID_PREFERENCES.includes(stored) ? stored : "auto";
};

const getEffectiveTheme = () => {
  const pref = getThemePreference();
  if (pref !== "auto") return pref;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const setTheme = (preference) => {
  if (!VALID_PREFERENCES.includes(preference)) return;
  localStorage.setItem(THEME_KEY, preference);
  const effective = preference === "auto" ? getEffectiveTheme() : preference;
  document.documentElement.setAttribute("data-theme", effective);
  const switchers = document.querySelectorAll("[data-theme-option]");
  switchers.forEach((el) => {
    const value = el.getAttribute("data-theme-option");
    const active = value === preference;
    el.setAttribute("aria-pressed", active ? "true" : "false");
    el.classList.toggle("is-active", active);
  });
  const themePlatter = document.querySelector("[data-theme-option]")?.closest(".tabnav-platter");
  if (themePlatter) {
    requestAnimationFrame(() => {
      if (themePlatter._tabnav?.updateIndicator) {
        themePlatter._tabnav.updateIndicator();
      } else {
        setTimeout(() => {
          if (themePlatter._tabnav?.updateIndicator) {
            themePlatter._tabnav.updateIndicator();
          }
        }, 50);
      }
    });
  }
};

const initTheme = () => {
  const preference = getThemePreference();
  setTheme(preference);
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", () => {
    if (getThemePreference() !== "auto") return;
    document.documentElement.setAttribute("data-theme", getEffectiveTheme());
  });
};

const toggleTheme = () => {
  const effective = document.documentElement.getAttribute("data-theme");
  setTheme(effective === "dark" ? "light" : "dark");
};

const trapFocus = (container, closeOnEscape = false) => {
  const focusable = Array.from(container.querySelectorAll(focusableSelectors));
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  const handleKeydown = (event) => {
    if (closeOnEscape && event.key === "Escape") {
      closeModal(container.closest(".modal"));
    }
    if (event.key !== "Tab" || focusable.length === 0) {
      return;
    }
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  container.addEventListener("keydown", handleKeydown);
  return () => container.removeEventListener("keydown", handleKeydown);
};

const openMenu = () => {
  if (siteHeader && window.matchMedia("(max-width: 767px)").matches) {
    siteHeader.style.setProperty("--site-header-height", `${siteHeader.offsetHeight}px`);
  }
  navMenu.classList.add("is-open");
  if (navBackdrop) {
    navBackdrop.classList.add("is-visible");
    navBackdrop.setAttribute("aria-hidden", "false");
  }
  navToggle.setAttribute("aria-expanded", "true");
  navToggle.setAttribute("aria-label", "Zamknij menu");
  releaseFocus = trapFocus(navMenu);
};

const closeMenu = () => {
  navMenu.classList.remove("is-open");
  if (navBackdrop) {
    navBackdrop.classList.remove("is-visible");
    navBackdrop.setAttribute("aria-hidden", "true");
  }
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Otwórz menu");
  if (releaseFocus) {
    releaseFocus();
    releaseFocus = null;
  }
};

const updateHeaderState = () => {
  if (!siteHeader) return;
  const isActive = window.scrollY > 4 || navMenu?.classList.contains("is-open");
  siteHeader.classList.toggle("is-active", isActive);
};

let navUnderlineInitialized = false;
const updateNavUnderline = (link) => {
  if (!navUnderline || !navContainer || !link) return;
  if (!window.matchMedia("(min-width: 768px)").matches) {
    navUnderline.style.width = "0";
    return;
  }
  const navRect = navContainer.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  const left = linkRect.left - navRect.left;
  if (!navUnderlineInitialized) {
    navUnderline.style.transition = "none";
    navUnderlineInitialized = true;
    requestAnimationFrame(() => {
      if (navUnderline) navUnderline.style.transition = "";
    });
  }
  navUnderline.style.width = `${linkRect.width}px`;
  navUnderline.style.transform = `translateX(${left}px)`;
};

let pinnedNavLink = null;

const updateActiveLink = () => {
  if (!navLinks.length) return;
  const scrollY = window.scrollY + 120;
  let current = navLinks[0];
  if (window.scrollY < 150) {
    current = navLinks[0];
  } else {
    navLinks.forEach((link) => {
      const id = link.getAttribute("href")?.slice(1);
      const section = id ? document.getElementById(id) : null;
      if (!section) return;
      if (section.offsetTop <= scrollY) {
        current = link;
      }
    });
  }
  if (pinnedNavLink) {
    const pinnedId = pinnedNavLink.getAttribute("href")?.slice(1);
    const pinnedSection = pinnedId ? document.getElementById(pinnedId) : null;
    if (pinnedSection && pinnedSection.offsetTop <= scrollY) {
      pinnedNavLink = null;
    } else {
      current = pinnedNavLink;
    }
  }
  navLinks.forEach((link) => link.classList.toggle("is-active", link === current));
  updateNavUnderline(current);
};

const openModal = (modal) => {
  if (!modal) return;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  const content = modal.querySelector(".modal__content");
  releaseFocus = trapFocus(content, true);
  const focusTarget = content.querySelector(focusableSelectors);
  if (focusTarget) {
    focusTarget.focus();
  }
};

const closeModal = (modal) => {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (releaseFocus) {
    releaseFocus();
    releaseFocus = null;
  }
};

const loadGA = () => {
  if (gaLoaded || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  gaLoaded = true;
};

const updateConsent = (analyticsGranted) => {
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }
  window.gtag("consent", "update", {
    analytics_storage: analyticsGranted ? "granted" : "denied"
  });
};

const applyConsent = (consent) => {
  if (consent?.analytics) {
    updateConsent(true);
    loadGA();
  } else {
    updateConsent(false);
  }
};

const saveConsent = (value) => {
  localStorage.setItem("beskider-consent", JSON.stringify(value));
  applyConsent(value);
  if (cookieBanner) {
    cookieBanner.style.display = "none";
  }
};

const getConsent = () => {
  const raw = localStorage.getItem("beskider-consent");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
};

const initCookieBanner = () => {
  const consent = getConsent();
  if (consent) {
    if (analyticsToggle) {
      analyticsToggle.checked = Boolean(consent.analytics);
    }
    applyConsent(consent);
    if (cookieBanner) {
      cookieBanner.style.display = "none";
    }
    return;
  }

  updateConsent(false);
  if (analyticsToggle) {
    analyticsToggle.checked = false;
  }

  if (cookieAccept) {
    cookieAccept.addEventListener("click", () =>
      saveConsent({ status: "accepted", analytics: true })
    );
  }
  if (cookieReject) {
    cookieReject.addEventListener("click", () =>
      saveConsent({ status: "rejected", analytics: false })
    );
  }
  if (cookieSettingsButton) {
    cookieSettingsButton.addEventListener("click", () => openModal(cookieSettings));
  }
  if (cookieSave) {
    cookieSave.addEventListener("click", () => {
      saveConsent({
        status: "custom",
        analytics: analyticsToggle?.checked ?? false
      });
      closeModal(cookieSettings);
    });
  }
};

/* Tab scroll arrows are now handled by tabnav.js */

const initTabs = () => {
  const panels = document.querySelectorAll(".tab-panel");
  const applyPanelVisibility = (targetId) => {
    const showAll = targetId === "tab-bikes-all";
    panels.forEach((panel) => {
      panel.classList.toggle("is-active", showAll || panel.id === targetId);
    });
  };
  const activeTab = document.querySelector(".tabnav-tab.is-active[data-tab-target]");
  if (activeTab) applyPanelVisibility(activeTab.dataset.tabTarget);
  tabs.forEach((tab) => {
    const isActive = tab.classList.contains("is-active");
    tab.setAttribute("aria-selected", String(isActive));
    tab.setAttribute("tabindex", isActive ? "0" : "-1");
  });
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.tabTarget;
      if (!targetId) return;
      tabs.forEach((item) => {
        const isActive = item.dataset.tabTarget === targetId;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-selected", String(isActive));
        item.setAttribute("tabindex", isActive ? "0" : "-1");
      });
      applyPanelVisibility(targetId);

      const platter = tab.closest(".tabnav-platter");
      if (platter && platter._tabnav) {
        platter._tabnav.updateIndicator();
        platter._tabnav.scrollTabIntoView(tab);
      }
    });
  });
};

const initRouteFilters = () => {
  const routeFilters = document.querySelectorAll("[data-route-filter]");
  const routeCards = document.querySelectorAll(".route-card[data-route-difficulty]");
  if (!routeFilters.length || !routeCards.length) return;

  const applyFilter = (filterValue) => {
    routeCards.forEach((card) => {
      const difficulties = card.dataset.routeDifficulty.split(" ");
      const match = filterValue === "all" || difficulties.includes(filterValue);
      card.classList.toggle("route-card--hidden", !match);
    });
  };

  routeFilters.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filterValue = btn.dataset.routeFilter;
      routeFilters.forEach((b) => b.classList.toggle("is-active", b === btn));
      applyFilter(filterValue);

      const platter = btn.closest(".tabnav-platter");
      if (platter && platter._tabnav) {
        platter._tabnav.updateIndicator();
        platter._tabnav.scrollTabIntoView(btn);
      }
    });
  });
};

const updateAboutTilt = () => {
  if (!aboutTilt) return;
  const rect = aboutTilt.getBoundingClientRect();
  const viewport = window.innerHeight || 0;
  const centerOffset = (rect.top + rect.height / 2 - viewport / 2) / viewport;
  const clamped = Math.max(-0.5, Math.min(0.5, centerOffset));
  const progress = clamped + 0.5;
  const rotation = 7 - 9 * progress;
  aboutTilt.style.setProperty("--about-tilt", `${rotation.toFixed(2)}deg`);
};

const initAccordion = () => {
  accordionToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const panel = toggle.nextElementSibling;
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      toggle.classList.toggle("is-open", !isOpen);
      if (panel) {
        if (!isOpen) {
          panel.classList.add("is-open");
          panel.style.maxHeight = `${panel.scrollHeight + 16}px`;
        } else {
          panel.classList.remove("is-open");
          panel.style.maxHeight = "0px";
        }
      }
    });
  });
};

const initModals = () => {
  modalTriggers.forEach((trigger) => {
    const modalId = trigger.dataset.openModal;
    const modal = document.getElementById(modalId);
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(modal);
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (
        event.target.matches("[data-close-modal]") ||
        event.target.classList.contains("modal__backdrop")
      ) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const openModalEl = document.querySelector(".modal.is-open");
      if (openModalEl) {
        closeModal(openModalEl);
      }
    }
  });
};

const initGallery = () => {
  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    const main = gallery.querySelector("[data-gallery-main]");
    const thumbs = gallery.querySelectorAll("[data-gallery-thumb]");
    let startX = 0;
    const buildImageSrc = (base, size) => base.replace(/\.jpg$/, `-${size}.jpg`);
    const buildSrcset = (base) =>
      [320, 640, 1280]
        .map((size) => `${buildImageSrc(base, size)} ${size}w`)
        .join(", ");

    const setMainImage = (base) => {
      if (!main || !base) return;
      main.src = buildImageSrc(base, 1280);
      main.srcset = buildSrcset(base);
      main.dataset.galleryBase = base;
    };

    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        const target = thumb.dataset.galleryTarget;
        setMainImage(target);
      });
    });

    if (main) {
      const initialBase = thumbs[0]?.dataset.galleryTarget;
      if (initialBase) {
        setMainImage(initialBase);
      }

      main.addEventListener("touchstart", (event) => {
        startX = event.touches[0].clientX;
      });
      main.addEventListener("touchend", (event) => {
        const endX = event.changedTouches[0].clientX;
        if (Math.abs(startX - endX) < 40) return;
        const currentBase = main.dataset.galleryBase;
        const currentIndex = Array.from(thumbs).findIndex(
          (thumb) => thumb.dataset.galleryTarget === currentBase
        );
        const direction = startX > endX ? 1 : -1;
        const safeIndex = currentIndex === -1 ? 0 : currentIndex;
        const nextIndex = (safeIndex + direction + thumbs.length) % thumbs.length;
        const nextTarget = thumbs[nextIndex]?.dataset.galleryTarget;
        setMainImage(nextTarget);
      });
    }
  });
};

const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    const buildVersion = document.documentElement.dataset.build || "dev";
    window.addEventListener("load", () => {
      navigator.serviceWorker.register(
        `./sw.js?v=${encodeURIComponent(buildVersion)}`
      );
    });
  }
};

initTheme();

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}

document.querySelectorAll("[data-theme-option]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const preference = btn.getAttribute("data-theme-option");
    setTheme(preference);
  });
});

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    if (navMenu.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
    updateHeaderState();
  });

  if (navBackdrop) {
    navBackdrop.addEventListener("click", () => {
      closeMenu();
      updateHeaderState();
    });
  }

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
      updateHeaderState();
    });
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    pinnedNavLink = link;
    navLinks.forEach((l) => l.classList.toggle("is-active", l === link));
    updateNavUnderline(link);
  });
});

/* Beskider+ billing toggle (rocznie / miesięcznie) */
const beskiderPlusSection = document.querySelector(".beskider-plus-section");
const beskiderPlusToggleBtns = document.querySelectorAll(".beskider-plus__toggle-btn");
if (beskiderPlusSection && beskiderPlusToggleBtns.length) {
  beskiderPlusToggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const billing = btn.getAttribute("data-billing");
      if (!billing) return;
      beskiderPlusSection.setAttribute("data-billing", billing);
      beskiderPlusToggleBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
    });
  });
}

/* CTA+ subtle scroll rotation: 1.8deg → ~0.6deg as user scrolls past */
const updateCtaRotation = () => {
  if (!ctaPlusCard) return;
  const rect = ctaPlusCard.getBoundingClientRect();
  const vh = window.innerHeight;
  // progress 0 → 1 as card goes from bottom of viewport to top
  const raw = 1 - rect.top / vh;
  const t = Math.max(0, Math.min(1, raw));
  // ease: start at 1.8deg, settle to ~0.6deg
  const deg = 1.8 - t * 1.2;
  ctaPlusCard.style.setProperty("--cta-rotate", deg.toFixed(2) + "deg");
};

const updateHeroScroll = () => {
  if (!hero || !heroMedia) return;
  const y = window.scrollY;
  const heroHeight = hero.offsetHeight;
  const maxScroll = Math.max(heroHeight * 0.8, 200);
  const progress = Math.min(y / maxScroll, 1);

  if (heroTitleFill) {
    const opacity = 0.9 * (1 - progress * 0.55);
    const brightness = 1.5 - 0.5 * progress;
    heroTitleFill.style.opacity = String(opacity);
    heroTitleFill.style.filter = `brightness(${brightness.toFixed(2)})`;
  }

  if (y > 0) {
    hero.classList.add("hero--scrolled");
    const blur = Math.min(y * 0.04, 6);
    heroMedia.style.filter = `blur(${blur}px)`;
    const scale = 1.1 + progress * 0.11;
    heroMedia.style.transform = `scale(${scale.toFixed(3)}) translateX(0)`;
  } else {
    hero.classList.remove("hero--scrolled");
    heroMedia.style.filter = "";
    heroMedia.style.transform = "";
  }
};

let scrollPending = false;
const handleScroll = () => {
  if (scrollPending) return;
  scrollPending = true;
  window.requestAnimationFrame(() => {
    updateHeaderState();
    updateActiveLink();
    updateAboutTilt();
    updateHeroScroll();
    updateCtaRotation();
    scrollPending = false;
  });
};

if (hero) {
  setTimeout(() => hero.classList.add("hero--loaded"), 80);
}

window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("resize", () => {
  updateAboutTilt();
  updateActiveLink();
  updateHeroScroll();
}, { passive: true });
handleScroll();

const CONTACT_FORM_ERRORS = {
  required: "To pole jest wymagane.",
  invalidLength: "Wprowadzona ilość znaków jest niepoprawna.",
  invalidEmail: "Wprowadź poprawny adres e-mail.",
  invalidPhone: "Wprowadź poprawny numer telefonu (9–15 cyfr).",
  invalidPostal: "Kod pocztowy w formacie XX-XXX.",
  invalidNip: "NIP powinien składać się z 10 cyfr.",
  termsRequired: "Potwierdź akceptację regulaminu.",
};

const CONTACT_FORM_RULES = {
  email: { required: true, min: 0, max: 0 },
  fullname: { required: true, min: 2, max: 100 },
  phone: { required: true, min: 0, max: 0 },
  "billing-fullname": { required: true, min: 2, max: 100 },
  "billing-company": { required: false },
  "billing-nip": { required: false },
  "billing-address": { required: true, min: 1, max: 200 },
  "billing-city": { required: true, min: 1, max: 100 },
  "billing-postal": { required: true, min: 0, max: 0 },
  "billing-country": { required: true, min: 1, max: 100 },
  message: { required: false },
  terms: { required: true },
};

const CONTACT_FORM_STORAGE_KEY = "beskider-contact-form";

const saveContactFormToStorage = (form) => {
  const data = {};
  const inputs = form.querySelectorAll("input[name]:not([type=hidden]), textarea[name]");
  inputs.forEach((el) => {
    const name = el.getAttribute("name");
    if (!name) return;
    if (el.type === "checkbox") data[name] = el.checked;
    else data[name] = el.value;
  });
  try {
    localStorage.setItem(CONTACT_FORM_STORAGE_KEY, JSON.stringify(data));
  } catch (_) {}
};

const loadContactFormFromStorage = (form) => {
  try {
    const raw = localStorage.getItem(CONTACT_FORM_STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") return;
    Object.keys(data).forEach((name) => {
      const el = form.querySelector(`[name="${name}"]`);
      if (!el) return;
      if (el.type === "checkbox") el.checked = !!data[name];
      else el.value = data[name] == null ? "" : String(data[name]);
    });
  } catch (_) {}
};

const clearContactFormStorage = () => {
  try {
    localStorage.removeItem(CONTACT_FORM_STORAGE_KEY);
  } catch (_) {}
};

const getContactFormGroup = (form, fieldName) =>
  form.querySelector(`.form-group[data-field="${fieldName}"]`);

const setContactFieldState = (group, valid, message) => {
  if (!group) return;
  const input = group.querySelector("input, textarea");
  const errorEl = group.querySelector(".form-group__error");
  group.classList.remove("form-group--valid", "form-group--error");
  if (valid) {
    group.classList.add("form-group--valid");
    if (input) input.setAttribute("aria-invalid", "false");
    if (errorEl) errorEl.textContent = "";
  } else {
    group.classList.add("form-group--error");
    if (input) input.setAttribute("aria-invalid", "true");
    if (errorEl) errorEl.textContent = message || "";
  }
};

const validateContactEmail = (value) => {
  if (!value || !value.trim()) return { valid: false, message: CONTACT_FORM_ERRORS.required };
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(value.trim())) return { valid: false, message: CONTACT_FORM_ERRORS.invalidEmail };
  return { valid: true };
};

const validateContactLength = (value, min, max, required) => {
  const trimmed = (value || "").trim();
  if (required && !trimmed) return { valid: false, message: CONTACT_FORM_ERRORS.required };
  if (!required && !trimmed) return { valid: true };
  if (min > 0 && trimmed.length < min) return { valid: false, message: CONTACT_FORM_ERRORS.invalidLength };
  if (max > 0 && trimmed.length > max) return { valid: false, message: CONTACT_FORM_ERRORS.invalidLength };
  return { valid: true };
};

const validateContactPhone = (value) => {
  const trimmed = (value || "").trim();
  if (!trimmed) return { valid: false, message: CONTACT_FORM_ERRORS.required };
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 9 || digits.length > 15) return { valid: false, message: CONTACT_FORM_ERRORS.invalidPhone };
  return { valid: true };
};

const validateContactPostal = (value) => {
  const trimmed = (value || "").trim();
  if (!trimmed) return { valid: false, message: CONTACT_FORM_ERRORS.required };
  if (!/^\d{2}-\d{3}$/.test(trimmed)) return { valid: false, message: CONTACT_FORM_ERRORS.invalidPostal };
  return { valid: true };
};

const validateContactNip = (value) => {
  const trimmed = (value || "").trim();
  if (!trimmed) return { valid: true };
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length !== 10) return { valid: false, message: CONTACT_FORM_ERRORS.invalidNip };
  return { valid: true };
};

const validateContactField = (fieldName, value, form) => {
  const rules = CONTACT_FORM_RULES[fieldName];
  if (!rules) return { valid: true };

  if (fieldName === "terms") {
    const checked = !!value;
    if (rules.required && !checked) return { valid: false, message: CONTACT_FORM_ERRORS.termsRequired };
    return { valid: true };
  }

  if (fieldName === "email") return validateContactEmail(value);
  if (fieldName === "phone") return validateContactPhone(value);
  if (fieldName === "billing-postal") return validateContactPostal(value);
  if (fieldName === "billing-nip") return validateContactNip(value);

  const required = rules.required !== false;
  const min = rules.min ?? 0;
  const max = rules.max ?? 0;
  return validateContactLength(value, min, max, required);
};

const validateContactForm = (form) => {
  const fields = Object.keys(CONTACT_FORM_RULES);
  let allValid = true;
  for (const fieldName of fields) {
    const group = getContactFormGroup(form, fieldName);
    if (!group) continue;
    const input = group.querySelector("input, textarea");
    const value = input ? (input.type === "checkbox" ? input.checked : input.value) : "";
    const result = validateContactField(fieldName, value, form);
    setContactFieldState(group, result.valid, result.message);
    if (!result.valid) allValid = false;
  }
  return allValid;
};

const initContactForm = () => {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const fieldsToValidate = form.querySelectorAll(".form-group[data-field] input:not([type=checkbox]), .form-group[data-field] textarea");
  const termsCheckbox = form.querySelector("#contact-terms");

  const onFieldValidate = (fieldName) => {
    const group = getContactFormGroup(form, fieldName);
    if (!group) return;
    const input = group.querySelector("input, textarea");
    const value = input ? (input.type === "checkbox" ? input.checked : input.value) : "";
    const result = validateContactField(fieldName, value, form);
    setContactFieldState(group, result.valid, result.message);
  };

  fieldsToValidate.forEach((input) => {
    const group = input.closest(".form-group");
    const fieldName = group?.getAttribute("data-field");
    if (!fieldName) return;
    input.addEventListener("blur", () => onFieldValidate(fieldName));
    input.addEventListener("input", () => onFieldValidate(fieldName));
  });

  if (termsCheckbox) {
    termsCheckbox.addEventListener("change", () => onFieldValidate("terms"));
  }

  let saveTimeout = null;
  const scheduleSave = () => {
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      saveContactFormToStorage(form);
      saveTimeout = null;
    }, 300);
  };
  form.addEventListener("input", scheduleSave);
  form.addEventListener("change", scheduleSave);

  loadContactFormFromStorage(form);

  // Walidacja pól po załadowaniu (np. po odświeżeniu strony)
  const validateLoadedFields = () => {
    const fields = Object.keys(CONTACT_FORM_RULES);
    fields.forEach((fieldName) => {
      const group = getContactFormGroup(form, fieldName);
      if (!group) return;
      const input = group.querySelector("input, textarea");
      if (!input) return;
      const value = input.type === "checkbox" ? input.checked : input.value;
      // Waliduj tylko jeśli pole ma wartość
      if (value && (typeof value === "string" ? value.trim() : value)) {
        const result = validateContactField(fieldName, value, form);
        setContactFieldState(group, result.valid, result.message);
      }
    });
  };
  validateLoadedFields();

  const clearBtn = form.querySelector("[data-contact-clear]");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (!confirm("Czy na pewno chcesz usunąć zapisane dane formularza?")) return;
      form.reset();
      clearContactFormStorage();
      clearStatus();
      form.querySelectorAll(".form-group").forEach((g) => g.classList.remove("form-group--valid", "form-group--error"));
      form.querySelectorAll("[aria-invalid]").forEach((el) => el.setAttribute("aria-invalid", "false"));
      clearBtn.focus();
    });
  }

  const termsModalBtn = form.querySelector("button[data-open-modal=\"regulamin\"]");
  if (termsModalBtn) {
    termsModalBtn.addEventListener("click", (e) => e.stopPropagation());
  }

  const statusEl = document.getElementById("contact-form-status");
  const submitBtn = form.querySelector('button[type="submit"]');

  const setStatus = (message, status) => {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.setAttribute("data-status", status);
    statusEl.hidden = false;
  };

  const clearStatus = () => {
    if (statusEl) {
      statusEl.textContent = "";
      statusEl.removeAttribute("data-status");
      statusEl.hidden = true;
    }
  };

  form.addEventListener("click", (e) => {
    if (e.target.closest(".contact-form__fallback-submit")) {
      e.preventDefault();
      form.setAttribute("target", "_blank");
      form.submit();
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearStatus();
    const valid = validateContactForm(form);
    if (!valid) {
      const firstError = form.querySelector(".form-group--error");
      const firstInvalid = firstError?.querySelector("input, textarea");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        setStatus("Dziękujemy! Wiadomość została wysłana. Odpowiemy wkrótce.", "success");
        form.reset();
        clearContactFormStorage();
        form.querySelectorAll(".form-group").forEach((g) => g.classList.remove("form-group--valid", "form-group--error"));
        form.querySelectorAll("[aria-invalid]").forEach((el) => el.setAttribute("aria-invalid", "false"));
      } else {
        setStatus(data.error || "Wysyłanie nie powiodło się. Spróbuj ponownie lub napisz na hello@beskider.pl.", "error");
      }
    } catch {
      if (statusEl) {
        statusEl.setAttribute("data-status", "error");
        statusEl.hidden = false;
        statusEl.innerHTML =
          "Wysyłanie nie powiodło się (np. brak sieci lub blokada). " +
          "<button type=\"button\" class=\"contact-form__fallback-submit link-button\">Wyślij w nowej karcie</button> " +
          "lub napisz na hello@beskider.pl.";
      }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
};

initTabs();
initRouteFilters();
initAccordion();
initModals();
initGallery();
initCookieBanner();
initContactForm();
registerServiceWorker();
