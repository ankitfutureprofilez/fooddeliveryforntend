import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import emptyCartImage from "../assest/empty.gif";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

export default function Carthome() {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);
  // console.log("user", user);
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
      const stripePromise = await loadStripe(
        `${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`
      );

      try {
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/create-checkout-session`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(productCartItem),
          }
        );

        if (!res.ok) {
          console.error("Error creating Checkout Session:", res.statusText);
          toast.error("Error creating Checkout Session");
          return;
        }

        const data = await res.json();
        // console.log("data", data);

        toast("Redirect to payment Gateway...!");
        const record = await stripePromise.redirectToCheckout({
          sessionId: data.id,
        });
        // console.log("record", record);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error during payment");
      }
    } else {
      toast("You have not Login!");
      // Uncomment the following lines if you want to redirect to login after a delay
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };
  return (
    <>
      <div class="flex flex-col ...">
        <div>
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
              Your Cart Items
            </h2>
        </div>
        <div>
          {" "}
          <div className="p-2 md:p-4">
            {/* <h2 className="text-lg md:text-2xl font-bold text-slate-600">
              Your Cart Items
            </h2> */}

            {productCartItem[0] ? (
              <div className="my-4 gap-3">
                {/* display cart items  */}
                <div className="w-full max-w-3xl ">
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
                <div className="w-full max-w-md  ml-auto">
                  <h2 className="bg-blue-500 text-white p-2 text-lg">
                    Summary
                  </h2>
                  <div className="flex w-full py-2 text-lg border-b">
                    <p>Total Qty :</p>
                    <p className="ml-auto w-32 font-bold">{totalQty}</p>
                  </div>
                  <div className="flex w-full py-2 text-lg border-b">
                    <p>Total Price</p>
                    <p className="ml-auto w-32 font-bold">
                      <span className="text-orange-500">₹</span> {totalPrice}
                    </p>
                  </div>
                  <button
                  
                    className="bg-orange-500 w-full text-lg font-bold py-2 text-white"
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
      </div>
    </>
  );
}
