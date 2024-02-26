import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Listings from "../Api/Listings";
import MapContainer from "../tracking/MapContainer";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { formatMultiPrice } from "../hooks/Valuedata";
import axios from "axios";
import { DateFormat } from "../hooks/DateFormat";
import OrderDate from "../hooks/OrderDate";
export default function OrderDetilas() {

  const { order_id } = useParams();
  const [record, setRecord] = useState([]);
  const userData = useSelector((state) => state.user);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  };
  const [statusUpdated, setStatusUpdated] = useState();

  // UPDATE ORDER

  const [updateOrder, setUpdateOrder] = useState();

  const fetchData = async () => {
    try {
      const main = new Listings();
      const response = await main.orderdetials(order_id);
      setRecord(response.data.order);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        record &&
        record.order_status == "picked" &&
        record &&
        record.deliveredAt == null
      ) {
        updatePickedAndDeliveredStatus("picked");
        setStatusUpdated(new Date())
      }
    }, 7000);
    return () => clearInterval(interval);
  }, [record]);

  useEffect(() => {
    fetchData();
  }, [order_id, updateOrder, statusUpdated]);

  const updatePickedAndDeliveredStatus = async (type, show = false) => {
    const main = new Listings();
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;
    const response = main.ordertracking(type, record && record.order_id, {
      coordinates: {
        lat: latitude,
        lng: longitude,
      },
    });
    response
      .then((res) => {
        if (show) {
          toast.success(res.data.msg);
        }
        setUpdateOrder(new Date());
      })
      .catch((err) => {
        toast.success("Failed to update status");
        console.log("err", err);
      });
  };

  // UPDATE ORDER STATUS
  async function updateOrderStatus(type) {
    try {
      if (type == "accepted") {
        const main = new Listings();
        const response = main.ordertracking(type, record && record.order_id);
        response
          .then((res) => {
            toast.success(res.data.msg);
            setUpdateOrder(new Date());
          })
          .catch((err) => {
            toast.success("Failed to update status");
          });
      } else {
        updatePickedAndDeliveredStatus(type, "show");
      }
    } catch (error) {
      console.log("API Error", error);
    }
  }



  const [adds, setAdds] = useState('');

  let checkoutCoordinates = record && record.checkout_coordinates;

  async function getAddressFromCoordinates(checkout_coordinates) {
    if (checkout_coordinates) {
      const add = JSON.parse(checkout_coordinates);
      const latlng = `${add.lat},${add.lng}`;
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&result_type=street_address&location_type=ROOFTOP&key=${apiKey}`;
      try {
        const response = await axios.get(url);
        if (response.data && response.data.results && response.data.results.length > 0) {
          const address = response.data.results[0].formatted_address;
          setAdds(address);
        } else {
          console.error("Failed to fetch address:", response.data.status);
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    } else {
      console.error("Invalid checkout_coordinates:", checkout_coordinates);
    }
  }


  useEffect(() => {
    getAddressFromCoordinates(checkoutCoordinates);
  }, [checkoutCoordinates]);



  return (
    <>
      <div className="px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-start item-start space-y-2 flex-col">
          {/* <h2 className="text-2xl lg:text-4xl font-semibold leading-7 lg:leading-9 ">
            Order ID:-  {record.order_id}
          </h2> */}
        </div>
        <div className="mt-10  jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Customer Cart</p>
              {record.order_items &&
                JSON.parse(record.order_items).map((item, index) => (
                  <div
                    className="border-b border-gray-200 pt-4 pb-4 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                    key={index}
                  >
                    <div className="w-20 md:w-14 text-center">
                      <img
                        className="w-full h-14 rounded-full"
                        src={item.image}
                        alt="item"
                      />
                    </div>
                    <div className=" md:flex-row flex-col flex justify-between items-start w-full  space-y-4 md:space-y-0">
                      <div className="w-full flex flex-col justify-start items-start space-y-2 md:space-y-4">
                        <h3 className="text-lg font-semibold leading-6 text-gray-800">
                          {item.name}
                        </h3>
                      </div>
                      <div className="flex justify-between space-x-8 items-start w-full">
                        <p className="text-base xl:text-lg leading-6">
                          {formatMultiPrice(item.price)}
                        </p>
                        <p className="text-base xl:text-lg leading-6">
                          {item.qty}
                        </p>
                        <p className="text-base xl:text-lg font-semibold leading-6">
                          {item.category.charAt(0).toUpperCase() +
                            item.category.slice(1)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <MapContainer
              restaurent_coordinates={record?.restaurent_coordinates}
              order_coordinates={record?.order_coordinates}
              checkout_coordinates={record?.checkout_coordinates}
              status={record && record.order_status}
            />

            <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                <h3 className="text-xl font-semibold leading-5 text-gray-800">
                  Summary
                </h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                      {record.order_items &&
                        formatMultiPrice(
                          JSON.parse(record.order_items).reduce(
                            (total, item) => total + item.price * item.qty,
                            0
                          )
                        )}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Discount{" "}
                      <span className="bg-gray-200 p-1 text-xs font-medium leading-3 text-gray-800">
                        if any
                      </span>
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      {formatMultiPrice(0)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Delivery Charges
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      {/* {formatMultiPrice(0)} */}
                      Free Delivery
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base font-semibold leading-4 text-gray-800">
                    Total
                  </p>
                  <p className="text-base font-semibold leading-4 text-gray-600">
                    <p className="text-base leading-4 text-gray-600">
                      {record.order_items &&
                        formatMultiPrice(
                          JSON.parse(record.order_items).reduce(
                            (total, item) => total + item.price * item.qty,
                            0
                          )
                        )}
                    </p>
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                <h3 className="text-xl font-semibold leading-5 text-gray-800">
                  Shipping
                </h3>
                <div className="flex justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="flex flex-col justify-start items-center">
                      <p className="text-lg leading-6 font-semibold text-gray-800">
                        <span className="font-normal">Status</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6 uppercase text-gray-800">
                    {record && record.order_status}
                  </p>
                </div>
                <div className="flex justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="flex flex-col justify-start items-center">
                      <p className="text-lg leading-6 font-semibold text-gray-800">
                        <span className="font-normal">Order Time</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6 uppercase text-gray-800">
                    {/* <DateFormat dateString={record.createdAt} /> */}
                    {record ? <OrderDate dateString={record.createdAt} /> : <p>Loading...</p>}



                  </p>
                </div>
                {/* !userData.resId || packageStatus === 'delivered' */}
                {userData.resId &&
                  record &&
                  record.order_status == "initiated" ? (
                  <button
                    onClick={() => updateOrderStatus("accepted")}
                    className={`bg-green-500 w-full text-white text-lg font-medium w-32 h-10 mt-7 rounded-full px-6 py-6 shadow-md mt-5 flex justify-center items-center`}
                  >
                    Accept Order
                  </button>
                ) : userData.resId &&
                  record &&
                  record.order_status == "accepted" ? (
                  <button
                    onClick={() => updateOrderStatus("picked")}
                    className={`bg-blue-500 w-full text-white text-lg font-medium w-32 h-10 mt-7 rounded-full px-6 py-6 shadow-md mt-5 flex justify-center items-center`}
                  >
                    Mark As Order Picked
                  </button>
                ) : userData.resId &&
                  record &&
                  record.order_status == "picked" ? (
                  <button
                    onClick={() => updateOrderStatus("delivered")}
                    className={`bg-gray-500 w-full text-white text-lg font-medium w-32 h-10 mt-7 rounded-full px-6 py-6 shadow-md mt-5 flex justify-center items-center`}>
                    Mark As Order delivered
                  </button>
                ) : (
                  ""
                )}
                {" "}
                {(record && record.order_status === "delivered") && (record.deliveredAt) ? (
                  <p className="text-green-500 text-base text-center">
                    Order has been delivered <DateFormat dateString={record.deliveredAt} />.
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center flex-col xl:flex-row bg-gray-50 w-full px-4 py-6 md:p-6 xl:p-8">
      <div className="flex w-full justify-between">
        <div className="flex-auto">
          <h1>Address</h1>
          <p>{adds}</p>
        </div>
        <div className="flex-auto">
          <h1>Phone</h1>
          <p>{record && record?.phone_no || "null"}</p>
        </div>
      </div>
    </div>
  </div>
        </div>
    </>
  );
}