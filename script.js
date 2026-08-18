/* =========================================
   RIAD FITNESS
   MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     ELEMENTS
  ========================================= */

  const header = document.getElementById("siteHeader");
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.getElementById("mainNavigation");
  const navigationLinks = document.querySelectorAll(".nav a");

  const form = document.getElementById("applicationForm");
  const formStatus = document.getElementById("formStatus");

  const yearElement = document.getElementById("year");


  /* =========================================
     FOOTER YEAR
  ========================================= */

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* =========================================
     MOBILE NAVIGATION
  ========================================= */

  if (menuToggle && navigation) {

    const closeMenu = () => {

      navigation.classList.remove("open");

      menuToggle.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Open navigation"
      );

    };


    const openMenu = () => {

      navigation.classList.add("open");

      menuToggle.classList.add("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "true"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Close navigation"
      );

    };


    menuToggle.addEventListener("click", () => {

      const isOpen =
        navigation.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }

    });


    /* Close menu after selecting a page section */

    navigationLinks.forEach((link) => {

      link.addEventListener("click", () => {
        closeMenu();
      });

    });


    /* Close menu with Escape */

    document.addEventListener("keydown", (event) => {

      if (event.key === "Escape") {
        closeMenu();
      }

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", (event) => {

      const clickedInsideMenu =
        navigation.contains(event.target);

      const clickedButton =
        menuToggle.contains(event.target);

      if (
        navigation.classList.contains("open") &&
        !clickedInsideMenu &&
        !clickedButton
      ) {
        closeMenu();
      }

    });

  }


  /* =========================================
     HEADER SCROLL EFFECT
  ========================================= */

  if (header) {

    const updateHeader = () => {

      if (window.scrollY > 20) {

        header.classList.add("scrolled");

      } else {

        header.classList.remove("scrolled");

      }

    };


    updateHeader();


    window.addEventListener(
      "scroll",
      updateHeader,
      { passive: true }
    );

  }


  /* =========================================
     APPLICATION FORM
  ========================================= */

  if (form && formStatus) {

    form.addEventListener("submit", (event) => {

      event.preventDefault();


      /* Basic browser validation */

      if (!form.checkValidity()) {

        form.reportValidity();

        return;

      }


      /*
        The website currently has no backend/email service.

        We therefore don't pretend the application
        was actually sent.
      */

      formStatus.textContent =
        "Your application is ready. Connect an email service to receive submissions.";


      formStatus.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });

    });

  }


  /* =========================================
     PREVENT MOBILE NAV FROM STAYING OPEN
     AFTER RESIZING TO DESKTOP
  ========================================= */

  window.addEventListener("resize", () => {

    if (
      window.innerWidth > 950 &&
      navigation &&
      menuToggle
    ) {

      navigation.classList.remove("open");

      menuToggle.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Open navigation"
      );

    }

  });

});
