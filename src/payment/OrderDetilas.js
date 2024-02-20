import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Listings from "../Api/Listings";
import { formatDate } from "../hooks/Formdata";
import MapContainer from "../tracking/MapContainer";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { formatMultiPrice } from "../hooks/Valuedata";
export default function OrderDetilas() {
  const { order_id } = useParams();
  const [record, setRecord] = useState([])
  const [packageStatus, setPackageStatus] = useState("");
  const userData = useSelector((state) => state.user);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  };

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
      if (record && record.order_status == 'picked' && record && record.deliveredAt == null) {
        updatePickedAndDeliveredStatus('picked');
      }
    }, 7000);
    return () => clearInterval(interval);
  }, [record]);
  

  useEffect(() => {
    fetchData();
  }, [order_id, updateOrder]);

  const updatePickedAndDeliveredStatus = async (type, show = false) => { 
    const main = new Listings();
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;
    const response = main.ordertracking(type, record && record.order_id, {
      coordinates: {
        lat: latitude,
        lng: longitude
      }
    });
    response.then((res)=>{
      if(show){ 
        toast.success(res.data.msg);
      }
      setUpdateOrder(new Date());
    }).catch((err)=>{
      toast.success("Failed to update status");;
      console.log("err",err)
    })
  }

  // UPDATE ORDER STATUS
  async function updateOrderStatus(type) {
    try {
      if(type == 'accepted'){
        const main = new Listings();
        const response =  main.ordertracking(type, record && record.order_id);
        response.then((res)=>{
          toast.success(res.data.msg);
          setUpdateOrder(new Date());
        }).catch((err)=>{
          toast.success("Failed to update status");;
        })
      } else { 
        updatePickedAndDeliveredStatus(type, 'show');
      }
    } catch (error) {
      console.log("API Error", error);
    }
  }

  const [coordinator, setCoordinator] = useState("")
  function getAddressFromCoordinates(restaurantCoordinates) {
    const latlng = `${restaurantCoordinates.lat},${restaurantCoordinates.lng}`;
    const apiKey = "AIzaSyDzPG91wtUKY3vd_iD3QWorkUCSdofTS58";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${apiKey}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data) {
          const address = data.results[1].formatted_address;
          setCoordinator(address);
        } else {
          console.error('Failed to fetch address:', data.status);
        }
      })
      .catch(error => console.error('Error fetching address:', error));
  }

  useEffect(() => {
    if (record && record.restaurent_coordinates) {
      const restaurantCoordinates = JSON.parse(record.restaurent_coordinates);
      getAddressFromCoordinates(restaurantCoordinates);
    } else {
      console.error("restaurant coordinates not found in record");
    }
  }, [record.restaurent_coordinates])

  const [checkout, setcheckout] = useState("")
  function getcheckoutFromCoordinates(checkout_coordinates) {
    const latlng = `${checkout_coordinates.lat},${checkout_coordinates.lng}`;
    const apiKey = "AIzaSyDzPG91wtUKY3vd_iD3QWorkUCSdofTS58";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${apiKey}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data) {
          const address = data.results[0].formatted_address;
          setcheckout(address);
        } else {
          console.error('Failed to fetch address:', data.status);
        }
      })
      .catch(error => console.error('Error fetching address:', error));
  }

  useEffect(() => {
    if (record && record.checkout_coordinates) {
      const checkout_coordinates = JSON.parse(record?.checkout_coordinates);
      getcheckoutFromCoordinates(checkout_coordinates);
    } else {
      console.error("checkout_coordinates coordinates not found in record");
    }
  }, []);


  return (
    <>
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-start item-start space-y-2 flex-col">
          <h2 className="text-2xl lg:text-4xl font-semibold leading-7 lg:leading-9 ">
            Order {record.order_id}
          </h2>
          <p className="text-base text-gray-500 text-sm leading-6 text-gray-600">
            {formatDate(record.createdAt)}
          </p>
        </div>
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                Customer’s Cart
              </p>
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
                      {formatMultiPrice(0)}
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

                {/* !userData.resId || packageStatus === 'delivered' */}

                {userData.resId && record && record.order_status == 'initiated' ?
                  <button
                    onClick={() => updateOrderStatus("accepted")}
                    className={`py-5 w-96 md:w-full text-base font-medium leading-4 transition-colors duration-300 bg-gray-300 text-gray-600`} >
                    Mark As Order Accepted
                  </button>
                  : userData.resId && record && record.order_status == 'accepted' ?
                    <button
                      onClick={() => updateOrderStatus("picked")}
                      className={`py-5 w-96 md:w-full text-base font-medium leading-4 transition-colors duration-300 bg-gray-300 text-gray-600`} >
                      Mark As Order Picked
                    </button>
                    : userData.resId && record && record.order_status == 'picked' ?
                      <button
                        onClick={() => updateOrderStatus("delivered")}
                        className={`py-5 w-96 md:w-full text-base font-medium leading-4 transition-colors duration-300 bg-gray-300 text-gray-600`} >
                        Mark As Order delivered
                      </button>
                      : ''
                }

    `            {record && record.order_status === 'delivered' ?
                  <p className="text-green-500 text-base text-center">Order has been delivered at {
                    formatDate(   record && record.deliveredAt)
                }. </p>
                  : ''}`

              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
              Customer
            </h3>
            <div class="flex mt-5 w-full justify-between">
              <div class="flex-auto  w-32 ">
                <h1>
                  User Address
                </h1>
                <p>
                  {checkout}
                </p>
              </div>
              <div class="flex-auto w-32">
                <h1>
                  Phone
                </h1>
                <p>
                  {record?.phone_no || "null"}
                </p>
              </div>
              <div class="flex-auto w-32 ">
                <h1>
                restaurants  Address
                </h1>

                <p>
                  {coordinator}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
