# Weather App Project

## Overview

This Weather App is a simple and user-friendly application that provides real-time weather updates for any location worldwide. It was developed by a team of three developers as a collaborative project to enhance our skills in web development, API integration, and UI/UX design.

## Features

- **Current Weather Data**: Displays temperature, humidity, wind speed, and weather conditions.
- **Search Functionality**: Users can search for weather details of any city or location.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.
- **Error Handling**: Provides appropriate messages when an invalid location is entered.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **API**: OpenWeatherMap API (for fetching real-time weather data)
- **Frameworks/Libraries**: Axios (for API requests), Tailwind (for styling)
- **Version Control**: Git & GitHub

## Project structure

```bash
WEATHER-APP
│-- .vscode/
│-- node_modules/
│-- src/
│   │-- assets/
│   │-- components/
│   │   │-- Cambodia-Forecast/
│   │   │   │-- Cambodia-Forecast.js
│   │   │-- footer/
│   │   │   │-- Footer.js
│   │   │-- header/
│   │   │   │-- Header.js
│   │   │-- WeatherOverview.js
│   │-- scripts/
│   │-- styles/
│   │   │-- font.css
│   │   │-- input.css
│   │   │-- output.css
│-- videos/
│-- blog.html
│-- contact.html
│-- faq.html
│-- Gallery.html
│-- index.html
│-- package-lock.json
│-- package.json
│-- README.md
```

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository/weather-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd weather-app
   ```
   Setup tailwindcss
   run:
   ```bash
   npm install tailwindcss @tailwindcss/cil
   ```
   Then run:
   ```bash
   npx @tailwindcss/cli -i ./src/styles/input.css -o ./src/styles/output.css --watch
   ```
3. Open the `index.html` file in a browser, or use a local server for a better experience.

## Team Members

- **[Phong Visal]** – Frontend & UI Design
- **[Sal Monineath]** – API Integration & Data Handling
- **[BunThen]** – Responsive Design & Error Handling

## Future Improvements

- Implement user location detection for automatic weather updates.
- Introduce dark mode for better user experience.
- Improve search Functionality

## License

This project is open-source and available under the MIT License.

---
