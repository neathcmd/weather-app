document.addEventListener("DOMContentLoaded", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Initialize map at user's location
        const map = L.map("map").setView([latitude, longitude], 13);

        // Load map tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "Created by Sal Monineath",
        }).addTo(map);

        // Add marker at user's location
        L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup("You are here!")
          .openPopup();
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
});

// for form validation
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const inputs = {
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("lastName"),
    email: document.getElementById("email"),
    message: document.getElementById("message"),
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to show/hide error messages
  const toggleError = (input, show) => {
    const errorSpan = input.nextElementSibling;
    if (show) {
      errorSpan.classList.remove("hidden");
      input.classList.add("border-red-500");
      input.classList.remove("border-orange-500");
    } else {
      errorSpan.classList.add("hidden");
      input.classList.remove("border-red-500");
    }
  };

  // Real-time validation for each input
  Object.values(inputs).forEach((input) => {
    input.addEventListener("input", (e) => {
      let isValid = false;
      if (e.target.id === "email") {
        isValid = isValidEmail(e.target.value);
      } else {
        isValid = e.target.value.trim() !== "";
      }

      if (!isValid && e.target.value.length > 0) {
        toggleError(e.target, true);
      } else {
        toggleError(e.target, false);
      }
    });

    // Show error on blur if empty
    input.addEventListener("blur", (e) => {
      if (e.target.value.trim() === "") {
        toggleError(e.target, true);
      }
    });
  });

  // Form submission handling
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let hasErrors = false;

    // Validate all fields
    if (inputs.firstName.value.trim() === "") {
      toggleError(inputs.firstName, true);
      hasErrors = true;
    } else {
      toggleError(inputs.firstName, false);
    }

    if (inputs.lastName.value.trim() === "") {
      toggleError(inputs.lastName, true);
      hasErrors = true;
    } else {
      toggleError(inputs.lastName, false);
    }

    if (inputs.email.value.trim() === "" || !isValidEmail(inputs.email.value)) {
      toggleError(inputs.email, true);
      hasErrors = true;
    } else {
      toggleError(inputs.email, false);
    }

    if (inputs.message.value.trim() === "") {
      toggleError(inputs.message, true);
      hasErrors = true;
    } else {
      toggleError(inputs.message, false);
    }

    // If no errors, proceed with submission
    if (!hasErrors) {
      alert("MEssage was send successfully!\n");
      form.reset();
      Object.values(inputs).forEach((input) => {
        toggleError(input, false);
      });
    } else {
      console.log("can't sent message");
    }
  });
});
