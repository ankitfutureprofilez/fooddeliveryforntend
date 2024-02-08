import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "./CardFeature";
import FilterProduct from "./FilterProduct";

const AllProduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = ["All", ...new Set(productData.map((el) => el.category))]; // Adding "All" category

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
      <h1 className="text-gray-700 mb-6 text-xl"><strong>Menu</strong> Category</h1>
      <div className="flex w-full flex-wrap space-x-2 md:space-x-4 mb-6">
        {categoryList.map((el) => {
          return (
            <FilterProduct
              category={el}
              key={el}
              isActive={el.toLowerCase() === filterby.toLowerCase() || (el === "All" && filterby === "")}
              onClick={() => handleFilterProduct(el)}
            />
          );
        })}
      </div>
      <h2 className="text-gray-700 mb-1 text-xl"><strong>Near</strong> You</h2>
      <div className="flex flex-wrap -mx-3 py-4">
        {dataFilter[0]
          ? dataFilter.map((el) => {
              return (
                <CardFeature
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                />
              );
            })
          : 
          (
            <CardFeature loading="Loading..." key={"allProduct"} />

          )}
            
    
    </div>
    </div>
  );
};

export default AllProduct;
