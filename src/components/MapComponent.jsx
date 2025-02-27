import React, { useEffect, useState, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, HeatmapLayer } from '@react-google-maps/api';
import { MAP_CONFIG, HEATMAP_GRADIENT } from '../utils/mapConfig';
import { fetchGridData } from '../utils/api';
import { generateGrid } from '../utils/gridGenerator';

const MapComponent = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: MAP_CONFIG.apiKey,
    libraries: ['visualization'],
  });

  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    if (!isLoaded) return;

    const loadData = async () => {
      try {
        const grid = generateGrid(50.0755, 14.4378, 10, 2); // 5x5 точек
        const data = await fetchGridData(grid);
        setGridData(data);
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    loadData();
  }, [isLoaded]);

  const heatmapData = useMemo(() => {
    if (!isLoaded || !window.google || gridData.length === 0) return [];
    
    return gridData.map(point => ({
      location: new window.google.maps.LatLng(point.lat, point.lon),
      weight: point.temp
    }));
  }, [isLoaded, gridData]);

  if (loadError) {
    return <div>Ошибка загрузки карты. Проверьте ключ API.</div>;
  }

  if (!isLoaded) {
    return <div style={{ height: '600px' }}>Загрузка карты...</div>;
  }

  return (
    <div style={{ margin: '20px 0' }}>
      <h2>Температурная карта Праги</h2>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '600px' }}
        center={MAP_CONFIG.center}
        zoom={12}
        options={{
          streetViewControl: false,
          mapTypeControl: false
        }}
      >
        <HeatmapLayer
          data={heatmapData}
          options={{
            radius: 40,
            gradient: HEATMAP_GRADIENT,
            opacity: 0.8
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default React.memo(MapComponent);