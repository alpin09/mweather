// utils/geocode.js
export const geocodeCity = async (cityName) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cityName)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    if (data.results.length === 0) throw new Error('Город не найден');
    return data.results[0].geometry.location; // { lat, lng }
  };