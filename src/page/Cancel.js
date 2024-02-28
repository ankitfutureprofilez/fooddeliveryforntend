import React, { useEffect } from "react";
import "../styles/cancel.css";
import { MdCancel } from "react-icons/md";
import Payment from "../Api/Payment";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Cancel = () => {

  const  {order_id} = useParams();
  useEffect(()=>{
    const main = new Payment()
    const response = main.payment_cancel(order_id);
    response.then((res) => {
      if(res.data.status){
        toast.error(res.data.msg);
      }
      }).catch((err) => {
        toast.success("Failed to update status");
      });
   },[]);


  return (
    // <div className='bg-red-200 w-full max-w-md m-auto h-36 flex justify-center items-center font-semibold text-lg'>
    //     <p>Payment is Cancel</p>
    // </div>
    <div className="container mx-auto flex justify-center items-center mt-16">
      
  <div class="row justify-content-center">
            <div class="col-md-5">
                <div class="message-box _success _failed">
                  <div className="mb-10 flex justify-center">  
                <MdCancel size={100} color="red"/>
                  </div>
                    <h2> Your Payment Failed </h2>
             <p>  Try again later </p> 
         
            </div> 
        </div> 
    </div> 
    </div>
  );
};

export default Cancel;
