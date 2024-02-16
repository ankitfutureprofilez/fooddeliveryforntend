import React, { useState } from 'react';
import Orderhistory from '../../payment/Orderhistory';
import Restaurantdetails from '../../page/Restaurantdetails';
import ProductAll from './../../Product/ProductAll';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Product'); 

  return (
    <>
      <Restaurantdetails />
      <div className="flex justify-center my-4 text-lg rounded-all">
        <button
          className={`mr-4 py-2 px-4 ${activeTab === 'Product' ? 'font-weight:600 bg-gray-200 ' : 'bg-gray-100'} rounded-lg`}
          onClick={() => setActiveTab('Product')}
        >
          Products
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'orderHistory' ? 'bg-gray-200 font-weight:600' : 'bg-gray-100'} rounded-lg`}
          onClick={() => setActiveTab('orderHistory')}
        >
          Order History
        </button>
      </div>
      {activeTab === 'Product' && <ProductAll />}
      {activeTab === 'orderHistory' && <Orderhistory />}
    </>
  );
}
