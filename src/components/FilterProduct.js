import React from "react";
import { CiForkAndKnife } from "react-icons/ci";
import { MdGrid3X3 } from "react-icons/md";
import { CiIceCream } from "react-icons/ci";
import { BiDish } from "react-icons/bi";
import { LuDonut } from "react-icons/lu";
import { MdOutlineIcecream } from "react-icons/md";
import { GiBowString } from "react-icons/gi";
import { GiFullPizza } from "react-icons/gi";

const FilterProduct = ({category,onClick,isActive}) => {
//Selecting icon
  let iconComponent;
  if (category === "all") {
    iconComponent = "all";
  } else if (category === "Sweet") {
    iconComponent = "Sweet";
  } else if (category === "vegetable") {
    iconComponent = "all";
  } else if (category === "icecream") {
    iconComponent = "all";
  } else {
    iconComponent = "all";
  }

  return (
    <div className=" " onClick={onClick}>
     <div className={` category-fiter-box px-5 py-2.5 relative cursor-pointer  ${isActive ? " text-red" : " active"}`}>
      
          <h3 className="font-bold text-md capitalize currentColor  relative z-10 text-center">{category}</h3>
      </div>
     
    </div>
  );
};

export default FilterProduct;