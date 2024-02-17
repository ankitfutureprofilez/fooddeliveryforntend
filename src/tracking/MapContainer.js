import React, { useState, useEffect } from 'react';
import Map from './Map';

const MapContainer = ({ restaurent_coordinates, usercoordinates, status }) => {
  const parsedRestaurantCoordinates = restaurent_coordinates ? JSON.parse(restaurent_coordinates) : null;
  const parsedUserCoordinates = usercoordinates ? JSON.parse(usercoordinates) : null;

  const [restaurantLocation, setRestaurantLocation] = useState(parsedRestaurantCoordinates || { lat: 28.65195, lng: 77.23149 });
  const [deliveryLocation, setDeliveryLocation] = useState(parsedUserCoordinates || { lat: 26.92822, lng: 75.7857166 });
  const [deliveryPersonLocation, setDeliveryPersonLocation] = useState(parsedRestaurantCoordinates || { lat: 28.65195, lng: 77.23149 });

  useEffect(() => {
    if (parsedRestaurantCoordinates) {
      setRestaurantLocation(parsedRestaurantCoordinates);
    }
    if (parsedUserCoordinates) {
      setDeliveryLocation(parsedUserCoordinates);
    }
  }, [parsedRestaurantCoordinates, parsedUserCoordinates]);

  useEffect(() => {
    let interval;
    switch (status) {
      case "picked":
        setDeliveryPersonLocation(restaurantLocation);
        break;
      case "accepted":
        interval = setInterval(() => {
          setDeliveryPersonLocation((currentLocation) => {
            const newLat = currentLocation.lat + (deliveryLocation.lat - currentLocation.lat) * 0.1;
            const newLng = currentLocation.lng + (deliveryLocation.lng - currentLocation.lng) * 0.1;
            return { lat: newLat, lng: newLng };
          });
        }, 5000);
        break;
      case "delivered":
        setDeliveryPersonLocation(deliveryLocation);
        break;
      default:
        break;
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, restaurantLocation, deliveryLocation]);

  return (
    <>
      <div>
        <h1>Food Delivery</h1>
        <Map
          restaurantLocation={restaurantLocation}
          deliveryLocation={deliveryLocation}
          deliveryPersonLocation={deliveryPersonLocation}
        />
      </div>
    </>
  );
};

export default MapContainer;
