import React from 'react'
import { useMemo } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { tokenRedux } from '../redux/userSlice';
import Listings from './../Api/Listings';
export default function PrivateRoute(props) {
    const Navigate = useNavigate()
    const [content, setContent] = useState([]);
    const fetchData = () => {
        const main = new Listings();
        const response = main.user();
        response
          .then((res) => {
            if (res.data.status) {
              setContent(res.data.data);
            } else {
              toast.error(res.data.message);
            }
          })
          .catch((error) => {
            console.log("error", error);
            toast.error("Please log in first.");
            Navigate('/');
          });
      };
  
  useMemo(() => {
    fetchData();
  }, []);
  console.log("content",content)
  return (
    <div>
       <>{props.children}</>
    </div>
  )
}
