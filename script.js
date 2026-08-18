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
  const submitButton = form
    ? form.querySelector('button[type="submit"]')
    : null;

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


    menuToggle.addEventListener("click", (event) => {

      event.stopPropagation();

      const isOpen =
        navigation.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }

    });


    /* Close after selecting a section */

    navigationLinks.forEach((link) => {

      link.addEventListener("click", () => {
        closeMenu();
      });

    });


    /* Close with Escape */

    document.addEventListener("keydown", (event) => {

      if (event.key === "Escape") {
        closeMenu();
      }

    });


    /* Close when clicking outside */

    document.addEventListener("click", (event) => {

      if (
        navigation.classList.contains("open") &&
        !navigation.contains(event.target) &&
        !menuToggle.contains(event.target)
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
     FORMSPREE SUBMISSION
  ========================================= */

  if (form) {

    form.addEventListener("submit", async (event) => {

      /*
        IMPORTANT:
        Stop the normal browser page reload.

        We will send the form manually
        to Formspree using fetch().
      */

      event.preventDefault();


      /* =========================================
         VALIDATION
      ========================================= */

      if (!form.checkValidity()) {

        form.reportValidity();

        return;

      }


      /* =========================================
         PREPARE UI
      ========================================= */

      if (formStatus) {

        formStatus.textContent =
          "Sending your application...";

        formStatus.classList.remove(
          "success",
          "error"
        );

      }


      if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent =
          "SENDING...";

      }


      /* =========================================
         SEND TO FORMSPREE
      ========================================= */

      try {

        const formData = new FormData(form);


        const response = await fetch(
          form.action,
          {
            method: "POST",
            body: formData,
            headers: {
              "Accept": "application/json"
            }
          }
        );


        /* =========================================
           SUCCESS
        ========================================= */

        if (response.ok) {

          if (formStatus) {

            formStatus.textContent =
              "APPLICATION RECEIVED ✓ Thank you. I'll review your application and get back to you soon.";

            formStatus.classList.add("success");

          }


          /* Clear the form */

          form.reset();


          /* Keep button disabled briefly */

          if (submitButton) {

            submitButton.textContent =
              "APPLICATION SENT ✓";

          }

        }


        /* =========================================
           FORMSPREE ERROR
        ========================================= */

        else {

          let errorMessage =
            "Something went wrong. Please try again.";

          try {

            const data =
              await response.json();

            if (
              data &&
              data.errors &&
              data.errors.length
            ) {

              errorMessage =
                data.errors
                  .map((error) => error.message)
                  .join(" ");

            }

          } catch (jsonError) {

            /* Keep default error message */

          }


          if (formStatus) {

            formStatus.textContent =
              errorMessage;

            formStatus.classList.add("error");

          }


          if (submitButton) {

            submitButton.disabled = false;

            submitButton.textContent =
              "SUBMIT APPLICATION";

          }

        }

      }


      /* =========================================
         NETWORK ERROR
      ========================================= */

      catch (error) {

        console.error(
          "Form submission error:",
          error
        );


        if (formStatus) {

          formStatus.textContent =
            "Unable to send your application right now. Please try again or contact me on WhatsApp.";

          formStatus.classList.add("error");

        }


        if (submitButton) {

          submitButton.disabled = false;

          submitButton.textContent =
            "SUBMIT APPLICATION";

        }

      }


      /* =========================================
         SCROLL TO STATUS
      ========================================= */

      if (formStatus) {

        formStatus.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });

      }

    });

  }


  /* =========================================
     RESPONSIVE NAV RESET
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