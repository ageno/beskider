/**
 * TabNav — Apple-style platter tab component (JS)
 *
 * Responsibilities (CSS handles everything else):
 *  1. Detect horizontal overflow on the scroller.
 *  2. Toggle .has-left-overflow / .has-right-overflow on the platter.
 *  3. Scroll on arrow click (step = 70 % of viewport).
 *  4. ScrollIntoView the active tab (centered).
 *  5. Roving tabindex keyboard navigation (Left/Right/Home/End).
 *  6. Respect prefers-reduced-motion for scroll behavior.
 */
(function () {
  "use strict";

  /* ---- helpers ---- */

  /** Return 'auto' when user prefers reduced motion, else 'smooth'. */
  var prefersReducedMotion = function () {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  var scrollBehavior = function () {
    return prefersReducedMotion() ? "auto" : "smooth";
  };

  /* ---- per-platter init ---- */

  function initTabNav(platter) {
    var scroller = platter.querySelector(".tabnav-scroller");
    if (!scroller) return;
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/a5533262-807e-410b-97e3-25468d550b5c',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'c75b25'},body:JSON.stringify({sessionId:'c75b25',location:'tabnav.js:29',message:'initTabNav - initial styles',data:{scrollerBg:window.getComputedStyle(scroller).backgroundColor,viewportBg:window.getComputedStyle(scroller.parentElement).backgroundColor,platterBg:window.getComputedStyle(platter).backgroundColor,bodyBg:window.getComputedStyle(document.body).backgroundColor},timestamp:Date.now(),runId:'run1',hypothesisId:'A,B,C,D,E'})}).catch(()=>{});
    // #endregion

    var leftBtn = platter.querySelector(".tabnav-arrow.is-left .tabnav-arrow-btn");
    var rightBtn = platter.querySelector(".tabnav-arrow.is-right .tabnav-arrow-btn");

    /* --- 0. Indicator (animated floating pill) --- */
    var indicator = document.createElement("div");
    indicator.className = "tabnav-indicator";
    indicator.setAttribute("aria-hidden", "true");
    scroller.insertBefore(indicator, scroller.firstChild);

    function updateIndicator() {
      var active = scroller.querySelector(".tabnav-tab.is-active");
      if (!active) {
        scroller.style.setProperty("--indicator-x", "0");
        scroller.style.setProperty("--indicator-w", "0");
        return;
      }
      var x = active.offsetLeft;
      var w = active.offsetWidth;
      scroller.style.setProperty("--indicator-x", x + "px");
      scroller.style.setProperty("--indicator-w", w + "px");
      scroller.classList.add("tabnav-indicator-ready");
    }

    /* --- 1. Overflow detection ---
     * Compare scrollWidth vs clientWidth; update CSS classes that
     * drive arrow visibility (opacity via CSS transition). */
    function updateOverflow() {
      var sl = scroller.scrollLeft;
      var sw = scroller.scrollWidth;
      var cw = scroller.clientWidth;

      platter.classList.toggle("has-left-overflow", sl > 1);
      platter.classList.toggle("has-right-overflow", sl < sw - cw - 1);
    }

    scroller.addEventListener("scroll", function () {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a5533262-807e-410b-97e3-25468d550b5c',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'c75b25'},body:JSON.stringify({sessionId:'c75b25',location:'tabnav.js:67',message:'Scroll event on tabnav-scroller',data:{scrollLeft:scroller.scrollLeft,computedBg:window.getComputedStyle(scroller).backgroundColor,computedBgViewport:window.getComputedStyle(scroller.parentElement).backgroundColor,computedBgPlatter:window.getComputedStyle(platter).backgroundColor},timestamp:Date.now(),runId:'run1',hypothesisId:'A,B,C,D'})}).catch(()=>{});
      // #endregion
      requestAnimationFrame(updateOverflow);
    }, { passive: true });

    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(function () {
        requestAnimationFrame(function () {
          updateOverflow();
          updateIndicator();
        });
      }).observe(scroller);
    }

    window.addEventListener("resize", function () {
      requestAnimationFrame(function () {
        updateOverflow();
        updateIndicator();
      });
    }, { passive: true });

    /* --- 2. Arrow click: scroll by ~70 % of visible width --- */
    var scrollStep = function () {
      return scroller.clientWidth * 0.7;
    };

    if (leftBtn) {
      leftBtn.addEventListener("click", function () {
        scroller.scrollBy({ left: -scrollStep(), behavior: scrollBehavior() });
      });
    }

    if (rightBtn) {
      rightBtn.addEventListener("click", function () {
        scroller.scrollBy({ left: scrollStep(), behavior: scrollBehavior() });
      });
    }

    /* --- 3. Scroll active tab into center view --- */
    function scrollTabIntoView(tab) {
      if (!tab) return;
      tab.scrollIntoView({
        inline: "center",
        block: "nearest",
        behavior: scrollBehavior()
      });
    }

    /* --- 4. Keyboard navigation (roving tabindex) ---
     * ArrowRight / ArrowLeft cycle through enabled tabs.
     * Home / End jump to first / last. */
    function enabledTabs() {
      return Array.from(scroller.querySelectorAll(
        ".tabnav-tab:not([disabled]):not([aria-disabled='true'])"
      ));
    }

    scroller.addEventListener("keydown", function (e) {
      var tabs = enabledTabs();
      var idx = tabs.indexOf(document.activeElement);
      if (idx === -1) return;

      var next = -1;
      switch (e.key) {
        case "ArrowRight":
          next = (idx + 1) % tabs.length;
          break;
        case "ArrowLeft":
          next = (idx - 1 + tabs.length) % tabs.length;
          break;
        case "Home":
          next = 0;
          break;
        case "End":
          next = tabs.length - 1;
          break;
        default:
          return; // ignore other keys
      }

      e.preventDefault();
      tabs[next].focus();
      scrollTabIntoView(tabs[next]);
    });

    /* --- expose API for external code (tab activation, etc.) --- */
    platter._tabnav = {
      scrollTabIntoView: scrollTabIntoView,
      updateOverflow: updateOverflow,
      updateIndicator: updateIndicator
    };

    /* initial state */
    updateOverflow();
    updateIndicator();
    requestAnimationFrame(function () {
      updateOverflow();
      updateIndicator();
    });
  }

  /* ---- global init ---- */

  function initAll() {
    var platters = document.querySelectorAll(".tabnav-platter");
    platters.forEach(initTabNav);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  /* expose for manual usage */
  window.TabNav = { init: initTabNav, initAll: initAll };
})();
