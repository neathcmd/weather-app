// Configuration
const YOUR_KEY = "b93932bbe1df60eb75e5596059faf22e";
let city = "Phnom Penh";
let units = "metric";

// Initial render
document.addEventListener("DOMContentLoaded", () => {
  renderWeatherApp();
});

function renderWeatherApp() {
  const app = document.getElementById("weather-app");
  if (!app) {
    console.error("Weather app container not found");
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

  // Event listeners
  const searchBtn = document.getElementById("search-btn");
  const cityInput = document.getElementById("city-input");
  const unitToggle = document.getElementById("unit-toggle");

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const input = cityInput.value.trim();
      if (input) {
        city = input;
        fetchWeatherData();
      }
    });
  }

  if (cityInput) {
    cityInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const input = e.target.value.trim();
        if (input) {
          city = input;
          fetchWeatherData();
        }
      }
    });
  }

  if (unitToggle) {
    unitToggle.addEventListener("click", () => {
      units = units === "metric" ? "imperial" : "metric";
      unitToggle.textContent = units === "metric" ? "°C" : "°F";
      fetchWeatherData();
    });
  }

  // Start clock and fetch initial data
  updateTime();
  fetchWeatherData();
}

// Update time every second
function updateTime() {
  const timeElement = document.getElementById("current-time");
  if (!timeElement) return;

  const update = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("default", { month: "short" });
    const hours = today.getHours().toString().padStart(2, "0");
    const minutes = today.getMinutes().toString().padStart(2, "0");
    timeElement.textContent = `Today, ${day} ${month}, ${hours}:${minutes}`;
  };

  update(); // Initial update
  setInterval(update, 1000);
}

// Fetch weather data
async function fetchWeatherData() {
  const content = document.getElementById("weather-content");
  if (!content) return;

  content.innerHTML = loadingTemplate();

  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${YOUR_KEY}&units=${units}`;
    const weatherResponse = await fetch(weatherUrl);
    if (!weatherResponse.ok) {
      throw new Error(
        `City not found or API error: ${weatherResponse.statusText}`
      );
    }
    const weatherResult = await weatherResponse.json();

    const { lat, lon } = weatherResult.coord;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${YOUR_KEY}&units=${units}`;
    const forecastResponse = await fetch(forecastUrl);
    if (!forecastResponse.ok) {
      throw new Error(
        `Failed to fetch forecast data: ${forecastResponse.statusText}`
      );
    }
    const forecastResult = await forecastResponse.json();

    const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${YOUR_KEY}`;
    const airQualityResponse = await fetch(airQualityUrl);
    if (!airQualityResponse.ok) {
      throw new Error(
        `Failed to fetch air quality data: ${airQualityResponse.statusText}`
      );
    }
    const airQualityResult = await airQualityResponse.json();

    const weatherData = {
      current: weatherResult,
      forecast: forecastResult,
      airQuality: airQualityResult,
    };

    renderWeather(weatherData);
  } catch (error) {
    content.innerHTML = errorTemplate(error.message);
    addRetryListener();
  }
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
      <p class="text-gray-700">Please try again or search for another city</p>
      <div class="mt-4">
        <input id="retry-input" type="text" placeholder="Try another city..." class="px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
        <button id="retry-btn" class="bg-orange-500 text-white px-4 py-2 rounded-r-lg hover:bg-orange-600 transition-colors cursor-pointer">Search</button>
      </div>
    </div>
  `;
}

// Add retry button listener
function addRetryListener() {
  const retryBtn = document.getElementById("retry-btn");
  const retryInput = document.getElementById("retry-input");
  if (retryBtn && retryInput) {
    retryBtn.addEventListener("click", () => {
      const input = retryInput.value.trim();
      if (input) {
        city = input;
        fetchWeatherData();
      }
    });
  }
}

// Render weather data (unchanged)
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
  const windSpeed =
    units === "metric"
      ? Math.round(current.wind.speed * 3.6)
      : Math.round(current.wind.speed);
  const windUnit = units === "metric" ? "km/h" : "mph";
  const humidity = current.main.humidity;
  const pressure = current.main.pressure;
  const visibility = current.visibility / 1000;
  const visibilityUnit = units === "metric" ? "km" : "mi";
  const sunrise = new Date(current.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunset = new Date(current.sys.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const tempUnit = units === "metric" ? "°C" : "°F";
  const aqi = airQuality.list[0].main.aqi;
  const airQualityText =
    ["Good", "Fair", "Moderate", "Poor", "Very Poor"][aqi - 1] || "Unknown";
  const dailyForecasts = forecast.list
    .filter((_, i) => i % 8 === 0)
    .slice(0, 5);

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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <div>
                <p class="text-gray-400 text-xs sm:text-sm">Sunset</p>
                <p class="text-sm sm:text-base">${sunset}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="lg:col-span-2">
        <div class="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
          <h3 class="font-semibold text-base sm:text-lg text-gray-800 mb-4">5-Day Forecast</h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
            ${dailyForecasts
              .map(
                (day) => `
              <div class="text-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <p class="font-medium text-gray-700 text-sm sm:text-base">${new Date(
                  day.dt * 1000
                ).toLocaleDateString("en-US", { weekday: "short" })}</p>
                <img src="https://openweathermap.org/img/wn/${
                  day.weather[0].icon
                }@2x.png" alt="${
                  day.weather[0].description
                }" class="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
                <p class="font-semibold text-sm sm:text-base">${Math.round(
                  day.main.temp
                )}${tempUnit}</p>
                <p class="text-xs text-gray-500 capitalize">${
                  day.weather[0].description
                }</p>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="bg-white rounded-xl shadow-md p-4 flex items-center">
            <div class="bg-orange-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-xs sm:text-sm">Air Quality</p>
              <p class="font-semibold text-gray-800 text-sm sm:text-base">${airQualityText}</p>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-md p-4 flex items-center">
            <div class="bg-blue-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-xs sm:text-sm">Humidity</p>
              <p class="font-semibold text-gray-800 text-sm sm:text-base">${humidity}%</p>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-md p-4 flex items-center">
            <div class="bg-green-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-xs sm:text-sm">Wind</p>
              <p class="font-semibold text-gray-800 text-sm sm:text-base">${windSpeed} ${windUnit}</p>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-md p-4 flex items-center">
            <div class="bg-purple-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-xs sm:text-sm">Pressure</p>
              <p class="font-semibold text-gray-800 text-sm sm:text-base">${pressure} hPa</p>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-md p-4 flex items-center">
            <div class="bg-yellow-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-xs sm:text-sm">Visibility</p>
              <p class="font-semibold text-gray-800 text-sm sm:text-base">${visibility.toFixed(
                1
              )} ${visibilityUnit}</p>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-md p-4 flex items-center">
            <div class="bg-red-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-xs sm:text-sm">Feels Like</p>
              <p class="font-semibold text-gray-800 text-sm sm:text-base">${feelsLike}${tempUnit}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
