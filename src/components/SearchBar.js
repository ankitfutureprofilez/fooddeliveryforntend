import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const data = useSelector((state) => state.product.productList);

  const searchData = (value) => {
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredData);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    searchData(value);
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
          placeholder="Find a restaurant in your city"
          className="h-12 appearance-none block w-full bg-gray-100 text-gray-900 text-base rounded-lg py-3 px-3 pl-12 pr-32 pr-12 leading-tight focus:outline-none"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className={`mt-2 overflow-y-auto ${searchResults.length === 0 ? '' : 'search-content'}`}>
        {searchResults.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-lg p-2 mb-2">
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
  
}
