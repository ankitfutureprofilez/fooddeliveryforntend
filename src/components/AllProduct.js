import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Product from "./Product";
import FilterProduct from "./FilterProduct";
import foodImg from "../assest/Food-image.jpg";
import NoData from "./NoData";


const AllProduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [
    "All",
    ...new Set(productData.map((el) => el.category)),
  ]; // Adding "All" category

  // filter data display
  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    setFilterBy(category);
    if (category === "All") {
      setDataFilter(productData); // Show all elements
    } else {
      const filter = productData.filter(
        (el) => el.category.toLowerCase() === category.toLowerCase()
      );
      setDataFilter(filter);
    }
  };

  const loadingArrayFeature = new Array(10).fill(null);

  return (
    <div className="mb-6 block">
      <h1 className="heading ">
        <strong>Menu</strong> Category
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
      <h2 className="heading">
        <strong>Near</strong> You
      </h2>
      <div className="flex flex-wrap -mx-3 py-4">
        {dataFilter[0] ? (
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
      <div className="flex flex-wrap -mx-3 py-4">
        <div className="w-2/4 pr-3.5 ">
          <div className=" px-10 py-14 dis-bg bg-cover bg-no-repeat bg-center rounded-xl h-96">
              <h2 className="text-5xl font-normal text-gray-100 uppercase mb-3.5 poppins-regular">Get <strong className="font-bold">50%</strong> <br></br>Discount </h2>
              <h3 className="text-base poppins-regular text-base text-gray-100 bg-blue-tran py-3 rounded-full px-5 inline-block">Use Coupon Code : 2Jk5T45  </h3>
          </div>
        </div>
        <div className="pl-3.5 w-2/4">
          <div className=" px-10 py-14 off-bg bg-cover bg-no-repeat bg-center rounded-xl h-96">
              <h2 className="text-5xl font-normal text-gray-100 uppercase mb-3.5 poppins-regular">Special Food <strong className="font-bold">Food</strong><br></br> offer</h2>
              <p className="text-gray-100 text-lg poppins-regular">Try our Latest main <br></br>Course at <strong className="font-bold">40%</strong> Discount </p>
          </div>
        </div>
      </div>
      
    </div>
    
  );
};
export default AllProduct;