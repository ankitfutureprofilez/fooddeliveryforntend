import React from "react";
import { useSelector } from "react-redux";
import AllProduct from "../components/AllProduct";


const Home = () => {
  const cartItemNumber = useSelector((state)=>state.product.cartItem);
  return (
        <div className="w-full">
          <div className="p-2 md:p-4 pt-6 md:pt-10 ">
            <AllProduct heading={"Your Product"} />
          </div>
        </div>
  );
};

export default Home; 