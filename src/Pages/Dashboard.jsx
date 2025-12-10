import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { FaHome } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { HiChevronDoubleRight } from "react-icons/hi";

const Dashboard = () => {
  const { isAdmin } = useAdmin();
  const admin = isAdmin;

  return (
    <div className="md:grid grid-cols-4 gap-10 mt-[64px]">

      {/* ===========================
            📱 MOBILE DRAWER START
      ============================*/}
      <div className="drawer md:hidden">
        <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />

        {/* Drawer toggle button */}
        <div className="drawer-content">
          <label htmlFor="my-drawer-1" className="btn drawer-button bg-transparent">
            <HiChevronDoubleRight className="text-3xl" />
          </label>
        </div>

        {/* Drawer sidebar */}
        <div className="drawer-side">
          <label htmlFor="my-drawer-1" className="drawer-overlay"></label>

          <ul className="menu bg-bg3 w-80 p-4 min-h-[calc(100vh-64px)] mt-[64px] text-white">
            {/* Drawer Menu Content */}
            <div className="col-span-1">

              {admin ? (
                // ================= Admin Menu Mobile =================
                <ul className="flex flex-col justify-around h-[400px] font-bold items-center">

                  {/* Active = works automatically with NavLink */}
                  <li>
                    <NavLink
                      to="/dashboard/adminHome"
                      className={({ isActive }) =>
                        isActive ? "text-red-400" : "text-white"
                      }
                    >
                      <FaHome className="inline-block" /> Admin Home
                    </NavLink>
                  </li>

                  <li><NavLink to="/dashboard/all-users">All Users</NavLink></li>
                  <li><NavLink to="/dashboard/addItem">Add Items</NavLink></li>
                  <li><NavLink to="/dashboard/products">All Products</NavLink></li>
                  <li><NavLink to="/dashboard/admin/paymentHistory">Payment Status</NavLink></li>
                  <li><NavLink to="/dashboard/admin/profile">Admin Profile</NavLink></li>

                  <hr className="w-[60%] mx-auto" />

                  {/* Main Menu */}
                  <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/category">Category</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                  </ul>
                </ul>
              ) : (
                // ================= User Menu Mobile =================
                <ul className="flex flex-col justify-around h-[400px] font-bold items-center">

                  <li>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        isActive ? "text-red-400" : "text-white"
                      }
                    >
                      Home <FaHome className="inline-block text-xl" />
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/Payment"
                      className={({ isActive }) =>
                        isActive ? "text-red-400" : "text-white"
                      }
                    >
                      Payment <FaHistory className="inline-block text-xl" />
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/profile"
                      className={({ isActive }) =>
                        isActive ? "text-red-400" : "text-white"
                      }
                    >
                      Profile <CgProfile className="inline-block text-xl" />
                    </NavLink>
                  </li>

                  <hr className="w-[60%] mx-auto" />

                  {/* Main Menu */}
                  <ul className="space-y-5 flex flex-col items-center">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/category">Category</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                  </ul>

                </ul>
              )}
            </div>
          </ul>
        </div>
      </div>

      {/* ===========================
              🖥 DESKTOP SIDEBAR
      ============================*/}
      <div className="col-span-1 bg-bg3 h-screen text-white hidden md:block">
        {admin ? (
          // ================= Admin Menu Desktop =================
          <ul className="flex flex-col justify-around h-[400px] font-bold items-center">

            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "text-red-400" : "text-white"
                }
              >
                <FaHome className="inline-block" /> Admin Home
              </NavLink>
            </li>

            <li><NavLink to="/dashboard/all-users">All Users</NavLink></li>
            <li><NavLink to="/dashboard/addItem">Add Items</NavLink></li>
            <li><NavLink to="/dashboard/products">All Products</NavLink></li>
            <li><NavLink to="/dashboard/admin/paymentHistory">Payment Status</NavLink></li>
            <li><NavLink to="/dashboard/admin/profile">Admin Profile</NavLink></li>

            <hr className="w-[60%] mx-auto" />

            {/* Main Menu */}
            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/category">Category</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
              <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            </ul>
          </ul>
        ) : (
          // ================= User Menu Desktop =================
          <ul className="flex flex-col justify-around h-[400px] font-bold items-center">

            <li>
              <NavLink
                to="/dashboard/home"
                className={({ isActive }) =>
                  isActive ? "text-red-400" : "text-white"
                }
              >
                Home <FaHome className="inline-block text-xl" />
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/Payment"
                className={({ isActive }) =>
                  isActive ? "text-red-400" : "text-white"
                }
              >
                Payment <FaHistory className="inline-block text-xl" />
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  isActive ? "text-red-400" : "text-white"
                }
              >
                Profile <CgProfile className="inline-block text-xl" />
              </NavLink>
            </li>

            <hr className="w-[60%] mx-auto" />

            <ul className="space-y-5 text-center">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/category">Category</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>

          </ul>
        )}
      </div>

      {/* ===========================
             CONTENT SECTION
      ============================*/}
      <div className="col-span-3 w-[90%]">
        <Outlet />
      </div>

    </div>
  );
};

export default Dashboard;
