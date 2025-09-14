document.addEventListener("DOMContentLoaded", function () {
  // --- HEADER AND MENU LOGIC ---
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = menuToggle.querySelector("svg"); // Target the whole SVG for simplicity
  const getAllSections = document.querySelectorAll("section");
  const headerImage = document.getElementById("header-image");

  // getAllSections.forEach((section) => {
  //   section.classList.add("scroll-mt-26");
  // });

  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      //change header srx to logo-2
      headerImage.src = "assets/skc-logo-2.png";
      header.classList.add(
        "text-black",
        "shadow-md",
        "brand-transparent-scroll"
      );
      header.classList.remove("text-white", "brand-transparent");
    } else {
      headerImage.src = "assets/SKC-LOGO-3.png";
      header.classList.remove(
        "text-black",
        "shadow-md",
        "brand-transparent-scroll"
      );
      header.classList.add("text-white", "brand-transparent");
    }

    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop) {
      if (currentScrollTop > 20) {
        header.style.top = "-100px";
      }
    } else {
      header.style.top = "0";
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;

    // if (
    //   document.body.scrollTop > 20 ||
    //   document.documentElement.scrollTop > 20
    // ) {
    //   header.style.top = "-100px";
    // } else {
    //   header.style.top = "0";
    // }
  });

  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("max-h-96");
    mobileMenu.classList.toggle("max-h-0");
    // Simple icon toggle, you can replace with different icons if you want
    if (isOpen) {
      menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />`;
    } else {
      menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />`;
    }
  });

  // Close menu on link click
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("max-h-96");
      mobileMenu.classList.add("max-h-0");
      menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />`;
    });
  });

  // --- GSAP AND LENIS SETUP ---
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      if (href) lenis.scrollTo(href);
    });
  });

  // Staggered animations (Safer Version)
  const sections = gsap.utils.toArray("section:not(#home)");
  sections.forEach((section) => {
    // Animate the section as a whole first to ensure it becomes visible
    gsap.from(section, {
      autoAlpha: 0, // Use autoAlpha for opacity and visibility
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none none", // Play once and stay
      },
    });
  });

  // --- TYPED.JS SETUP ---
  const typed = new Typed("#typed-text", {
    strings: ["Future Innovations", "Solid Foundations", "Creative Structures"],
    typeSpeed: 70,
    backSpeed: 50,
    loop: true,
    cursorChar: "_",
  });

  // --- HERO TEXT ANIMATION ---
  const heroText = document.querySelector("#home #hero-text");
  if (heroText) {
    gsap.from(heroText.children, {
      duration: 1,
      y: 50,
      opacity: 0,
      stagger: 0.3,
      ease: "power3.out",
      delay: 0.5,
    });
  }

  //Form submission
  const form = document.getElementById("contact-form");
  const formContainer = form.parentElement;

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Stop the default form submission

    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const messageTextarea = form.querySelector('textarea[name="message"]');

    // Simple validation for required fields
    if (!nameInput.value || !emailInput.value || !messageTextarea.value) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all required fields!",
      });
      return;
    }

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // Show a success message using Swal
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Your message has been sent successfully. We will get back to you soon!",
        });
        // Optionally, clear the form after a successful submission
        form.reset();
      } else {
        // Show a general error message using Swal
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please try again later.",
        });
      }
    } catch (error) {
      // Handle network or other errors with Swal
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "There was a network error. Please check your connection and try again.",
      });
    }
  });
});
("");
