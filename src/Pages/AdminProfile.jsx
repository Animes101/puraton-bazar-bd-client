import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ReactHelmet from "../Components/Layout/ReactHelmet";

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data } = useQuery({
    queryKey: ["state"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/state`);
      return res.data; // expecting { users, order, allProduct, revenue }
    },
  });

  return (
    <div className="container mx-auto mt-[64px] min-h-[calc(100vh-276px)] px-5 flex justify-center items-center">
      {/* Helmet (SEO title) */}
      <ReactHelmet pageName={"AdminProfile"} />
      <div className="bg-bg2 shadow-lg rounded-2xl p-8 w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-8 ">
          <h1 className="text-3xl md:text-4xl font-bold text-bg3">
            Admin Profile
          </h1>
        </div>

        {/* Profile Top Section */}
        <div className="flex flex-col md:flex-row items-center gap-8">

          {/* Admin Image */}
          <div>
            <img
              src={user?.photoURL || "https://i.ibb.co/YTzP4cm/user.png"}
              alt="Admin"
              className="w-36 h-36 rounded-full border-4 border-bg3 object-cover shadow-md"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-bg3">
              {user?.displayName || "Admin Name"}
            </h2>

            <p className="text-btnBg mt-1">{user?.email}</p>

            <span className="inline-block mt-3 bg-bg3 text-white text-sm px-4 py-1 rounded-full">
              🔰 Admin Account
            </span>

            <p className="text-gray-400 text-sm mt-3">
              Joined: {user?.metadata?.creationTime || "Unknown"}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-600"></div>

        {/* Admin Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-bg3 text-white p-5 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-2">Total Products</h3>
            <p className="text-3xl">{data?.allProduct || 0}</p>
          </div>

          <div className="bg-bg3 text-white p-5 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-2">Orders Managed</h3>
            <p className="text-3xl">{data?.order || 0}</p>
          </div>

          <div className="bg-bg3 text-white p-5 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-2">Users Registered</h3>
            <p className="text-3xl">{data?.users || 0}</p>
          </div>

          <div className="bg-bg3 text-white p-5 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-2">Revenue</h3>
            <p className="text-3xl">৳{data?.revenue?.toLocaleString() || 0}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminProfile;
