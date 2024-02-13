import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Listings from '../Api/Listings';
import UserProduct from './UserProduct';
import resturanentimage from "../assest/Socorrco.jpg"

export default function Restaurantdetails() {
  const { resId } = useParams();
  console.log("resId", resId)
  const [record, setRecord] = useState([])
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
  
  const userId = record.userId;
  return (
    <>
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
            </div>
          </div>
        </div>
      </div>
      <UserProduct  userId = {userId}/>
    </>
  )
}
