import React from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteCartItem,increaseQty,decreaseQty } from "../redux/productSlide";

const CartProduct = ({ id, name, image, category, qty, total, price }) => {
    const dispatch = useDispatch()

    
  return (
    // <div className="py-3 flex border-b border-gray-200">
    //   <div className="pr-3 bg-white overflow-hidden">
    //     <img src={image} className="h-20 w-28 object-cover rounded-lg" />
    //   </div>
    //   <div className="flex flex-col gap-1 w-full">
    //     <div className="flex justify-between items-center">
    //       <h3 className="font-bold text-gray-800 capitalize text-base md:text-base">
    //         {name}
    //       </h3>
    //       <div className="cursor-pointer text-red-600 hover:text-orange-800  " onClick={()=>dispatch(deleteCartItem(id))}>
    //         <MdDelete size={20}  />
    //       </div>
    //     </div>
    //     {/* <p className=" text-slate-500  font-medium ">{category}</p> */}
    //     <p className="font-bold text-base text-orange-500 leading-5">
    //       <span className=" ">₹</span>
    //       <span>{price}</span>
    //     </p>
    //     <div className="flex justify-between ">
    //       <div className="flex gap-3 items-center">
    //         <button onClick={()=>dispatch(increaseQty(id))} className="bg-white border border-gray-200 py-1 mt-0 text-orange-500 rounded p-1 hover:bg-orange-500 hover:text-white ease-linear transition-all duration-150">
    //           <TbPlus />
    //         </button>
    //         <p className="font-semibold p-1 ">{qty}</p>
    //         <button
    //           onClick={()=>dispatch(decreaseQty(id))}
    //           className="border border-gray-200 text-orange-500 hover:bg-orange-500 hover:text-white py-1 mt-0 rounded p-1 ease-linear transition-all duration-150"
    //         >
    //           <TbMinus />
    //         </button>
    //       </div>
    //       <div className="flex items-center gap-2 font-bold text-gray-700">
    //         <p className="leading-5">Total :</p>
    //         <p className="leading-5"><span className="text-orange-500">₹ </span>{total}</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="shopping-cart mt-8">
    <div className="relative mt-8 overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-center rtl:text-center">
        <thead className="text-sm uppercase bg-gray-200 ">
          <tr>
            <th scope="col" className="px-6 py-6">
              Product
            </th>
            <th scope="col" className="px-6 py-6">
              Price
            </th>
            <th scope="col" className="px-6 py-6">
              Quantity
            </th>
            <th scope="col" className="px-6 py-6">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white mt-2">
            <th
              scope="row"
              className="px-6 py-4 font-medium whitespace-nowrap "
            >
              <div className="flex flex-wrap justify-center product-details flex ">
                <div className="flex items-center">
                  <img
                    className="object-cover w-16 h-20 mr-4"
                    src={image}
                    alt="main-image"
                  />
                </div>
                <div className="w-full md:w-1/4 text-left">
                  <p className="text-md"> {name}</p>
                  <p className="text-gray-500 text-xs pt-2">
                    {" "}
                    <span>Category:</span>{category}{" "}
                  </p>
                </div>
              </div>
            </th>
            <td className="px-6 py-4">{price}</td>
            <div className="flex flex-row mt-4">
            <button onClick={()=>dispatch(increaseQty(id))} className="bg-white border border-gray-200 py-1 mt-0 text-orange-500 rounded p-1 hover:bg-orange-500 hover:text-white ease-linear transition-all duration-150">
            <TbPlus />
          </button>
            <td className="px-6 py-4">{qty}</td>
            <button
            onClick={()=>dispatch(decreaseQty(id))}
            className="border border-gray-200 text-orange-500 hover:bg-orange-500 hover:text-white py-1 mt-0 rounded p-1 ease-linear transition-all duration-150"
          >
            <TbMinus />
          </button>
            </div>
            <td className="px-6 py-4">{total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default CartProduct;
