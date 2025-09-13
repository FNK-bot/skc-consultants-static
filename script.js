document.addEventListener("DOMContentLoaded", function () {
  // --- HEADER AND MENU LOGIC ---
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = menuToggle.querySelector("svg"); // Target the whole SVG for simplicity
  const getAllSections = document.querySelectorAll("section");
  const headerImage = document.getElementById("header-image");

  getAllSections.forEach((section) => {
    section.classList.add("scroll-mt-26");
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      //change header srx to logo-2
      headerImage.src = "assets/SKC-LOGO-2.png";
      header.classList.add("text-black");
      header.classList.remove("text-white,shadow-md");
    } else {
      headerImage.src = "assets/SKC-LOGO-3.png";
      header.classList.remove("text-black");
      header.classList.add("shadow-md,text-white");
    }
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

  // --- CONTACT FORM LOGIC ---
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    contactForm.reset();
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
});
("");
