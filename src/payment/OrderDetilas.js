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
  const [packageStatus, setPackageStatus] = useState("picked");
  const userData = useSelector((state) => state.user);
  // useEffect(() => {
  // let intervalId;
  // if (packageStatus !== "delivered") {
  // intervalId = setInterval(() => {
  // handleStatusChange();
  //     }, 10000);
  //   }
  //    else {
  //     const timeoutId = setTimeout(() => {
  //       console.log("Refreshing data");
  //       setPackageStatus("picked");
  //     }, 10000);

  //     return () => clearTimeout(timeoutId);
  //   }

  //   return () => {
  //     if (intervalId) {
  //       clearInterval(intervalId);
  //     }
  //   };
  // }, [packageStatus]);

  const handleStatusChange = () => {
    let nextStatus;
    switch (packageStatus) {
      case "picked":
        nextStatus = "accepted";
        break;
      case "accepted":
        nextStatus = "delivered";
        break;
      case "delivered":
        console.log("Package delivered");
        return;
      default:
        nextStatus = "picked";
    }
    setPackageStatus(nextStatus);
    updateOrderStatus(order_id, nextStatus);
  };

  async function updateOrderStatus(orderId, status) {
    const main = new Listings();
    try {
      const response = await main.ordertracking(orderId, status);
      toast.success(response.data.msg);
      console.log("API Response", response);
    } catch (error) {
      console.log("API Error", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const main = new Listings();
        const response = await main.orderdetials(order_id);
        console.log("res", response.data.order);
        setRecord(response.data.order);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();


  }, [order_id]);

//   const  restaurent_coordinates = record?.restaurent_coordinates
// const recordsss =restaurent_coordinates
// console.log("restaurent_coordinates.coordinates.lat",recordsss)
//   function getAddress(lat, lng) {
//     const apiKey = process.env.REACT_GEO_KEY; 
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
  
//     fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         if (data.status === 'OK') {
//           const address = data.results[0].formatted_address;
//           console.log('Address:', address);
//         } else {
//           console.error('Failed to fetch address:', data.status);
//         }
//       })
//       .catch(error => console.error('Error fetching address:', error));
//   }
  
//   getAddress(restaurent_coordinates.coordinates.lat, restaurent_coordinates.coordinates.lng);

//   console.log("restaurent_coordinates",restaurent_coordinates)
  
//   const usercoordinates= record?.checkout_coordinates
//   console.log( usercoordinates)


  return (
    <>
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-start item-start space-y-2 flex-col">
          <h2 className="text-2xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
            Order {record.order_id}
          </h2>
          <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
            {formatDate(record.createdAt)}
          </p>
        </div>
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                Customer’s Cart
              </p>
              {record.order_items && JSON.parse(record.order_items).map((item, index) => (
                <div className="border-b border-gray-200 pt-4 pb-4 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full" key={index}>
                  <div className=" w-full md:w-20 text-center">
                    <img
                      className="w-full md:h-auto rounded-full"
                      src={item.image}
                      alt="item"
                    />
                  </div>
                  <div className=" md:flex-row flex-col flex justify-between items-start w-full  space-y-4 md:space-y-0">
                    <div className="w-full flex flex-col justify-start items-start space-y-2 md:space-y-4">
                      <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                        {item.name}
                      </h3>
                    </div>
                    <div className="flex justify-between space-x-8 items-start w-full">
                      <p className="text-base dark:text-white xl:text-lg leading-6">
                        {formatMultiPrice(item.price)}
                      </p>
                      <p className="text-base dark:text-white xl:text-lg leading-6">
                        {item.qty}
                      </p>
                      <p className="text-base dark:text-white xl:text-lg font-semibold leading-6">
                        {item.category}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Summary
                </h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      {record.order_items && formatMultiPrice(
                        JSON.parse(record.order_items).reduce((total, item) => total + (item.price * item.qty), 0)
                      )}
                    </p>

                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Discount{" "}
                      <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                        if any
                      </span>
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                    {formatMultiPrice(0)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Delivery Charges
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                    {formatMultiPrice(0)}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                    Total
                  </p>
                  <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      {record.order_items && formatMultiPrice(
                        JSON.parse(record.order_items).reduce((total, item) => total + (item.price * item.qty), 0)
                      )}
                    </p>
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Shipping
                </h3>
                <div className="flex justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">

                    <div className="flex flex-col justify-start items-center">
                      <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                        <span className="font-normal">
                          Status
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">
                    {packageStatus}
                  </p>
                </div>
                <button
                  disabled={!userData.resId || packageStatus === 'delivered'}
                  onClick={handleStatusChange}
                  className={`py-5 w-96 md:w-full text-base font-medium leading-4 transition-colors duration-300 ${userData.resId && packageStatus !== 'delivered'
                    ? "accepted"
                      ? 'bg-blue-500 hover:bg-blue-700 text-white'
                      : "picked"
                        ? 'bg-black text-white'
                        : 'bg-gray-800 hover:bg-black text-white'
                    : 'bg-gray-300 text-gray-600'
                    }`}

                >
                  {packageStatus} Package
                </button>

              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
              Customer
            </h3>

            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                      Shipping Address

                    </p>
                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      User Address
                    </p>
                  </div>
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                    <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M3 7L12 13L21 7"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <p className="cursor-pointer text-sm leading-5 ">
                        david89@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MapContainer restaurent_coordinates={record?.restaurent_coordinates} usercoordinates={record?.checkout_coordinates} status={packageStatus} />
    </>


  );
}
