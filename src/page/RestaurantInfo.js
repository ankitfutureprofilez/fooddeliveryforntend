import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaUserGroup } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import Listings from "../Api/Listings";
import LoadingPage from "./LoadingPage";
import NoData from "../components/NoData";
import restaurantImg from "../assest/Socorrco.jpg";
import { GrUserManager } from "react-icons/gr";
import { LuMapPin } from "react-icons/lu";
import useTimeCalculate from "../hooks/useTimeCalculate";
import { FaLocationCrosshairs, FaRegClock } from "react-icons/fa6";
import { FaRegDotCircle } from "react-icons/fa";

export default function RestaurantInfo() {
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(true);
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
  }, []);
  const [ isOpen ] = useTimeCalculate();

 return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="p-2 md:p-4 md:pt-10">
          <h2 className="heading">
            <strong>Restaurant </strong> For You
          </h2>

          <div className="flex flex-wrap pt-10 -mx-3">
            {record.length === 0 ? (
              <div className="w-full flex items-center justify-center ">
                <NoData />
              </div>
            ) : (
              record &&
              record.map((item, index) => (
                <Link
                  key={index}
                  to={`/restaurants/${item.resId}`}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/6 px-3 mb-6"
                >
                  <div className={`w-full bg-white product_box py-3 px-3 cursor-pointer flex flex-col rounded-xl `}>
                    <div className="flex flex-col justify-center items-center relative">
                      <img
                        alt="image"
                        src={item.image}
                        className={`rounded-xl w-full h-44 object-cover ${isOpen(item.opening_from, item.opening_to) === "Closed" ? 'closedRestaurant' : 'notclosed'}`}
                      />
                      {isOpen(item.opening_from, item.opening_to) === "Closed" && (
                        <div className="warning absolute">
                          Closed
                        </div>
                      )}
                    </div>
                    <div className={`${isOpen(item.opening_from, item.opening_to) === "Closed" ? 'closedRestaurant' : 'notclosed'}`}> 
                    <h3 className="font-bold text-lg text-gray-900 capitalize text-base mt-2 mb-1 whitespace-nowrap overflow-hidden">
                      {item.restaurantname}
                    </h3>
                   { item.category === "veg" ? (
                <div className="flex">
                  
                  <FaRegDotCircle color="Green" size={15} className="mr-2" />
                  <p className="text-gray-600">
                    Vegetarian Food Available
                  </p>
                </div>
              ) :item.category === "nonveg" ? (
                <div className="flex">
                  <FaRegDotCircle color="#ff0000" size={15} className="mr-2" />
                  <p className="text-gray-600">
                    Non Vegetarian Food Available
                  </p>
                </div>
                
              ) : item.category === "both" ? (
                <p className="text-gray-600">
                  Both veg and non-veg Food Available
                </p>


              ) : null}
                    {/* <p className="text-gray-600">{item.category}</p> */}
                    <div className="flex justify-between mt-1">
                      <div>
                        {/* <p className="text-gray-500 text-sm align-middle mb-1 relative ">
                          <span> {item.description}</span>
                        </p>
                        <p className="text-gray-400 text-sm align-middle mb-1 relative pl-5">
                          <span>
                            <LuMapPin
                              className="inline text-gray-400 absolute left-0 top-0.5"
                              size={16}
                            />{" "}
                            {item.location}
                          </span>
                        </p> */}
                        <div className="flex flex-warp space-x-2 mb-1">
                          <p className="text-gray-400 text-sm align-middle mb-1 relative pl-5">
                            <span>
                              {" "}
                              <FaUserGroup
                                className="inline text-gray-400 absolute left-0 top-0.5"
                                size={16}
                              />{" "}
                              {item.staff}
                              
                            </span>{" "}
                          </p>
                          <p className="text-gray-400 text-sm align-middle mb-1 relative pl-5">
                            {" "}
                            <span>
                              {" "}
                              <IoTime
                                className="inline text-gray-400 absolute left-0 top-0.5"
                                size={16}
                              />{" "}
                              {item.opening_from} - {item.opening_to}
                            </span>
                          </p>
                        </div>
                        <p className="text-green-500">Free Delivery</p>
                      </div>
                    </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}
