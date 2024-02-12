import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { LuMapPin } from "react-icons/lu";
import Listings from "../Api/Listings";
import { FaUserGroup } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { IoTime } from "react-icons/io5";

export default function RestaurantInfo() {

  const [record, setRecord] = useState([])
  const [loading ,setLoading] =useState(true)
  
  const fetchData = async () => {
    try {
        const main = new Listings();
        const response = await main.resturantget();
        setRecord(response.data.list);
        setLoading(false);
    } catch (error) {
        console.log("error", error);
        setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []); console.log("ddd",record)
  return (
    <>
      <div className="bg-white p-2 md:p-4 pt-6 md:pt-10">
        <div className="flex flex-wrap pt-10 -mx-3">
          {record && record?.map((item, index) => (
            <Link key={index} to={`/restaurants/${item.resId}`} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/5 px-3 mb-6">
              <div className="w-full bg-white product_box py-3 px-3 cursor-pointer flex flex-col rounded-xl">
                <div className="flex flex-col justify-center items-center">
                  <img alt="image" src={item.banner_image} className="rounded-xl w-full h-44 object-cover" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 capitalize text-base mt-2 mb-1 whitespace-nowrap overflow-hidden">
                  {item.restaurantname}
                </h3>
                <p className="text-gray-600 mb-2">{item.category}</p>
                <p className="text-gray-500 text-sm align-middle mb-1 relative ">
                  <span> {item.description}</span >
                </p>
                <div className="mt-1">
                    <p className="text-gray-400 text-sm align-middle mb-1 relative pl-5">
                      <span><LuMapPin className="inline text-gray-400 absolute left-0 top-0.5" size={16} /> {item.location}</span></p>
                    <p className="text-gray-400 whitespace-nowrap  text-sm align-middle mb-1 relative pl-5">  <span> <FaUserAlt className="inline text-gray-400 absolute left-0 top-0.5" size={13} /> {item.ownername}</span> </p>

                    <div className="flex flex-warp space-x-2 mb-1">

                      <p className="text-gray-400 text-sm align-middle mb-1 relative pl-5"><span> <FaUserGroup className="inline text-gray-400 absolute left-0 top-0.5" size={16} /> {item.staff}</span>  </p>                   
                      <p className="text-gray-400 text-sm align-middle mb-1 relative pl-5">  <span> <IoTime  className="inline text-gray-400 absolute left-0 top-0.5" size={16} /> {item.opening_from} - {item.opening_to}</span>
                      </p>
                    </div>
                     <p className="text-green-500">Free Delivery</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}