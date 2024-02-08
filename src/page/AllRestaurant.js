import React, { useState, useEffect } from 'react';
import axios from 'axios';
import resImg from '../assest/Socorrco.jpg';
export default function AllRestaurant() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/restaurant/get")
      .then((response) => {
        setRestaurants(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className='p-2 text-center'>
      <h1 className="text-3xl font-bold mb-6">Trending Dining Restaurants</h1>
      <div className="flex flex-wrap justify-center">
        {
          restaurants.map((restaurant) => (
            <div key={restaurant._id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
              <div className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="h-56 overflow-hidden">
                  <img src={resImg} alt={restaurant.r_name} className="object-cover w-full h-full" />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{restaurant.r_name}</h3>
                  <p className="text-gray-700 mb-4">{restaurant.description}</p>
                  <p className="text-gray-900 font-bold">{restaurant.location}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
  
}
