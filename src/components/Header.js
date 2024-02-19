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
  const status = localStorage && localStorage.getItem("orderStatus")
  console.log("status", status)
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  console.log("userdata", userData)
  const dispatch = useDispatch();
  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  const handleLogout = () => {
    dispatch(logoutRedux());
    localStorage && localStorage.removeItem("token")
    navigate("/")
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
          <div className="flex items-center gap-4 md:gap-7">
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
                <div className="absolute right-2 bg-white rounded-lg  shadow drop-shadow-md flex flex-col min-w-[120px]  m-0.5">
                  {userData.email ?
                    <ul className="align-left dropdownitem">
                      <li
                        className="cursor-pointer text-white   bg-red-500 rounded-md"
                        onClick={handleLogout}
                      >
                        <button>Logout ({userData.firstName})</button>
                      </li>

                      <li>
                        {
                          userData.resId === 1? (<>

                           <>
                           
                           </>
                           <NavLink
                              to={"restaurant-register"}
                              className="whitespace-nowrap cursor-pointer rounded-md text-gray-800 hover:bg-gray-300 transition duration-300"
                            >
                              Edit My Restaurant
                            </NavLink>


                            <NavLink
                              to={"newproduct"}
                              className="whitespace-nowrap cursor-pointer rounded-md text-gray-800 hover:bg-gray-300 transition duration-300"
                            >
                              New product
                            </NavLink>

                            <NavLink
                          to={"dashboard"}
                          className="whitespace-nowrap cursor-pointer rounded-md  text-gray-800 hover:bg-gray-300 transition duration-300"
                        >
                          Restaurant dashboard
                        </NavLink>
                          </>) : (
                            <>

<NavLink
                            to={"order_history"}
                            className="whitespace-nowrap cursor-pointer rounded-md  text-gray-800 hover:bg-gray-300 transition duration-300"
                          >
                            Order History
                          </NavLink>
                            </>
                          )
                        }
                      </li>
                    </ul>
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
