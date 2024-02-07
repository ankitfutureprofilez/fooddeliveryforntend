import React from "react";
import { CiForkAndKnife } from "react-icons/ci";
import { CiIceCream } from "react-icons/ci";
import { BiDish } from "react-icons/bi";

const FilterProduct = ({category,onClick,isActive}) => {
  return (
    
    <div className="py-2" onClick={onClick}>
     <div className={`px-8 pb-6 relative cursor-pointer before:absolute before:flex before:h-20 before:w-full before:bottom-0 before:left-0 before:shadow-md before:rounded-t-xl before:rounded-b-[2.5rem] ${isActive ? "before:bg-orange-500 text-white" : " text-gray-600 before:bg-white"}`}>
      <div className={`bg-white w-12 h-12 mx-auto shadow-lg rounded-xl flex items-center justify-center mb-3 relative z-10 ${isActive ? "text-orange-500" : " text-gray-600"}`}>
         
         {category === "sweet" ? (
          <CiForkAndKnife size={24} />
         ) : (
          <></>
         )}
          </div>
          <p className="font-base currentColor font-medium relative z-10">{category}</p>
      </div>
     
    </div>
  );
};

export default FilterProduct;
