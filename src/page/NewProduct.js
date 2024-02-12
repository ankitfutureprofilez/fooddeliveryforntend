import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BsCloudUpload } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Listings from "../Api/Listings";
const Newproduct = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: ""
  })
  //console.log("recird djdj", data)

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })

  }

  const uploadImage = (e) => {
    const file = e.target.files[0];
    console.log("file", file)
    if (file) {
      setData((prev) => ({
        ...prev,
        image: file
      }));
    } else {
      console.error("No file selected");
    }
  };
  const [loading, setLoading] = useState(true);

  console.log("data", data)

  async function handleSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);
    const main = new Listings();
    try {
      const response = await main.Prodctadd(data);
      console.log('ree', response)
      if (response) {
        toast.success(response.data.message);
        setData(() => {
          return {
            name: "",
            category: "",
            image: "",
            price: "",
            description: ""
          };
        })
        navigate("/");
      } else {
        setIsSubmitting(false);
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
    <div className="flex justify-center items-center mt-4">
      <div className="w-full max-w-lg">
        <form
          enctype="multipart/form-data"
          className="m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Name</label>
          <input
            type={"text"}
            name="name"
            className="bg-slate-200 p-1 my-1"
            onChange={handleOnChange} value={data.name}
          />

          <label htmlFor="category">Category</label>
          <select
            className="bg-slate-200 p-1 my-1"
            id="category"
            name="category"
            onChange={handleOnChange} value={data.category}
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

          <label htmlFor="image">
            Image
            <div className="h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer">
              {data.imageName ? (
                <span>{data.imageName}</span>
              ) : (
                <span className="text-5xl">
                  <BsCloudUpload />
                </span>
              )}

              <input
                type="file"
                accept="image/*"
                id="image"
                onChange={uploadImage}
                className="hidden"
              />
            </div>
          </label>

          <label htmlFor="price" className="my-1">
            Price
          </label>
          <input
            type={"text"}
            className="bg-slate-200 p-1 my-1"
            name="price"
            onChange={handleOnChange}
            value={data.price}
          />

          <label htmlFor="description">Description</label>
          <textarea
            rows={2}
            value={data.description}
            className="bg-slate-200 p-1 my-1 resize-none"
            name="description"
            onChange={handleOnChange}
          ></textarea>

          <button className="bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow">
            Save
          </button>
        </form>

      </div>
    </div>
  );
};

export default Newproduct;
