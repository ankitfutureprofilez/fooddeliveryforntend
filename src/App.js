
import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { setDataProduct } from "./redux/productSlide";
import { useDispatch, useSelector } from "react-redux";
import Listings from './Api/Listings';

function App() {
  const dispatch = useDispatch()
  const productData = useSelector((state) => state.product)
  const [Loading, setLoading] = useState(true)

  const fetchData = () => {
    const main = new Listings();
    const response = main.productlist();
    response.then((res) => {
      console.log("res?.data", res?.data)
      dispatch(setDataProduct(res?.data));
      setLoading(false);
    }).catch((error) => {
      console.log("error", error);
      setLoading(false);
    })
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <div>
        <Header />
        <main className="pt-24 bg-slate-100 min-h-[calc(100vh)]">
          <div className='container mx-auto'>
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;