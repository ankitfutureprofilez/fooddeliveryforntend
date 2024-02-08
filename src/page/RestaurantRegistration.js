//import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

export default function RestaurantRegistration() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    category: "",
    O_name: "",
    image: "",
    r_name: "",
    description: "",
    staff: "",
    timings: "",
    location: "",
    coordinates: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    // console.log(data)
    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };
  const yourStoredToken = localStorage && localStorage.getItem("token");
  //console.log("yourStoredToken",yourStoredToken)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.coordinates || data.coordinates.length === 0) {
      try {
        // Fetch longitude and latitude from the API
        const apiUrl = 'https://ipapi.co/json/';
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        const { latitude, longitude } = jsonData;

        // Update the coordinates in the data object
        setData((prevData) => ({
          ...prevData,
          coordinates: `${latitude}, ${longitude}`
        }));
      } catch (error) {
        console.error("Error getting coordinates:", error);
        toast.error("Error getting coordinates");
        return; // Stop execution if there's an error
      }
    }
    const {
      O_name,
      r_name,
      category,
      image,
      description,
      location,
      staff,
      timings,
      coordinates,
    } = data;
    // console.log("Data",data)
    if (
      O_name &&
      r_name &&
      category &&
      image &&
      description &&
      location &&
      staff &&
      timings &&
      coordinates
    ) {

      const fetchData = await fetch(
        `${process.env.REACT_APP_BASE_URL}/restaurant/add`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${yourStoredToken}`,
          },
          body: JSON.stringify(data),
          mode: "cors",
        }
      );
      const fetchRes = await fetchData.json();
      //console.log("fetchRes",fetchRes)
      toast(fetchRes.message);
      navigate("/")
      setData(() => {
        return {
          category: "",
          O_name: "",
          image: "",
          r_name: "",
          description: "",
          staff: "",
          timings: "",
          location: "",
          coordinates: ""
        };
      });
    } else {
      toast("Enter required Fields");
    }
  };
  const handleGetLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;

        const API_KEY = "AIzaSyDdc-XHVxNW5sw6Yi8MA5ck_EtkX2uNgSs";
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&key=${API_KEY}`
        );
        //console.log(response);

        // Extract relevant data from the response if needed
        const { road, suburb, city, postcode } = response.data.address;
        const locationString = `${road}, ${suburb} ${city}, ${postcode}`;

        setData((prev) => {
          return {
            ...prev,
            location: locationString,
            coordinates: `${latitude},${longitude}`
          };
        });
      } catch (error) {
        console.error("Error getting location:", error);
      }
    }
  };

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  };
  //  const handleGetLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           setData((prev) => {
  //             return {
  //               ...prev,
  //               location: `${position.coords.latitude}, ${position.coords.longitude}`,
  //             };
  //           });
  //         }
  //       );
  //     }
  //   };

  return (
    <div className="p-4">
      <form
        className="m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white"
        onSubmit={handleSubmit}
      >
        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-200 p-1 my-1"
          id="category"
          name="category"
          onChange={handleOnChange}
          value={data.category}
        >
          <option value={"other"}>Select Category</option>
          <option value={"veg"}>Veg</option>
          <option value={"nonveg"}>Non-Veg</option>
          <option value={"both"}>Both</option>
        </select>

        <label htmlFor="name">Owner Name</label>
        <input
          type={"text"}
          name="O_name"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
          value={data.O_name}
        />

        <label htmlFor="image">
          Images
          <div className="h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} className="h-full" />
            ) : (
              <span className="text-5xl">
                <BsCloudUpload />
              </span>
            )}

            <input
              type={"file"}
              accept="image/*"
              id="image"
              onChange={uploadImage}
              className="hidden"
            />
          </div>
        </label>

        <label htmlFor="r_name" className="my-1">
          Restaurant Name
        </label>
        <input
          type={"text"}
          className="bg-slate-200 p-1 my-1"
          name="r_name"
          onChange={handleOnChange}
          value={data.r_name}
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows={2}
          value={data.description}
          className="bg-slate-200 p-1 my-1 resize-none"
          name="description"
          onChange={handleOnChange}
        ></textarea>

        <label htmlFor="staff">Staff </label>
        <select
          className="bg-slate-200 p-1 my-1"
          id="staff"
          name="staff"
          onChange={handleOnChange}
          value={data.staff}
        >
          <option value={"other"}>Select Staff</option>
          <option value={"1-10"}>1-10</option>
          <option value={"11-20"}>11-20</option>
          <option value={"20+"}>20+</option>
        </select>

        <label htmlFor="timings" className="my-1">
          Timings
        </label>
        <input
          type={"text"}
          className="bg-slate-200 p-1 my-1"
          name="timings"
          onChange={handleOnChange}
          value={data.timings}
        />

        <label htmlFor="location" className="my-1">
          Location
        </label>
        <div className="flex my-1">
          <input
            type="text"
            className="bg-slate-200 p-1 my-1 flex-grow"
            name="location"
            onChange={handleOnChange}
            value={data.location}
          />
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-2 py-1 ml-2"
            onClick={handleGetLocation}
          >
            Get Location
          </button>
        </div>

        <button className="bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow">
          Submit
        </button>
      </form>
    </div>
  );
}

// const styles = StyleSheet.create({})
