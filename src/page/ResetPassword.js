import React, { useState } from "react";
import Listings from "../Api/Listings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    otp: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data", data);
    const main = new Listings();
    const response = main.ResetPassword(data);
    response.then((res) => {
      if (res && res.data && res.data.status===false) {
        toast.error(res.data.message);
        setData({
            email: "",
            otp: "",
            password: "",
          });
      }
      if (res && res.data && res.data.status===true) {
        toast.success(res.data.message);
        navigate("/login")
        setData({
            email: "",
            otp: "",
            password: "",
          });
      }       
      // else {
      //   toast.error(res?.data.message || "Something went wrong")
      // }
      // setLoading(false);
    }).catch((error) => {
      console.log("error", error);
      toast.error("Invalid Details");
      // setLoading(false);
    })
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <h1 className="text-3xl font-bold mb-6 flex justify-center ">Reset password</h1>
      <p className="text-slate-500">Fill up the form to reset the password</p>

      <form className="my-10" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold ">
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
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
            OTP
          </label>
          <input
            required
            type="number"
            id="otp"
            name="otp"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={data.otp}
            onChange={handleOnChange}
          />
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
            New Password
          </label>
          <input
            required
            type="password"
            id="password"
            name="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={data.password}
            onChange={handleOnChange}
          />

          <button
            type="submit"
            className="flex justify-center w-full m-auto cursor-pointer text-white text-xl font-medium text-center py-2 rounded-full mt-4 bg-indigo-600 hover:bg-indigo-500 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>

            <span className="ml-2">Reset password</span>
          </button>
        </div>
      </form>
    </div>
  );
}
