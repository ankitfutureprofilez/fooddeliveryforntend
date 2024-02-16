import React from "react";
import { useDispatch } from "react-redux";
import { addCartItem } from "../redux/productSlide";
import LoadingPage from "../page/LoadingPage";
import NoData from "./NoData";
import { formatMultiPrice } from '../hooks/Valuedata';

const CardFeature = ({ image, name, price, category, loading, id, description, imagedata }) => {
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

 
  console.log("name", name)

  return (
    <>


<div className="w-6/12 md:w-4/12 lg:w-4/12 xl:w-3/12 px-3 mb-6">
      {loading && name ? (
        <LoadingPage />
      ) : (
        <div className="w-full bg-white product_box py-3 px-3 cursor-pointer flex flex-col rounded-xl">
          {name ? (
            <>
              <div className="flex flex-col justify-center items-center">
                <img alt="image" src={image} className="rounded-xl w-full h-44 object-cover" />
                {/* <span className="bg-black text-white absolute top-0 left-0">{category}</span> */}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 capitalize text-base mt-3 mb-1 whitespace-nowrap overflow-hidden">
                  {name}
                </h3>
                <div className="flex justify-between mt-3">
                  <div>
                    <p className="text-orange-500 text-sm font-bold align-middle">
                      <span>{formatMultiPrice(price)}</span>
                    </p>
                    <p className="text-green-500">Free Delivery</p>
                  </div>
                  <button
                    className="button bg-blue sm"
                    onClick={handleAddCartProduct}
                  >
                    +
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full">
              <NoData />
              
              </div>
          )}
        </div>
      )}
    </div>
    </>

  );
};

export default CardFeature;