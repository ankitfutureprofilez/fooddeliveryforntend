import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Listings from '../Api/Listings';
import UserProduct from  "./UserProduct"
export default function Restaurantdetails() {
  
  const [record, setRecord] = useState([])

const[loading ,setLoading] =useState(true);

  const fetchData = async () => {
    try {
        const main = new Listings();
        const response = await main.resturantdetilas();
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

  const userId =record.userId;
  return (
    <>
      <div className='bg-white p-2 md:p-4 pt-6 md:pt-10'>
        <div class="flex flex-row ">
          <div className='w-full md:w-6/12 '>
            <div className=' bg-white product_box  py-3 px-3 cursor-pointer'>
               <img src={record.banner_image} alt={record.index} />
            </div>
          </div>
          <div className='w-full md:w-6/12 '>
            <div class="flex flex-nowrap">
              <div>
                <h1>{record.restaurantname}</h1>
                <p>{record.category}</p>
                <p>{record.description}</p>
                <p>{record.location}</p>
                <p>Timing :- {record.opening_to} {record.opening_from} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserProduct userId ={userId}/>
    </>
  )
}
