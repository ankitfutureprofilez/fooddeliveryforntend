import React from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteCartItem,increaseQty,decreaseQty } from "../redux/productSlide";

const CartProduct = ({ id, name, image, category, qty, total, price }) => {
    const dispatch = useDispatch()

    
  return (
    <div className="py-3 flex border-b border-gray-300">
      <div className="pr-3 bg-white overflow-hidden">
        <img src={image} className="h-28 w-40 object-cover rounded-lg" />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gray-800 capitalize text-base md:text-base">
            {name}
          </h3>
          <div className="cursor-pointer text-red-600 hover:text-orange-800  " onClick={()=>dispatch(deleteCartItem(id))}>
            <AiFillDelete />
          </div>
        </div>
        <p className=" text-slate-500  font-medium ">{category}</p>
        <p className="font-bold text-base text-orange-500">
          <span className=" ">₹</span>
          <span>{price}</span>
        </p>
        <div className="flex justify-between ">
          <div className="flex gap-3 items-center">
            <button onClick={()=>dispatch(increaseQty(id))} className="bg-slate-300 py-1 mt-2 text-orange-500 rounded hover:bg-slate-400 p-1 ">
              <TbPlus />
            </button>
            <p className="font-semibold p-1">{qty}</p>
            <button
              onClick={()=>dispatch(decreaseQty(id))}
              className="bg-slate-300 text-orange-500 py-1 mt-2 rounded hover:bg-slate-400 p-1 "
            >
              <TbMinus />
            </button>
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <p>Total :</p>
            <p><span className="text-orange-500">₹</span>{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
