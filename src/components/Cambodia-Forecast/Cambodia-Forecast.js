// Province data with
const provinces = [
  {
    name: "Preah Province",
    image: `/src/assets/Pailin-Province.jpg`,
    lat: 12.8489,
    lon: 102.6093,
    weatherIco: "☀️", // Sunny
    temperature: 32,
  },
  {
    name: "Battambang Province",
    image: `/src/assets/Battambang-Province.jpg`,
    lat: 13.0957,
    lon: 103.2022,
    weatherIco: "⛅", // Partly cloudy
    temperature: 30,
  },
  {
    name: "KohKong Province",
    image: `/src/assets/KohKong-Province.jpg`,
    lat: 11.9924,
    lon: 105.4645,
    weatherIco: "🌧️", // Rainy
    temperature: 28,
  },
  {
    name: "Prey Veng Province",
    image: `/src/assets/PreyVeng-Province.jpg`,
    lat: 11.4868,
    lon: 105.3253,
    weatherIco: "🌦️", // Sunny with rain
    temperature: 29,
  },
  {
    name: "Kampongchhang Province",
    image: `/src/assets/Kompongchhang-Province.jpg`,
    lat: 12.7111,
    lon: 104.8887,
    weatherIco: "☀️", // Sunny
    temperature: 31,
  },
  {
    name: "PreahVihear Province",
    image: `/src/assets/PreyVeng-Province.jpg`,
    lat: 12.5388,
    lon: 103.9192,
    weatherIco: "⛅", // Partly cloudy
    temperature: 30,
  },
  {
    name: "Mondulkiri Province",
    image: `/src/assets/Modulkiri-Province.jpg`,
    lat: 12.4555,
    lon: 107.1878,
    weatherIco: "🌧️", // Rainy
    temperature: 27,
  },
  {
    name: "Kep Province",
    image: `/src/assets/Kep-Province.jpg`,
    lat: 10.4833,
    lon: 104.3167,
    weatherIco: "☀️", // Sunny
    temperature: 33,
  },
  {
    name: "Kampongspeu Province",
    image: `/src/assets/Kompongspeu-Province.jpg`,
    lat: 11.6155,
    lon: 104.5209,
    weatherIco: "⛅", // Partly cloudy
    temperature: 31,
  },
  {
    name: "KompongThom Province",
    image: `/src/assets/KompongThom-Province.jpg`,
    lat: 11.6155,
    lon: 104.5209,
    weatherIco: "🌦️", // Sunny with rain
    temperature: 29,
  },
];

// Split the provinces into two rows
const firstRowProvinces = provinces.slice(0, 5);
const secondRowProvinces = provinces.slice(5);

// Function to create a province card with an image, weather icon, and temperature
function createProvinceCard(province) {
  const card = document.createElement("div");
  card.className =
    "bg-[#DBD0D0] rounded-xl p-4 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 cursor-pointer";

  const imageDiv = document.createElement("div");
  imageDiv.className = "w-12 h-12 flex items-center justify-center mb-2";

  const img = document.createElement("img");
  img.src = province.image;
  img.alt = `${province.name} image`;
  img.className = "w-full h-full object-cover rounded-full";

  imageDiv.appendChild(img);

  const weatherIconDiv = document.createElement("div");
  weatherIconDiv.className = "text-2xl mb-1";
  weatherIconDiv.textContent = province.weatherIcon || "🌥️";

  const nameP = document.createElement("p");
  nameP.className = "text-sm font-medium text-gray-800 text-center";
  nameP.textContent = province.name;

  const tempP = document.createElement("p");
  tempP.className = "text-xs text-gray-600 mt-1";
  tempP.textContent = `${province.temperature}°C`;

  card.appendChild(imageDiv);
  card.appendChild(weatherIconDiv);
  card.appendChild(nameP);
  card.appendChild(tempP);
  return card;
}

// Function to create the entire Cambodia Forecast section content
function renderCambodiaForecastSection() {
  // Get the section element
  const section = document.getElementById("cambodia-forecast");
  if (!section) {
    console.error("Section with id 'cambodia-forecast' not found.");
    return;
  }

  // Clear the section content before re-rendering
  section.innerHTML = "";

  // Create the header div (for heading and description)
  const headerDiv = document.createElement("div");
  headerDiv.className = "text-center mb-8";

  // Create the heading
  const heading = document.createElement("h2");
  heading.className = "text-3xl font-bold text-gray-900 mb-2";
  heading.textContent = "Cambodia Forecast";
  headerDiv.appendChild(heading);

  // Create the description paragraph
  const description = document.createElement("p");
  description.className = "text-gray-600 max-w-2xl mx-auto text-sm";
  description.textContent =
    "Stay updated with the latest weather forecasts across Cambodia. Plan your activities with accurate and timely weather information.";
  headerDiv.appendChild(description);

  // Append the header to the section
  section.appendChild(headerDiv);

  // Create the first row flex container
  const firstRow = document.createElement("div");
  firstRow.id = "first-row";
  firstRow.className =
    "flex flex-row md:flex-nowrap flex-wrap justify-between gap-4 mb-4 max-w-5xl mx-auto";

  // Populate the first row with province cards
  firstRowProvinces.forEach((province) => {
    const card = createProvinceCard(province);
    card.classList.add(
      "w-1/5",
      "min-w-[120px]",
      "flex-grow-0",
      "flex-shrink-0"
    );
    firstRow.appendChild(card);
  });

  // Append the first row to the section
  section.appendChild(firstRow);

  // Create the second row flex container
  const secondRow = document.createElement("div");
  secondRow.id = "second-row";
  secondRow.className =
    "flex flex-row md:flex-nowrap flex-wrap justify-between gap-4 max-w-5xl mx-auto";

  // Populate the second row with province cards
  secondRowProvinces.forEach((province) => {
    const card = createProvinceCard(province);
    card.classList.add(
      "w-1/5",
      "min-w-[120px]",
      "flex-grow-0",
      "flex-shrink-0"
    );
    secondRow.appendChild(card);
  });

  // Append the second row to the section
  section.appendChild(secondRow);
}

// Function to render the static weather data
function startWeatherUpdates() {
  // Initial render only (no updates needed for static data)
  renderCambodiaForecastSection();
}

// Call the function to render the static weather data when the script loads
startWeatherUpdates();
