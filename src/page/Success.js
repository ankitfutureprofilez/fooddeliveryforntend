import React, { useEffect } from 'react'
import "../styles/success.css";
import { Link,useParams } from 'react-router-dom';
import Payment from '../Api/Payment';
import toast from 'react-hot-toast';

const Success = () => {

  const  {order_id} = useParams();
  useEffect(()=>{
    const main = new Payment()
    const response = main.payment_success(order_id);
    response.then((res) => {
      if(res.data.status){
        toast.success(res.data.msg);
      }
      }).catch((err) => {
        toast.success("Failed to update status");
      });
   },[]);

  return (
    <div className="success-card ">
    <div className="success-header">
      <div className="success-image">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
          <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g>
          <g id="SVGRepo_iconCarrier">
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#000000" d="M20 7L9.00004 18L3.99994 13"></path>
          </g>
        </svg>
      </div>
      <div className="success-content">
        <span className="success-title">Order Successful</span>
        <p className="success-message">Thank you for your purchase. Your order will be delivered shortly</p>
      </div>
      <div className="success-actions">
        
        <Link to="/order_history" className="success-track">Track My Package</Link>
      </div>
    </div>
  </div>  
  )
}

export default Success