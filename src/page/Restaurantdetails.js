import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Listings from "../Api/Listings";
import UserProduct from "./UserProduct";
import restaurantImg from "../assest/Socorrco.jpg";
import { FaLocationCrosshairs, FaRegClock } from "react-icons/fa6";
import { FaRegDotCircle } from "react-icons/fa";

export default function Restaurantdetails() {
  const { resId } = useParams();
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const main = new Listings();
      const response = await main.resturantdetilas(resId);
      setRecord(response.data.record[0]);
      setLoading(false);
     
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };
  


  useEffect(() => {
    fetchData();
  }, []);
  function convert12to24(timeString) {
    if (timeString.length !== 6) {
      return null; // Or handle the error appropriately
    }
    // Separate the time string into hours, minutes, and period
    const hours = parseInt(timeString.substring(0, 2));
    const period = timeString.substring(2).toUpperCase();

    // Convert "12 AM" to "00" and "12 PM" to "12"
    const hours24 =
      period === "AM"
        ? hours === 12
          ? 0
          : hours
        : hours === 12
        ? 12
        : hours + 12;

    // Return the time in 24-hour format
    return hours24;
  }

  function isOpen(openingTime, closingTime) {
    console.log("Opening Time",openingTime);
    console.log("Closing Time",closingTime)
    let date = new Date();
    let currentHour = date.getHours();
    let openingHour = convert12to24(openingTime);
    let closingHour = convert12to24(closingTime);
    if (openingHour === null || closingHour === null) {
      return null;
    }
    if (openingHour <= currentHour && currentHour < closingHour) {
      return true;
    } else if (closingHour < openingHour && openingHour <= currentHour) {
      return true;
    } else return false;
  }

  const userId = record.userId;

  return (
    <>
      <div className="flex flex-col md:flex-row mt-8">
        <div className="w-full md:w-5/12 md:pr-4 lg:pr-8">
          <div className="bg-white rounded-lg overflow-hidden cursor-pointer">
            <img
              src={restaurantImg}
              alt={record.index}
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="w-full md:w-7/12 mt-4 md:mt-0">
          <div className="flex flex-col justify-center h-full">
            <h1 className=" text-3xl font-semibold text-gray-800 mb-8">
              {record.restaurantname}
            </h1>
            <div className="flex items-center mb-4">
              {record.category === "veg" ? (
                <>
                  <FaRegDotCircle color="Green" size={15} className="mr-2" />
                  <p className="text-sm text-gray-600">
                    Vegetarian Food Available
                  </p>
                </>
              ) : record.category === "non-veg" ? (
                <>
                  <FaRegDotCircle color="#ff0000" size={15} className="mr-2" />
                  <p className="text-sm text-gray-600">
                    Non Vegetarian Food Available
                  </p>
                </>
              ) : record.category === "both" ? (
                <p className="text-sm text-gray-600 ml-6">
                  Both veg and non-veg Food Available
                </p>
              ) : null}
            </div>

            {/* <div className="flex flex-wrap items-center mb-4"> */}
            <div className="flex items-center mb-4 mr-4">
              <FaLocationCrosshairs size={22} className="mr-3" />
              <p className="text-sm text-gray-600">{record.location}</p>
            </div>
            <div className="flex items-center mb-4">
              <FaRegClock size={15} className="mr-2" />
              <p className="text-sm text-gray-600 ">
                Timing: {record.opening_from} - {record.opening_to}
              </p>
            </div>
            {/* </div> */}
            <p className="text-sm text-gray-700 mb-4 ml-6">
              {record.description}
             </p>
            {/* {isOpen(record.opening_from, record.opening_to) === true ? (
              <p className="text-sm text-gray-700 mb-4 ml-6">open hai</p>
            ) : isOpen(record.opening_from, record.opening_to) === null ? (
              <p className="text-sm text-gray-700 mb-4 ml-6">Null</p>
            ) : (
              <p className="text-sm text-gray-700 mb-4 ml-6">Null</p>
            )}  */}
          </div>
          
        </div>
      </div>

      <UserProduct userId={userId} />
    </>
  );
}
