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
    // <div className="bg-white p-2 md:p-4 pt-6 md:pt-10 ">     
    //   <AllProduct heading={"Your Product"}/>
    // </div>

  );
};

export default Home;