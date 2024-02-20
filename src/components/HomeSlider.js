import React, { useEffect, useState } from "react";
import Product from "./Product";
import Listings from "../Api/Listings";
import { formatMultiPrice } from "../hooks/Valuedata";

export default function HomeSlider() {
  const [newData, setNewData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const main = new Listings();
    const response = main.newproduct();
    response
      .then((res) => {
        console.log("res", res.data.data);
        setNewData(res?.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="newly-added-sec">
      <div className="container mx-auto">
        <h2>Newly Added</h2>
        <div className="flex overflow-x-auto">
          {newData.map((item) => (
            <div key={item.id} className="w-full bg-white product_box py-3 px-3 cursor-pointer flex flex-col rounded-xl mr-4">
              <div className="flex justify-center items-center">
                <img
                  alt="image"
                  src={item.image}
                  className="rounded-xl w-full h-44 object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 capitalize text-base mt-3 mb-1 whitespace-nowrap overflow-hidden">
                  {item.name}
                </h3>
                <div className="flex justify-between mt-3">
                  <div>
                    <p className="text-orange-500 text-sm font-bold align-middle">
                      <span>{formatMultiPrice(item.price)}</span>
                    </p>
                    <p className="text-green-500">Free Delivery</p>
                  </div>
                  <button className="button bg-blue sm">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
