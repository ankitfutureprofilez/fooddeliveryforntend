import { useEffect, useState } from "react";
import Listings from "../Api/Listings";
import LoadingPage from "../page/LoadingPage";
import { MdStreetview } from "react-icons/md";
import { Link } from "react-router-dom";
import { formatDate } from "../hooks/Formdata";
export default function Orderhistory() {
  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState([]);

  useEffect(() => {
    const main = new Listings();
    const response = main.paymentmethod();
    response
      .then((res) => {
        setRecord(res.data.list);
        setLoading(false);
        console.log("res", res.data.list);
        res.data.list.forEach((item) => {
          localStorage.setItem(`orderStatus`, item.order_status);
        });
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  }, []);


  return (
    <div>
        <div className="container mx-auto px-4 pb-14 ">
          <h1 className="text-3xl font-bold mb-6">Order History</h1>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className=" bg-black  text-white">
                <tr>
                  <th className="p-3 border border-gray-200">
                    Order ID & Date
                  </th>
                  <th className="p-3 border border-gray-200 ">Order Items</th>
                  <th className="p-3 border border-gray-200 ">Order Status</th>
                  <th className="p-3 border border-gray-200 ">View</th>
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
                      <td className="p-3 border border-gray-200 ">
                        {item._id}
                        <span className="flex">
                          {formatDate(item.createdAt)}
                        </span>
                      </td>
                      <td className="p-3 border border-gray-200 ">
                        {JSON.parse(item.order_items).map(
                          (orderItem, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-4"
                            >
                              <img
                                src={orderItem.image}
                                alt={orderItem.name}
                                className="w-16 h-16 rounded"
                              />
                              <div>
                                <p className="font-semibold">
                                  {orderItem.name}
                                </p>
                                <p>Price: {orderItem.price}</p>
                                  <Link
                                    to={`/order_history/${item.order_id}`}
                                    className="text-blue-600"
                                  >
                                    Details
                                  </Link>
                              </div>
                            </div>
                          )
                        )}
                      </td>
                      <td className="p-3 border border-gray-200">
                        {item.order_status}
                      </td>
                      <td className="p-3 border border-gray-200">
                        <MdStreetview />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
}
