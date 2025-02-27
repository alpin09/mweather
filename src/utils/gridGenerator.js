// utils/gridGenerator.js
export const generateGrid = (centerLat, centerLon, sizeKm, resolution) => {
  const earthRadius = 6371; // Радиус Земли в км
  const grid = [];
  
  // Смещение в градусах (1 км ≈ 0.009 градусов)
  const step = (sizeKm / resolution) / earthRadius * (180 / Math.PI);
  
  for (let latStep = -resolution; latStep <= resolution; latStep++) {
    for (let lonStep = -resolution; lonStep <= resolution; lonStep++) {
      const lat = centerLat + latStep * step;
      const lon = centerLon + lonStep * step;
      grid.push({ lat, lon });
    }
  }
  
  return grid;
};

// Для Праги: сетка 10x10 км с шагом 5 км
const pragueGrid = generateGrid(50.0755, 14.4378, 10, 2);