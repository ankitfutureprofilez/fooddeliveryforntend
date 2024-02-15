import React, { useEffect, useState } from 'react'
import Listings from '../Api/Listings';
import LoadingPage from './LoadingPage';
import productimage from "../assest/apple.jfif"
import { formatMultiPrice } from './../components/Valuedata';

export default function UserProduct({ userId }) {
  const [record, setRecord] = useState([])
  const [loading, setLoading] = useState(true);
  const fetchproduct = async () => {
    try {
      const main = new Listings();
      const response = await main.userproductget(userId);
      setRecord(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchproduct();
  }, [userId]);
  return (
    <>
      {loading ? (
       <LoadingPage/>
      ) : (
        <div className="bg-white p-4 md:p-8 pt-6 md:pt-10">
          <h1 className="text-3xl font-bold mb-6">Product List</h1>
          <div className="flex flex-wrap -mx-4">
            {record && record.map((item, index) => (
              <div className="w-full md:w-1/4 px-4 mb-4 " key={index}>
                <div className='bg-white product_box py-3 px-3 cursor-pointer flex flex-col rounded-xl'>
                    <div className="flex flex-col justify-center items-center">
                      <img alt="image" src={item.image} className="rounded-xl w-full h-44 object-cover" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 capitalize text-base mt-2 mb-1 whitespace-nowrap overflow-hidden">
                      {item.name}
                    </h3>
                    <p className="text-gray-600">{item.category}</p>
                    <div className="flex justify-between mt-1">
                      <div>
                        <span>{item.description}</span>
                        <p className="text-orange-500 text-sm font-bold align-middle">
                          <span> ₹ {item.price}</span>
                        </p>
                        <p className="text-green-500">Free Delivery</p>
                      </div>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
