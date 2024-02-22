import React from "react";
import { useEffect, useState } from "react";

export default function PullToRefresh(props) {
  
  const [loading, setLoading] = useState(false);
  const [startY, setStartY] = useState(0);
  const handleTouchStart = (event) => {
    setStartY(event.touches[0].clientY);
  };

  const handleTouchMove = (event) => {
    const currentY = event.touches[0].clientY;
    const distance = currentY - startY;
    if (distance > 350) {
      setLoading(true);
      setStartY(0);
      window.location.reload();
    }
  };

  return <>

    <div onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove} >
  {/* <div className={`refreshing text-center text-mint pt-3 p-2`} >
    <p className="d-block" >Refreshing</p>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.99951 16C5.76618 16 3.87451 15.225 2.32451 13.675C0.774512 12.125 -0.000488281 10.2333 -0.000488281 8C-0.000488281 5.76667 0.774512 3.875 2.32451 2.325C3.87451 0.775 5.76618 0 7.99951 0C9.14951 0 10.2495 0.237333 11.2995 0.712C12.3495 1.18667 13.2495 1.866 13.9995 2.75V0H15.9995V7H8.99951V5H13.1995C12.6662 4.06667 11.9368 3.33333 11.0115 2.8C10.0862 2.26667 9.08218 2 7.99951 2C6.33285 2 4.91618 2.58333 3.74951 3.75C2.58285 4.91667 1.99951 6.33333 1.99951 8C1.99951 9.66667 2.58285 11.0833 3.74951 12.25C4.91618 13.4167 6.33285 14 7.99951 14C9.28284 14 10.4412 13.6333 11.4745 12.9C12.5078 12.1667 13.2328 11.2 13.6495 10H15.7495C15.2828 11.7667 14.3328 13.2083 12.8995 14.325C11.4662 15.4417 9.83284 16 7.99951 16Z" fill="white"/>
        </svg>
    </div>  */}
    {loading ? <div className={`refreshing text-center text-mint pt-3 p-2`} >
        <p className="d-block" >Refreshing</p>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.99951 16C5.76618 16 3.87451 15.225 2.32451 13.675C0.774512 12.125 -0.000488281 10.2333 -0.000488281 8C-0.000488281 5.76667 0.774512 3.875 2.32451 2.325C3.87451 0.775 5.76618 0 7.99951 0C9.14951 0 10.2495 0.237333 11.2995 0.712C12.3495 1.18667 13.2495 1.866 13.9995 2.75V0H15.9995V7H8.99951V5H13.1995C12.6662 4.06667 11.9368 3.33333 11.0115 2.8C10.0862 2.26667 9.08218 2 7.99951 2C6.33285 2 4.91618 2.58333 3.74951 3.75C2.58285 4.91667 1.99951 6.33333 1.99951 8C1.99951 9.66667 2.58285 11.0833 3.74951 12.25C4.91618 13.4167 6.33285 14 7.99951 14C9.28284 14 10.4412 13.6333 11.4745 12.9C12.5078 12.1667 13.2328 11.2 13.6495 10H15.7495C15.2828 11.7667 14.3328 13.2083 12.8995 14.325C11.4662 15.4417 9.83284 16 7.99951 16Z" fill="white"/>
            </svg>
        </div>  : ''}
    {props.children}
    </div> 
  </>
}