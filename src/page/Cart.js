import React, { useState } from "react";
import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import emptyCartImage from "../assest/empty.gif";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Payment from "../Api/Payment";
import { FaLocationCrosshairs } from "react-icons/fa6";


const Cart = () => {
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

  const [location, setLocation] = useState({
    phone: "",
    checkout_coordinates: ''
  });

  console.log("location", location);

  const handleGetLocation = async () => {
    if (navigator.geolocation) {
      try {
        
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        const API_KEY = "AIzaSyDdc-XHVxNW5sw6Yi8MA5ck_EtkX2uNgSs";
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&key=${API_KEY}`
        );
        setLocation({...location, coordinates: {
          lat: latitude,
          lng: longitude
        }});
      } catch (error) {
        console.error("Error getting location:", error);
      }
    }
  };

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  };

  const handlePayment = async () => {
    if (user.email) {
      try {
        console.log("Location:", location);
        const payment = new Payment();
        // const coordinatesString = JSON.stringify(location.coordinates);
        const resp = payment.Checkout_cart({...location, items: productCartItem});
        resp
          .then((res) => {
            if (res.data.url) {
              window.location.href = res.data.url;
            }
          })
          .catch((err) => {
            console.log(err);
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

  const handlePhoneChange = (e) => {
    setLocation((prev) => ({ ...prev, phone: e.target.value }));
  };

  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          Your Cart Items
        </h2>
        {productCartItem[0] ? (
          <div className="my-4 flex gap-3">
            {/* display cart items  */}
            <div className="w-full max-w-3xl">
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

            {/* location input */}
            {/* total cart item  */}
            <div className="w-full max-w-md  ml-auto">
              <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
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
          <>
            <div className="flex w-full justify-center items-center flex-col">
              <img
                src={emptyCartImage}
                className="w-full empty-cart-image max-w-sm"
              />
              <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-wrap mt-7">
        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Location
          </label>
          <div className="relative">
            <input
              required
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="location"
              value={location.location}
              onChange={(e) =>
                setLocation((prev) => ({ ...prev, location: e.target.value }))
              }
            />
            <div className="absolute top-2 right-2">
              <button type="button">
                <FaLocationCrosshairs
                  size={24}
                  color="#0000ff"
                  onClick={handleGetLocation}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Phone
          </label>
          <div className="relative">
            <input
              required
              type="Number"
              maxLength={10}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="phone"
              value={location.phone}
              onChange={handlePhoneChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
