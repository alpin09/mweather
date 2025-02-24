// import React, { useState } from 'react';

// const App = () => {
//   const [city, setCity] = useState('');
//   const [weatherData, setWeatherData] = useState(null);
//   const [error, setError] = useState(null);

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(`/api/weather/${city}`);
//       if (!response.ok) {
//         throw new Error('Ошибка сети');
//       }
//       const data = await response.json();
//       if (data.cod !== 200) {
//         throw new Error(data.message || 'Город не найден');
//       }
//       setWeatherData(data);
//       setError(null);
//     } catch (error) {
//       console.error('Ошибка:', error);
//       setError(error.message);
//       setWeatherData(null);
//     }
//   };

//   return (
//     <div>
//       <h1>Прогноз погоды</h1>
//       <input
//         type="text"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//         placeholder="Введите город..."
//       />
//       <button onClick={handleSearch}>Поиск</button>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {weatherData && (
//         <div>
//           <h2>{weatherData.name}</h2>
//           <p>Температура: {(weatherData.main.temp - 273.15).toFixed(1)}°C</p>
//           <p>Погода: {weatherData.weather[0].description}</p>
//           <img
//             src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
//             alt="Weather icon"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';

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
  
      // Явно указываем полный URL для разработки
      const API_BASE = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5000'
        : '';
  
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`${API_BASE}/api/weather/${city}`),
        fetch(`${API_BASE}/api/forecast/${city}`)
      ]);
  
      // Проверяем HTTP статусы
      if (!weatherRes.ok) throw new Error(`Weather API: ${weatherRes.statusText}`);
      if (!forecastRes.ok) throw new Error(`Forecast API: ${forecastRes.statusText}`);
  
      const [weatherData, forecastData] = await Promise.all([
        weatherRes.json(),
        forecastRes.json()
      ]);
  
      // Проверяем коды ответа OpenWeatherMap
      if (weatherData.cod !== 200) throw new Error(weatherData.message);
      if (forecastData.cod !== "200") throw new Error(forecastData.message);
  
      setWeatherData(weatherData);
      setForecastData(forecastData);
  
      // Обновляем историю
      setSearchHistory(prev => {
        const newHistory = [city, ...prev.filter(item => item !== city)].slice(0, 10);
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
        return newHistory;
      });
  
    } catch (error) {
      console.error('Error:', error);
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
        </>
      )}
    </div>
  );
};

export default App