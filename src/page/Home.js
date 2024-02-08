import React, { useRef } from "react";
import { useSelector } from "react-redux";
import CardFeature from "../components/Product";
import HomeCard from "../components/HomeCard";
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProduct from "../components/AllProduct";
import Carthome from "./Carthome";


const Home = () => {
  const cartItemNumber = useSelector((state)=>state.product.cartItem)
  return (
    <div className="flex">
      {cartItemNumber.length > 0 ? (
        <>
          <div className="w-2/3">
            <div className="bg-white p-2 md:p-4 pt-6 md:pt-10 ">
              <AllProduct heading={"Your Product"} />
            </div>
          </div>
          <div className="w-1/3">
            <Carthome/>
          </div>
        </>
      ) : (
        <div className="w-full">
          <div className="bg-white p-2 md:p-4 pt-6 md:pt-10 ">
            <AllProduct heading={"Your Product"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;