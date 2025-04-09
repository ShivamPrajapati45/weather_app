import {MapContainer,TileLayer,Marker,Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { WeatherData } from '@/api/types';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for marker icon not showing
const DefaultIcon = L.icon({
    iconUrl: markerIconPng,
    shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

interface Map{
    data: WeatherData
}

const Map = ({data}:Map) => {
    const {
        coord: {lat,lon},
    } = data;

    const center = [lat, lon] as [number, number];

    return (
        <MapContainer
            center={center} 
            zoom={13} 
            scrollWheelZoom={false} 
            className="h-72 w-full z-0 rounded-md md:rounded-xl shadow-md"
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={center}>
                <Popup>You're here 🌍</Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map