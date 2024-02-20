import React, { useEffect, useState } from 'react';
import LoadingPage from '../page/LoadingPage';
import Listings from '../Api/Listings';
import NoData from '../components/NoData';
import { formatMultiPrice } from "../hooks/Valuedata";
import { useDispatch } from 'react-redux';
import { addCartItem } from '../redux/productSlide';

export default function ProductAll() {
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const main = new Listings();
        const res = await main.productlist();
        setRecord(res?.data?.data);
      } catch (error) {
        console.error("error", error);
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddCartProduct = (item) => {
    dispatch(addCartItem({
      _id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image,
      imagedata: item.imagedata
    }));
  };

  if (loading) return <LoadingPage />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="py-4">
      {record?.length === 0 ? (
        <NoData />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {record.map((item, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <div className="bg-cover bg-center h-56 p-4" style={{ backgroundImage: `url(${item.image})` }}>
                {/* Image Placeholder if needed */}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                <p className="text-orange-500 text-xl font-bold">{formatMultiPrice(item.price)}</p>
                <p className="text-green-500 text-sm mt-2">Free Delivery</p>
              </div>
              <div className="flex justify-end p-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleAddCartProduct(item)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
