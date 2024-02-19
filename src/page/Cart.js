import React, { useEffect, useState } from "react";
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


  const [address, setAddress] = useState("")
  const [location, setLocation] = useState({
    phone: "",
    coordinates: '',
  });

  const handleGetLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        const API_KEY = "AIzaSyDdc-XHVxNW5sw6Yi8MA5ck_EtkX2uNgSs";
        const response = axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&key=${API_KEY}`);
        response.then((res)=>{
          setLocation({...location, coordinates: {
              lat: latitude,
              lng: longitude
            }
          });
          setAddress(res.data.display_name);
      });
      } catch (error) {
        console.error("Error getting location:", error);
      }
    }
  };
  
  // useEffect(()=>{
  //   handleGetLocation()
  // },[]);

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
        if (!location.coordinates=="" || location.coordinates.length === 0) {
          try {
            const apiUrl = "https://ipapi.co/json/";
            const response = await fetch(apiUrl);
            const jsonData = await response.json();
            // console.log(jsonData);
            const { latitude, longitude } = jsonData;
            setLocation((prevData) => ({
              ...prevData,
              coordinates: `${latitude}, ${longitude}`,
            }));
          } catch (error) {
            console.error("Error getting coordinates:", error);
            toast.error("Error getting coordinates");
            return;
          }
        }
        const payment = new Payment();
        console.log("Location:", location);
        const coordinatesString = JSON.stringify(location.coordinates);
        const resp = payment.Checkout_cart({
          ...location,
          items: productCartItem,
        });
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


  const handleChangeLocation = (e) => {
    setAddress(e.target.value);
  };

  return (
    <>
        <div className="flex flex-wrap my-7">
        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Location
          </label>
          <div className="relative">
            <input
              required
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="adress" 
              onChange={handleChangeLocation}
              defaultValue={address}
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

      
      {/* New Design for cart Page */}
      {/* <div className="shopping-cart mt-8">
      <h2 className='className="mt-10 text-3xl font-semibold pb-8"'>
        Your Bag
      </h2>
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
                      src="https://via.placeholder.com/100"
                      alt="main-image"
                    />
                  </div>
                  <div className="w-full md:w-1/4 text-left">
                    <p className="text-md"> Apple MacBook Pro 17</p>
                    <p className="text-gray-500 text-xs pt-2">
                      {" "}
                      <span>Category:</span>Sweet{" "}
                    </p>
                  </div>
                </div>
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> */}
    </>
  );
};

export default Cart;