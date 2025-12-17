import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

import { FaHome, FaHistory, FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { HiChevronDoubleRight } from "react-icons/hi";
import { IoIosAddCircle } from "react-icons/io";
import ReactHelmet from "../Components/Layout/ReactHelmet";

const Dashboard = () => {
  const { isAdmin } = useAdmin();
  const admin = isAdmin;

  return (
    <div className="md:grid grid-cols-4 gap-10 mt-[64px]">
      <ReactHelmet pageName="Dashboard" />

      {/* ===========================
            📱 MOBILE DRAWER START
      ============================ */}
      <div className="drawer md:hidden">
        <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />

        {/* Drawer Button */}
        <div className="drawer-content">
          <label htmlFor="my-drawer-1" className="btn drawer-button bg-transparent">
            <HiChevronDoubleRight className="text-3xl text-bg3" />
          </label>
        </div>

        {/* Drawer sidebar */}
        <div className="drawer-side">
          <label htmlFor="my-drawer-1" className="drawer-overlay"></label>

          <ul className="menu bg-bg3 w-80 p-4 min-h-[calc(100vh-64px)] mt-[64px] text-white">
            <div className="col-span-1">
              {admin ? (
                // ================= Admin Mobile Menu =================
                <ul className="flex flex-col justify-around h-[400px] font-bold items-center">

                  <li>
                    <NavLink to="/dashboard/adminHome">
                      <FaHome className="inline-block mr-2" /> Admin Home
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/all-users">
                      <FaUsers className="inline-block mr-2" /> Users
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/addItem">
                      <IoIosAddCircle className="inline-block mr-2" /> Add Items
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/products">
                      <FaHistory className="inline-block mr-2" /> All Products
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/admin/paymentHistory">
                      <FaHistory className="inline-block mr-2" /> Payment Status
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/admin/profile">
                      <CgProfile className="inline-block mr-2" /> Admin Profile
                    </NavLink>
                  </li>

                  <hr className="w-[60%] mx-auto" />

                  {/* Main Menu */}
                  <ul className="space-y-5 flex flex-col items-center">
                    <li>
                      <NavLink to="/">
                        <FaHome className="inline-block mr-2" /> Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/category">
                        <FaUsers className="inline-block mr-2" /> Category
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/contact">
                        <CgProfile className="inline-block mr-2" /> Contact
                      </NavLink>
                    </li>
                  </ul>
                </ul>
              ) : (
                // ================= User Mobile Menu =================
                <ul className="flex flex-col justify-around h-[400px] font-bold items-center">

                  <li>
                    <NavLink to="/dashboard/home">
                      <FaHome className="inline-block mr-2 text-xl" /> Home
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/Payment">
                      <FaHistory className="inline-block mr-2 text-xl" /> Payment
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/profile">
                      <CgProfile className="inline-block mr-2 text-xl" /> Profile
                    </NavLink>
                  </li>

                  <hr className="w-[60%] mx-auto" />

                  {/* Main Menu */}
                  <ul className="space-y-5 flex flex-col items-center">
                    <li>
                      <NavLink to="/">
                        <FaHome className="inline-block mr-2" /> Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/category">
                        <FaUsers className="inline-block mr-2" /> Category
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/contact">
                        <CgProfile className="inline-block mr-2" /> Contact
                      </NavLink>
                    </li>
                  </ul>
                </ul>
              )}
            </div>
          </ul>
        </div>
      </div>

      {/* ===========================
              🖥 DESKTOP SIDEBAR
      ============================ */}
      <div className="col-span-1 bg-bg3 h-screen text-white hidden md:block">
        {admin ? (
          // ================= Admin Desktop Menu =================
          <ul className="flex flex-col justify-around h-[400px] font-bold items-center">

            <li>
              <NavLink to="/dashboard/adminHome">
                <FaHome className="inline-block mr-2" /> Admin Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/all-users">
                <FaUsers className="inline-block mr-2" /> All Users
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/addItem">
                <IoIosAddCircle className="inline-block mr-2" /> Add Items
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/products">
                <FaHistory className="inline-block mr-2" /> All Products
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/admin/paymentHistory">
                <FaHistory className="inline-block mr-2" /> Payment Status
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/admin/profile">
                <CgProfile className="inline-block mr-2" /> Admin Profile
              </NavLink>
            </li>

            <hr className="w-[60%] mx-auto" />

            {/* Main Menu */}
            <ul className="space-y-5 text-center">
              <li>
                <NavLink to="/">
                  <FaHome className="inline-block mr-2" /> Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/category">
                  <FaUsers className="inline-block mr-2" /> Category
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact">
                  <CgProfile className="inline-block mr-2" /> Contact
                </NavLink>
              </li>
            </ul>

          </ul>
        ) : (
          // ================= User Desktop Menu =================
          <ul className="flex flex-col justify-around h-[400px] font-bold items-center">

            <li>
              <NavLink to="/dashboard/home">
                <FaHome className="inline-block mr-2 text-xl" /> Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/Payment">
                <FaHistory className="inline-block mr-2 text-xl" /> Payment
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/profile">
                <CgProfile className="inline-block mr-2 text-xl" /> Profile
              </NavLink>
            </li>

            <hr className="w-[60%] mx-auto" />

            <ul className="space-y-5 text-center">
              <li>
                <NavLink to="/">
                  <FaHome className="inline-block mr-2" /> Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/category">
                  <FaUsers className="inline-block mr-2" /> Category
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact">
                  <CgProfile className="inline-block mr-2" /> Contact
                </NavLink>
              </li>
            </ul>

          </ul>
        )}
      </div>

      {/* ===========================
              CONTENT SECTION
      ============================ */}
      <div className="col-span-3 w-[90%]">
        <Outlet />
      </div>

    </div>
  );
};

export default Dashboard;
