import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Listings from "../Api/Listings";
import UserProduct from "./UserProduct";
import restaurantImg from "../assest/Socorrco.jpg";
import { FaLocationCrosshairs, FaRegClock } from "react-icons/fa6";
import { FaRegDotCircle } from "react-icons/fa";
import useTimeCalculate from "../hooks/useTimeCalculate";

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

  const [isOpen] = useTimeCalculate();

  const userId = record.userId;

  return (
    <>
      {/* {loading ? () ? ()} */}
      <div className="flex flex-col md:flex-row mt-8">
        <div className="w-full md:w-5/12 md:pr-4 lg:pr-8">
          <div className="bg-white rounded-lg overflow-hidden cursor-pointer">
            <img
              src={record.image}
              alt={record.index}
              className="w-full h-auto"
            />
            {isOpen(record.opening_from, record.opening_to) === "Closed" && (
              <div className="warning absolute">Closed</div>
            )}
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
              ) : record.category === "nonveg" ? (
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
          </div>
        </div>
      </div>

      <UserProduct userId={userId} />
    </>
  );
}
