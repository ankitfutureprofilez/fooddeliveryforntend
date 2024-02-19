import { useEffect, useState } from "react";
import Listings from "../Api/Listings";
import LoadingPage from "../page/LoadingPage";
import { MdStreetview } from "react-icons/md";
import { Link } from "react-router-dom";
import { formatDate } from "../hooks/Formdata";
import { SiPivotaltracker } from "react-icons/si";
import { useSelector } from 'react-redux';
export default function Orderhistory() {

  const userData = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState([]);

  useEffect(() => {
    if(userData.resId){
      const main = new Listings();
      const response = main.adminorder();
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

    }else{
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
  return (
    <div>
      <div className="container mx-auto px-4 pb-14 ">
        <div className="overflow-x-auto">
          <table className="w-full overflow-x-auto">
            <thead className="bg-black text-white text-left">
              <tr>
                <th className="p-3 border border-gray-200">Order ID</th>
                <th className="p-3 border border-gray-200">Order Date</th>
                <th className="p-3 border border-gray-200">Order Items</th>
                <th className="p-3 border border-gray-200">Order Status</th>
                <th className="p-3 border border-gray-200 text-center">
                  Tracker
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
                    <td className="p-3 border border-gray-200">{item._id}</td>
                    <td className="p-3 border border-gray-200">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="p-3 border border-gray-200">
                      {JSON.parse(item.order_items).map((orderItem, index) => (
                        <div key={index} className="flex items-center ">
                          <div>
                            <p className="font-semibold">{orderItem.name},</p>
                          </div>
                        </div>
                      ))}
                    </td>
                    <td className="p-3 border border-gray-200 ">
                      {item.order_status ==="initiated" ? (
                        <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Accepted
                        </span>
                      ) : (<></>)  }
                      
                      {item.order_status ==="picked" ? (
                        <span className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
                     picked
                        </span>
                      ) : (<></>)  }
                      {item.order_status === "delivered" ? (
                        <span className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                          delivered
                        </span>
                      ) : (<></>)  }
                    </td>
                    <td className="p-3 border border-gray-200 text-center">
                      <Link to={`/order_history/${item.order_id}`}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Track </button>
                      </Link>
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
