import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';

export default function RestaurantInfo() {
  
  const [record, setRecord] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/restaurant/get`, {
          headers: {
            'Content-Type': 'application/json',
          },
          mode: "cors",
        });
        const resData = await res.json();
        setRecord(resData?.list);
        console.log("resData", resData)
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex flex-wrap">
    {record && record.map((item, index) => (
      <Link key={index} to={`/restaurants/${item.resId}`} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-3 mb-6">
        <div className="w-full bg-white product_box py-3 px-3 cursor-pointer flex flex-col rounded-xl">
          <div className="flex flex-col justify-center items-center">
            <img alt="image" src={item.image} className="rounded-xl w-full h-44 object-cover" />
          </div>
          <h3 className="font-bold text-lg text-gray-900 capitalize text-base mt-3 mb-1 whitespace-nowrap overflow-hidden">
            {item.O_name}
          </h3>
          <p className="text-gray-500 mb-1.5">{item.category}</p>
          <div className="flex justify-between mt-3">
            <div>
              <p className="text-orange-500 text-sm font-bold align-middle">
                <span>{item.description}</span>
                <span>{item.location}</span>
                <span>{item.staff}</span>
              </p>
              <p className="text-green-500">Free Delivery</p>
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
  

  );
}
