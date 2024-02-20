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
  // console.log("aaa",process.env.REACT_GOOGLE_API__KEY);
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const [address, setAddress] = useState("");

  const [location, setLocation] = useState({
    phone: "",
    coordinates: "",
    address: "",
  });

// console.log("addess",address)
// console.log(" location",location )
  const handleGetLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        const API_KEY =  "AIzaSyDdc-XHVxNW5sw6Yi8MA5ck_EtkX2uNgSs";
        console.log("api",API_KEY)
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&key=${API_KEY}`
        );
        setLocation({
          ...location, coordinates: {
            lat: latitude,
            lng: longitude
          },
        });
        setAddress(response.data.display_name);
      } catch (error) {
        console.error("Error getting location:", error);
      }
    }
  };

  useEffect(() => {
    // handleGetLocation();
  }, []);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  };

  const navigate = useNavigate();

  const handlePayment = async () => {
    if (location.phone.length === 0) {
      toast("Enter phone number!");
      return;
    }
    if (user.email) {
      try {
        if (!location.coordinates == "" || location.coordinates.length === 0) {
          try {
            const apiUrl = "https://ipapi.co/json/";
            const response = await fetch(apiUrl);
            const jsonData = await response.json();
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
        const coordinatesString = JSON.stringify(location.coordinates);
        const resp = payment.Checkout_cart({
          ...location,
          items: productCartItem,
        });
        resp
          .then((res) => {
            if(user.resId){
            <></>
            }else{
              if (res.data.url) {
                window.location.href = res.data.url;
              }
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


  const [addressValid, setAddressValid] = useState(false);
  const handleChangeLocation = async (e) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    const apiKeygoogle = process.env.REACT_APP_GOOGLE_API_KEY;
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(newAddress)}&key=${apiKeygoogle}`;
      const response = axios.get(apiUrl);
      response.then((res)=>{
        console.log("res", res.data)
        if(res.data.status === 'OK'){
          const location = res.data.results[0].geometry.location;
          const latitude = location.lat;
          const longitude = location.lng;
          setLocation((prevData) => ({
            ...prevData,
            coordinates: {
              lat: parseFloat(latitude),
              lng: parseFloat(longitude),
            },
          }));
          setAddressValid(true);
        } else {
          toast.error("You have entered invalid address. Please enter valid address.");
          setLocation((prevData) => ({
            ...prevData,
            coordinates: {},
          }));
          setAddressValid(false);
        }
      }).catch((error)=>{
        console.error("Error getting coordinates:", error);
        toast.error("Failed to get your entred address please try again in sometime.");
        setLocation((prevData) => ({...prevData,coordinates: {}}));
        setAddressValid(false);
      })
  }  
  
  return (
    <div className="p-2 md:p-4">
      <h2 className="text-xl md:text-3xl mt-3 ml-4 font-bold">Cart</h2>
      {productCartItem[0] ? (
        <>
          <div className="flex flex-wrap my-7">
            {/* display cart items  */}
            <div className=" md:w-1/2 px-3 mb-6 md:mb-0 ">
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
            <div className="flex flex-col md:w-1/2">
              {/* Location */}
              <div className=" px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Location
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    className="form-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="address"
                    onBlur={handleChangeLocation}
                  />
                  <div className="absolute top-3 right-2.5">
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
              {/* Phone Number */}
              <div className="px-3 mb-6 my-4 ">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Phone
                </label>
                <div className="relative">
                  <input
                    required
                    type="Number"
                    maxLength={10}
                    className="form-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="phone"
                    value={location.phone}
                    onChange={handlePhoneChange}
                  />
                </div>
              </div>
              {/* total cart item  */}
              <div className="px-3 mb-6 md:mb-0">
                <div className="flex w-full py-2 text-base border-b">
                  <p>Total Qty :</p>
                  <p className="ml-auto w-32 font-bold">{totalQty}</p>
                </div>
                <div className="flex w-full py-2 text-base border-b">
                  <p>Total Price</p>
                  <p className="ml-auto w-32 font-bold">
                    <span className="text-orange-500">₹</span> {totalPrice}
                  </p>
                </div>
                <button disabled={!addressValid}
                  className="bg-orange-500 w-full text-white text-lg font-medium w-32 h-10 mt-7 rounded-full px-6 py-6 shadow-md mt-5 flex justify-center items-center"
                  onClick={handlePayment}>
                  Payment
                </button>
              </div>
            </div>
          </div>
        </>
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
  );
};

export default Cart;