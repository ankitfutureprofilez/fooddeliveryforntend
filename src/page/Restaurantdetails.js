import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Listings from "../Api/Listings";
import UserProduct from "./UserProduct";
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
      console.log("rsponse", response)
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

  const userId = record && record.userId;

  return (
    <>


      <div className='product-details bg-white p-4 md:p-8 pt-6 md:pt-10'>
        <div class="flex flex-row -mx-4">
          <div className='w-full md:w-5/12 px-4'>
            <div className=' bg-white product_box  py-3 px-3 cursor-pointer'>
               <img className='max-w-full min-h-[300px]' src={record && record.image} alt={record && record.index} />
            </div>
          </div>
          <div className="w-full md:w-7/12 mt-4 md:mt-0">
          <div className="flex flex-col justify-center h-full ps-5">
            <h1 className=" text-3xl font-semibold text-gray-800 mb-4">
              {record && record.restaurantname}
            </h1>
            <div className="flex items-center mb-4">
              {record && record.category === "veg" ? (
                <>
                  <FaRegDotCircle color="Green" size={15} className="mr-2" />
                  <p className="text-sm text-gray-600">
                    Vegetarian Food Available
                  </p>
                </>
              ) : record && record.category === "nonveg" ? (
                <>
                  <FaRegDotCircle color="#ff0000" size={15} className="mr-2" />
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

            {/* <div className="flex flex-wrap items-center mb-4"> */}
            <div className="flex items-center mb-4 mr-4">
              <p className="text-sm text-gray-600 flex"><FaLocationCrosshairs size={22} className="mr-2" /> {record && record.location}</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="text-sm text-gray-600 flex ">
              <FaRegClock size={15} className="mr-2" /> Timing: {record && record.opening_from} - {record && record.opening_to}
              </p>
            </div>
            {/* </div> */}
            <p className="text-sm text-gray-700 mb-4 ">
              {record && record.description}
            </p>
          </div>
        </div>
        </div> 
      </div>


     



      <UserProduct userId={userId} />
    </>
  );
}
