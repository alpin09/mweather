// utils/forecastUtils.js
export const filterTodaysForecast = (forecast) => {
  if (!forecast?.list) return [];
  
  const grouped = groupByDay(forecast);
  const todayKey = new Date().toLocaleDateString();
  return grouped[todayKey] || [];
};

export const groupByDay = (forecast) => {
  if (!forecast?.list) return [];
  
  return forecast.list.reduce((acc, item) => {
    // Используем UTC дату для группировки
    const date = new Date(item.dt * 1000);
    const dateKey = date.toISOString().split('T')[0]; // Формат: YYYY-MM-DD
    
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(item);
    return acc;
  }, {});
};

export const getFiveDayForecast = (groupedForecast) => {
  const dates = Object.keys(groupedForecast).sort();
  
  // Берем следующие 5 дней (исключая сегодня)
  const startIndex = dates.findIndex(date => {
    const forecastDate = new Date(date);
    const today = new Date();
    return forecastDate > new Date(today.setHours(0,0,0,0));
  });
  
  return dates.slice(startIndex, startIndex + 5).reduce((acc, date) => {
    acc[date] = groupedForecast[date];
    return acc;
  }, {});
};