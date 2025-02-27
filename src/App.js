import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';
import MapComponent from './components/MapComponent';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [error, setError] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(savedHistory);
  }, []);

  const handleSearch = async (city) => {
    try {
      setError(null);
      setWeatherData(null);
      setForecastData(null);

      const API_BASE = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5000'
        : '';

      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`${API_BASE}/api/weather/${city}`),
        fetch(`${API_BASE}/api/forecast/${city}`)
      ]);

      if (!weatherRes.ok) throw new Error('Ошибка сети');
      if (!forecastRes.ok) throw new Error('Ошибка сети');

      const [weatherData, forecastData] = await Promise.all([
        weatherRes.json(),
        forecastRes.json()
      ]);

      if (weatherData.cod !== 200) throw new Error(weatherData.message);
      if (forecastData.cod !== "200") throw new Error(forecastData.message);

      setWeatherData(weatherData);
      setForecastData(forecastData);

      setSearchHistory(prev => {
        const newHistory = [city, ...prev.filter(item => item !== city)].slice(0, 10);
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
        return newHistory;
      });

    } catch (error) {
      console.error('Ошибка:', error);
      setError(error.message);
      setWeatherData(null);
      setForecastData(null);
    }
  };
  

  return (
    <div className="app">
      <h1>Прогноз погоды</h1>
      <SearchBar 
        onSearch={handleSearch}
        searchHistory={searchHistory}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <WeatherDisplay data={weatherData} />
      {forecastData && (
        <>
          <HourlyForecast forecast={forecastData} />
          <DailyForecast forecast={forecastData} />
          <MapComponent />
        </>
      )}
    </div>
  );
};

export default App;