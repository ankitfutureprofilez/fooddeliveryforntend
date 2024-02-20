import React, { useState } from 'react';
import Orderhistory from '../../payment/Orderhistory';
import Restaurantdetails from '../../page/Restaurantdetails';
import ProductAll from './../../Product/ProductAll';
import RestaurantInfo from '../../page/RestaurantInfo';
import CardFeature from '../Product';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Product'); 

  return (
    <div className='container m-auto'>
      <Restaurantdetails/>
      <div className='detail-wrapper pb-8'  >
        <div className="tabs-wrapper flex justify-left mt-16 mb-3 text-lg rounded-all">
          <button
            className={`mr-4 py-2 px-4 ${activeTab === 'Product' ? 'active font-weight:600 bg-gray-200 ' : 'bg-gray-100'} rounded-lg`}
            onClick={() => setActiveTab('Product')}>
            My Products
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'orderHistory' ? 'active bg-gray-200 font-weight:600' : 'bg-gray-100'} rounded-lg`}
            onClick={() => setActiveTab('orderHistory')} >
            Orders
          </button>
        </div>
        {activeTab === 'Product' && <ProductAll />}
        {activeTab === 'orderHistory' && <Orderhistory />}
      </div>
    </div>
  );
}
