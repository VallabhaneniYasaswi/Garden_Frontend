import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=Vijayawada,IN&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        );
        
        // Process the forecast data to get daily forecasts
        const dailyForecasts = response.data.list.reduce((acc, curr) => {
          const date = new Date(curr.dt * 1000).toLocaleDateString();
          if (!acc[date] && Object.keys(acc).length < 5) {
            acc[date] = {
              date: new Date(curr.dt * 1000),
              temp: curr.main.temp,
              feels_like: curr.main.feels_like,
              humidity: curr.main.humidity,
              description: curr.weather[0].description,
              icon: curr.weather[0].icon,
              windSpeed: curr.wind.speed,
              pressure: curr.main.pressure
            };
          }
          return acc;
        }, {});

        setForecast(Object.values(dailyForecasts));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch weather data');
        setLoading(false);
        console.error('Weather fetch error:', err);
      }
    };

    fetchWeather();
  }, []);

  const getPlantRecommendations = (temp, humidity) => {
    if (temp >= 30) {
      return {
        title: "Hot Weather Plants",
        plants: [
          { name: "Tomatoes", icon: "🍅" },
          { name: "Peppers", icon: "🫑" },
          { name: "Succulents", icon: "🌵" },
          { name: "Marigolds", icon: "🌼" }
        ]
      };
    } else if (temp >= 20) {
      return {
        title: "Moderate Weather Plants",
        plants: [
          { name: "Herbs", icon: "🌿" },
          { name: "Roses", icon: "🌹" },
          { name: "Vegetables", icon: "🥬" },
          { name: "Jasmine", icon: "🌸" }
        ]
      };
    } else {
      return {
        title: "Cool Weather Plants",
        plants: [
          { name: "Lettuce", icon: "🥬" },
          { name: "Spinach", icon: "🍃" },
          { name: "Peas", icon: "🫛" },
          { name: "Cabbage", icon: "🥬" }
        ]
      };
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather Forecast 🌤️</h1>
      
      {loading && (
        <div className="weather-loading">
          <div className="loading-spinner"></div>
          <p>Loading weather data...</p>
        </div>
      )}

      {error && (
        <div className="weather-error">
          <p>{error}</p>
        </div>
      )}

      {forecast && (
        <div className="forecast-container">
          {forecast.map((day, index) => (
            <div key={index} className="weather-card">
              <div className="weather-date">
                {day.date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
              
              <div className="weather-main">
                <div className="weather-icon">
                  <img 
                    src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
                    alt={day.description}
                  />
                </div>
                
                <div className="weather-temp">
                  <span className="temp-main">{Math.round(day.temp)}°C</span>
                  <span className="feels-like">Feels like: {Math.round(day.feels_like)}°C</span>
                </div>
              </div>
              
              <div className="weather-details">
                <div className="detail-item">
                  <span className="detail-label" data-type="humidity">Humidity</span>
                  <span className="detail-value">{day.humidity}%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label" data-type="wind">Wind</span>
                  <span className="detail-value">{Math.round(day.windSpeed * 3.6)} km/h</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {forecast && (
        <div className="plant-guide-section">
          <h2>Recommended Plants for Current Weather</h2>
          <div className="plant-recommendations-grid">
            {forecast.map((day, index) => (
              <div key={index} className="day-recommendations">
                <h3>{day.date.toLocaleDateString('en-US', { weekday: 'long' })}</h3>
                <div className="temp-indicator">
                  <span className="temp-value">{Math.round(day.temp)}°C</span>
                  <span className="temp-label">
                    {day.temp >= 30 ? 'Hot' : day.temp >= 20 ? 'Moderate' : 'Cool'}
                  </span>
                </div>
                <div className="plants-grid">
                  {getPlantRecommendations(day.temp, day.humidity).plants.map((plant, i) => (
                    <div key={i} className="plant-card">
                      <div className="plant-icon">{plant.icon}</div>
                      <div className="plant-info">
                        <span className="plant-name">{plant.name}</span>
                        <span className="plant-care">
                          {day.humidity > 70 ? 'Keep soil well-drained' : 
                           day.humidity < 40 ? 'Water regularly' : 'Normal care'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather; 