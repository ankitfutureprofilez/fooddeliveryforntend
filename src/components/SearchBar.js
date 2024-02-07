import React, { useState } from "react";

export default function SearchBar({ data, setSearchResults }) {
  const [searchTerm, setSearchTerm] = useState("");

  // handleSearch function is complete use it after importing search bar

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.value);
    //     const searchTerm = e.target.value.toLowerCase();

    //     const filteredData = data.filter((item) =>
    //       item.name.toLowerCase().includes(searchTerm)
    //     );
    //     setSearchResults(filteredData);
  };

  return (
    <div className="mx-auto relative max-w-md w-full">
      <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
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
        onChange={handleSearch}
      />
      <div className="absolute top-1/2 right-2 -translate-y-1/2">
        <button
          onClick={handleSearch}
          className="text-white text-base bg-orange-500 tracking-wide-md font-medium px-6 py-2 lg:px-8 lg:py-2 rounded-md outline-none focus:outline-none bg-yellow ease-linear transition-all duration-150"
        >
          Search
        </button>
      </div>
    </div>
  );
}
