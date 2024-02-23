import React, { useState } from "react";
import instra from "../assest/instagram.png"
import twitter from "../assest/twitter.png"
import facebook from "../assest/facebook.png"
import { Link } from "react-router-dom";

const footer = () => {
  return (
    <div className="bg-zinc-950 pt-4 pb-4 flex flex-col">
        <div className='container pb-1 mx-auto flex justify-between items-center'>
            <a href="/"><img  src="/footer-logo.png" class="logo-footer" /></a>
            <div className="flex items-center intwfa">
                <a href="/">
                    <img className="h-6 w-6" src={instra} alt="" />
                </a>
                <a className="my-1.5" href="/">
                    <img className="h-6 w-6" src={twitter} alt="" />
                </a>
                <a href="/">
                    <img className="h-6 w-6" src={facebook} alt="" />
                </a>
            </div>
        </div>
        <div className="container border-t border-gray-800 pt-2 mt-2 mb-0 mx-auto flex justify-between items-center">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link to={""} className="hover:underline" target="_blank" rel="noopener noreferrer">Food Truck™</Link>.</span>
      <ul className="flex flex-wrap items-center ml-3 md:mt-3 sm:mt-0">
        <li>
          <Link to={"/"} className="mr-2 text-sm text-gray-500 hover:underline md:mr-6">Home</Link>
        </li>
        <li>
          <Link to={"about"} className="mr-2 text-sm text-gray-500 hover:underline md:mr-6">About</Link>
        </li>
      </ul>
        </div>
    </div>
  );
};

export default footer;
