import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
// import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";
import Listings from "../Api/Listings";
import FileUpload from "../components/FileUpload";
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
  

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // let formdata = new FormData();
    // formdata.append("firstName", data.firstName);
    // formdata.append("lastName", data.lastName);
    // formdata.append("email", data.email);
    // formdata.append("password", data.password);
    // formdata.append("image",data.image);


    const main = new Listings();
    const response = main.Signup(data);
    response.then((res) => {
      if (res && res.data && res.data.status) {
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
        toast.error(res?.data.message || "Something went wrong")
      }
      setLoading(false);
    }).catch((error) => {
      console.log("error", error);
      toast.error(error?.response.data.message);
      toast.error(error?.response.data);
      setLoading(false);
    })
  }


return (
  <div className="flex mt-7">
  <div className="w-full max-width-sm m-auto p-4">
      {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}
      <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
          <FileUpload setImage={(image) => setData((prevData) => ({ ...prevData, image }))} />
          {data.image && <img src={data.image} alt="Profile" className="object-cover w-full h-full" />}
        </div>

      <form className="w-full" onSubmit={handleSubmit}>


        <div className="flex flex-wrap mt-7">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
             <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              First Name
            </label>
            <input
            required
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
            required
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
            required
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
              required
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.password}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <input
              required
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.confirmPassword}
                onChange={handleOnChange}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-7">
          <button
            type="submit"
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white text-lg font-medium px-6 py-3 rounded-full shadow-md"
          >
            <span>{loading ? "Wait..." : "Sign Up"}</span>
          </button>
        </div>
      </form>
      <p className="text-center text-sm mt-2">
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
