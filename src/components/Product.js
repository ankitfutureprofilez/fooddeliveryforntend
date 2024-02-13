import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCartItem, increaseQty } from "../redux/productSlide";
import LoadingPage from "../page/LoadingPage";
import productimage from "../assest/apple.jfif"
import NoData from "./NoData";

const CardFeature = ({ image, name, price, category, loading, id, description ,imagedata }) => {
  const dispatch = useDispatch()

  const handleAddCartProduct = (e) => {
    dispatch(addCartItem({
      _id: id,
      name: name,
      price: price,
      category: category,
      image: image,
      imagedata: imagedata
    }))
  };

  const formatMultiPrice = (amount) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };
console.log("name",name)

  return (
    <>

      {loading ? (
        <LoadingPage/>
      ) : (
        <div className="w-6/12 md:w-4/12 lg:w-4/12 xl:w-3/12  px-3 mb-6">
          <div className="w-full bg-white product_box  py-3 px-3 cursor-pointer flex flex-col rounded-xl ">
            {name ? (
              <>
                <Link
                  to={"restaurants"}
                  onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
                >
                  <div className="flex flex-col justify-center items-center">
                    <img alt="image" src={image} className="rounded-xl w-full h-44 object-cover" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 capitalize text-base mt-3 mb-1 whitespace-nowrap overflow-hidden">
                    {name}
                  </h3>
                  <p className="text-gray-500 mb-1.5">{category}</p>
                </Link>
                <div className=" flex justify-between mt-3 " >
                  <div>
                    <p className="text-orange-500 text-sm font-bold align-middle">
                      <span className="flex"> {description}</span>
                      <span>{formatMultiPrice(price)}</span>
                    </p>
                    <p className="text-green-500 " >Free Delivery</p>
                  </div>
                  <button
                    className="button bg-blue sm"
                    onClick={handleAddCartProduct}>+</button>
                </div>
              </>
            ) : (
             <NoData/>
            )}
          </div>
        </div>
      )}

    </>

  );
};

export default CardFeature;
