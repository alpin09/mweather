// // components/DailyForecast.jsx
// import React from 'react';
// import { filterTodaysForecast } from '../utils/forecastUtils';

// const DailyForecast = ({ forecast }) => {
//   const todaysForecast = filterTodaysForecast(forecast);

//   if (!todaysForecast.length) return null;

//   return (
//     <div className="daily-forecast">
//       <h3>Прогноз на сегодня:</h3>
//       <div className="forecast-items">
//         {todaysForecast.map((item) => (
//           <div key={item.dt} className="forecast-item">
//             <p>
//               Время: {new Date(item.dt * 1000).toLocaleTimeString([], { 
//                 hour: '2-digit', 
//                 minute: '2-digit' 
//               })}
//             </p>
//             <p>Температура: {item.main.temp}°C</p>
//             <p>{item.weather[0].description}</p>
//             <img
//               src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
//               alt={item.weather[0].description}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DailyForecast;


// components/DailyForecast.jsx
import React from 'react';
import { groupByDay, getFiveDayForecast } from '../utils/forecastUtils';

const DailyForecast = ({ forecast }) => {
  const groupedForecast = groupByDay(forecast);
  const fiveDayForecast = getFiveDayForecast(groupedForecast);

  if (!Object.keys(fiveDayForecast).length) return null;

  return (
    <div className="daily-forecast">
      <h3>5-дневный прогноз:</h3>
      <div className="forecast-days">
        {Object.entries(fiveDayForecast).map(([date, items]) => {
          const dayDate = new Date(date);
          
          return (
            <div key={date} className="day-card">
              <h4>
                {dayDate.toLocaleDateString('ru-RU', {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric'
                })}
              </h4>
              <img
                src={`http://openweathermap.org/img/wn/${items[0].weather[0].icon}.png`}
                alt={items[0].weather[0].description}
              />
              <p>Макс: {Math.round(Math.max(...items.map(i => i.main.temp_max - 273.15)))}°C</p>
              <p>Мин: {Math.round(Math.min(...items.map(i => i.main.temp_min - 273.15)))}°C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecast;