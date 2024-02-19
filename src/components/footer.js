import React, { useState } from "react";
import instra from "../assest/instagram.png"
import twitter from "../assest/twitter.png"
import facebook from "../assest/facebook.png"

const footer = () => {
  return (
    <div className="bg-zinc-950 py-10">
        <div className='container mx-auto flex justify-between justify-items-center'>
            <a href="/"><img src="/footer-logo.png" class="h-full" /></a>
            <div className="flex items-center">
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
    </div>
  );
};

export default footer;
