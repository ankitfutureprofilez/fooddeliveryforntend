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


  const [ isOpen ] = useTimeCalculate();
  

  const userId = record.userId;

  return (
    <>
<<<<<<< HEAD
    {/* {loading ? () ? ()} */}
      <div className="flex flex-col md:flex-row mt-8">
        <div className="w-full md:w-5/12 md:pr-4 lg:pr-8">
          <div className="bg-white rounded-lg overflow-hidden cursor-pointer">
            <img
              src={record.image}
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
=======
      <div className='bg-white p-4 md:p-8 pt-6 md:pt-10'>
        <div class="flex flex-row -mx-4">
          <div className='w-full md:w-5/12 px-4'>
            <div className=' bg-white product_box  py-3 px-3 cursor-pointer'>
               <img className='max-w-full min-h-[300px]' src={record.banner_image || resturanentimage} alt={record.index} />
            </div>
          </div>
          <div className='w-full md:w-7/12 px-4 lg:pl-16 '>
            <div class="flex flex-nowrap">
              <div>
                <h1 className='font-bold text-2xl mb-2'>{record.restaurantname}</h1>
                <p className='font-lg font-semibold text-gray-500 mb-3'>{record.category}</p>
                <p className='font-base text-gray-500 mb-6'>{record.description}</p>
                <p className='text-gray-400 text-sm align-middle mb-5 relative pl-4'> <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="inline text-gray-400 absolute -left-1 top-0.5" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg> {record.location}</p>
                <p className='font-base text-gray-500 mb-6'><span className='font-bold'>Timing :-</span> {record.opening_to} {record.opening_from} </p>
              </div>
>>>>>>> 00c769cd54284dde5486843852453050899cbbf7
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
            {record.opening_from !== null && record.opening_to !== null ? (
                <p className="text-sm text-gray-700 mb-4 ml-6">{isOpen(record.opening_from, record.opening_to)}</p>
             ) : null} 
          </div>
        </div>
      </div>

      <UserProduct userId={userId} />
    </>
  );
}
