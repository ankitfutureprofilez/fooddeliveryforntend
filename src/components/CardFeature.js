import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCartItem,increaseQty } from "../redux/productSlide";

const CardFeature = ({ image, name, price, category, loading, id }) => {
  const dispatch = useDispatch()

  const handleAddCartProduct = (e) => {
    dispatch(addCartItem({
      _id : id,
      name : name,
      price : price,
      category : category,
      image : image
    }))
  };

  return (
    <div className="w-6/12 md:w-4/12 lg:w-4/12 xl:w-3/12 px-3 mb-6">
    <div className="w-full bg-white product_shadow py-3 px-3 cursor-pointer flex flex-col rounded-xl ">
      {name ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="flex flex-col justify-center items-center">
              <img  src={image} className="rounded-xl w-full h-44 object-cover" />
            </div>
            <h3 className="font-bold text-gray-900 capitalize text-base mt-3 mb-1 whitespace-nowrap overflow-hidden">
              {name}
            </h3>
            <p className="text-gray-500 mb-1.5">{category}</p>
            <p className="text-orange-500 mb-3 text-sm font-bold">
              <span className="">₹</span>
              <span>{price}</span>
            </p>
          </Link>
          <button
            className="text-white text-base bg-orange-500 hover:bg-orange-600 tracking-wide-md font-medium px-6 py-2 lg:px-8 lg:py-2 rounded-md outline-none focus:outline-none bg-yellow ease-linear transition-all duration-150"
            onClick={handleAddCartProduct}
          >
            Add Cart
          </button>
        </>
      ) : (
        // <div className="min-h-[150px] flex justify-center items-center">
        //   <p>{loading}</p>
        // </div>
        <p>{loading}</p>
      )}
    </div>
    </div>
  );
};

export default CardFeature;
