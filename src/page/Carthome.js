import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import emptyCartImage from "../assest/empty.gif";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Carthome() {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const handlePayment = async () => {
    if (user.email) {
      try {
        const resp = axios.post(`${process.env.REACT_APP_BASE_URL}/create-checkout-session`, {items : productCartItem})
        resp.then((res)=>{
          console.log(res.data);
          if(res.data.url){
            window.location.href = res.data.url;
          }
        }).catch((err)=>{
          console.log(err)
        });
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error during payment");
      }
    } else {
      toast("You have not Login!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };



  return (
    <>
      <div class="bg-white p-2 md:p-4 pt-2 border-l border-gray-200 h-full "> 
        <h2 className="text-gray-700 mb-3 text-xl">
              <strong>Your Cart</strong> Items
            </h2> 
        <div> 
            {/* <h2 className="text-lg md:text-2xl font-bold text-slate-600">
              Your Cart Items
            </h2> */}

            {productCartItem[0] ? (
              <div className="my-4 ">
                {/* display cart items  */}
                <div className="w-full">
                  {productCartItem.map((el) => {
                    return (
                      <CartProduct
                        key={el._id}
                        id={el._id}
                        name={el.name}
                        image={el.image}
                        category={el.category}
                        qty={el.qty}
                        total={el.total}
                        price={el.price}
                      />
                    );
                  })}
                </div>

                {/* total cart item  */}
                <div className="w-full mt-5">
                  <h2 className="text-gray-700 font-bold text-lg">Summary </h2>
                  <div className="flex w-full py-2 text-lg border-b items-center border-gray-200">
                    <p className="text-base">Total Qty :</p>
                    <p className="ml-auto w-32 font-bold text-right">{totalQty}</p>
                  </div>
                  <div className="flex w-full py-2 text-lg border-b items-center border-gray-200">
                    <p className="text-base">Total Price</p>
                    <p className="ml-auto w-32 font-bold text-right">
                      <span className="text-orange-500">₹</span> {totalPrice}
                    </p>
                  </div>
                  <button
                  
                    className="bg-orange-500 hover:bg-orange-600 rounded-md w-full text-lg font-bold py-2 text-white"
                    onClick={handlePayment}
                  >
                    Payment
                  </button>
                </div>
              </div>
            ) : (
              
                <div className="flex w-full justify-center items-center flex-col">
                  <img src={emptyCartImage} className="w-full max-w-sm" />
                  <p className="text-slate-500 text-3xl font-bold">
                    Empty Cart
                  </p>
                </div>
              
            )}  
      </div>
      </div>
    </>
  );
}
