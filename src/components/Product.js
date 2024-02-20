import React from "react";
import { useDispatch } from "react-redux";
import { addCartItem } from "../redux/productSlide";
import { formatMultiPrice } from '../hooks/Valuedata';

const Product = ({ image, name, price, category, loading, id, description, imagedata }) => {
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



  return (
    <>
      <div className="w-1/4 px-2.5">
        <div className="w-full bg-white product_box py-3 px-3 cursor-pointer flex flex-col rounded-xl">
          <>
            <div className="flex flex-col justify-center items-center">
              <img alt="image" src={image} className="rounded-xl w-full h-44 object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 capitalize text-base mt-3 mb-1 whitespace-nowrap overflow-hidden">
                {name}
              </h3>

              <div className="flex justify-between mt-3">
                <div>
                  <h4>{formatMultiPrice(price)}</h4>
                </div>
                <button
                  className="cart-btn"
                  onClick={handleAddCartProduct}
                >
                  <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.0199 8.88889H5.877L6.0588 9.77778H13.5149C13.9427 9.77778 14.2597 10.175 14.1649 10.5922L14.0117 11.2665C14.5309 11.5186 14.8889 12.0508 14.8889 12.6667C14.8889 13.5334 14.18 14.2346 13.3104 14.2221C12.482 14.2101 11.8007 13.5379 11.7784 12.7096C11.7661 12.2572 11.9474 11.8472 12.2451 11.5555H6.42155C6.7098 11.8379 6.88888 12.2313 6.88888 12.6667C6.88888 13.5504 6.152 14.262 5.25916 14.2205C4.46639 14.1837 3.82164 13.5431 3.77997 12.7506C3.7478 12.1385 4.06986 11.5991 4.55916 11.3176L2.60786 1.77778H0.666666C0.298472 1.77778 0 1.47931 0 1.11111V0.666667C0 0.298472 0.298472 0 0.666666 0H3.51469C3.83139 0 4.10436 0.222806 4.16783 0.533056L4.42244 1.77778H15.333C15.7609 1.77778 16.0779 2.17503 15.9831 2.5922L14.67 8.36998C14.601 8.6735 14.3312 8.88889 14.0199 8.88889ZM11.3333 4.66667H9.99999V3.55556C9.99999 3.31009 9.80102 3.11111 9.55555 3.11111H9.11111C8.86563 3.11111 8.66666 3.31009 8.66666 3.55556V4.66667H7.33333C7.08786 4.66667 6.88888 4.86564 6.88888 5.11111V5.55556C6.88888 5.80103 7.08786 6 7.33333 6H8.66666V7.11111C8.66666 7.35659 8.86563 7.55556 9.11111 7.55556H9.55555C9.80102 7.55556 9.99999 7.35659 9.99999 7.11111V6H11.3333C11.5788 6 11.7778 5.80103 11.7778 5.55556V5.11111C11.7778 4.86564 11.5788 4.66667 11.3333 4.66667Z" fill="white" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        </div>
      </div>
    </>

  );
};

export default Product;