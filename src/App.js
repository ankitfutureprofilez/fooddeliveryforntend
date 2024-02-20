
import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { setDataProduct } from "./redux/productSlide";
import { useDispatch, useSelector } from "react-redux";
import Listings from './Api/Listings';
import Footer from "./components/footer.js";

function App() {
  const dispatch = useDispatch()
  const productData = useSelector((state) => state.product)
  const [Loading, setLoading] = useState(true);


  useEffect(()=>{
    const main = new Listings();
    const response =  main.productlist();
    response.then((res)=>{
      const newData = res?.data;
      dispatch(setDataProduct(newData))
      setLoading(false)
    }).catch((error)=>{
      console.log("error",error)
      setLoading(false)
    });


    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }

  },[])
  

  return (
    <>
      <Toaster
        position="top-left"
        reverseOrder={false}
      />
      <div>
        <Header />
        <main className="pt-24 bg-slate-100 min-h-[calc(100vh)]">
          <div className='container mx-auto'>
            <Outlet />
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default App;