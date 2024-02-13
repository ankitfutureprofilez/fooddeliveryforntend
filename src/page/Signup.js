import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
// import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";
import Listings from "../Api/Listings";
function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  console.log("data", data)

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [image, setimage] = useState()
  console.log("image,image", image)
  const handleUploadProfileImage = (e) => {
    console.log("e.target.files[0]", e.target.files[0])
    const data = e.target.files[0];
    setimage(data)
    setData((prev) => ({
      ...prev,
      image: data,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (loading) {
      return false;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.confirmPassword);
    formData.append("image", data.image);
    const main = new Listings();
    const response = main.Signup(data);
    response.then((res) => {
      if (res.data.status === true) {
        toast.success(res.data.message);
        setData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          image: "",
        });
        navigate("/login")
      } else {
        toast.error("invalid email/password");
      }
      setLoading(false);
    }).catch((error) => {
      console.log("error", error);
      toast.error("invalid Email/password");
      setLoading(false);
    })
  }


return (
  <div className="flex mt-7">
  <div className="w-full max-w-sm bg-white m-auto p-4">
      {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}
      <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative ">
        <img
          src={data.image ? data.image : loginSignupImage}
          className="w-full h-full"
        >
        </img>
        <label htmlFor="profileImage">
          <div className="absolute bottom-0 h-1/3  bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
            <p className="text-sm p-1 text-white">Upload</p>
          </div>
          <input
            type={"file"}
            id="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleUploadProfileImage}
          />
        </label>
      </div>

      <form className="w-full" onSubmit={handleSubmit}>

        <div className="flex flex-wrap mt-7">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.firstName}
              onChange={handleOnChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.lastName}
              onChange={handleOnChange}
            />
          </div>
        </div>

        
          <div className="w-full px-3 mb-6 md:mb-0 mt-7">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.email}
              onChange={handleOnChange}
            />
          </div>

        <div className="flex flex-wrap mt-7">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.password}
                onChange={handleOnChange}
              />
              <span
                className="absolute top-0 right-0 mt-2 mr-3 text-xl cursor-pointer"
                onClick={handleShowPassword}
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.confirmPassword}
                onChange={handleOnChange}
              />
              <span
                className="absolute top-0 right-0 mt-2 mr-3 text-xl cursor-pointer"
                onClick={handleShowConfirmPassword}
              >
                {showConfirmPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-7">
          <button
            type="submit"
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white text-lg font-medium px-6 py-3 rounded-md shadow-md"
          >
            <span>{loading ? "Wait..." : "Sign Up"}</span>
          </button>
        </div>
      </form>
      <p className="text-left text-sm mt-2">
        Already have an account?{" "}
        <Link to={"/login"} className="text-red-500 underline">
          Login
        </Link>
      </p>
    </div>
  </div>
);
}

export default Signup;
