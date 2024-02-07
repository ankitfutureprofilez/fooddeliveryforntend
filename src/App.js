
import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setDataProduct } from "./redux/productSlide";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product)
//  console.log("productData",productData)

 useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      // console.log("token",token)
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/product/productlist`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
     mode: "cors",
      });
      const resData = await res.json();
    // console.log("resData", resData);
     const trecord =  dispatch(setDataProduct(resData?.data));
    // console.log("trecord",trecord)
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  fetchData();
}, []);

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className="pt-24 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;