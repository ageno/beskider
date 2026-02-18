/**
 * Peek gallery: slider z aktywnym slajdem na środku, pagerem w formie kapsuły i opcjonalnym play dla wideo.
 * Dane z data-peek-gallery-config (JSON). Zgodne z designem: peek, kapsuła, a11y, reduced motion.
 */
(function () {
  const GAP_PX = 32;
  const SLIDE_WIDTH_PCT_MOBILE = 0.82;
  const SLIDE_WIDTH_PCT_TABLET = 0.78;
  const SLIDE_WIDTH_PCT_DESK = 0.7;
  const COMMIT_THRESHOLD_PCT = 0.18;
  const VELOCITY_THRESHOLD = 0.3;
  const MAX_DOTS_VISIBLE = 7;
  /** Ile slajdów w każdą stronę doładowywać (żeby przy scrollu w bok zdjęcie było już ładowane) */
  const PRELOAD_MARGIN = 2;

  function getSlideWidthPct(viewportWidth) {
    if (viewportWidth >= 1024) return SLIDE_WIDTH_PCT_DESK;
    if (viewportWidth >= 768) return SLIDE_WIDTH_PCT_TABLET;
    return SLIDE_WIDTH_PCT_MOBILE;
  }

  function parseConfig(el) {
    const script = el.querySelector("script[data-peek-gallery-config]");
    if (!script || !script.textContent) return null;
    try {
      return JSON.parse(script.textContent.trim());
    } catch (_) {
      return null;
    }
  }

  function createSlideElement(item, index, total) {
    const li = document.createElement("li");
    li.className = "peek-gallery__slide";
    li.setAttribute("role", "group");
    li.setAttribute("aria-roledescription", "slide");
    li.setAttribute("aria-label", `Slajd ${index + 1} z ${total}`);
    li.setAttribute("aria-hidden", "true");
    li.dataset.peekSlideIndex = String(index);
    if (item.id) li.dataset.peekSlideId = item.id;

    const media = item.media || {};
    const theme = item.theme || {};
    const textColor = theme.overlayTextColor || "#0d0d0d";

    const mediaWrap = document.createElement("div");
    mediaWrap.className = "peek-gallery__media-wrap";

    if (media.type === "video") {
      const video = document.createElement("video");
      video.setAttribute("playsinline", "");
      video.poster = media.poster || "";
      video.src = media.videoSrc || "";
      video.controls = false;
      video.preload = "metadata";
      video.dataset.peekVideo = "";
      mediaWrap.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.alt = media.alt || "";
      if (item.objectPosition) img.style.objectPosition = item.objectPosition;
      img.loading = "lazy";
      img.decoding = "async";
      img.draggable = false;
      if (media.sizes) img.sizes = media.sizes;
      img.dataset.peekImg = "";
      img.dataset.peekSrc = media.src || "";
      if (media.srcset) img.dataset.peekSrcset = media.srcset;
      mediaWrap.appendChild(img);
      function wrapPortraitForInfiniteScroll() {
        if (mediaWrap.querySelector(".peek-gallery__media-wrap--portrait-inner")) return;
        const inner = document.createElement("div");
        inner.className = "peek-gallery__media-wrap--portrait-inner";
        inner.dataset.peekBg = img.dataset.peekSrc || "";
        img.parentNode.removeChild(img);
        mediaWrap.appendChild(inner);
      }
      if (item.portraitInFrame) {
        mediaWrap.classList.add("peek-gallery__media-wrap--portrait");
      }
      function markPortraitIfNeeded() {
        if (img.naturalWidth && img.naturalHeight && img.naturalHeight > img.naturalWidth) {
          mediaWrap.classList.add("peek-gallery__media-wrap--portrait");
        }
      }
      img.addEventListener("load", markPortraitIfNeeded);
      if (img.complete) markPortraitIfNeeded();
    }

    const textEl = document.createElement("div");
    textEl.className = "peek-gallery__text";
    textEl.style.setProperty("--peek-text-color", textColor);
    if (theme.textMaxWidthPercent) textEl.style.maxWidth = theme.textMaxWidthPercent + "%";

    const parts = [item.title, item.subtitle].filter(Boolean);
    if (parts.length) {
      const p = document.createElement("p");
      p.className = "peek-gallery__text-body";
      p.textContent = parts.join(" ");
      textEl.appendChild(p);
    }

    li.appendChild(mediaWrap);
    li.appendChild(textEl);
    return li;
  }

  function PeekGallery(root, config) {
    this.root = root;
    this.config = config;
    this.items = config.items || [];
    this.count = this.items.length;
    var defaultIndex = this.count > 0 ? Math.floor(this.count / 2) : 0;
    this.initialIndex = Math.max(0, Math.min((config.initialIndex ?? defaultIndex), this.count - 1));
    this.loop = config.loop !== false;
    this.autoplay = config.autoplay === true;
    this.autoplayIntervalMs = config.autoplayIntervalMs ?? 6000;
    this.onSlideChange = typeof config.onSlideChange === "function" ? config.onSlideChange : null;
    this.a11yLabel = config.a11yLabel || "Galeria";

    this.index = this.initialIndex;
    this._pointerStart = null;
    this._pointerMoved = false;
    this._slotOffset = null;
    this._videoModalOpen = false;
    this._mounted = false;
    this._dotLefts = [];
  }

  PeekGallery.prototype._clampIndex = function (i) {
    if (this.count <= 0) return 0;
    if (this.loop) {
      return ((i % this.count) + this.count) % this.count;
    }
    return Math.max(0, Math.min(this.count - 1, i));
  };

  PeekGallery.prototype._getSlideWidthPct = function () {
    const vw = this.viewport ? this.viewport.offsetWidth : 0;
    return getSlideWidthPct(vw);
  };

  PeekGallery.prototype._getSlideWidthPx = function () {
    if (!this.viewport) return 0;
    const vw = this.viewport.offsetWidth;
    if (vw >= 1024) {
      const remPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      return 69 * remPx;
    }
    const pct = this._getSlideWidthPct();
    return vw * pct;
  };

  PeekGallery.prototype._getTrackOffsetPx = function () {
    if (!this.viewport) return 0;
    const slideWidth = this._getSlideWidthPx();
    var slotIndex = this.index;
    if (this.loop && this.slides && this.slides.length > this.count) {
      var so = this._slotOffset != null ? this._slotOffset : 1 + this.index;
      if (this.index === 0 && so >= 2 && so <= this.count) {
        this._slotOffset = 1;
        so = 1;
      } else if (this.index === this.count - 1 && so >= 1 && so < this.count) {
        this._slotOffset = this.count;
        so = this.count;
      }
      slotIndex = so;
    }
    return slotIndex * (slideWidth + GAP_PX);
  };

  PeekGallery.prototype._renderTrack = function () {
    if (!this.track || !this.viewport) return;
    if (this._pointerStart != null) return;
    if (this.loop && this.slides && this.slides.length > this.count && this._slotOffset != null && this._slotOffset >= 1 && this._slotOffset <= this.count) {
      var expectedIndex = this._slotOffset - 1;
      if (this.index !== expectedIndex) {
        this.index = expectedIndex;
        this._updateUI();
      }
    }
    const vw = this.viewport.offsetWidth;
    const slideWidth = this._getSlideWidthPx();
    const center = vw / 2 - slideWidth / 2;
    const offset = this._getTrackOffsetPx();
    const tx = -offset + center;
    this.track.style.transform = "translate3d(" + tx + "px, 0, 0)";
  };

  PeekGallery.prototype._updateSlideVisibility = function () {
    const idx = this.index;
    const n = this.count;
    this.slides.forEach(function (slide) {
      const logicalIdx = parseInt(slide.dataset.peekSlideIndex, 10);
      if (Number.isNaN(logicalIdx)) return;
      var inRange = false;
      for (var m = -PRELOAD_MARGIN; m <= PRELOAD_MARGIN; m++) {
        if (((idx + m + n) % n) === logicalIdx) { inRange = true; break; }
      }
      slide.setAttribute("aria-hidden", logicalIdx !== idx);
      const portraitInner = slide.querySelector(".peek-gallery__media-wrap--portrait-inner");
      const imgs = slide.querySelectorAll("[data-peek-img]");
      const img = imgs[0];
      const video = slide.querySelector("[data-peek-video]");
      if (portraitInner && portraitInner.dataset.peekBg && inRange && !portraitInner.style.backgroundImage) {
        portraitInner.style.backgroundImage = "url(" + portraitInner.dataset.peekBg + ")";
      }
      if (img && img.dataset.peekSrc) {
        if (inRange && !img.getAttribute("src")) {
          imgs.forEach(function (i) {
            i.src = i.dataset.peekSrc;
            if (i.dataset.peekSrcset) i.srcset = i.dataset.peekSrcset;
          });
        }
      }
      if (video && video.dataset.peekVideoSrc && inRange && !video.src) {
        video.src = video.dataset.peekVideoSrc;
      }
    });
  };

  PeekGallery.prototype._updateUI = function () {
    this.slides.forEach(function (s) {
      var logicalIdx = parseInt(s.dataset.peekSlideIndex, 10);
      if (!Number.isNaN(logicalIdx)) {
        s.setAttribute("aria-label", "Slajd " + (logicalIdx + 1) + " z " + this.count);
        s.setAttribute("aria-hidden", logicalIdx !== this.index);
      }
    }.bind(this));

    const dots = this.root.querySelectorAll(".peek-gallery__dot");
    dots.forEach(function (d, i) {
      d.setAttribute("aria-current", i === this.index ? "true" : "false");
      d.setAttribute("aria-label", "Przejdź do slajdu " + (i + 1));
    }.bind(this));

    const live = this.root.querySelector("[data-peek-gallery-live]");
    if (live) live.textContent = "Slajd " + (this.index + 1) + " z " + this.count;

    if (this.progressBar && this.autoplay && !this._videoModalOpen) this._updateTimedProgress();
  };

  PeekGallery.prototype._updateTimedProgress = function () {
    if (!this.progressBar || !this.pagerInner || !this.dotsWrap) return;
    const activeBtn = this.root.querySelector(".peek-gallery__dot[aria-current=\"true\"]");
    if (!activeBtn) return;
    const left = this.dotsWrap.offsetLeft + activeBtn.offsetLeft;
    const targetWidth = activeBtn.offsetWidth;
    this.progressBar.style.transitionDuration = this.autoplayIntervalMs + "ms";
    this.progressBar.style.left = left + "px";
    this.progressBar.style.top = "0";
    this.progressBar.style.width = "0";
    var self = this;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        if (self.progressBar) self.progressBar.style.width = targetWidth + "px";
      });
    });
  };

  PeekGallery.prototype._getDotIndices = function () {
    const n = this.count;
    if (n <= MAX_DOTS_VISIBLE) return Array.from({ length: n }, function (_, i) { return i; });
    const idx = this.index;
    const half = Math.floor((MAX_DOTS_VISIBLE - 3) / 2);
    const from = Math.max(0, idx - half);
    const to = Math.min(n - 1, from + (MAX_DOTS_VISIBLE - 3));
    const from2 = Math.max(0, to - (MAX_DOTS_VISIBLE - 3));
    return [0].concat(from2 > 1 ? ["…"] : [], Array.from({ length: to - from2 + 1 }, function (_, i) { return from2 + i; }), to < n - 2 ? ["…"] : [], n - 1).filter(function (v) { return v !== "…" || true; });
  };

  PeekGallery.prototype._syncSlotOffset = function () {
    if (this.loop && this.slides && this.slides.length > this.count) {
      this._slotOffset = 1 + this.index;
    }
  };

  PeekGallery.prototype._onTrackTransitionEnd = function () {
    if (!this.track || !this.loop || this._slotOffset == null) return;
    if (this._slotOffset === this.count + 1) {
      this._slotOffset = 1;
    } else if (this._slotOffset === 0) {
      this._slotOffset = this.count;
    } else {
      return;
    }
    this.track.style.transition = "none";
    this._renderTrack();
    var self = this;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        if (self.track) self.track.style.transition = "";
      });
    });
  };

  PeekGallery.prototype.goTo = function (index, source) {
    const prev = this.index;
    var target = this._clampIndex(index);
    if (target === prev) return;
    var wrapViaPrev = this.loop && this.slides && this.slides.length > this.count && prev === 0 && target === this.count - 1;
    var wrapViaNext = this.loop && this.slides && this.slides.length > this.count && prev === this.count - 1 && target === 0;
    if (wrapViaPrev) {
      this.prev();
      return;
    }
    if (wrapViaNext) {
      this.next();
      return;
    }
    this.index = target;
    this.root.dataset.peekDir = target > prev ? "next" : "prev";
    this._syncSlotOffset();
    this._renderTrack();
    this._updateSlideVisibility();
    this._updateUI();
    if (this.onSlideChange) this.onSlideChange(this.index);
    this.root.dispatchEvent(new CustomEvent("peek-gallery:change", { bubbles: true, detail: { from: prev, to: this.index, source: source || "unknown" } }));
  };

  PeekGallery.prototype.next = function () {
    if (this.count <= 0) return;
    var self = this;
    var prev = this.index;
    if (this.loop && this.slides && this.slides.length > this.count && prev === this.count - 1) {
      this.index = 0;
      this.root.dataset.peekDir = "next";
      this._slotOffset = this.count + 1;
      this._renderTrack();
      this._updateSlideVisibility();
      this._updateUI();
      this.track.addEventListener("transitionend", function cb(e) {
        if (e.target !== self.track || e.propertyName !== "transform") return;
        self.track.removeEventListener("transitionend", cb);
        self._onTrackTransitionEnd();
      }, { once: true });
      if (this.onSlideChange) this.onSlideChange(this.index);
      this.root.dispatchEvent(new CustomEvent("peek-gallery:change", { bubbles: true, detail: { from: prev, to: this.index, source: "next" } }));
      return;
    }
    this.goTo(this.index + 1, "next");
  };

  PeekGallery.prototype.prev = function () {
    if (this.count <= 0) return;
    var self = this;
    var prev = this.index;
    if (this.loop && this.slides && this.slides.length > this.count && prev === 0) {
      this.index = this.count - 1;
      this.root.dataset.peekDir = "prev";
      this._slotOffset = 0;
      this._renderTrack();
      this._updateSlideVisibility();
      this._updateUI();
      var self = this;
      this.track.addEventListener("transitionend", function cb(e) {
        if (e.target !== self.track || e.propertyName !== "transform") return;
        self.track.removeEventListener("transitionend", cb);
        self._onTrackTransitionEnd();
      }, { once: true });
      if (this.onSlideChange) this.onSlideChange(this.index);
      this.root.dispatchEvent(new CustomEvent("peek-gallery:change", { bubbles: true, detail: { from: prev, to: this.index, source: "prev" } }));
      return;
    }
    this.goTo(this.index - 1, "prev");
  };

  PeekGallery.prototype._onPointerDown = function (e) {
    if (!this.viewport) return;
    const center = this.viewport.offsetWidth / 2 - this._getSlideWidthPx() / 2;
    const baseTx = -this._getTrackOffsetPx() + center;
    this._pointerStart = { x: e.clientX, y: e.clientY, t: Date.now(), baseTx: baseTx };
    this._pointerMoved = false;
    this.track.style.transition = "none";
  };

  PeekGallery.prototype._onPointerMove = function (e) {
    if (this._pointerStart == null) return;
    var dx = e.clientX - this._pointerStart.x;
    if (Math.abs(dx) > 5) this._pointerMoved = true;
    const vw = this.viewport.offsetWidth;
    const slideWidth = this._getSlideWidthPx();
    const center = vw / 2 - slideWidth / 2;
    const baseTx = this._pointerStart.baseTx;
    const txMax = center;
    const txMin = -((this.count - 1) * (slideWidth + GAP_PX)) + center;
    const tx = Math.max(txMin, Math.min(txMax, baseTx + dx));
    this.track.style.transform = "translate3d(" + tx + "px, 0, 0)";
  };

  PeekGallery.prototype._onPointerUp = function (e) {
    if (this._pointerStart == null) return;
    const dt = Date.now() - this._pointerStart.t;
    const dx = e.clientX - this._pointerStart.x;
    const velocity = dt > 0 ? Math.abs(dx) / dt : 0;
    const slideWidth = this._getSlideWidthPx();
    this.track.style.transition = "";
    this._pointerStart = null;

    if (velocity > VELOCITY_THRESHOLD) {
      if (dx < -30) this.next();
      else if (dx > 30) this.prev();
      else this._renderTrack();
      return;
    }
    if (Math.abs(dx) >= slideWidth * COMMIT_THRESHOLD_PCT) {
      if (dx < 0) this.next();
      else this.prev();
      return;
    }
    this._renderTrack();
  };

  PeekGallery.prototype._onKeyDown = function (e) {
    if (!this.root.contains(document.activeElement)) return;
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        this.prev();
        break;
      case "ArrowRight":
        e.preventDefault();
        this.next();
        break;
      case "Home":
        e.preventDefault();
        this.goTo(0, "keyboard");
        break;
      case "End":
        e.preventDefault();
        this.goTo(this.count - 1, "keyboard");
        break;
    }
  };

  PeekGallery.prototype._openVideoModal = function () {
    const item = this.items[this.index];
    if (!item || !item.media || item.media.type !== "video") return;
    this._videoModalOpen = true;
    if (this.progressBar) this.progressBar.style.width = "0";
    const modal = document.getElementById("peek-gallery-video-modal");
    if (!modal) return;
    const video = modal.querySelector("video");
    if (video) {
      video.src = item.media.videoSrc || "";
      video.poster = item.media.poster || "";
      video.load();
    }
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
  };

  PeekGallery.prototype._closeVideoModal = function () {
    const modal = document.getElementById("peek-gallery-video-modal");
    if (modal) {
      const video = modal.querySelector("video");
      if (video) {
        video.pause();
        video.removeAttribute("src");
      }
      modal.hidden = true;
      modal.setAttribute("aria-hidden", "true");
    }
    this._videoModalOpen = false;
    if (this.autoplay) this._startAutoplay();
  };

  PeekGallery.prototype._startAutoplay = function () {
    if (this._videoModalOpen) return;
    if (this.progressBar) this._updateTimedProgress();
  };

  PeekGallery.prototype.build = function () {
    if (this.count === 0) {
      this.root.hidden = true;
      return;
    }
    this.root.setAttribute("aria-label", this.a11yLabel);

    const inner = document.createElement("div");
    inner.className = "peek-gallery__inner";

    const viewport = document.createElement("div");
    viewport.className = "peek-gallery__viewport";
    viewport.setAttribute("tabindex", "0");

    const track = document.createElement("ul");
    track.className = "peek-gallery__track";
    track.setAttribute("role", "list");

    this.slides = [];
    var indicesToRender = [];
    if (this.loop && this.count > 0) {
      indicesToRender.push({ itemIndex: this.count - 1, logicalIndex: this.count - 1 });
      for (var i = 0; i < this.count; i++) indicesToRender.push({ itemIndex: i, logicalIndex: i });
      indicesToRender.push({ itemIndex: 0, logicalIndex: 0 });
    } else {
      for (var i = 0; i < this.count; i++) indicesToRender.push({ itemIndex: i, logicalIndex: i });
    }
    var n = this.count;
    var idx = this.index;
    for (var k = 0; k < indicesToRender.length; k++) {
      var itemIndex = indicesToRender[k].itemIndex;
      var logicalIndex = indicesToRender[k].logicalIndex;
      var slideEl = createSlideElement(this.items[itemIndex], logicalIndex, this.count);
      var media = this.items[itemIndex].media;
      var inRange = false;
      for (var m = -PRELOAD_MARGIN; m <= PRELOAD_MARGIN; m++) {
        if (((idx + m + n) % n) === logicalIndex) { inRange = true; break; }
      }
      var portraitInner = slideEl.querySelector(".peek-gallery__media-wrap--portrait-inner");
      if (portraitInner && portraitInner.dataset.peekBg && inRange) {
        portraitInner.style.backgroundImage = "url(" + portraitInner.dataset.peekBg + ")";
      }
      if (media && media.type === "image") {
        var imgs = slideEl.querySelectorAll("[data-peek-img]");
        if (imgs.length && inRange) {
          imgs.forEach(function (i) {
            i.src = i.dataset.peekSrc || "";
            if (i.dataset.peekSrcset) i.srcset = i.dataset.peekSrcset;
          });
        }
      } else if (media && media.type === "video") {
        var vid = slideEl.querySelector("[data-peek-video]");
        if (vid) {
          vid.dataset.peekVideoSrc = media.videoSrc || "";
          vid.poster = media.poster || "";
        }
      }
      this.slides.push(slideEl);
      track.appendChild(slideEl);
    }

    viewport.appendChild(track);
    inner.appendChild(viewport);

    if (this.count > 1) {
      const footer = document.createElement("div");
      footer.className = "peek-gallery__footer";

      const pager = document.createElement("div");
      pager.className = "peek-gallery__pager";
      pager.setAttribute("role", "tablist");
      pager.setAttribute("aria-label", "Slajdy");

      const pagerInner = document.createElement("div");
      pagerInner.className = "peek-gallery__pager-inner";

      const dotsWrap = document.createElement("div");
      dotsWrap.className = "peek-gallery__pager-dots";

      for (var j = 0; j < this.count; j++) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "peek-gallery__dot";
        btn.setAttribute("aria-label", "Przejdź do slajdu " + (j + 1));
        btn.setAttribute("aria-current", j === this.index ? "true" : "false");
        btn.dataset.peekDot = "";
        btn.dataset.index = String(j);
        dotsWrap.appendChild(btn);
      }

      pagerInner.appendChild(dotsWrap);
      if (this.autoplay) {
        const progressBar = document.createElement("span");
        progressBar.className = "peek-gallery__dot-progress";
        progressBar.setAttribute("aria-hidden", "true");
        pagerInner.appendChild(progressBar);
        this.progressBar = progressBar;
      }
      this.pagerInner = pagerInner;
      this.dotsWrap = dotsWrap;
      pager.appendChild(pagerInner);
      footer.appendChild(pager);
      inner.appendChild(footer);
    }

    const live = document.createElement("div");
    live.className = "sr-only";
    live.setAttribute("aria-live", "polite");
    live.setAttribute("aria-atomic", "true");
    live.dataset.peekGalleryLive = "";
    inner.appendChild(live);

    var head = this.root.querySelector(".peek-gallery__head");
    while (this.root.firstChild) this.root.removeChild(this.root.firstChild);
    if (head) this.root.appendChild(head);
    this.root.appendChild(inner);

    this.track = track;
    this.viewport = viewport;
    this._syncSlotOffset();
    if (!this.root.dataset.peekDir) this.root.dataset.peekDir = "next";
  };

  PeekGallery.prototype.mount = function () {
    if (this._mounted) return;
    this.build();
    if (this.count === 0) return;

    if (this.track) {
      this.track.style.transition = "none";
      this._renderTrack();
      var self = this;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          if (self.track) self.track.style.transition = "";
        });
      });
    } else {
      this._renderTrack();
    }
    this._updateUI();

    var self = this;
    this.root.querySelectorAll(".peek-gallery__dot").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var i = parseInt(btn.dataset.index, 10);
        if (!Number.isNaN(i)) self.goTo(i, "pager");
      });
    });

    if (this.progressBar) {
      this.progressBar.addEventListener("transitionend", function (e) {
        if (e.propertyName !== "width") return;
        if (self._videoModalOpen || !self.autoplay) return;
        if (self.index >= self.count - 1 && !self.loop) return;
        self.next();
      });
    }

    this.viewport.addEventListener("click", function (e) {
      if (self._pointerMoved) {
        self._pointerMoved = false;
        return;
      }
      var slide = e.target.closest(".peek-gallery__slide");
      if (!slide) return;
      var i = parseInt(slide.dataset.peekSlideIndex, 10);
      if (Number.isNaN(i)) return;
      if (i === self.index) return;
      if (self.loop && self.slides && self.slides.length > self.count) {
        if (self.index === 0 && i === self.count - 1) {
          self.prev();
          return;
        }
        if (self.index === self.count - 1 && i === 0) {
          self.next();
          return;
        }
      }
      self.goTo(i, "slide-click");
    });

    this.viewport.addEventListener("pointerdown", function (e) {
      self._onPointerDown(e);
    }, { passive: true });
    window.addEventListener("pointermove", function (e) {
      self._onPointerMove(e);
    }, { passive: true });
    var boundUp = function (e) {
      self._onPointerUp(e);
    };
    window.addEventListener("pointerup", boundUp, { passive: true });
    window.addEventListener("pointercancel", boundUp, { passive: true });

    this.root.addEventListener("keydown", function (e) {
      self._onKeyDown(e);
    });

    var ro = new ResizeObserver(function () {
      self._renderTrack();
    });
    ro.observe(this.viewport);

    if (this.autoplay && !this._videoModalOpen) this._startAutoplay();

    this._mounted = true;
  };

  function ensureVideoModal() {
    if (document.getElementById("peek-gallery-video-modal")) return;
    var modal = document.createElement("div");
    modal.id = "peek-gallery-video-modal";
    modal.className = "peek-gallery-video-modal";
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = '<div class="peek-gallery-video-modal__inner"><button type="button" class="peek-gallery-video-modal__close" aria-label="Zamknij">×</button><video controls playsinline></video></div>';
    document.body.appendChild(modal);
    modal.querySelector(".peek-gallery-video-modal__close").addEventListener("click", function () {
      var g = window._peekGallery;
      if (g && g._closeVideoModal) g._closeVideoModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      var m = document.getElementById("peek-gallery-video-modal");
      if (!m || m.hidden) return;
      var g = window._peekGallery;
      if (g && g._closeVideoModal) g._closeVideoModal();
    });
  }

  function init() {
    var el = document.querySelector("[data-peek-gallery]");
    if (!el) return;
    var config = parseConfig(el);
    if (!config || !config.items || config.items.length === 0) {
      el.hidden = true;
      return;
    }
    ensureVideoModal();
    var gallery = new PeekGallery(el, config);
    gallery.mount();
    window._peekGallery = gallery;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
