import { MapContainer, TileLayer } from 'react-leaflet';
import './map.scss';
import "leaflet/dist/leaflet.css";
import Pin from '../pin/Pin';

function Map({ items }) {
  // Default to a specific center if no items or invalid data
  const defaultCenter = [28.7, 77.1];

  // Determine center based on items or fallback to default
  const center = items.length === 1 && items[0].latitude && items[0].longitude
    ? [items[0].latitude, items[0].longitude]
    : defaultCenter;

  // Filter out invalid items (those without latitude or longitude)
  const validItems = items.filter(item => item.latitude && item.longitude);

  return (
    <MapContainer center={center} zoom={7} scrollWheelZoom={false} className='map'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {validItems.map(item => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
}

export default Map;
