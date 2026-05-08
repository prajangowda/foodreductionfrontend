import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";


const icon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = icon;

const LocationMarker = ({ setForm }) => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      // 🇮🇳 India restriction
      if (lat < 6 || lat > 37 || lng < 68 || lng > 97) {
        alert("Select location inside India only");
        return;
      }

      setPosition([lat, lng]);

      setForm((prev) => ({
        ...prev,
        latitude: lat,
        longitude: lng,
      }));
    },
  });

  return position === null ? null : <Marker position={position} />;
};

const MapPicker = ({ setForm }) => {
  return (
    <MapContainer
      center={[20.5937, 78.9629]} // India center
      zoom={5}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker setForm={setForm} />
    </MapContainer>
  );
};

export default MapPicker;