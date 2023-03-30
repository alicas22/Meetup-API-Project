import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKey } from '../../store/maps';
import Maps from './Maps';

const MapContainer = ( address ) => {
  const [coordinates, setCoordinates] = useState(null);
  const key = useSelector((state) => state.maps.key);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);

  //turn address into long and lat
  useEffect(() => {
    if (address.center && key) {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address.center)}&key=${key}`)
        .then(response => response.json())
        .then(data => {
          
          if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            setCoordinates({ lat, lng });
          }
        })
        .catch(error => console.error(error));
    }
  }, [address, key]);

  if (!key || !coordinates) {
    return null;
  }

  return (
    <Maps apiKey={key} center={coordinates} address={address}/>
  );
};

export default MapContainer;
