import React from "react";
import { useSelector } from "react-redux";
import AllProduct from "../components/AllProduct";
import Carthome from "./Carthome";


const Home = () => {
  const cartItemNumber = useSelector((state)=>state.product.cartItem);
  return (
    <div className="flex">
      {cartItemNumber.length > 0 ? (
        <>
          <div className="w-2/3">
            <div className="p-2 md:p-4 pt-6 md:pt-10 ">
              <AllProduct heading={"Your Product"} />
          
            </div>
          </div>
          <div className="w-1/3 fixed top-200 right-0 h-full overflow-x-auto">
            <Carthome/>
          </div>
        </>
      ) : (
        <div className="w-full">
          <div className="p-2 md:p-4 pt-6 md:pt-10 ">
            <AllProduct heading={"Your Product"} />
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;