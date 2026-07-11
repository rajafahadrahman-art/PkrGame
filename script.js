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
})();
