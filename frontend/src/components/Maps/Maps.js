import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

// const center = {
//   lat: 38.9072,
//   lng: 77.0369,
// };

const Maps = ({ apiKey, center}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  const handleMapClick = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={handleMapClick}
        >
           <Marker position={center} />
        </GoogleMap>
      )}
    </>
  );
};

export default React.memo(Maps);
