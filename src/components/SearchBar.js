import React, { useState, useEffect } from "react";
import Users from "../Api/Users";
import { Link } from "react-router-dom";
import { MdClear } from "react-icons/md";

import Product from "./Product";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [FetchProducts, setFetchProducts] = useState([]);
  const [searchContentVisible, setSearchContentVisible] = useState(false);
  const [Loading, setLoading] = useState()

  useEffect(() => {
    function handleBlur() {
      setSearchContentVisible(false);
    }

    document.addEventListener("click", handleBlur);
    return () => {
      document.removeEventListener("click", handleBlur);
    };
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.length >= 3) {
      setLoading(true);
      const main = new Users();
      const resp = main.search({
        search: value,
      });
      resp
        .then((res) => {
          setFetchProducts(res.data.products);
          setSearchContentVisible(true);
          setLoading(false);
        })
        .catch((err) => {
          console.log("err", err);
          setLoading(false);
        });
    } else {
      setFetchProducts([]);
      setSearchContentVisible(false);
      setLoading(false);
    }
  };
  const handleClose=()=>{
    setSearchTerm("");
    setSearchClose(true);    
  };

  const [searchClose,setSearchClose]=useState(true);

  return (
    <div className="relative">
    <div className={`searchbar ${searchClose==true?"searchbarHide": ""} flex flex-col`}>
      <div className="mx-auto relative max-w-md w-full">
        <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        
        <input
          type="text"
          name="search"
          placeholder="Find restaurant in your city"
          className="h-12 appearance-none block w-40 md:w-80 lg:w-96 bg-gray-100 text-gray-900  text-base rounded-lg py-3 px-3 pl-12 leading-tight focus:outline-none search-bar-head "
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
           <div className="absolute top-1/2 right-4 -translate-y-1/2"  onClick={handleClose} >
           <MdClear color="red" size={24}/>
        </div>
      </div>
      {Loading && searchTerm.length > 0 && <div className="text-center py-4">Loading...</div>}
      {searchContentVisible && (
        <div
          className={`mt-2 overflow-y-auto ${FetchProducts.length > 0
            ? "search-content Productadd"
            : ""
            }`}
        >
          {FetchProducts.length > 0 ? (
            <>
              <div className="flex search-lists justify-between items-center mb-4 product ">
              </div>
              {FetchProducts.map((item) => (

                  <Product
                  key={item._id}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  category={item.category}
                  price={item.price}
                  description={item.description}
                />
              ))}
            </>
          ) : null}
          {FetchProducts.length === 0 && (
            <div className="flex justify-between items-center mb-4 w-full">
              <h2 className="text-base text-center pt-7 text-gray-500   m-auto "> No products found.</h2>
            </div>
          )}
        </div>
      )}
    </div>
    <div onClick={()=>{setSearchClose(false)}} className="search-btn">
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
      <path d="M 21 3 C 11.6 3 4 10.6 4 20 C 4 29.4 11.6 37 21 37 C 24.354553 37 27.47104 36.01984 30.103516 34.347656 L 42.378906 46.621094 L 46.621094 42.378906 L 34.523438 30.279297 C 36.695733 27.423994 38 23.870646 38 20 C 38 10.6 30.4 3 21 3 z M 21 7 C 28.2 7 34 12.8 34 20 C 34 27.2 28.2 33 21 33 C 13.8 33 8 27.2 8 20 C 8 12.8 13.8 7 21 7 z"></path>
    </svg>
</div>
</div>
  );
}
