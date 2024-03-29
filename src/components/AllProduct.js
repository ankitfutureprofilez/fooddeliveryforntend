import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Product from "./Product";
import FilterProduct from "./FilterProduct";
import foodImg from "../assest/Food-image.jpg";
import NoData from "./NoData";
import { Link } from "react-router-dom";
import Heroplet from "../assest/hero-plet.png";
import Homehero from "./Homehero";
import HomeSlider from "./HomeSlider";
import { GiConsoleController } from "react-icons/gi";
import { setNewProduct } from "../redux/productSlide";


const AllProduct = ({ heading }) => {
  
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [
    "All",
    ...new Set(productData.map((el) => el.category)),
  ]
  // productData.reverse();
  console.log("Product Data",productData)
  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);
  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);


 

  const handleFilterProduct = (category) => {
    setFilterBy(category);
    if (category === "All") {
      setDataFilter(productData); 
    } else {
      const filter = productData.filter(
        (el) => el.category.toLowerCase() === category.toLowerCase()
      );
      setDataFilter(filter);
    }
  };
  const loadingArrayFeature = new Array(10).fill(null);

  return (
    <>
      <Homehero />
      <div id="menu" className="best-food-sec">
        <div className='container mx-auto'>
          <div className=" block">
            <h1 className="heading ">
              Newly Added
            </h1>
            <div className="flex flex-wrap -mx-3">
     <HomeSlider/>
            </div>
          </div>
        </div>
      </div>
      <div id="menu" className="best-food-sec">
        <div className='container mx-auto'>
          <div className=" block">
            <h1 className="heading ">
            MENU
            </h1>
            <div className="flex w-full flex-wrap space-x-2  mb-6">
              {categoryList.map((el) => {
                return (
                  <FilterProduct
                    category={el}
                    key={el}
                    isActive={
                      el.toLowerCase() === filterby.toLowerCase() ||
                      (el === "All" && filterby === "")
                    }
                    onClick={() => handleFilterProduct(el)}
                  />
                );
              })}
            </div>

            <div className="flex flex-wrap -mx-3">
              {dataFilter && dataFilter.length ? (
                dataFilter.map((el) => {
                  let img = el.image == null ? foodImg : el.image;
                  return (
                    <Product
                      key={el._id}
                      id={el._id}
                      image={img}
                      name={el.name}
                      category={el.category}
                      price={el.price}
                      description={el.description}
                    />
                  );
                })
              ) : (
                <Product loading="Loading..." key={"allProduct"} />
              )}

              
            </div>
            <div className="flex flex-wrap -mx-3 py-4 dis-offer">
              <div className="lg:w-2/4 w-full mb-4 lg:mb-0 px-3.5 ">
                <div className="p-8 xl:px-10 xl:py-14 dis-bg bg-cover bg-no-repeat bg-center rounded-xl h-56 lg:h-72 xl:h-96 discount-1">
                  <h2 className="lg:text-5xl text-4xl font-normal text-gray-100 uppercase mb-3.5 poppins-regular w-4/5 sm:w-3/5">Get <strong className="font-bold">50%</strong> Discount </h2>

                </div>
              </div>
              <div className="px-3.5 w-full lg:w-2/4">
                <div className="p-8 xl:px-10 xl:py-14 off-bg bg-cover bg-no-repeat bg-center rounded-xl h-56 lg:h-72 xl:h-96 discount-1">
                  <h2 className="lg:text-5xl text-4xl font-normal text-gray-100 uppercase mb-3.5 poppins-regular w-4/5 sm:w-4/5">Special Food <strong className="font-bold">Food</strong> offer</h2>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </>

  );
};
export default AllProduct;