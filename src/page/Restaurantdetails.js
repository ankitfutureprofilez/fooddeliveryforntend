import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Listings from '../Api/Listings';

export default function Restaurantdetails() {
  const { resId } = useParams();
  console.log("resId", resId)
  const [record, setRecord] = useState([])
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(`${process.env.REACT_APP_BASE_URL}/restaurant/${resId}`, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         mode: "cors",
  //       });
  //       const resData = await res.json();
      
  //       console.log("resData", resData)
  //     } catch (error) {
  //       console.error("Fetch error:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

const[loading ,setLoading] =useState(true);

  const fetchData = async () => {
    try {
        const main = new Listings();
        const response = await main.resturantdetilas(resId);
        setRecord(response.data.record[0]);
        setLoading(false);
    } catch (error) {
        console.log("error", error);
        setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []); 

  const userId =record.userId;
  const fetchproduct = async () => {
    try {
        const main = new Listings();
        const response = await main.userproductget(userId);
        console.log("ressssusuponse",response)
        setRecord(response.data.record[0]);
        setLoading(false);
    } catch (error) {
        console.log("error", error);
        setLoading(false);
    }
  };
  
  useEffect(() => {
    if(record){
      fetchproduct();
    }
  }, []);

  

  console.log("record",record)
  return (
    <>
      <div class="flex flex-row ">
        <div> 
          <img src={record.image} alt={record.index}/>
        </div>
        <div>
        <div class="flex flex-nowrap">
  <div>
    <h1>{record.restaurantname}</h1>
    <p>{record.category
}</p>
<p>{record.description}</p>
<p>{record.location}</p>
<p>Timing :- {record.
  opening_to
  } {record.
opening_from} </p>
  </div>
  
</div>

        </div>
       
      </div>
    </>
  )
}
