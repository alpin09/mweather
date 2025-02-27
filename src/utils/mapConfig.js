export const MAP_CONFIG = {
  center: {
    lat: 50.0755,
    lng: 14.4378
  },
  zoom: 12,
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
};

export const HEATMAP_GRADIENT = [
  'rgba(0, 255, 255, 0)',
  'rgba(0, 255, 255, 1)',
  'rgba(0, 191, 255, 1)',
  'rgba(0, 127, 255, 1)',
  'rgba(0, 63, 255, 1)',
  'rgba(0, 0, 255, 1)'
];