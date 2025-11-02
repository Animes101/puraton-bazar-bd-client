import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
const Navbar = () => {
  // Active link style setup
  const linkClasses = ({ isActive }) =>
    isActive
      ? "text-textColor font-semibold text-xl  font-bold  border-b-2 border-textColor"
      : "hover:text-textColor text-xl  font-bold  hover:border-b-2 hover:border-textColor";

  return (
    <div className="shadow-sm sticky top-0 z-50 bg-gradient-to-r from-bgGradient1 from-10% via-bgGradinet3 via-50% to-bgGradient2 to-60% ">
      <div className="navbar container mx-auto">
        {/* Left Section */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            {/* Mobile Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/" className={linkClasses}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/category" className={linkClasses}>
                  Category
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={linkClasses}>
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" className={linkClasses}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" className={linkClasses}>
                   <FaCartPlus />

                </NavLink>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <NavLink to="/" className="normal-case text-2xl font-bold">
            <h2 className="font-bold text-textColor">Puraton<span className="text-black" >Bazar</span>.com</h2>
          </NavLink>
        </div>

        {/* Center Menu (Desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4">
            <li>
              <NavLink to="/" className={linkClasses}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/category" className={linkClasses}>
                Category
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={linkClasses}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className={linkClasses}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className={linkClasses}>
                Cart <FaCartPlus />
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right Side Avatar */}
        <div className="navbar-end">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-violet-500 ring-offset-base-100 ring-offset-2">
              <img
                src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"
                alt="User Avatar"
              />
            </div>
          </div>
          <Link to={'/login'}><button className="pl-5">Login</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
