import React, { useEffect, useState } from "react";
import Listings from "../Api/Listings";
import { useParams } from "react-router-dom";
import UserProduct from "./UserProduct";
import { FaLocationCrosshairs, FaRegClock } from "react-icons/fa6";
import { FaRegDotCircle } from "react-icons/fa";
import useTimeCalculate from "../hooks/useTimeCalculate";
import LoadingPage from "./LoadingPage";

export default function Restaurantdetails() {
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const main = new Listings();
      const response = await main.resturantget();
      console.log("rsponse", response);
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

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div>
          {/* Image covering the entire width of the screen */}
          <div className="w-full mt-3 bg-cover bg-center relative">
            <div className="w-full h-80 bg-cover bg-center">
              <img
                className="w-full h-80 object-cover"
                src={record && record.image}
                alt={record && record.index}
              />
              <span className="absolute top-0 right-0 bg-red-600 text-white py-1 px-3 m-4 rounded-lg">
                {openStatus}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap justify-between product-details flex ">
            <div className="w-full md:w-1/3 ">
              <div className="flex flex-col justify-center h-full md:pt-4 pt-3 ">
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                  {record && record.restaurantname}
                </h1>
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


                <p className="text-sm text-gray-700 mb-4 ">
                  {record && record.description}
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 md:pt-4 pt-3">
              <div className="flex flex-col justify-center h-full ">
                <div className="flex items-center mb-4 mr-4">
                  <p className="text-sm text-gray-600 flex">
                    <FaLocationCrosshairs size={22} className="mr-2" />{" "}
                    {record && record.location}
                  </p>
                </div>
                <div className="flex items-center mb-4">
                  <p className="text-sm text-gray-600 flex ">
                    <FaRegClock size={15} className="mr-2 mt-0.5" /> Timing:{" "}
                    {record && record.opening_from} -{" "}
                    {record && record.opening_to}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
