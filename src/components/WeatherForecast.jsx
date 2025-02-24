// components/WeatherForecast.jsx
import React from 'react';
import { filterTodaysForecast } from '../utils/forecastUtils';

const HourlyForecast = ({ forecast }) => {
  const hourlyData = filterTodaysForecast(forecast);

  return (
    <div className="hourly-forecast">
      <h3>Почасовой прогноз:</h3>
      <div className="forecast-scroll">
        {hourlyData.map((item) => (
          <div key={item.dt} className="hourly-item">
            <p>{new Date(item.dt * 1000).getHours()}:00</p>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
            />
            <p>{Math.round(item.main.temp - 273.15)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};