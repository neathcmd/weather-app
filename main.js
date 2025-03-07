// Province data with approximate coordinates for each province
const provinces = [
    { name: "Preah Province", image: `/src/assets/Pailin-Province.jpg`, lat: 12.8489, lon: 102.6093 },
    { name: "Battambang Province", image: `/src/assets/Battambang-Province.jpg`, lat: 13.0957, lon: 103.2022 },
    { name: "KohKong Province", image: `/src/assets/KohKong-Province.jpg`, lat: 11.9924, lon: 105.4645 },
    { name: "Prey Veng Province", image: `/src/assets/PreyVeng-Province.jpg`, lat: 11.4868, lon: 105.3253 },
    { name: "Kampongchhang Province", image: `/src/assets/Kompongchhang-Province.jpg`, lat: 12.7111, lon: 104.8887 },
    { name: "PreahVihear Province", image: `/src/assets/PreyVeng-Province.jpg`, lat: 12.5388, lon: 103.9192 },
    { name: "Mondulkiri Province", image: `/src/assets/Modulkiri-Province.jpg`, lat: 12.4555, lon: 107.1878 },
    { name: "Kep Province", image: `/src/assets/Kep-Province.jpg`, lat: 10.4833, lon: 104.3167 },
    { name: "Kampongspeu Province", image: `/src/assets/Kompongspeu-Province.jpg`, lat: 11.6155, lon: 104.5209 },
    { name: "KompongThom Province", image: `/src/assets/KompongThom-Province.jpg`, lat: 11.6155, lon: 104.5209 },
  ];
  
  // Split the provinces into two rows
  const firstRowProvinces = provinces.slice(0, 5);
  const secondRowProvinces = provinces.slice(5);
  
  // Shared API key
  const API_KEY = "b93932bbe1df60eb75e5596059faf22e";
  
  // Function to map weather conditions to emoji icons
  function getWeatherIcon(weatherMain) {
    switch (weatherMain.toLowerCase()) {
      case "clear": return "☀️";
      case "clouds": return "⛅";
      case "rain": return "🌧️";
      case "drizzle": return "🌦️";
      case "thunderstorm": return "🌩️";
      case "snow": return "❄️";
      case "mist": case "fog": return "🌫️";
      case "tornado": return "🌪️";
      default: return "🌥️";
    }
  }
  
  // Fetch weather data for Cambodia Forecast
  async function fetchProvinceWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      return {
        weatherIcon: getWeatherIcon(data.weather[0].main),
        temperature: Math.round(data.main.temp),
      };
    } catch (error) {
      console.error(`Error fetching weather for lat=${lat}, lon=${lon}:`, error);
      return { weatherIcon: "🌥️", temperature: -999 };
    }
  }
  
  // Create a province card
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
    tempP.textContent = province.temperature === -999 ? "N/A" : `${province.temperature}°C`;
  
    card.appendChild(imageDiv);
    card.appendChild(weatherIconDiv);
    card.appendChild(nameP);
    card.appendChild(tempP);
    return card;
  }
  
  // Render Cambodia Forecast Section
  async function renderCambodiaForecastSection() {
    const section = document.getElementById("cambodia-forecast");
    if (!section) {
      console.error("Section with id 'cambodia-forecast' not found.");
      return;
    }
  
    section.innerHTML = "";
  
    for (let province of provinces) {
      const weatherData = await fetchProvinceWeather(province.lat, province.lon);
      province.weatherIcon = weatherData.weatherIcon;
      province.temperature = weatherData.temperature;
    }
  
    const headerDiv = document.createElement("div");
    headerDiv.className = "text-center mb-8";
    const heading = document.createElement("h2");
    heading.className = "text-3xl font-bold text-gray-900 mb-2";
    heading.textContent = "Cambodia Forecast";
    const description = document.createElement("p");
    description.className = "text-gray-600 max-w-2xl mx-auto text-sm";
    description.textContent =
      "Stay updated with the latest weather forecasts across Cambodia. Plan your activities with accurate and timely weather information.";
    headerDiv.appendChild(heading);
    headerDiv.appendChild(description);
    section.appendChild(headerDiv);
  
    const firstRow = document.createElement("div");
    firstRow.id = "first-row";
    firstRow.className =
      "flex flex-row md:flex-nowrap flex-wrap justify-between gap-4 mb-4 max-w-5xl mx-auto";
    firstRowProvinces.forEach((province) => {
      const card = createProvinceCard(province);
      card.classList.add("w-1/5", "min-w-[120px]", "flex-grow-0", "flex-shrink-0");
      firstRow.appendChild(card);
    });
    section.appendChild(firstRow);
  
    const secondRow = document.createElement("div");
    secondRow.id = "second-row";
    secondRow.className =
      "flex flex-row md:flex-nowrap flex-wrap justify-between gap-4 max-w-5xl mx-auto";
    secondRowProvinces.forEach((province) => {
      const card = createProvinceCard(province);
      card.classList.add("w-1/5", "min-w-[120px]", "flex-grow-0", "flex-shrink-0");
      secondRow.appendChild(card);
    });
    section.appendChild(secondRow);
  }
  
  // Weather Overview Configuration
  let city = "Phnom Penh";
  let units = "metric";
  
  // Fetch weather data for Weather Overview
  async function fetchCityWeather() {
    const content = document.getElementById("weather-content");
    content.innerHTML = loadingTemplate();
  
    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
      const weatherResponse = await fetch(weatherUrl);
      if (!weatherResponse.ok) throw new Error(`Weather fetch failed: ${weatherResponse.statusText}`);
      const weatherResult = await weatherResponse.json();
  
      const { lat, lon } = weatherResult.coord;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;
      const forecastResponse = await fetch(forecastUrl);
      if (!forecastResponse.ok) throw new Error(`Forecast fetch failed: ${forecastResponse.statusText}`);
      const forecastResult = await forecastResponse.json();
  
      const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      const airQualityResponse = await fetch(airQualityUrl);
      if (!airQualityResponse.ok) throw new Error(`Air quality fetch failed: ${airQualityResponse.statusText}`);
      const airQualityResult = await airQualityResponse.json();
  
      return {
        current: weatherResult,
        forecast: forecastResult,
        airQuality: airQualityResult,
      };
    } catch (error) {
      content.innerHTML = errorTemplate(error.message);
      throw error; // Re-throw to handle in caller
    }
  }
  
  // Render Weather Overview
  function renderWeatherApp() {
    const app = document.getElementById("weather-app");
    if (!app) {
      console.error("Element with id 'weather-app' not found.");
      return;
    }
  
    app.innerHTML = `
      <div class="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 class="text-2xl sm:text-3xl font-bold text-black">Weather Overview</h1>
        <div class="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <div class="relative w-full sm:w-auto group">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input id="city-input" type="text" placeholder="Search city..." class="pl-10 pr-4 py-2 w-full sm:w-64 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-black text-sm sm:text-base placeholder-gray-400 hover:border-orange-400" />
            <button id="search-btn" class="absolute right-0 top-0 h-full px-3 sm:px-4 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-1 cursor-pointer">
              Search
            </button>
          </div>
          <button id="unit-toggle" class="w-full sm:w-auto px-3 sm:px-4 py-2 bg-gray-100 text-gray-800 rounded-lg shadow-sm hover:bg-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 text-sm sm:text-base">
            ${units === "metric" ? "°C" : "°F"}
          </button>
        </div>
      </div>
      <div id="weather-content"></div>
    `;
  
    document.getElementById("search-btn").addEventListener("click", () => {
      const input = document.getElementById("city-input").value;
      if (input) {
        city = input;
        fetchCityWeather().then(renderWeather).catch(() => {});
      }
    });
  
    document.getElementById("city-input").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        city = e.target.value;
        fetchCityWeather().then(renderWeather).catch(() => {});
      }
    });
  
    document.getElementById("unit-toggle").addEventListener("click", () => {
      units = units === "metric" ? "imperial" : "metric";
      document.getElementById("unit-toggle").textContent = units === "metric" ? "°C" : "°F";
      fetchCityWeather().then(renderWeather).catch(() => {});
    });
  
    updateTime();
    fetchCityWeather().then(renderWeather).catch(() => {});
  }
  
  // Update time every second
  function updateTime() {
    setInterval(() => {
      const timeElement = document.getElementById("current-time");
      if (timeElement) {
        const today = new Date();
        const day = today.getDate();
        const month = today.toLocaleString("default", { month: "short" });
        const hours = today.getHours().toString().padStart(2, "0");
        const minutes = today.getMinutes().toString().padStart(2, "0");
        timeElement.textContent = `Today, ${day} ${month}, ${hours}:${minutes}`;
      }
    }, 1000);
  }
  
  // Loading template
  function loadingTemplate() {
    return `
      <div class="flex items-center justify-center h-64">
        <div class="text-center text-lg text-gray-600">
          <svg class="animate-spin h-8 w-8 mx-auto mb-4 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p>Loading weather data...</p>
        </div>
      </div>
    `;
  }
  
  // Error template
  function errorTemplate(error) {
    return `
      <div class="text-center p-8 bg-red-50 rounded-lg border border-red-200">
        <div class="text-red-600 text-lg mb-2">Error: ${error}</div>
        <p class="text-gray-700"></p>
        <div class="mt-4">
          <input id="retry-input" type="text" placeholder="Try another city..." class="px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-orange-500" />
          <button id="retry-btn" class="bg-orange-500 text-white px-4 py-2 rounded-r hover:bg-orange-600 transition-colors cursor-pointer">Search</button>
        </div>
      </div>
    `;
  }
  
  // Render weather data
  function renderWeather(data) {
    const { current, forecast, airQuality } = data;
    const content = document.getElementById("weather-content");
  
    const cityName = current.name;
    const countryCode = current.sys.country;
    const temperature = Math.round(current.main.temp);
    const weatherDescription = current.weather[0].description;
    const weatherIcon = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
    const highTemp = Math.round(current.main.temp_max);
    const lowTemp = Math.round(current.main.temp_min);
    const feelsLike = Math.round(current.main.feels_like);
    const windSpeed = units === "metric" ? Math.round(current.wind.speed * 3.6) : Math.round(current.wind.speed);
    const windUnit = units === "metric" ? "km/h" : "mph";
    const humidity = current.main.humidity;
    const pressure = current.main.pressure;
    const visibility = current.visibility / 1000;
    const visibilityUnit = units === "metric" ? "km" : "mi";
    const sunrise = new Date(current.sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const sunset = new Date(current.sys.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const tempUnit = units === "metric" ? "°C" : "°F";
    const aqi = airQuality.list[0].main.aqi;
    const airQualityText = ["Good", "Fair", "Moderate", "Poor", "Very Poor"][aqi - 1] || "Unknown";
    const dailyForecasts = forecast.list.filter((_, i) => i % 8 === 0).slice(0, 5);
  
    content.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-4 sm:p-6 shadow-xl">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h2 class="font-bold text-xl sm:text-2xl">${cityName}, ${countryCode}</h2>
              <p id="current-time" class="text-gray-300 text-sm sm:text-base"></p>
            </div>
            <img src="${weatherIcon}" alt="${weatherDescription}" class="w-12 h-12 sm:w-16 sm:h-16" />
          </div>
          <div class="my-4 sm:my-6 text-center">
            <div class="flex items-center justify-center">
              <span class="text-5xl sm:text-7xl font-bold">${temperature}${tempUnit}</span>
            </div>
            <p class="text-lg sm:text-xl capitalize mt-2">${weatherDescription}</p>
            <p class="text-gray-300 mt-1 text-sm sm:text-base">Feels like ${feelsLike}${tempUnit}</p>
          </div>
          <div class="border-t border-gray-700 pt-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <div>
                  <p class="text-gray-400 text-xs sm:text-sm">High</p>
                  <p class="text-sm sm:text-base">${highTemp}${tempUnit}</p>
                </div>
              </div>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
                <div>
                  <p class="text-gray-400 text-xs sm:text-sm">Low</p>
                  <p class="text-sm sm:text-base">${lowTemp}${tempUnit}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-700">
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <div>
                  <p class="text-gray-400 text-xs sm:text-sm">Sunrise</p>
                  <p class="text-sm sm:text-base">${sunrise}</p>
                </div>
              </div>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="