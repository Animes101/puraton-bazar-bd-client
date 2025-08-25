import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClasses = ({ isActive }) =>
    isActive
      ? "flex items-center px-4 -mb-1 border-b-2 border-violet-600 text-violet-600 font-semibold"
      : "flex items-center px-4 -mb-1 border-b-2 border-transparent hover:border-violet-600 hover:text-violet-600";

  return (
    <header className="p-4 dark:bg-gray-100 dark:text-gray-800 shadow">
      <div className="container flex justify-between h-16 mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center p-2 text-xl font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 32 32"
            className="w-8 h-8 text-violet-600"
          >
            <path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11.922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742z"></path>
          </svg>
        </NavLink>

        {/* Nav Links */}
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li>
            <NavLink to="/" className={linkClasses}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={linkClasses}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className={linkClasses}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={linkClasses}>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Buttons */}
        <div className="items-center flex-shrink-0 hidden lg:flex">
          <button className="self-center px-6 py-2 rounded hover:bg-gray-200">
            Sign in
          </button>
          <button className="self-center px-6 py-2 font-semibold rounded bg-violet-600 text-white ml-2 hover:bg-violet-700">
            Sign up
          </button>
        </div>

        {/* Mobile menu button */}
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-gray-800"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
