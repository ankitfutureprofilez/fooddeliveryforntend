import React, { useEffect, useState } from 'react'
import LoadingPage from '../page/LoadingPage';
import Listings from '../Api/Listings';
import { setDataProduct } from "../redux/productSlide";
import { useDispatch, useSelector } from "react-redux";
import NoData from '../components/NoData';

export default function ProductAll() {
    const dispatch = useDispatch()
    const productData = useSelector((state)=>state.product)
    const [record, setRecord] = useState([])
  const [loading, setLoading] = useState(true);
    const fetchData =  () => {
        const main = new Listings();
        const response =  main.productlist();
        response.then((res)=>{
          setRecord(res.data.data);
        dispatch(setDataProduct(res?.data));
          setLoading(false);
        }).catch((error)=>{
          console.log("error", error);
          setLoading(false);
        })
    }
    useEffect(() => {
        fetchData();
      }, []);  
  return (
    <>
    {loading ? (
     <LoadingPage/>
    ) : (
      <div className="bg-white p-2 md:p-4 pt-6 md:pt-10">
        <h1 className="text-3xl font-bold mb-6">Product List</h1>
        {record?.length === 0 ? (
             <div className="w-full flex items-center justify-center ">
              <NoData/>
              </div>
          ): (
          <div className="flex flex-wrap justify-between -mx-4">
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
                      <p className="text-gray-400 text-sm align-middle mb-1 relative pl-4">
                        <span>{item.price}</span>
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
