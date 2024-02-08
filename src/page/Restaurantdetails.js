import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Restaurantdetails() {
    const { resId } = useParams();
    console.log("resId",resId)
    const [record, setRecord] = useState([])
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(`${process.env.REACT_APP_BASE_URL}/restaurant/${resId}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            mode: "cors",
          });
          const resData = await res.json();
          setRecord(resData?.list);
          console.log("resData", resData)
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };
  
      fetchData();
    }, []);
  return (
    <div>
      
    </div>
  )
}
