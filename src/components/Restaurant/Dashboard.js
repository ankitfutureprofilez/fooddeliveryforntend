import React, { useState } from 'react';
import Orderhistory from '../../payment/Orderhistory';
import Restaurantdetails from '../../page/Restaurantdetails';
import UserProduct from '../../page/UserProduct';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('restaurant'); // State to manage active tab

  return (
    <div>
        <Restaurantdetails />
      <div className="flex justify-center my-4">
        <button
          className={`mr-4 py-2 px-4 ${activeTab === 'restaurant' ? 'bg-gray-200' : 'bg-gray-100'} rounded-lg`}
          onClick={() => setActiveTab('restaurant')}
        >
          Products
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'orderHistory' ? 'bg-gray-200' : 'bg-gray-100'} rounded-lg`}
          onClick={() => setActiveTab('orderHistory')}
        >
          Order History
        </button>
      </div>
      {activeTab === 'restaurant' && <UserProduct />}
      {activeTab === 'orderHistory' && <Orderhistory />}
    </div>
  );
}
