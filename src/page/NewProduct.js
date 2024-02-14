import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BsCloudUpload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Listings from "../Api/Listings";
import ImageUpload from "../components/ImageUpload";
const Newproduct = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
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

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData((prev) => ({
        ...prev,
        image: file,
      }));
    } else {
      console.error("No file selected");
    }
  };
  const [loading, setLoading] = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("image", data.image);
    const main = new Listings();
    try {
      const response = await main.Prodctadd(formData);
      if (response) {
        toast.success(response.data.message);
        setData(() => {
          return {
            name: "",
            category: "",
            image: "",
            price: "",
            description: "",
          };
        });
        navigate("/");
      } else {
        setLoading(false);
        toast("Enter required Fields");
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      toast.error(error);
      setLoading(false);
    }
  }
  return (
    <div className="flex  mt-7">
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6 flex justify-center">
        Product Registration
      </h1>
      <form
        enctype="multipart/form-data"
        className="w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap mt-7">
          <div class="w-24 md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              htmlFor="name"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Name
            </label>
            <input
              type={"text"}
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleOnChange}
              value={data.name}
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              htmlFor="price"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Price
            </label>
            <input
              type={"text"}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="price"
              onChange={handleOnChange}
              value={data.price}
            />
          </div>
        </div>
    
        <div className="flex flex-wrap mt-7">
          <div class="w-full md:w-1/2  px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <div class="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="category"
                name="category"
                onChange={handleOnChange}
                value={data.category}
              >
                <option value={"other"}>select category</option>
                <option value={"fruits"}>Fruits</option>
                <option value={"vegetable"}>Vegetable</option>
                <option value={"icecream"}>Icecream</option>
                <option value={"dosa"}>Dosa</option>
                <option value={"pizza"}>Pizza</option>
                <option value={"rice"}>Rice</option>
                <option value={"cake"}>Cake</option>
                <option value={"Sweet"}>Sweet</option>
                <option value={"burger"}>Burger</option>
                <option value={"paneer"}>Paneer</option>
                <option value={"sandwich"}>Sandwich</option>
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
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <div class="relative"></div>
            <textarea
              rows={2}
              value={data.description}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              name="description"
              onChange={handleOnChange}
            ></textarea>
          </div>
        </div>
        <div className="flex flex-wrap mt-7  ">
        <ImageUpload  setImage={(image) => setData((prevData) => ({ ...prevData, image }))}/>
          </div>

        <div className="flex justify-center ">
          <button className="bg-red-500 hover:bg-blue-600 text-white text-lg font-medium w-32 h-10 mt-7 rounded-full px-6 py-6 shadow-md mt-5 flex justify-center items-center">
            <span>{loading ? "Submitting..." : "Submit"}</span>
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Newproduct;
