import React, { useState, useEffect } from "react";
import Users from "../Api/Users";
import { Link } from "react-router-dom";
import productimage from "../assest/apple.jfif"
import restaurantImg from "../assest/Socorrco.jpg";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [FetchProducts, setFetchProducts] = useState([]);
  const [FetchRestaurants, setFetchRestaurants] = useState([]);
  const [searchContentVisible, setSearchContentVisible] = useState(false);

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
    const main = new Users();
    const resp = main.search({
      search: value,
    });
    resp
      .then((res) => {
        console.log("res", res);
        setFetchProducts(res.data.products);
        setFetchRestaurants(res.data.restaurants);
        setSearchContentVisible(true);
      })
      .catch((err) => {
        console.log("err", err);
      });
    // const resp = {
    //   products: [
    //     {
    //       _id: "65c4889b3abeea42b1d4b354",
    //       name: "test Product",
    //       category: "fruits",
    //       image:
    //         "https://www.bing.com/th?id=OIP.ILg_L9WAvlCzKgYJpYZVnAHaE7&w=172&h=150&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    //       price: "8785",
    //       description: "sfsdf",
    //       userId: 1,
    //       __v: 0,
    //     },
    //   ],
    //   restaurants: [
    //     {
    //       _id: "65c4889b3abeea42b1d4b354",
    //       restaurantname: "The Night Jar",
    //       category: "Veg",
    //       image:
    //         "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    //       location: "C-Scheme, Jaipur",
    //       description: "Best veg restaurant in jaipur",
    //       userId: 1,
    //       __v: 0,
    //     },
    //   ],
    //   message: "Result fetched successfully !!",
    //   status: 200,
    // };
  };

  return (
    <div className="searchbar flex flex-col ...">
      <div className="mx-auto relative max-w-md w-full">
        <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
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
          className="h-12 appearance-none block w-40 md:w-80 lg:w-96 bg-gray-100 text-gray-900  text-base rounded-lg py-3 px-3 pl-12 mr-4 leading-tight focus:outline-none"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {searchContentVisible && (
        <div
          className={`mt-2 overflow-y-auto ${
            FetchProducts.length > 0 || FetchRestaurants.length > 0
              ? "search-content"
              : ""
          }`}
        >
          {FetchProducts.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Products</h2>
                <Link to={"products"}>
                <button className="text-blue-500 ">View All</button>{" "}
                {/* "View All" button */}
                </Link>
              </div>
              {FetchProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-lg p-2 mb-2 flex "
                >
                  <img
                    src={item.image}
                    alt="product"
                    className="w-24 h-24 mr-2"
                  />
                  <div className="flex flex-col justify-center">
                    <span className="text-left">{item.name}</span>
                    <span className="text-left">{item.category}</span>
                    <span className="text-left">{item.description}</span>
                    <span className="text-left">Price - {item.price}</span>
                  </div>
                </div>
              ))}
            </>
          ) : null}

          {FetchRestaurants.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold ">Restaurants</h2>
                <Link to={"restaurants"}>
                  <button className="text-blue-500 ">View All</button>{" "}
                  {/* "View All" button */}
                </Link>
              </div>
              {FetchRestaurants.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-lg p-2 mb-2 flex"
                >
                  <img
                    src={item.image}
                    alt="restaurant"
                    className="w-24 h-24 mr-2"
                  />
                  <div className="flex flex-col justify-center">
                    <span className="text-left">{item.restaurantname}</span>
                    <span className="text-left">{item.category}</span>
                    <span className="text-left">{item.description}</span>
                    <span className="text-left">{item.location}</span>
                  </div>
                </div>
              ))}
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
