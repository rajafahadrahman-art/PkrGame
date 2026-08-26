(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector("#main-nav");
  var backToTop = document.querySelector(".back-to-top");
  var yearEl = document.querySelector("#copyright-year");
  var faqButtons = document.querySelectorAll(".faq-question");

  function setNavOpen(isOpen) {
    if (!navToggle || !mainNav) return;
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    mainNav.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("nav-open", isOpen);
  }

  function closeNav() {
    setNavOpen(false);
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var expanded = navToggle.getAttribute("aria-expanded") === "true";
      setNavOpen(!expanded);
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeNav();
      }
    });

    document.addEventListener("click", function (event) {
      if (!mainNav.classList.contains("is-open")) return;
      if (mainNav.contains(event.target) || navToggle.contains(event.target)) return;
      closeNav();
    });
  }

  function onScroll() {
    var scrolled = window.scrollY > 20;
    if (header) {
      header.classList.toggle("is-scrolled", scrolled);
    }
    if (backToTop) {
      backToTop.classList.toggle("is-visible", window.scrollY > 400);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  faqButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var expanded = button.getAttribute("aria-expanded") === "true";
      var item = button.closest(".faq-item");

      faqButtons.forEach(function (other) {
        if (other === button) return;
        other.setAttribute("aria-expanded", "false");
        var otherItem = other.closest(".faq-item");
        if (otherItem) otherItem.classList.remove("is-open");
      });

      button.setAttribute("aria-expanded", expanded ? "false" : "true");
      if (item) item.classList.toggle("is-open", !expanded);
    });

    button.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      button.click();
    });
  });

  var pageToc = document.querySelector(".page-toc");
  if (pageToc) {
    var tocToggle = pageToc.querySelector(".toc-toggle");

    function syncTocState() {
      if (tocToggle) {
        tocToggle.setAttribute("aria-expanded", pageToc.open ? "true" : "false");
      }
    }

    pageToc.removeAttribute("open");
    syncTocState();

    pageToc.addEventListener("toggle", syncTocState);

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && pageToc.open) {
        pageToc.open = false;
        if (tocToggle) tocToggle.focus();
      }
    });
  }

  var sliderRoot = document.querySelector("[data-screenshot-slider]");
  if (sliderRoot) {
    var track = sliderRoot.querySelector(".slider-track");
    var slides = sliderRoot.querySelectorAll(".slider-slide");
    var dots = sliderRoot.querySelectorAll(".slider-dot");
    var prevBtn = sliderRoot.querySelector(".slider-prev");
    var nextBtn = sliderRoot.querySelector(".slider-next");
    var viewport = sliderRoot.querySelector(".slider-viewport");
    var total = slides.length;
    var index = 0;
    var timer = null;
    var resumeTimer = null;
    var delay = 4500;
    var pointerStartX = null;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function goTo(nextIndex) {
      if (!total) return;
      index = (nextIndex + total) % total;
      if (track) {
        track.style.transform = "translateX(-" + index * 100 + "%)";
      }

      slides.forEach(function (slide, slideIndex) {
        slide.classList.toggle("is-active", slideIndex === index);
        slide.setAttribute("aria-hidden", slideIndex === index ? "false" : "true");
      });

      dots.forEach(function (dot, dotIndex) {
        var active = dotIndex === index;
        dot.classList.toggle("is-active", active);
        if (active) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });
    }

    function stopAutoplay() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function startAutoplay() {
      if (reduceMotion || total < 2) return;
      stopAutoplay();
      timer = window.setInterval(function () {
        goTo(index + 1);
      }, delay);
    }

    function pauseForInteraction() {
      stopAutoplay();
      if (resumeTimer) {
        window.clearTimeout(resumeTimer);
      }
      resumeTimer = window.setTimeout(startAutoplay, 8000);
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        pauseForInteraction();
        goTo(index - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        pauseForInteraction();
        goTo(index + 1);
      });
    }

    dots.forEach(function (dot, dotIndex) {
      dot.addEventListener("click", function () {
        pauseForInteraction();
        goTo(dotIndex);
      });
    });

    sliderRoot.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        pauseForInteraction();
        goTo(index - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        pauseForInteraction();
        goTo(index + 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        pauseForInteraction();
        goTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        pauseForInteraction();
        goTo(total - 1);
      }
    });

    if (viewport) {
      viewport.addEventListener("pointerdown", function (event) {
        pointerStartX = event.clientX;
      });

      viewport.addEventListener("pointerup", function (event) {
        if (pointerStartX === null) return;
        var delta = event.clientX - pointerStartX;
        pointerStartX = null;
        if (Math.abs(delta) < 40) return;
        pauseForInteraction();
        goTo(delta > 0 ? index - 1 : index + 1);
      });

      viewport.addEventListener("pointercancel", function () {
        pointerStartX = null;
      });
    }

    sliderRoot.addEventListener("mouseenter", stopAutoplay);
    sliderRoot.addEventListener("mouseleave", startAutoplay);
    sliderRoot.addEventListener("focusin", stopAutoplay);
    sliderRoot.addEventListener("focusout", function (event) {
      if (!sliderRoot.contains(event.relatedTarget)) {
        startAutoplay();
      }
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });

    goTo(0);
    startAutoplay();
  }
})();
