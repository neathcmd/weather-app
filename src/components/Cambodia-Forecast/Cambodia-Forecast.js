// Province data with approximate coordinates for each province
const provinces = [
  {
    name: "Preah Province",
    image: `/src/assets/Pailin-Province.jpg`,
    lat: 12.8489, // Approximate latitude for Pailin (Preah Province)
    lon: 102.6093, // Approximate longitude for Pailin
  },
  {
    name: "Battambang Province",
    image: `/src/assets/Battambang-Province.jpg`,
    lat: 13.0957, // Approximate latitude for Battambang
    lon: 103.2022, // Approximate longitude for Battambang
  },
  {
    name: "KohKong Province",
    image: `/src/assets/KohKong-Province.jpg`,
    lat: 11.9924, // Approximate latitude for Kampong Cham (representing Kampong Province)
    lon: 105.4645, // Approximate longitude for Kampong Cham
  },
  {
    name: "Prey Veng Province",
    image: `/src/assets/PreyVeng-Province.jpg`,
    lat: 11.4868, // Approximate latitude for Prey Veng
    lon: 105.3253, // Approximate longitude for Prey Veng
  },
  {
    name: "Kampongchhang Province",
    image: `/src/assets/Kompongchhang-Province.jpg`,
    lat: 12.7111, // Approximate latitude for Kampong Thom
    lon: 104.8887, // Approximate longitude for Kampong Thom
  },
  {
    name: "PreahVihear Province",
    image: `/src/assets/PreyVeng-Province.jpg`,
    lat: 12.5388, // Approximate latitude for Pursat
    lon: 103.9192, // Approximate longitude for Pursat
  },
  {
    name: "Mondulkiri Province",
    image: `/src/assets/Modulkiri-Province.jpg`,
    lat: 12.4555, // Approximate latitude for Mondulkiri
    lon: 107.1878, // Approximate longitude for Mondulkiri
  },
  {
    name: "Kep Province",
    image: `/src/assets/Kep-Province.jpg`,
    lat: 10.4833, // Approximate latitude for Kep
    lon: 104.3167, // Approximate longitude for Kep
  },
  {
    name: "Kampongspeu Province",
    image: `/src/assets/Kompongspeu-Province.jpg`,
    lat: 11.6155, // Approximate latitude for Kampong Speu
    lon: 104.5209, // Approximate longitude for Kampong Speu
  },
  {
    name: "KompongThom Province",
    image: `/src/assets/KompongThom-Province.jpg`,
    lat: 11.6155, // Approximate latitude for Kampong Speu
    lon: 104.5209, // Approximate longitude for Kampong Speu
  },
];

// Split the provinces into two rows
const firstRowProvinces = provinces.slice(0, 5);
const secondRowProvinces = provinces.slice(5);

// Function to map weather conditions to emoji icons
function getWeatherIcon(weatherMain) {
  switch (weatherMain.toLowerCase()) {
    case "clear":
      return "☀️"; // Sunny
    case "clouds":
      return "⛅"; // Partly cloudy
    case "rain":
      return "🌧️"; // Rainy
    case "drizzle":
      return "🌦️"; // Sunny with rain
    case "thunderstorm":
      return "🌩️"; // Thunderstorm
    case "snow":
      return "❄️"; // Snowy
    case "mist":
    case "fog":
      return "🌫️"; // Foggy
    case "tornado":
      return "🌪️"; // Tornado
    default:
      return "🌥️"; // Default for other conditions (e.g., haze, smoke)
  }
}

// Function to fetch weather data for a province
async function fetchWeatherData(lat, lon) {
  const apiKey = "b93932bbe1df60eb75e5596059faf22e";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return {
      weatherIcon: getWeatherIcon(data.weather[0].main),
      temperature: Math.round(data.main.temp), // Temperature in Celsius, rounded
    };
  } catch (error) {
    console.error(`Error fetching weather for lat=${lat}, lon=${lon}:`, error);
    return {
      weatherIcon: "🌥️", // Fallback icon
      temperature: -999, // Fallback temperature as a number
    };
  }
}

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
  weatherIconDiv.textContent = province.weatherIcon || "🌥️"; // Use fetched icon or fallback

  const nameP = document.createElement("p");
  nameP.className = "text-sm font-medium text-gray-800 text-center";
  nameP.textContent = province.name;

  const tempP = document.createElement("p");
  tempP.className = "text-xs text-gray-600 mt-1";
  tempP.textContent =
    province.temperature === -999 ? "N/A" : `${province.temperature}°C`;

  card.appendChild(imageDiv);
  card.appendChild(weatherIconDiv);
  card.appendChild(nameP);
  card.appendChild(tempP);
  return card;
}

// Function to create the entire Cambodia Forecast section content
async function renderCambodiaForecastSection() {
  // Get the section element
  const section = document.getElementById("cambodia-forecast");
  if (!section) {
    console.error("Section with id 'cambodia-forecast' not found.");
    return;
  }

  // Clear the section content before re-rendering
  section.innerHTML = "";

  // Fetch weather data for all provinces
  for (let province of provinces) {
    const weatherData = await fetchWeatherData(province.lat, province.lon);
    province.weatherIcon = weatherData.weatherIcon;
    province.temperature = weatherData.temperature;
  }

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

// Function to periodically update the weather data
function startWeatherUpdates() {
  // Initial render
  renderCambodiaForecastSection();

  // Refresh every 5 minutes (300,000 milliseconds)
  setInterval(() => {
    renderCambodiaForecastSection();
  }, 300000);
}

// Call the function to start the weather updates when the script loads
startWeatherUpdates();
