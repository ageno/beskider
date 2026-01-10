const themeToggle = document.querySelector("[data-theme-toggle]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const siteHeader = document.querySelector(".site-header");
const navLinks = navMenu ? Array.from(navMenu.querySelectorAll("a[href^=\"#\"]")) : [];
const tabs = document.querySelectorAll("[data-tab-target]");
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
const focusableSelectors =
  "a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex='-1'])";

const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
let gaLoaded = false;
let releaseFocus = null;

const setTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("beskider-theme", theme);
};

const initTheme = () => {
  const stored = localStorage.getItem("beskider-theme");
  if (stored) {
    setTheme(stored);
    return;
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light");
};

const toggleTheme = () => {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
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
  navMenu.classList.add("is-open");
  navToggle.setAttribute("aria-expanded", "true");
  navToggle.setAttribute("aria-label", "Zamknij menu");
  releaseFocus = trapFocus(navMenu);
};

const closeMenu = () => {
  navMenu.classList.remove("is-open");
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

const updateActiveLink = () => {
  if (!navLinks.length) return;
  const scrollY = window.scrollY + 120;
  let current = navLinks[0];
  navLinks.forEach((link) => {
    const id = link.getAttribute("href")?.slice(1);
    const section = id ? document.getElementById(id) : null;
    if (!section) return;
    if (section.offsetTop <= scrollY) {
      current = link;
    }
  });
  navLinks.forEach((link) => link.classList.toggle("is-active", link === current));
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

const initTabs = () => {
  tabs.forEach((tab) => {
    const isActive = tab.classList.contains("is-active");
    tab.setAttribute("aria-selected", String(isActive));
    tab.setAttribute("tabindex", isActive ? "0" : "-1");
  });
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => {
        const isActive = item === tab;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-selected", String(isActive));
        item.setAttribute("tabindex", isActive ? "0" : "-1");
      });
      document.querySelectorAll(".tab-panel").forEach((panel) => {
        panel.classList.remove("is-active");
      });
      const panel = document.getElementById(tab.dataset.tabTarget);
      if (panel) {
        panel.classList.add("is-active");
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
    trigger.addEventListener("click", () => openModal(modal));
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

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    if (navMenu.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
    updateHeaderState();
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
      updateHeaderState();
    });
  });
}

let scrollPending = false;
const handleScroll = () => {
  if (scrollPending) return;
  scrollPending = true;
  window.requestAnimationFrame(() => {
    updateHeaderState();
    updateActiveLink();
    updateAboutTilt();
    scrollPending = false;
  });
};

window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("resize", updateAboutTilt, { passive: true });
handleScroll();

initTabs();
initAccordion();
initModals();
initGallery();
initCookieBanner();
registerServiceWorker();
