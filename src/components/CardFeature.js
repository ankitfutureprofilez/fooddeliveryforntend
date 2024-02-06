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
    <div className="w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12 px-4 mb-4">
    <div className="w-full bg-white product_shadow py-5 px-4 cursor-pointer flex flex-col rounded-xl ">
      {image ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="h-28 flex flex-col justify-center items-center">
              <img src={image} className="h-full" />
            </div>
            <h3 className="font-semibold text-slate-600  capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
              {name}
            </h3>
            <p className=" text-slate-500  font-medium">{category}</p>
            <p className=" font-bold">
              <span className="text-red-500">₹</span>
              <span>{price}</span>
            </p>
          </Link>
          <button
            className="bg-orange-500 py-1 mt-2 rounded hover:bg-orange-600 w-full"
            onClick={handleAddCartProduct}
          >
            Add Cart
          </button>
        </>
      ) : (
        <div className="min-h-[150px] flex justify-center items-center">
          <p>{loading}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default CardFeature;
