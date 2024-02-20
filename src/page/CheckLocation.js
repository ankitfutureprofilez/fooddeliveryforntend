import React, { useEffect, useState } from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function CheckLocation() {
  const [address, setAddress] = useState("");

  const handleChangeLocation = async (e) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      newAddress
    )}&key=${apiKey}`;
  
    try {
      const response = await axios.get(apiUrl);
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      const data = response.data;
      console.log(data);
      // Extract latitude and longitude from the API response
      const location = data.results[0].geometry.location;
      const latitude = location.lat;
      const longitude = location.lng;
  
      // Use the latitude and longitude
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };
  
  
  return (
    <div className=" px-3 pt-32 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Location
      </label>
      <div className="relative">
        <input
          required
          type="text"
          className="form-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="address"
          onChange={handleChangeLocation}
          value={address}
        />

        <div className="absolute top-3 right-2.5">
          <button type="button">
            <FaLocationCrosshairs
              size={24}
              color="#0000ff"
              //   onClick={handleGetLocation}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
