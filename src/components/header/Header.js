const navbar = document.getElementById("navbar");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenuBtn = document.getElementById("close-menu-btn");
const mobileOverlay = document.getElementById("mobile-overlay");
const menuIcon = document.querySelector(".menu-icon");
const getInfoBtn = document.getElementById("get-info-btn");
const mobileLinks = mobileMenu.querySelectorAll("a");

// Handle scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("bg-[#EE7C27]", "backdrop-blur-md", "shadow-lg");
    navbar.classList.remove("bg-transparent", "shadow-none");
    getInfoBtn.classList.add(
      "bg-white",
      "text-[#db9c27]",
      "hover:border-white"
    );
    getInfoBtn.classList.remove("bg-[#db9c27]", "text-white");
  } else {
    navbar.classList.remove("bg-[#EE7C27]", "backdrop-blur-md", "shadow-lg");
    navbar.classList.add("bg-transparent", "shadow-none");
    getInfoBtn.classList.remove(
      "bg-white",
      "text-[#db9c27]",
      "hover:border-white"
    );
    getInfoBtn.classList.add("bg-[#db9c27]", "text-white");
  }
});

// Toggle mobile menu
mobileMenuBtn.addEventListener("click", () => {
  const isOpen = !mobileMenu.classList.contains("translate-x-full");
  if (isOpen) {
    mobileMenu.classList.add("translate-x-full", "opacity-0");
    mobileMenu.classList.remove("translate-x-0", "opacity-100");
    mobileOverlay.classList.add("hidden");
    menuIcon.setAttribute("d", "M4 6h16M4 12h16m-7 6h7");
    mobileMenuBtn.setAttribute("aria-label", "Open menu");
  } else {
    mobileMenu.classList.remove("translate-x-full", "opacity-0");
    mobileMenu.classList.add("translate-x-0", "opacity-100");
    mobileOverlay.classList.remove("hidden");
    menuIcon.setAttribute("d", "M6 18L18 6M6 6l12 12");
    mobileMenuBtn.setAttribute("aria-label", "Close menu");
  }
});

// Close menu when clicking overlay or close button
[closeMenuBtn, mobileOverlay].forEach((element) => {
  element.addEventListener("click", () => {
    mobileMenu.classList.add("translate-x-full", "opacity-0");
    mobileMenu.classList.remove("translate-x-0", "opacity-100");
    mobileOverlay.classList.add("hidden");
    menuIcon.setAttribute("d", "M4 6h16M4 12h16m-7 6h7");
    mobileMenuBtn.setAttribute("aria-label", "Open menu");
  });
});

// Close menu when clicking links
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("translate-x-full", "opacity-0");
    mobileMenu.classList.remove("translate-x-0", "opacity-100");
    mobileOverlay.classList.add("hidden");
    menuIcon.setAttribute("d", "M4 6h16M4 12h16m-7 6h7");
    mobileMenuBtn.setAttribute("aria-label", "Open menu");
  });
});
