import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useSelector } from 'react-redux';

// Custom marker component
const CustomMarker = ({ position, icon }) => {
  return <Marker position={position} icon={icon} />;
};

const Map = ({ restaurantLocation, deliveryLocation, deliveryPersonLocation }) => {
  const [directions, setDirections] = useState(null);
  const userData = useSelector((state) => state.user);


  useEffect(() => {
    if (restaurantLocation && deliveryLocation && userData.resId) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: restaurantLocation,
          destination: deliveryLocation,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`Error fetching directions ${result}`);
          }
        }
      );
    }
  }, [restaurantLocation, deliveryLocation]);

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '300px' }}
      zoom={10}
      center={restaurantLocation}
      options={{
        cursor: 'crosshair',
      }} >
        
      {restaurantLocation && (
        <CustomMarker
          position={restaurantLocation}
          icon={{
            url: 'https://www.pngall.com/wp-content/uploads/8/Restaurant-Logo-PNG-Free-Image.png',
            scaledSize: new window.google.maps.Size(50, 50),
          }}
        />
      )}
      
      {deliveryLocation && (
        <CustomMarker
          position={deliveryLocation}
          icon={{
            url: 'https://th.bing.com/th/id/OIP.ZCHVQMolgocE66TQdftn3wHaGA?rs=1&pid=ImgDetMain',
            scaledSize: new window.google.maps.Size(50, 50),
          }}
        />
      )}

      {deliveryPersonLocation && (
        <CustomMarker
          position={deliveryPersonLocation}
          icon={{
            url: 'https://zampabollos.com/wp-content/uploads/2020/10/x3-37779_transparent-delivery-png-delivery-boy-with-bike-png-1-860x860.png.pagespeed.ic_.9YBXeeJsCG.png',
            scaledSize: new window.google.maps.Size(50, 50),
          }}
        />
      )}

      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default Map;
