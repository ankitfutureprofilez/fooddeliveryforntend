import React, { useRef } from "react";
import { useSelector } from "react-redux";
import CardFeature from "../components/Product";
import HomeCard from "../components/HomeCard";
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProduct from "../components/AllProduct";

const Home = () => {
  const cartItemNumber = useSelector((state)=>state.product.cartItem)
  return (
        <div className="w-full">
          <div className=" ">
            <AllProduct heading={"Your Product"} />
          </div>
        </div>
  );
};

export default Home; 