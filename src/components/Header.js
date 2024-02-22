import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import SearchBar from "./SearchBar";

const Header = () => {
  const navigate = useNavigate();
  const status = localStorage && localStorage.getItem("orderStatus");
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  const handleLogout = () => {
    dispatch(logoutRedux());
    localStorage && localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logout successfully");
  };

  const cartItemNumber = useSelector((state) => state.product.cartItem);
  return (
    <header className="fixed w-full  food-header">
      {/* desktop */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center h-full justify-between">
          <Link to={""}>
            <div className="logo-header">
              <img src="/logo.png" />
            </div>
          </Link>
          <SearchBar />
          <div className="flex items-center gap-4 md:gap-7">
          <div className="search-btn">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                  <path d="M 21 3 C 11.6 3 4 10.6 4 20 C 4 29.4 11.6 37 21 37 C 24.354553 37 27.47104 36.01984 30.103516 34.347656 L 42.378906 46.621094 L 46.621094 42.378906 L 34.523438 30.279297 C 36.695733 27.423994 38 23.870646 38 20 C 38 10.6 30.4 3 21 3 z M 21 7 C 28.2 7 34 12.8 34 20 C 34 27.2 28.2 33 21 33 C 13.8 33 8 27.2 8 20 C 8 12.8 13.8 7 21 7 z"></path>
                </svg>
            </div>
            <div className="text-2xl text-slate-600 relative">
            
              <Link className="text-gray-900" to={"cart"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" > <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /> </svg>
                <div className="absolute -top-3 -right-2 text-white bg-orange-500 h-5 w-5 rounded-full m-0 p-0 text-sm text-center ">
                  {cartItemNumber.length}
                </div>
              </Link>
            </div>

            <div className=" text-slate-600" onClick={handleShowMenu}>
                <div className="text-3xl flex items-center just text-gray-900 cursor-pointer w-8 h-8 rounded-full overflow-hidden">
                  {userData.image ? (
                    <img src={userData.image} className="h-full w-full" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7" > <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /> </svg>
                  )}
                </div>
                {showMenu && (
                  <div className="absolute right-2 bg-white rounded-lg  shadow drop-shadow-md flex flex-col min-w-[120px]  m-0.5">
                    <ul className="align-left dropdownitem">
                    {userData.email ? 
                      <>
                        <li className="cursor-pointer text-white bg-red-500 rounded-md">
                          <button onClick={handleLogout} >Logout ({userData.firstName})</button>
                        </li>
                        <li>
                          {userData.resId === 1 ? (
                            <>
                              <NavLink
                                to={"newproduct"}
                                className="whitespace-nowrap cursor-pointer rounded-md text-gray-800 hover:bg-gray-300 transition duration-300">
                                Add Product
                              </NavLink>

                              <NavLink
                                to={"dashboard"}
                                className="whitespace-nowrap cursor-pointer rounded-md  text-gray-800 hover:bg-gray-300 transition duration-300">
                                My Dashboard
                              </NavLink>
                            </>
                          ) : (
                            <>
                              {status !== null && ( // Check if status is not null
                                <NavLink
                                  to={"order_history"}
                                  className="whitespace-nowrap cursor-pointer rounded-md text-gray-800 hover:bg-gray-300 transition duration-300"
                                >
                                  Order History
                                </NavLink>
                              )}
                            </>
                          )}
                        </li>
                      </> 
                      : 
                      <>
                        <li>
                          <NavLink to={"login"} className="whitespace-nowrap cursor-pointer rounded-md text-gray-800 hover:bg-gray-300 transition duration-300">Login</NavLink>
                        </li>
                        <li>
                          <NavLink to={"signup"} className="whitespace-nowrap cursor-pointer rounded-md text-gray-800 hover:bg-gray-300 transition duration-300">Sign Up</NavLink>
                        </li>
                      </>
                    }
                    </ul>
                  </div>
                )}
              </div>

            
          </div>
        </div>
      </div>
      {/* mobile */}
    </header>
  );
};

export default Header;
