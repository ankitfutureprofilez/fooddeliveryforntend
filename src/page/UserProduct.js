import React, { useEffect, useState } from 'react'
import Listings from '../Api/Listings';
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

  console.log("record", record)
  useEffect(() => {
    fetchproduct();
  }, [userId]);
  return (
    <>
      <div></div>
      {loading ? (
        <div className="w-14 h-14 relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-solid border-blue-600 border-opacity-25 rounded-full animate-spin"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-solid border-blue-600 rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-2 md:p-4 pt-6 md:pt-10">
          <h1 className="text-3xl font-bold mb-6">Product List</h1>
          <div className="flex flex-wrap justify-between mx-4">
            {record && record.map((item, index) => (
              <div className="w-full md:w-1/3 bg-white product_box py-3 px-3 cursor-pointer m-1 flex flex-col rounded-xl" key={index}>
                <div className="flex flex-col justify-center items-center">
                  <img alt="image" src={item.permalink} className="rounded-xl w-full h-44 object-cover" />
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
            ))}
          </div>
        </div>
      )}
    </>
  );
}
