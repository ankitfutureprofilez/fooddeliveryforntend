import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Restaurantdetails() {
  const { resId } = useParams();
  console.log("resId", resId)
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
        setRecord(resData.record[0]);
        console.log("resData", resData)
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  console.log("record", record)
  return (
    <>
      <div className='bg-white p-2 md:p-4 pt-6 md:pt-10'>
        <div class="flex flex-row ">
          <div className='w-full md:w-6/12 '>
            <img src={record.image} alt={record.index} />
          </div>
          <div className='w-full md:w-6/12 '>
            <div class="flex flex-nowrap">
              <div>
                <h1>{record.restaurantname}</h1>
                <p>{record.category}</p>
                <p>{record.description}</p>
                <p>{record.location}</p>
                <p>Timing :- {record.opening_to} {record.opening_from} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
