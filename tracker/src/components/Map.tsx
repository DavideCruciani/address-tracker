import React, { useEffect, useRef } from 'react';
import Icon from '../assets/marker.png'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type Props = {
  lon: number;
  lat: number;
};

const Map: React.FC<Props> = ({ lon, lat }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const map = L.map(mapRef.current!).setView([lon, lat], 2);

    const redIcon = L.icon({
      iconUrl: `${Icon}`,
      iconSize: [24, 38],
      iconAnchor: [10, 38],
  });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    L.marker([lat, lon], {icon: redIcon}).addTo(map);
    map.flyTo([lat, lon], 13);
    return () => {
      map.remove();
    };
  }, [lon, lat]);

  return (
    <div className='h-[500px] w-full border-4 border-blue-600 mb-12' id='map' ref={mapRef}></div>
  )
}

export default Map