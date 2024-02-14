import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BsCloudUpload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Listings from "../Api/Listings";
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
  //console.log("recird djdj", data)

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
    console.log("file", file);
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

  // console.log("data", data)

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
      console.log("ree", response);
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
            <div class="w-full  px-3 mb-6 md:mb-0">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="file"
              >
                Upload image
              </label>
              <label htmlFor="file" className="file-upload-label">
                  <div className="file-upload-design w-100">
                    <svg viewBox="0 0 640 512" height="0.1em">
                      <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                    </svg>
                    <span className="browse-button">Browse file</span>
                  </div>
                  <input id="file" type="file" onChange={uploadImage} />
                </label>
            </div>
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
