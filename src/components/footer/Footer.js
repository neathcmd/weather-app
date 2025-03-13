// Define navigation links as an array
const navLinks = [
  { text: "Home", href: "/", className: "hover:text-orange-500" },
  { text: "About Us", href: "#", className: "hover:text-orange-500" },
  { text: "Blog", href: "#", className: "hover:text-orange-500" },
  { text: "Contact Us", href: "#", className: "hover:text-orange-500" },
];

// Social media background colors for hover reset (used in interactivity)
const socialMediaColors = {
  linkedin: "#0274b3",
  github: "#24262a",
  instagram: "linear-gradient(to bottom right, #405de6, #b33ab4, #fd1f1f)",
  youtube: "#ff0000",
};

// Function to create the footer content
function createFooter() {
  const app = document.getElementById("app");

  // Create footer element
  const footer = document.createElement("footer");
  footer.className =
    "bg-black text-white mt-10 py-10 text-center flex-shrink-0";

  // Container div
  const container = document.createElement("div");
  container.className = " px-4 flex items-center justify-center flex-col my-2";

  // Title
  const title = document.createElement("h2");
  title.className =
    "text-xl font-semibold flex items-center justify-center gap-2";
  title.innerHTML = `<span class="text-orange-500">⚡</span> Weather Cambodia`;

  // Description
  const desc = document.createElement("p");
  desc.className = "text-gray-400 mt-2 max-w-md ";
  desc.textContent =
    "It is a long established fact that a reader will be distracted by the readable content of a page looking at its layout.";

  // Get the existing social list from HTML
  const socialList = document.getElementById("social-list");

  // Navigation
  const nav = document.createElement("nav");
  nav.className = "flex justify-center gap-6 mt-6 text-lg";

  navLinks.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.href;
    a.className = link.className;
    a.textContent = link.text;
    nav.appendChild(a);
  });

  // Footer bottom
  const bottom = document.createElement("div");
  bottom.className = "mt-8 text-gray-500 border-t-2 border-white pt-4 w-full";
  bottom.textContent = "© 2025 - All Rights Reserved | Created By Phoung Visal";

  // Interactivity: Toggle visibility of navigation on title click
  title.addEventListener("click", () => {
    nav.classList.toggle("hidden");
    desc.classList.toggle("hidden");
    title.classList.toggle("text-orange-500");
  });

  // Append all elements to container
  container.appendChild(title);
  container.appendChild(desc);
  container.appendChild(socialList); // Reusing the existing social list from HTML
  container.appendChild(nav);
  container.appendChild(bottom);
  footer.appendChild(container);

  // Append footer to the app div (after the social list already present)
  app.insertBefore(footer, app.firstChild);
}

// Call the function to render the footer
createFooter();
