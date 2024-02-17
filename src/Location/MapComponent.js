import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const MapComponent = () => {
  const [currentLocation, setCurrentLocation] = useState({lat: 0, lng: 0});

  const defaultProps = {
    center: {
      lat: 26.9124, // Jaipur ka approximate center
      lng: 75.7873
    },
    zoom: 11
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setCurrentLocation({lat: position.coords.latitude, lng: position.coords.longitude});
    });
  }, []);

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'abc123' }}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
    >
      
      <AnyReactComponent
        lat={26.922070} 
        lng={75.778885} 
        text="Start (Restaurant)"
      />
      <AnyReactComponent
        lat={26.913729} 
        lng={75.787384} 
        text="End (Delivery Address)"
      />
      <AnyReactComponent
        lat={currentLocation.lat}
        lng={currentLocation.lng}
        text="Current Location"
      />
    </GoogleMapReact>
  );
};

export default MapComponent;
