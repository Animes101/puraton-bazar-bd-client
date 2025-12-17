import React from "react";
import { Link } from "react-router-dom";
import ReactHelmet from "../Components/Layout/ReactHelmet";
import { FaHome, FaShoppingBag } from "react-icons/fa";

const NotFound404 = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <ReactHelmet pageName={"404 | PurtonBazar"} />

      <div className="max-w-2xl text-center">
        {/* 404 Text */}
        <h1 className="text-[120px] md:text-[160px] font-extrabold text-bg3 leading-none">
          404
        </h1>

        {/* Message */}
        <h2 className="mt-4 text-2xl md:text-3xl font-bold text-gray-800">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-600 text-base md:text-lg">
          Oops! The page you are looking for doesn’t exist or has been moved.
          But don’t worry — PurtonBazar has plenty of amazing products waiting for you.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-bg3 text-white font-semibold hover:opacity-90 transition"
          >
            <FaHome />
            Back to Home
          </Link>

          <Link
            to="/category"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-bg3 text-bg3 font-semibold hover:bg-bg3 hover:text-white transition"
          >
            <FaShoppingBag />
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound404;
