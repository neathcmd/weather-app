// Static weather data for provinces
const provinces = [
  {
    name: "Preah Province",
    image: "/src/assets/Pailin-Province.jpg",
    lat: 12.8489,
    lon: 102.6093,
    weatherIcon: "☀️",
    temperature: 32,
  },
  {
    name: "Battambang Province",
    image: "/src/assets/Battambang-Province.jpg",
    lat: 13.0957,
    lon: 103.2022,
    weatherIcon: "⛅",
    temperature: 31,
  },
  {
    name: "KohKong Province",
    image: "/src/assets/KohKong-Province.jpg",
    lat: 11.9924,
    lon: 105.4645,
    weatherIcon: "🌧️",
    temperature: 28,
  },
  {
    name: "Prey Veng Province",
    image: "/src/assets/PreyVeng-Province.jpg",
    lat: 11.4868,
    lon: 105.3253,
    weatherIcon: "⛅",
    temperature: 30,
  },
  {
    name: "Kampongchhang Province",
    image: "/src/assets/Kompongchhang-Province.jpg",
    lat: 12.7111,
    lon: 104.8887,
    weatherIcon: "☀️",
    temperature: 33,
  },
  {
    name: "PreahVihear Province",
    image: "/src/assets/PreyVeng-Province.jpg",
    lat: 12.5388,
    lon: 103.9192,
    weatherIcon: "🌧️",
    temperature: 29,
  },
  {
    name: "Mondulkiri Province",
    image: "/src/assets/Modulkiri-Province.jpg",
    lat: 12.4555,
    lon: 107.1878,
    weatherIcon: "⛅",
    temperature: 27,
  },
  {
    name: "Kep Province",
    image: "/src/assets/Kep-Province.jpg",
    lat: 10.4833,
    lon: 104.3167,
    weatherIcon: "☀️",
    temperature: 31,
  },
  {
    name: "Kampongspeu Province",
    image: "/src/assets/Kompongspeu-Province.jpg",
    lat: 11.6155,
    lon: 104.5209,
    weatherIcon: "⛅",
    temperature: 30,
  },
  {
    name: "KompongThom Province",
    image: "/src/assets/KompongThom-Province.jpg",
    lat: 11.6155,
    lon: 104.5209,
    weatherIcon: "☀️",
    temperature: 32,
  },
];

// Utility function to create a province card
function createProvinceCard(province) {
  const card = document.createElement("div");
  card.className =
    "bg-[#DBD0D0] rounded-xl p-4 flex flex-col items-center shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer min-w-[120px] w-full";

  const imageContainer = document.createElement("div");
  imageContainer.className = "w-12 h-12 flex items-center justify-center mb-3";
  const img = document.createElement("img");
  img.src = province.image;
  img.alt = `${province.name} image`;
  img.className = "w-full h-full object-cover rounded-full";
  imageContainer.appendChild(img);

  const weatherIcon = document.createElement("div");
  weatherIcon.className = "text-2xl mb-2";
  weatherIcon.textContent = province.weatherIcon || "🌥️";

  const name = document.createElement("p");
  name.className =
    "text-sm font-medium text-gray-800 text-center leading-tight";
  name.textContent = province.name;

  const temp = document.createElement("p");
  temp.className = "text-xs text-gray-600 mt-1";
  temp.textContent = `${province.temperature}°C`;

  card.appendChild(imageContainer);
  card.appendChild(weatherIcon);
  card.appendChild(name);
  card.appendChild(temp);

  return card;
}

// Function to render a row of province cards
function renderProvinceRow(provinces, rowId) {
  const row = document.createElement("div");
  row.id = rowId;
  row.className = "flex flex-wrap justify-center gap-6 max-w-5xl mx-auto mb-6";

  provinces.forEach((province) => {
    const card = createProvinceCard(province);
    row.appendChild(card);
  });

  return row;
}

// Main function to render the Cambodia Forecast section
function renderCambodiaForecastSection() {
  const section = document.getElementById("cambodia-forecast");
  if (!section) {
    console.error("Section with id 'cambodia-forecast' not found.");
    return;
  }

  section.innerHTML = "";
  section.className = "py-12 px-4 sm:px-6 lg:px-8 bg-gray-50";

  // Header
  const header = document.createElement("div");
  header.className = "text-center mb-10";
  const heading = document.createElement("h2");
  heading.className = "text-3xl font-bold text-gray-900 mb-3";
  heading.textContent = "Cambodia Forecast";
  const description = document.createElement("p");
  description.className =
    "text-gray-600 text-sm max-w-2xl mx-auto leading-relaxed";
  description.textContent =
    "Stay updated with the latest weather forecasts across Cambodia. Plan your activities with accurate and timely weather information.";
  header.appendChild(heading);
  header.appendChild(description);
  section.appendChild(header);

  // Province rows
  const firstRowProvinces = provinces.slice(0, 5);
  const secondRowProvinces = provinces.slice(5);
  const firstRow = renderProvinceRow(firstRowProvinces, "first-row");
  const secondRow = renderProvinceRow(secondRowProvinces, "second-row");
  section.appendChild(firstRow);
  section.appendChild(secondRow);
}

// Initialize the forecast section on page load
document.addEventListener("DOMContentLoaded", renderCambodiaForecastSection);
