import React, { useState, useEffect } from 'react';
import Map from './Map';

const MapContainer = () => {
  const [restaurantLocation, setRestaurantLocation] = useState({ lat: 26.9298469, lng: 75.7853946 });
  const [deliveryLocation, setDeliveryLocation] = useState({ lat: 26.92822, lng: 75.7857166 });
  const [deliveryPersonLocation, setDeliveryPersonLocation] = useState({lat: 26.930088,  lng: 75.784779});
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newLocation = {
        lat: deliveryLocation.lat + (Math.random() - 0.5) * 0.01,
        lng: deliveryLocation.lng + (Math.random() - 0.5) * 0.01,
      };
      setDeliveryPersonLocation(newLocation);
    }, 5000);

    return () => clearInterval(interval);
  }, [deliveryLocation]);

  return (
    <div>
      <h1>Food Delivery</h1>
      <Map
        restaurantLocation={restaurantLocation}
        deliveryLocation={deliveryLocation}
        deliveryPersonLocation={deliveryPersonLocation}
      />
    </div>
  );
};

export default MapContainer;
