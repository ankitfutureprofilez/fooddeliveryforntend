import React, { useRef } from "react";
import { useSelector } from "react-redux";
import CardFeature from "../components/CardFeature";
import HomeCard from "../components/HomeCard";
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProduct from "../components/AllProduct";
import Carthome from "./Carthome";


const Home = () => {
  const cartItemNumber = useSelector((state)=>state.product.cartItem)
  return (

    <div className="w-full px-4 md:px-8 py-6 z-50 bg-white">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-8/12">
            <div className="bg-white p-2 md:p-4 pt-6 md:pt-4 ">
              <AllProduct heading={"Your Product"} />
            </div>
          </div>
          <div className="w-full lg:w-4/12">
              <Carthome/>
          </div>
        </div>
      </div>     
    </div>
  );
};

export default Home;