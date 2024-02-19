import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Listings from "../Api/Listings";
import { FaLocationCrosshairs } from "react-icons/fa6";
import ImageUpload from "../components/ImageUpload";

export default function RestaurantRegistration() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [Loading, setLoading] = useState(true)
  const [data, setData] = useState({
    category: "",
    ownername: "",
    image: "",
    restaurantname: "",
    description: "",
    staff: "",
    opening_from: "",
    opening_to: "",
    location: "",
    coordinates: "",
  });

  const [record, setRecord] = useState([]);
  const fetchData = async () => {
    try {
      const main = new Listings();
      const response = await main.resturantget();
      setRecord(response.data.record);
      const userdata = response.data.record;
      console.log("response.data.record", userdata)
      setData({
        category: userdata.category,
        ownername: userdata.ownername,
        image: userdata.image,
        restaurantname: userdata.restaurantname,
        description: userdata.description,
        staff: userdata.staff,
        opening_from: userdata.opening_from,
        opening_to: userdata.opening_to,
        location: userdata.location,
        coordinates: userdata.coordinates,
      });
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("record", record)

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };



  async function coordinatesdata() {
    if (!data.coordinates || data.coordinates.length === 0) {
      try {
        const apiUrl = "https://ipapi.co/json/";
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        const { latitude, longitude } = jsonData;
        setData((prevData) => ({
          ...prevData,
          coordinates: `${latitude}, ${longitude}`,
        }));
      } catch (error) {
        console.error("Error getting coordinates:", error);
        setIsSubmitting(false);
        toast.error("Error getting coordinates");
        return;
      }
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("ownername", data.ownername);
    formData.append("restaurantname", data.restaurantname);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("image", data.image);
    formData.append("staff", data.staff);
    formData.append("opening_from", data.opening_from);
    formData.append("opening_to", data.opening_to);
    formData.append("location", data.location);
    coordinatesdata();
    const main = new Listings();
    const response = main.resturantadd(formData);
    response.then((res) => {
      if (res?.data.status === true) {
        toast.success(res.data.message);
        setData(() => {
          return {
            category: "",
            restaurantname: "",
            image: "",
            ownername: "",
            description: "",
            staff: "",
            opening_from: "",
            opening_to: "",
            location: "",
            coordinates: "",
          };
        });
        navigate("/")
      } else {
        toast.error(" Enter the filed ");
      }
      setLoading(false);
    }).catch((error) => {
      console.log("error", error);
      toast.error("invalid Email/password");
      setLoading(false);
    })
  }

  const handleGetLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        const API_KEY = "AIzaSyDdc-XHVxNW5sw6Yi8MA5ck_EtkX2uNgSs";
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&key=${API_KEY}`
        );
        
        const locationString = response.data.display_name;
        setData((prev) => {
          return {
            ...prev,
            location: locationString,
            coordinates: `${latitude},${longitude}`,
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

  return (
    <div className="flex  mt-7">
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-6 flex justify-center">
          Restaurant Detilas 
        </h1>
        <form className="w-full" onSubmit={handleSubmit}>
          {/* First row */}
          <div class="flex flex-wrap mt-7">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                Owner Name
              </label>
              <div class="relative">
                <input
                  required
                  type={"text"}
                  name="ownername"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleOnChange}
                  value={data.ownername}
                />
              </div>
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                Restaurant Name
              </label>
              <div class="relative">
                <input
                  required
                  type={"text"}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="restaurantname"
                  onChange={handleOnChange}
                  value={data.restaurantname}
                />
              </div>
            </div>
          </div>
          {/* Second row */}
          <div class="flex flex-wrap mt-7">
            <div class="w-full md:w-1/4  px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                category
              </label>
              <div class="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state category"
                  name="category"
                  onChange={handleOnChange}
                  value={data.category}
                >
                  <option value={"other"}>Select Category</option>
                  <option value={"veg"}>Veg</option>
                  <option value={"nonveg"}>Non-Veg</option>
                  <option value={"both"}>Both</option>
                </select>

                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                Staff
              </label>
              <div class="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="  grid-state"
                  name="staff"
                  onChange={handleOnChange}
                  value={data.staff}
                >
                  <option value={"other"}>Select Staff</option>
                  <option value={"1-10"}>1-10</option>
                  <option value={"11-20"}>11-20</option>
                  <option value={"20+"}>20+</option>
                </select>

                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                Opening from
              </label>
              <div class="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="opening_from   grid-state"
                  name="opening_from"
                  onChange={handleOnChange}
                  value={data.opening_from}
                >
                  <option value={"other"}>Select</option>
                  <option value={"9am"}>9 AM</option>
                  <option value={"10am"}>10 AM</option>
                  <option value={"11am"}>11 AM</option>
                  <option value={"12pm"}>12 PM</option>
                  <option value={"1pm"}>1 PM</option>
                  <option value={"2pm"}>2 PM</option>
                  <option value={"3pm"}>3 PM</option>
                  <option value={"4pm"}>4 PM</option>
                  <option value={"5pm"}>5 PM</option>
                  <option value={"6pm"}>6 PM</option>
                  <option value={"7pm"}>7 PM</option>
                  <option value={"8pm"}>8 PM</option>
                </select>

                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                Opening Till
              </label>
              <div class="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="opening_to  grid-state"
                  name="opening_to"
                  onChange={handleOnChange}
                  value={data.opening_to}
                >
                  <option value={"other"}>Select</option>
                  <option value={"10am"}>10 AM</option>
                  <option value={"11am"}>11 AM</option>
                  <option value={"12pm"}>12 PM</option>
                  <option value={"1pm"}>1 PM</option>
                  <option value={"2pm"}>2 PM</option>
                  <option value={"3pm"}>3 PM</option>
                  <option value={"4pm"}>4 PM</option>
                  <option value={"5pm"}>5 PM</option>
                  <option value={"6pm"}>6 PM</option>
                  <option value={"7pm"}>7 PM</option>
                  <option value={"8pm"}>8 PM</option>
                  <option value={"9pm"}>9 PM</option>
                  <option value={"10pm"}>10 PM</option>
                  <option value={"11pm"}>11 PM</option>
                  <option value={"12am"}>12 AM</option>
                  <option value={"1am"}>1 AM</option>
                  <option value={"2am"}>2 AM</option>
                  <option value={"3am"}>3 AM</option>
                  <option value={"4am"}>4 AM</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {/* Third row */}
          <div className="flex flex-wrap mt-7">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <ImageUpload setImage={(image) => setData((prevData) => ({ ...prevData, image }))}  records = {record?.image} />
            </div>
            <div class="w-full  md:w-1/2 px-3 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-state"
                >
                  Description
                </label>
                <div class="relative">
                  <textarea
                    rows={2}
                    required
                    value={data.description}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    name="description"
                    onChange={handleOnChange}
                  ></textarea>
                </div>
              </div>
          </div>
          {/* Fourth row */}
          <div className="flex flex-wrap mt-7">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                Location
              </label>
              <div className="relative ">
                <input
                  required
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="location"
                  onChange={handleOnChange}
                  value={data.location}
                />
                <div className="absolute top-2 right-2">
                  <button
                    type="button"
                    onClick={handleGetLocation}
                  >
                    <FaLocationCrosshairs size={24} color="#0000ff" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Submit button */}
          <div className="flex justify-center ">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-500 hover:bg-blue-600 text-white text-lg font-medium w-32 h-10 mt-7 rounded-full px-6 py-6 shadow-md mt-5 flex justify-center items-center"
            >
              <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}

// const styles = StyleSheet.create({})