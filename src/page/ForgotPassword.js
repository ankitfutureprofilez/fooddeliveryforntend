import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Listings from "../Api/Listings";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading]=useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(loading==true){return;}
    setLoading(true);
    const main = new Listings();
    const response = main.ForgotPassword({ email });
    response
      .then((res) => {
        if (res && res.data && res.data.status === false) {
          toast.error(res.data.message);
          setLoading(false);
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
        setLoading(false);
      });
  };

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="w-full max-w-sm m-auto flex flex-col p-4">
        <h1 className="text-3xl font-bold mb-6 flex justify-center">Forgot password?</h1>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Remember your password?
          <Link to={"/login"} className="text-blue-500 ml-1 underline">
            Login here
          </Link>
        </p>
  
        <div className="mt-8">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-y-4">
              <label
                htmlFor="email"
                className="block uppercase tracking-wide text-gray-700 text-s font-bold"
              >
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mb-2 w-full bg-gray-200 px-2 py-1 rounded focus-within:outline-blue-300"
                  required
                  aria-describedby="email-error"
                  value={email}
                  onChange={handleOnChange}
                />
                <p className="hidden text-xs text-red-600 mt-2" id="email-error">
                  Please include a valid email address so we can get back to you
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 cursor-pointer text-white text-xl font-medium text-center py-2 rounded-full mt-4"
              >
                {loading ? `Generating...` : `Generate OTP`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
}
