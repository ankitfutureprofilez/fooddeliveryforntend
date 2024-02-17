import React, { useEffect, useState } from 'react'
import LoadingPage from '../page/LoadingPage';
import Listings from '../Api/Listings';
import { useDispatch, useSelector } from "react-redux";
import NoData from '../components/NoData';
import {formatMultiPrice} from "../hooks/Valuedata"

export default function ProductAll() {
  const [record, setRecord] = useState([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const main = new Listings();
    const response = main.productlist();
    response.then((res) => {
      console.log("res?.data", res?.data)
      setRecord(res?.data?.data);
      setLoading(false)
    }).catch((error) => {
      console.log("error", error)
      setLoading(false)
    })
  }, [])
  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="p-2 md:p-4 ">
          <h1 className="text-3xl font-bold mb-6">Product List</h1>
          {record?.length === 0 ? (
            <div className="w-full flex items-center justify-center ">
              <NoData />
            </div>
          ) : (
            <div className="flex flex-wrap mx-4">
              {record && record.map((item, index) => (
                <div className="w-full md:w-1/3 px-4 mb-4 " key={index}>
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
                        <p className="text-gray-400 text-sm mt-1 mb-1 relative">
                          <span>{formatMultiPrice(item.price)}</span>
                        </p>
                        <p className="text-green-500">Free Delivery</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>)}

        </div>
      )}
    </>
  )
}