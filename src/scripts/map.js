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
