import React, { useState, useEffect } from "react";
import Users from "../Api/Users";
import { Link } from "react-router-dom";

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


  return (
    <div className="searchbar flex flex-col ...">
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
          type="search"
          name="search"
          placeholder="Find restaurant in your city"
          className="h-12 appearance-none block w-40 md:w-80 lg:w-96 bg-gray-100 text-gray-900  text-base rounded-lg py-3 px-3 pl-12 leading-tight focus:outline-none search-bar-head "
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold ">  No products or restaurants found.</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
