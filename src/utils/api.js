// export const fetchPragueWeather = async () => {
//     const response = await fetch(
//       `https://api.open-meteo.com/v1/forecast?latitude=50.08&longitude=14.43&hourly=temperature_2m`
//     );
//     const data = await response.json();
    
//     if (!data.list) {
//       throw new Error('Нет данных о погоде');
//     }
  
//     return data.list.map(item => ({
//       lat: 50.0755, // Широта Праги
//       lng: 14.4378, // Долгота Праги
//       temp: item.main.temp - 273.15 // Конвертация в °C
//     }));
//   };

// utils/api.js
export const fetchGridData = async (grid) => {
  const requests = grid.map(point => 
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${point.lat}&longitude=${point.lon}&hourly=temperature_2m`)
      .then(res => res.json())
  );
  
  const responses = await Promise.all(requests);
  return responses.map((res, index) => ({
    lat: grid[index].lat,
    lon: grid[index].lon,
    temp: res.hourly.temperature_2m[0] // Текущая температура
  }));
};