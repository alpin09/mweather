import React from 'react';

const WeatherDisplay = ({ data }) => {
  if (!data) return null;

  return (
    <div className="weather-display">
      <h2>{data.name}</h2>
      <p>Температура: {(data.main.temp - 273.15).toFixed(1)}°C</p>
      {/* ... остальные данные */}
    </div>
  );
};

export default WeatherDisplay;