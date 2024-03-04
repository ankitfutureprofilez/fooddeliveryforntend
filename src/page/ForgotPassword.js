import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Listings from "../Api/Listings";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const main = new Listings();
    const response = main.ForgotPassword({ email });
    response
      .then((res) => {
        if (res && res.data && res.data.status === false) {
          toast.error(res.data.message);
          setEmail("");
        }
        if (res && res.data && res.data.status === true) {
          console.log(res.data);
          toast.success(res.data.message);
          const code=res.data.token;
          navigate(`/resetpassword/${code}`);
          setEmail("");
        }
        // else {
        //   toast.error(res?.data.message || "Something went wrong")
        // }
        // setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error?.response.data.message);
        toast.error(error?.response.data);
        // setLoading(false);
      });
  };

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="container mx-auto md:w-1/2">
      <div className="mt-7 bg-white  rounded-xl shadow-lg ">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-6 flex justify-center ">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-gray-600 ">
              Remember your password?
              <Link to={"/login"}>
                <span className="text-blue-500"> Login here</span>
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                  <label
                    for="email"
                    className="block uppercase tracking-wide text-gray-700 text-s font-bold"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className=" mb-2 w-full bg-gray-200 px-2 py-1 rounded focus-within:outline-blue-300"
                      required
                      aria-describedby="email-error"
                      value={email}
                      onChange={handleOnChange}
                    />
                  
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="email-error"
                  >
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>
                <button
                  type="submit"
                  className="flex justify-center w-full m-auto bg-blue-600 hover:bg-blue-500 cursor-pointer text-white text-xl font-medium text-center py-2 rounded-full mt-4"
                >
                  Generate OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <p className="mt-3 flex justify-center text-md items-center text-center divide-x divide-gray-300 text-blue-500 ">
        <Link to={"/about"}>
          {/* <a className="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600" href="#"> */}
          Contact us!
        </Link>
      </p>
    </div>
  );
}