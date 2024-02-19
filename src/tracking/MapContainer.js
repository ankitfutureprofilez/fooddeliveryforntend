import React, { useState, useEffect } from 'react';
import Map from './Map';

const MapContainer = ({ restaurent_coordinates, usercoordinates, status }) => {
  const [restaurantLocation, setRestaurantLocation] = useState({ lat: 28.65195, lng: 77.23149 });
  const [deliveryLocation, setDeliveryLocation] = useState({ lat: 26.92822, lng: 75.7857166 });
  const [deliveryPersonLocation, setDeliveryPersonLocation] = useState({ lat: 28.65195, lng: 77.23149 });

  useEffect(() => {
    if (restaurent_coordinates) {
      setRestaurantLocation(JSON.parse(restaurent_coordinates));
    }
    if (usercoordinates) {
      setDeliveryLocation(JSON.parse(usercoordinates));
    }
  }, [restaurent_coordinates, usercoordinates]);

  useEffect(() => {
    let interval = null;

    if (status === "accepted") {
      interval = setInterval(() => {
        setDeliveryPersonLocation((currentLocation) => {
          const deltaLat = deliveryLocation.lat - currentLocation.lat;
          const deltaLng = deliveryLocation.lng - currentLocation.lng;
          const distance = Math.sqrt(deltaLat ** 2 + deltaLng ** 2);

          if (distance < 0.001) {
            clearInterval(interval);
            return deliveryLocation; 
          }

          const stepSize = distance * 0.55 ; 
          const stepLat = deltaLat / distance * stepSize;
          const stepLng = deltaLng / distance * stepSize;

          return {
            lat: currentLocation.lat + stepLat,
            lng: currentLocation.lng + stepLng,
          };
        });
      }, 1000); 
    } else if (status === "delivered") {
      clearInterval(interval);
      setDeliveryPersonLocation(deliveryLocation);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, deliveryLocation]);

  return (
    <>
      <Map
        restaurantLocation={restaurantLocation}
        deliveryLocation={deliveryLocation}
        deliveryPersonLocation={deliveryPersonLocation}
      />
    </>
  );
};

export default MapContainer;
