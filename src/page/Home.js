import React, { useRef } from "react";
import { useSelector } from "react-redux";
import CardFeature from "../components/CardFeature";
import HomeCard from "../components/HomeCard";
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProduct from "../components/AllProduct";
import Carthome from "./Carthome";


const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(1, 5);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetable",
    []
  );
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };
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