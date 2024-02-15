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
      <div className='bg-white p-4 md:p-8 pt-6 md:pt-10'>
        <div class="flex flex-row -mx-4">
          <div className='w-full md:w-5/12 px-4'>
            <div className=' bg-white product_box  py-3 px-3 cursor-pointer'>
               <img className='max-w-full min-h-[300px]' src={record && record.image} alt={record && record.index} />
            </div>
          </div>
          <div className='w-full md:w-6/12 '>
            <div class="flex flex-nowrap">
              <div>
                <h1>{record && record.restaurantname}</h1>
                <p>{record && record.category}</p>
                <p>{record && record.description}</p>
                <p>{record && record.location}</p>
                <p>Timing :- {record && record.opening_to} {record && record.opening_from} </p>
              </div>
            </div>
            {/* </div> */}
            <p className="text-sm text-gray-700 mb-4 ml-6">
              {record && record.description}
            </p>
            {record && record.opening_from !== null && record && record.opening_to !== null ? (
                <p className="text-sm text-gray-700 mb-4 ml-6">{isOpen(record && record.opening_from, record && record.opening_to)}</p>
             ) : null} 
          </div>
        </div> 
      </div>

      <UserProduct userId={userId} />
    </>
  );
}
