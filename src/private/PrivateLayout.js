import React, { useEffect } from 'react';
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
        const response = main.privaterouter();
        response.then((resp)=>{
          dispatch(loginRedux(resp.data?.user || null));
        }).catch((err)=>{
          console.log("err", err)
        });
    };
    checkAuthentication();
  }, []);


  return <>{props.children}</>
}
