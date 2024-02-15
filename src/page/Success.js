import React from 'react'
import "../styles/success.css";

const Success = () => {
  return (
    <div className="card">
    <div className="header">
      <div className="image">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
          <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g>
          <g id="SVGRepo_iconCarrier">
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#000000" d="M20 7L9.00004 18L3.99994 13"></path>
          </g>
        </svg>
      </div>
      <div className="content">
        <span className="title">Order Successful</span>
        <p className="message">Thank you for your purchase. Your order will be delivered shortly</p>
      </div>
      <div className="actions">
        <button type="button" className="track">Track my package</button>
      </div>
    </div>
  </div>  
  )
}

export default Success