import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import SearchBar from "./SearchBar";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  const handleLogout = () => {
    dispatch(logoutRedux());
    localStorage && localStorage.removeItem("token")
    toast("Logout successfully");
  };
  const cartItemNumber = useSelector((state) => state.product.cartItem)
  return (
    <header className="fixed w-full px-4 md:px-8 py-6 z-50 bg-white border-b">
      {/* desktop */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center h-full justify-between">
          <Link to={""}>
            <div className="h-10">
              <img src="/logo.png" className="h-full" />
            </div>
          </Link>
          <SearchBar />
          {/* <div className="mx-auto relative max-w-md w-full">
                  <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 ">  
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                          </svg>
                    </div>
                    <input type="search" name ="search" placeholder="Find and restaurant in your city" className="h-12 appearance-none block w-full bg-gray-100 text-gray-900  text-base rounded-lg py-3 px-3 pl-12 pr-32 pr-12 leading-tight focus:outline-none"/>
                  <div className="absolute top-1/2 right-2  -translate-y-1/2">
                      <button className="text-white text-base bg-orange-500 tracking-wide-md font-medium px-6 py-2 lg:px-8 lg:py-2 rounded-md outline-none focus:outline-none bg-yellow ease-linear transition-all duration-150">Search</button>
                  </div>
            </div> */}
          <div className="flex items-center gap-4 md:gap-7">
            {/* <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
                <Link to={""}>Home</Link>
                <Link to={"menu/63f0fdbb3bcc2f97fa53d25d"}>Menu</Link>
                <Link to={"about"}>About</Link>
                <Link to={"contact"}>Contact</Link>
              </nav> */}
            <div className="text-2xl text-slate-600 relative">
              <Link className="text-gray-900" to={"cart"}>
                {/* <BsCartFill /> */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
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
                  // <HiOutlineUserCircle />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>

                )}
              </div>
              {showMenu && (
                <div className="absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center m-0.5">
                  {userData.email ?
                    <div>
                      <p
                        className="cursor-pointer text-white px-2 bg-red-500 "
                        onClick={handleLogout}
                      >
                        Logout ({userData.firstName}){" "}
                      </p>
                      <p>
                        <NavLink
                          to={"newproduct"}
                          className="whitespace-nowrap cursor-pointer px-2"
                        >
                          New product
                        </NavLink>
                      </p>
                      <p>
                        <NavLink
                          to={"restaurant-register"}
                          className="whitespace-nowrap cursor-pointer px-2"
                        // onClick={handleLogout}
                        >
                          Become a Restaurant Owner
                        </NavLink>
                      </p>
                      <p>
                        <NavLink
                          to={"restaurants"}
                          className="whitespace-nowrap cursor-pointer px-2"
                        // onClick={handleLogout}
                        >
                          Restaurant List
                        </NavLink>
                      </p>
                    </div>
                    :
                    <NavLink
                      to={"login"}
                      className="whitespace-nowrap cursor-pointer px-2"
                    >
                      Login
                    </NavLink>

                  }


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