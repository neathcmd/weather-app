const API_KEY = "b93932bbe1df60eb75e5596059faf22e";
const CITY = "Phnom Penh";

// DOM elements
const loading = document.getElementById("loading");
const weatherContent = document.getElementById("weather-content");
const error = document.getElementById("error");
const dateElement = document.getElementById("date");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const tempMax = document.getElementById("temp-max");
const tempMin = document.getElementById("temp-min");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

// Format date to "Today, DD Mon" format
function formatDate() {
  const date = new Date();
  const options = { day: "numeric", month: "short" };
  return `Today, ${date.toLocaleDateString("en-US", options)}`;
}

// Convert UNIX timestamp to readable time
function formatTime(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// Weather icon mapping
function getWeatherIcon(weatherCode) {
  switch (weatherCode) {
    case "Clear":
      return "☀️";
    case "Clouds":
      return "☁️";
    case "Rain":
      return "🌧️";
    case "Thunderstorm":
      return "⛈️";
    case "Snow":
      return "❄️";
    default:
      return "🌤️";
  }
}

// Fetch weather data
async function fetchWeather() {
  loading.classList.remove("hidden");
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    // Update DOM with weather data
    dateElement.textContent = formatDate();
    weatherIcon.textContent = getWeatherIcon(data.weather[0].main);
    temperature.textContent = `${Math.round(data.main.temp)}°`;
    description.textContent = data.weather[0].description;
    feelsLike.textContent = `Feels like ${Math.round(data.main.feels_like)}°`;
    tempMax.textContent = `${Math.round(data.main.temp_max)}°`;
    tempMin.textContent = `${Math.round(data.main.temp_min)}°`;
    sunrise.textContent = formatTime(data.sys.sunrise);
    sunset.textContent = formatTime(data.sys.sunset);

    // Show weather content
    loading.classList.add("hidden");
    weatherContent.classList.remove("hidden");
  } catch (error) {
    console.error("Error fetching weather data:", error);
    loading.classList.add("hidden");
    error.classList.remove("hidden");
  }
}

// Fetch weather data on page load
document.addEventListener("DOMContentLoaded", fetchWeather);
