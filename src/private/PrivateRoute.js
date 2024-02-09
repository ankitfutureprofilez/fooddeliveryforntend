import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Listings from './../Api/Listings';

export default function PrivateRoute({ props }) {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("token",token)
        if (!token) {
          throw new Error('User not authenticated');
        }
        const main = new Listings();
        const response = await main.privaterouter();
        console.log("response",response)
        if (response) {
          setAuthenticated(true);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error('Please log in first.');
        navigate('/login');
      }
    };

    checkAuthentication();
  }, [navigate]);

  return authenticated ? <>{props.children}</> : null;
}
