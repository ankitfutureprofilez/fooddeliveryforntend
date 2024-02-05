//import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import axios from "axios";

export default function RestaurantRegistration() {
    const [data,setData] = useState({
        category : "",
        name : "",
        image : "",
        restaurantName : "",
        description : "",
        staff:"",
        timings:"",
        location:""
      })
      const handleOnChange = (e)=>{
        const {name,value} = e.target
  
        setData((preve)=>{
            return{
              ...preve,
              [name] : value
            }
        })
  
      }
      const uploadImage = async(e)=>{
        const data = await ImagetoBase64(e.target.files[0])
        // console.log(data)
        setData((preve)=>{
          return{
            ...preve,
            image : data
          }
      })
     }

     const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log("data,data", data);
     }     
     const handleGetLocation = async () => {
        if (navigator.geolocation) {
          try {
            const position = await getCurrentPosition();
            const { latitude, longitude } = position.coords;
      
            const API_KEY = 'AIzaSyDdc-XHVxNW5sw6Yi8MA5ck_EtkX2uNgSs';
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&key=${API_KEY}`
            );
            console.log(response);
      
            // Extract relevant data from the response if needed
            const { road, suburb, city, postcode } = response.data.address;
            const locationString = `${road}, ${suburb} ${city}, ${postcode}`;
      
            setData((prev) => {
              return {
                ...prev,
                location: locationString,
              };
            });
          } catch (error) {
            console.error('Error getting location:', error);
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
            onChange={handleOnChange} value={data.category}
        >
          <option value={"other"}>Select Category</option>
          <option value={"veg"}>Veg</option>
          <option value={"nonveg"}>Non-Veg</option>
        </select>

        <label htmlFor="name">Name</label>
        <input
          type={"text"}
          name="name"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange} value={data.name}
        />

        <label htmlFor="image">
          Images
          <div className="h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer">
            {
                data.image ? <img src={data.image} className="h-full" /> 
                :
                <span className='text-5xl'><BsCloudUpload/></span> 
            }

            <input
              type={"file"}
              accept="image/*"
              id="image"
              onChange={uploadImage}
              className="hidden"
            />
          </div>
        </label>

        <label htmlFor="restaurantName" className="my-1">
          Restaurant Name
        </label>
        <input
          type={"text"}
          className="bg-slate-200 p-1 my-1"
          name="restaurantName"
          onChange={handleOnChange}
          value={data.restaurantName}
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
            onChange={handleOnChange} value={data.staff}
        >
          <option value={"other"}>Select Staff</option>
          <option value={"1-50"}>1-50</option>
          <option value={"50-100"}>50-100</option>
          <option value={"100+"}>100+</option>
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
