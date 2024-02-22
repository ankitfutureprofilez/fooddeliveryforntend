import React, { useState, useEffect } from 'react';
import Map from './Map';

const MapContainer = ({ restaurent_coordinates, order_coordinates, checkout_coordinates, status }) => {

  const [restaurantLocation, setRestaurantLocation] = useState({ lat: 26.9298469, lng: 75.7853946 });
  const [deliveryLocation, setDeliveryLocation] = useState({ lat: null, lng: null });
  const [deliveryPersonLocation, setDeliveryPersonLocation] = useState({ lat: null, lng: null });
  
  useEffect(() => {
    const rest_cord = restaurent_coordinates ? JSON.parse(restaurent_coordinates) : null;
    const order_cord  = order_coordinates ? JSON.parse(order_coordinates) : null;
    const checkout_cord  = checkout_coordinates ? JSON.parse(checkout_coordinates) : null;
    

    if (order_cord && order_cord.lat) {
      setDeliveryPersonLocation({
        lat: order_cord.lat, lng: order_cord.lng
      });
    }
    if (checkout_cord && checkout_cord.lat) {
      setDeliveryLocation({
        lat: checkout_cord.lat, lng: checkout_cord.lng
      });
    }
  }, [restaurent_coordinates, order_coordinates, checkout_coordinates]);

  // useEffect(() => {
  //   let interval = null;

  //   if (status === "picked") {
  //     interval = setInterval(() => {
  //       setDeliveryPersonLocation((currentLocation) => {
  //         const deltaLat = deliveryLocation.lat - currentLocation.lat;
  //         const deltaLng = deliveryLocation.lng - currentLocation.lng;
  //         const distance = Math.sqrt(deltaLat ** 2 + deltaLng ** 2);

  //         if (distance < 0.001) {
  //           clearInterval(interval);
  //           return deliveryLocation; 
  //         }

  //         const stepSize = distance * 0.55 ; 
  //         const stepLat = deltaLat / distance * stepSize;
  //         const stepLng = deltaLng / distance * stepSize;

  //         return {
  //           lat: currentLocation.lat + stepLat,
  //           lng: currentLocation.lng + stepLng,
  //         };
  //       });
  //     }, 1000); 
  //   } else if (status === "delivered") {
  //     clearInterval(interval);
  //     setDeliveryPersonLocation(deliveryLocation);
  //   }

  //   return () => {
  //     if (interval) clearInterval(interval);
  //   };
  // }, [status, deliveryLocation]);

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
