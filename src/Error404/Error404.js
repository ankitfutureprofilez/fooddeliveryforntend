import React from "react";
import { Link } from "react-router-dom";

export default function Error404() {
  return (
      <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center justify-center m-auto md:py-24 lg:py-32">
            <h1 className="font-bold text-blue-600 text-9xl">404</h1>
            <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
              <span className="text-red-500">Oops! Page Not Found</span>
            </p>
            <p className="mb-8 text-center text-gray-500 md:text-lg">
              The page you’re looking for doesn’t exist.
            </p>
            <Link
              to="/"
              className="px-5 py-2 rounded-md text-blue-100 bg-blue-600 hover:bg-blue-700">
              Go home
            </Link>
          </div>
      </div>
  );
}
