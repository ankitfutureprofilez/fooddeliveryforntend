import React from "react";
import { CiForkAndKnife } from "react-icons/ci";
import { MdGrid3X3 } from "react-icons/md";
import { CiIceCream } from "react-icons/ci";
import { BiDish } from "react-icons/bi";
import { LuDonut } from "react-icons/lu";

const FilterProduct = ({category,onClick,isActive}) => {
//Selecting icon
  let iconComponent;
  if (category === "all") {
    iconComponent = <CiForkAndKnife size={24} />;
  } else if (category === "Sweet") {
    iconComponent = <LuDonut size={24} />;
  } else if (category === "vegetable") {
    iconComponent = <BiDish size={24} />;
  } else if (category === "icecream") {
    iconComponent = <CiIceCream size={24} />;
  } else {
    iconComponent = <CiForkAndKnife size={24} />;
  }

  return (
    <div className="py-2 " onClick={onClick}>
     <div className={`w-36 category-box px-8 pb-6 relative cursor-pointer before:absolute before:flex
      before:h-20 before:w-full before:bottom-0 before:left-0   
      before:rounded-t-xl before:rounded-b-[1.5rem] ${isActive ? "before:bg-blue-500 text-white" : " text-gray-600 before:bg-white"}`}>
      <div className={`bg-white w-12 h-12 mx-auto shadow-xl border rounded-xl flex items-center justify-center mb-3 
      relative z-10 ${isActive ? "text-blue-500" : " text-gray-600"}`}>
        {iconComponent}
          </div>
          <h3 className="font-bold text-md capitalize currentColor  relative z-10 text-center">{category}</h3>
      </div>
     
    </div>
  );
};

export default FilterProduct;