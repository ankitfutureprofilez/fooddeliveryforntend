import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginRedux  } from "../redux/userSlice";
import Listings from "../Api/Listings";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (Loading) {
      return false;
    }
    setLoading(true);
    const main = new Listings();
    try {
      const response = await main.Login(data);
      if (response.data.status) {
        console.log("response.data?.user",response.data?.user)
        dispatch(loginRedux(response.data?.user || null));
        localStorage && localStorage.setItem("token", response?.data.token)
        toast.success(response.data.message);
        navigate('/')
        setData({
          email: "",
          password: "",
        });
      } else {
        toast.error(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      toast.error("invalid Email/password");
      setLoading(false);
    }
  }



  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="w-full max-w-sm  m-auto flex  flex-col p-4">
        <h1 className='text-3xl font-bold mb-6 flex justify-center'>
          Sign in
          </h1>
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email"
          className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2"
          >Email
          </label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-gray-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password"
          className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2" >
            Password
            </label>
          <div className="flex rounded-full mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className=" w-full bg-slate-200 border-none outline-none "
              value={data.password}
              onChange={handleOnChange}
            />
          </div>

          <button className="flex justify-center w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            <span>{Loading ? "Wait.." : "Login"}</span>
          </button>
        </form>
        <p className="flex justify-center text-sm mt-2">
          Don't have account ?{" "}
          <Link to={"/signup"} className="text-red-500 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;