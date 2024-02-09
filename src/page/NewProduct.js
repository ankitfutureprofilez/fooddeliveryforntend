import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from '../utility/ImagetoBase64'
import { useNavigate } from 'react-router-dom';
const Newproduct = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    category: "",
    image: null,
    price: "",
    description: ""
  })
  console.log("recird djdj" ,data)

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
    console.log("file",file)
    if (file) {
      setData((prev) => ({
        ...prev,
        image: file.name 
      }));
    } else {
      console.error("No file selected");
    }
  };
  
  
  const yourStoredToken = localStorage && localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, image, price, description } =
      data;
    if (
      name && category && image && price && description) {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("category", category);
        formData.append("image", image); 
        formData.append("price", price);
        formData.append("description", description);
      const fetchData = await fetch(
        `${process.env.REACT_APP_BASE_URL}/product/uploadProduct`,
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin" :"*",
             "content-type": "application/json",
             Authorization: `Bearer ${yourStoredToken}`
         },
          body: JSON.stringify(data),
        }
      );
      const fetchRes = await fetchData.json();
      console.log("fetchRes",fetchRes)
      toast(fetchRes.message);
      navigate('/')
      setData(() => {
        return {
          name: "",
          category: "",
          image: null,
          price: "",
          description: ""
        };
      });

    } else {
      toast("Enter required Fields");
    }
  };
  return (
    <div className="p-4">
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
          <option value={"icream"}>Icream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"rice"}>rice</option>
          <option value={"cake"}>Cake</option>
          <option value={"Sweet"}>Sweet</option>
          <option value={"burger"}>Burger</option>
          <option value={"panner"}>Panner</option>
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
  );
};

export default Newproduct;
