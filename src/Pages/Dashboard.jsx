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
      {/* Drawer */}
      <div className="drawer md:hidden">
        <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-1"
            className="btn drawer-button bg-transparent"
          >
            <HiChevronDoubleRight className="text-3xl" />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-1"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-bg3 w-80 p-4  min-h-[calc(100vh-64px)] mt-[64px]">
            {/* Sidebar content here */}

            <div className="col-span-1 bg-bg3 h-screen text-white">
        {admin ? (
          <ul className="flex flex-col justify-around h-[400px] text-textColor font-bold  items-center ">
            <li>
              <Link to="/dashboard/adminHome">
                <FaHome /> Admin Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard/all-users">All Users</Link>
            </li>
            <li>
              <Link to="/dashboard/addItem">Add Items</Link>
            </li>
            <li>
              <Link to="/dashboard/products">All Products</Link>
            </li>
            <li>
              <Link to="/dashboard/admin/paymentHistory">Payment Status</Link>
            </li>
            <li>
              <Link to="/dashboard/admin/profile">Admin Profile</Link>
            </li>

            <hr className="w-[60%] mx-auto text-white"></hr>
            <ul>
              {/* Main links */}
              <li>
                <NavLink to="/" className="text-white">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/category" className="text-white">
                  Category
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-white">
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" className="text-white">
                  Dashboard
                </NavLink>
              </li>
            </ul>
          </ul>
        ) : (
          <ul className="flex flex-col justify-around h-[400px] text-textColor font-bold  items-center">
            <li>
              <Link to="/dashboard/home">
                Home <FaHome className="inline-block text-xl" />
              </Link>
            </li>
            <li>
              <Link to="/dashboard/Payment">
                Payment <FaHistory className="inline-block text-xl" />
              </Link>
            </li>
            <li>
              <Link to="/dashboard/profile">
                Profile <CgProfile className="inline-block text-xl" />
              </Link>
            </li>
            <hr className="w-[60%] mx-auto text-white"></hr>
            <ul className="space-y-5 flex flex-col items-center justify-center">
              {/* Main links */}
              <li>
                <NavLink to="/" className="text-white">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/category" className="text-white">
                  Category
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-white">
                  Contact
                </NavLink>
              </li>
            </ul>
          </ul>
        )}
      </div>
            
              
          </ul>
        </div>
      </div>

      <div className="col-span-1 bg-bg3 h-screen text-white  hidden md:block ">
        {admin ? (
          <ul className="flex flex-col justify-around h-[400px] text-textColor font-bold  items-center ">
            <li>
              <Link to="/dashboard/adminHome">
                <FaHome /> Admin Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard/all-users">All Users</Link>
            </li>
            <li>
              <Link to="/dashboard/addItem">Add Items</Link>
            </li>
            <li>
              <Link to="/dashboard/products">All Products</Link>
            </li>
            <li>
              <Link to="/dashboard/admin/paymentHistory">Payment Status</Link>
            </li>
            <li>
              <Link to="/dashboard/admin/profile">Admin Profile</Link>
            </li>

            <hr className="w-[60%] mx-auto text-white"></hr>
            <ul>
              {/* Main links */}
              <li>
                <NavLink to="/" className="text-white">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/category" className="text-white">
                  Category
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-white">
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" className="text-white">
                  Dashboard
                </NavLink>
              </li>
            </ul>
          </ul>
        ) : (
          <ul className="flex flex-col justify-around h-[400px] text-textColor font-bold  items-center">
            <li>
              <Link to="/dashboard/home">
                Home <FaHome className="inline-block text-xl" />
              </Link>
            </li>
            <li>
              <Link to="/dashboard/Payment">
                Payment <FaHistory className="inline-block text-xl" />
              </Link>
            </li>
            <li>
              <Link to="/dashboard/profile">
                Profile <CgProfile className="inline-block text-xl" />
              </Link>
            </li>
            <hr className="w-[60%] mx-auto text-white"></hr>
            <ul className="space-y-5 flex flex-col items-center justify-center">
              {/* Main links */}
              <li>
                <NavLink to="/" className="text-white">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/category" className="text-white">
                  Category
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-white">
                  Contact
                </NavLink>
              </li>
            </ul>
          </ul>
        )}
      </div>
      <div className="col-span-3 w-[90%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
