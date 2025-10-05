// Import dependencies
const express = require("express");
const morgan = require("morgan");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(morgan("dev"));

// API key & base URL (OpenWeatherMap free API)
const API_KEY = "9026b6550786bd02bb4043460c5c18d5"; // Get free from openweathermap.org
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Route: home
app.get("/", (req, res) => {
  res.send("Welcome to tiny Weather API Server");
});

// Route: Get weather for a city
app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });

    const data = response.data;
    res.json({
      city: data.name,
      temperature: `${data.main.temp} °C`,
      condition: data.weather[0].description,
    });
 } catch (error) {
    console.error("API call failed:", error); // <-- Add this line
    if (error.response) {
      // The API returned a response, but it was not successful (e.g., 404)
      res.status(error.response.status).json({
        error: "City not found or API error",
        message: error.response.data.message
      });
    } else {
      // The request did not receive a response from the API
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});