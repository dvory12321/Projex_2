import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "./MyMap.css"
import 'leaflet/dist/leaflet.css';

const MyMap = ({lat,lon,nameAddress}) => {
  const position = [lat, lon];   //הכנסת הערכים לתוך המשתנה
  const zoom = 20;           // הזום הרצוי

  return (
    <div id="map-container" style={{ height: '500px', width: '300px' }}>
              {/* הגדרת רכיב המפה ומיקומה */}
      <MapContainer center={position} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" //הקישור להצגת המפות
          // attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <Marker position={position}>  {/*סמן על המפה */}
          <Popup>{nameAddress}</Popup> {/*חלונית על הסמן עם שם המקום */}
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MyMap;