import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Listings from './../Api/Listings';
import { useDispatch } from 'react-redux';
import { loginRedux } from "../redux/userSlice";

export default function PrivateLayout(props ) {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthentication = async () => {
        const token = localStorage.getItem('token');
        console.log("token",token)
        const main = new Listings();
        const response = await main.privaterouter();
        dispatch(loginRedux(response.data?.user || null));
    };
    checkAuthentication();
  }, []);


  return <>{props.children}</>
}
