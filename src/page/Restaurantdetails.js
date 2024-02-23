import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import UserProduct from "./UserProduct";
import { FaLocationCrosshairs, FaRegClock } from "react-icons/fa6";
import { FaRegDotCircle } from "react-icons/fa";
import useTimeCalculate from "../hooks/useTimeCalculate";
import LoadingPage from "./LoadingPage";
import Listings from "../Api/Listings";
import { MdLocationPin } from "react-icons/md";
export default function Restaurantdetails() {
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const main = new Listings();

      const response = await main.resturantget();
      setRecord(response.data.record);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [isOpen] = useTimeCalculate();

  let openStatus = "Closed";
  if (record && record.opening_from && record.opening_to) {
    openStatus = isOpen(record.opening_from, record.opening_to);
  }
  const userId = record && record.userId;

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <div className="w-full h-80 bg-cover bg-center mt-8 ">
            <div className="w-full mt-3 bg-cover bg-center rounded-xl overflow-hidden relative">
              <img
                className="w-full h-80 object-cover"
                src={record && record.image || 'https://www.privatediningrooms.co.uk/wp-content/uploads/2016/06/Hakkasan-Mayfair-Private-Dining-Room-Image2-1.jpg'}
                alt={record && record.index}
              />
              <span className={`${openStatus == 'Open' ? 'bg-green-600 ' : 'bg-red-600 '} uppercase absolute top-0 left-0 text-white py-1 pt-2 px-3 m-4 rounded-lg`}>
                Currently {openStatus}
              </span>
            </div>
          </div>

          <div className="flex  pt-3 flex-wrap justify-between product-details flex ">
            <div className="">
              <div className="flex flex-col justify-center h-full md:pt-4 pt-3 pe-4 ">
                <h1 className="text-3xl font-semibold text-gray-800 mb-2">
                  {record && record.restaurantname}
                </h1>
                <div className="flex flex-wrap items-center">
                  <MdLocationPin size={25} className="pb-3" />
                  <p className="pb-3 text-lg">{record && record.location}</p>
                </div>

              </div>
            </div>
            <div className="">
              <div className="flex flex-col justify-center h-full ">
                <div className="flex items-center mb-4">
                  {record && record.category === "veg" ? (
                    <>
                      <FaRegDotCircle
                        color="Green"
                        size={15}
                        className="mr-2"
                      />
                      <p className="text-sm text-gray-600">
                        Vegetarian Food Available
                      </p>
                    </>
                  ) : record && record.category === "nonveg" ? (
                    <>
                      <FaRegDotCircle
                        color="#ff0000"
                        size={15}
                        className="mr-2"
                      />
                      <p className="text-sm text-gray-600">
                        Non Vegetarian Food Available
                      </p>
                    </>
                  ) : record && record.category === "both" ? (
                    <p className="text-sm text-gray-600">
                      Both veg and non-veg Food Available
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center mb-4">
                  <p className="text-lg text-gray-600 flex ">
                    <FaRegClock size={20} className="mr-2 mt-0.5" /> Timing:{" "}
                    {record && record.opening_from} -{" "}
                    {record && record.opening_to}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xl text-gray-700 mb-4 ">{record && record.description}</p>
          <div className="flex mt-3 rest-actions" >
            <NavLink to={"/restaurant-register"}
              className="whitespace-nowrap cursor-pointer me-4 bg-blue-500 px-4 py-3 uppercase text-white  rounded-md text-gray-800 hover:bg-blue-300 transition duration-300" >
              Edit My Restaurant
            </NavLink>
            <NavLink to={"/newproduct"}
              className="whitespace-nowrap cursor-pointer me-4 bg-blue-500 px-4 py-3 uppercase text-white  rounded-md text-gray-800 hover:bg-blue-300 transition duration-300" >
              Add New Product
            </NavLink>
          </div>
        </>
      )}
    </>
  );
}