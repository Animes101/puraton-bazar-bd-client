import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { AuthContext } from "../../context/AuthProvider";
import useCart from "../../hooks/useCart";
import { CiShoppingCart } from "react-icons/ci";
import Swal from 'sweetalert2'
import { Toaster, toast } from "react-hot-toast";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const { data } = useCart();

  useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  // --------------------------
  // Function to define NavLink classes
  // Prevents border jump on hover by reserving border space
  // Active link: colored border, bold
  // Hover: only color changes, height stays same
  // --------------------------
  const linkClasses = ({ isActive }) =>
  `text-xl font-bold border-t-4 border-transparent pt-1 
   ${isActive 
      ? `border-textColor text-bg2 font-semibold `   // active
      : "text-bg1 hover:border-textColor"}`;    // inactive


  // --------------------------
  // Logout handler
  // --------------------------
  const handleLogout = () => {
    logout()
    .then(()=>{
      Swal.fire({
  title: "Logged Out Successfully",
  icon: "success",
  draggable: true,
  customClass: {
    popup: 'bg-bgGradient1  text-white p-6 rounded-xl shadow-lg',   
    title: 'text-2xl font-bold text-black text-center',    
    confirmButton: 'bg-black text-white font-bold py-2 px-4 rounded' 
  }
  
});

    }).catch(err=>{
      toast.error(`${err.message}`)
    })
  };

  return (
    // --------------------------
    // Navbar wrapper: fixed at top with semi-transparent background
    // --------------------------
    <div  className={`fixed top-0 right-0 left-0 z-10 transition-all duration-300 
  ${isScrolled ? "bg-bg3" : "bg-bg3"}`}>

      {/* Tost Container */}
      <Toaster
  position="bottom-center"
  reverseOrder={false}
/>
      <div className="navbar container mx-auto">
        {/* --------------------------
            Left Section: Logo + Mobile menu
        -------------------------- */}
        <div className="navbar-start">
          {/* --------------------------
              Mobile Menu button (hamburger)
          -------------------------- */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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

            {/* --------------------------
                Mobile Dropdown Menu
                Fixed full width below navbar
                Transparent + blur effect
            -------------------------- */}
            <ul
              tabIndex={0}
              className="
                menu menu-sm dropdown-content 
                fixed top-[60px] left-0 w-full
                bg-black/40 backdrop-blur-md 
                p-5 space-y-3 shadow z-50 rounded-none
              "
            >
              {/* Main links */}
              <li><NavLink to="/" className={linkClasses}>Home</NavLink></li>
              <li><NavLink to="/category" className={linkClasses}>Category</NavLink></li>
              <li><NavLink to="/contact" className={linkClasses}>Contact</NavLink></li>
              <li><NavLink to="/dashboard" className={linkClasses}>Dashboard</NavLink></li>

              {/* Cart (mobile) */}
              <li className="lg:hidden">
                <NavLink to="/cart" className={linkClasses}>
                  <button className="btn">
                    <FaCartPlus />
                    <div className="badge badge-sm">{data?.length}</div>
                  </button>
                </NavLink>
              </li>

              {/* Login/Logout (mobile) */}
              <li className="lg:hidden">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="btn bg-bgGradinet3 text-black"
                  >
                    Logout
                  </button>
                ) : (
                  <Link className="btn w-full bg-bgGradient1 text-black" to="/login">
                    <button>Login</button>
                  </Link>
                )}
              </li>

              {/* Avatar (mobile) */}
              <li className="flex justify-center items-center lg:hidden">
                {user && (
                  <div className="avatar">
                    <div className="w-10 rounded-full ring ring-bgGradient2 ring-offset-base-100 ring-offset-2">
                      <img
                        src={
                          user?.photoURL ||
                          "https://i.ibb.co/YbVjtMX/default-avatar.png"
                        }
                        alt="User Avatar"
                      />
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>

          {/* --------------------------
              Logo
          -------------------------- */}
          <NavLink to="/" className="normal-case text-2xl font-bold">
            <h2 className="font-bold text-bg2">
              Puraton<span className="text-bg2">Bazar</span>.com
            </h2>
          </NavLink>
        </div>

        {/* --------------------------
            Center Menu: Desktop
        -------------------------- */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4">
            <li><NavLink to="/" className={linkClasses}>Home</NavLink></li>
            <li><NavLink to="/category" className={linkClasses}>Category</NavLink></li>
            <li><NavLink to="/contact" className={linkClasses}>Contact</NavLink></li>
            <li><NavLink to="/dashboard" className={linkClasses}>Dashboard</NavLink></li>
          </ul>
        </div>

        {/* --------------------------
            Right Side (Desktop)
            Hidden on mobile
        -------------------------- */}
        <div className="navbar-end hidden lg:flex items-center gap-4">
          {/* Cart */}
          <NavLink to="/cart">
            <button className="relative inline-flex">
              <CiShoppingCart size={30} className="text-bgGradient1 font-bold" />
              <span className="
                absolute -top-3 -right-2 bg-bgGradient1 text-black 
                text-xs font-bold w-5 h-5 flex items-center justify-center 
                rounded-full shadow
              ">
                {data?.length}
              </span>
            </button>
          </NavLink>

          {/* Avatar */}
          {user && (
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-bgGradient2 ring-offset-base-100 ring-offset-2">
                <img
                  src={user?.photoURL || "https://i.ibb.co/YbVjtMX/default-avatar.png"}
                  alt="User Avatar"
                />
              </div>
            </div>
          )}

          {/* Login / Logout */}
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg text-xl bg-bgGradient1"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="px-4 py-2 rounded-lg text-xl bg-bgGradient1">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
