/* =========================================
   RIAD FITNESS — MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     MOBILE MENU
  ========================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

      const isOpen = nav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";

    });


    /* Close menu after clicking a link */

    const navLinks = nav.querySelectorAll("a");

    navLinks.forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Open menu"
        );

        menuToggle.textContent = "☰";

      });

    });

  }


  /* =========================================
     CURRENT YEAR
  ========================================= */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =========================================
     APPLICATION FORM
  ========================================= */

  const form = document.getElementById("applicationForm");

  if (form) {

    form.addEventListener("submit", (event) => {

      event.preventDefault();

      const button = form.querySelector("button");

      if (!button) return;

      const originalText = button.textContent;

      button.textContent = "APPLICATION READY ✓";

      button.disabled = true;

      setTimeout(() => {

        button.textContent = originalText;
        button.disabled = false;

      }, 2500);

    });

  }


  /* =========================================
     HEADER SCROLL EFFECT
  ========================================= */

  const header = document.querySelector(".site-header");

  if (header) {

    window.addEventListener(
      "scroll",
      () => {

        if (window.scrollY > 30) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }

      },
      { passive: true }
    );

  }

});
