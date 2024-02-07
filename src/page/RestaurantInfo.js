import React from "react";

export default function RestaurantInfo() {
  return (
    // Restaurant data starts here
    <div>
      <div>{restaurant.image}</div>
      <h1>{restaurant.name}</h1>
      <p>Ratings</p>
      <div>
        <p className="text-slate-600 font-medium">
          Description : {restaurant.description}
        </p>
        <p>{restaurant.location}</p>
        <p>{restaurant.timings}</p>
      </div>
      {/* Product Data starts Here */}
      <div className="w-full max-w-4xl m-auto md:flex bg-white">
        <div className="max-w-sm  overflow-hidden w-full p-5">
          <img
            src={productData?.image}
            className="hover:scale-105 transition-all h-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-slate-600  capitalize text-2xl md:text-4xl">
            {productData?.name}
          </h3>
          <p className=" text-slate-500  font-medium text-2xl">
            {productData?.category}
          </p>
          <p className=" font-bold md:text-2xl">
            <span className="text-red-500 ">₹</span>
            <span>{productData?.price}</span>
          </p>
        </div>
      </div>
      <AllProduct heading={"Related Product"} />
    </div>
  );
}
