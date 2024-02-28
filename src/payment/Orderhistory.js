import { useEffect, useState } from "react";
import Listings from "../Api/Listings";
import LoadingPage from "../page/LoadingPage";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { DateFormat } from "../hooks/DateFormat";

export default function Orderhistory() {
  const userData = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState([]);

  useEffect(() => {
    if (userData.resId) {
      const main = new Listings();
      const response = main.adminorder();
      response
        .then((res) => {
          setRecord(res.data.list);
          setLoading(false);
          res.data.list.forEach((item) => {
            localStorage.setItem(`orderStatus`, item.order_status);
          });
        })
        .catch((error) => {
          console.log("error", error);
          setLoading(false);
        });
    } else {
      const main = new Listings();
      const response = main.paymentmethod();
      response
        .then((res) => {
          setRecord(res.data.list);
          setLoading(false);
          res.data.list.forEach((item) => {
            localStorage.setItem(`orderStatus`, item.order_status);
          });
        })
        .catch((error) => {
          console.log("error", error);
          setLoading(false);
        });
    }
  }, []);
  console.log("res_id", userData.resId);
  return (
    <>
      {userData.resId ? (
        <> </>
      ) : (
        <div className="container mx-auto">
          <div className=" block">
            <h1 className="heading">Order History</h1>
          </div>
        </div>
      )}

      <div className="w-full order-table-sec">
        <div className="container py-4 pb-14 mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full overflow-x-auto">
              <thead className="bg-black text-white text-left">
                <tr>
                  <th className="p-3 border border-gray-200">Order ID</th>
                  <th className="p-3 border border-gray-200">Order Date</th>
                  <th className="p-3 border border-gray-200">Order Items</th>
                  <th className="p-3 border border-gray-200">Order Status</th>
                  <th className="p-3 border border-gray-200">Payment Status</th>
                  <th className="p-3 border border-gray-200 text-center">
                    View
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <LoadingPage />
                  </tr>
                ) : (
                  record.map((item, index) => (
                    <tr key={index} className="border border-gray-200">
                      <td className="p-3 border border-gray-200">
                        {item.order_id}
                      </td>
                      <td className="p-3 border border-gray-200">
                        <DateFormat dateString={item.createdAt} />
                      </td>
                      <td className="p-3 border border-gray-200">
                        {JSON.parse(item.order_items).map(
                          (orderItem, index) => (
                            <div key={index} className="flex items-center ">
                              <div>
                                <p className="font-semibold">
                                  {orderItem.name},
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </td>
                      <td className="p-3 border border-gray-200">
                        {item.order_status === "initiated" && (
                          <span className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full">
                            Placed
                          </span>
                        )}
                        {item.order_status === "accepted" && (
                          <span className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full">
                            Picked
                          </span>
                        )}
                        {item.order_status === "delivered" && (
                          <span className="bg-green-500 text-white font-bold py-2 px-4 rounded-full">
                            Delivered
                          </span>
                        )}
                        {item.order_status === "picked" && (
                          <span className="bg-green-500 text-white font-bold py-2 px-4 rounded-full">
                            Picked
                          </span>
                        )}
                      </td>

                      <td className="p-3 border border-gray-200">
                        {item.payment_status === "ok" && (
                          <span className="bg-green-500 text-white font-bold py-2 px-4 rounded-full">
                            Success
                          </span>
                        )}
                        {item.payment_status === "cancel" && (
                          <span className="bg-red-500 text-white font-bold py-2 px-4 rounded-full">
                            Cancel
                          </span>
                        )}
                        {item.payment_status === "Pending" && (
                          <span className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-full">
                            Pending
                          </span>
                        )}
                      </td>

                      <td className="p-3 border border-gray-200 text-center">
                        {item.order_status === "delivered" ? (
                          <Link to={`/order_history/${item.order_id}`}>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                              View{" "}
                            </button>
                          </Link>
                        ) : (
                          <>
                            {item.payment_status !== "ok" ? (
                              <Link>
                                {userData.resId == "1" ? (
                                  <button
                                    disabled
                                    className="bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded-full cursor-not-allowed"
                                  >
                                    View
                                  </button>
                                ) : (
                                  <button
                                    disabled
                                    className="bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded-full cursor-not-allowed"
                                  >
                                    Track
                                  </button>
                                )}
                              </Link>
                            ) : (
                              <Link to={`/order_history/${item.order_id}`}>
                                {userData.resId == "1" ? (
                                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                    View
                                  </button>
                                ) : (
                                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                    Track
                                  </button>
                                )}
                              </Link>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
