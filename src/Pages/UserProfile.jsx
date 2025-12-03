import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mx-auto mt-[64px] min-h-[calc(100vh-276px)] px-5 flex justify-center items-center">
      <div className="bg-bg2 shadow-md p-8 rounded-2xl w-full max-w-md text-center">

        {/* Profile Image */}
        <div className="flex justify-center mb-5">
          <img
            src={user?.photoURL || "https://i.ibb.co/YTzP4cm/user.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-bg3 object-cover"
          />
        </div>

        {/* User Info */}
        <h1 className="text-2xl font-bold text-bg3 mb-1">
          {user?.displayName || "No Name Available"}
        </h1>

        <p className="text-gray-300">{user?.email || "No Email Available"}</p>

        <p className="text-gray-400 mt-2 text-sm">
          Joined: {user?.metadata?.creationTime
            ? new Date(user.metadata.creationTime).toLocaleDateString()
            : "Unknown"}
        </p>

        {/* Divider */}
        <div className="my-6 border-t border-gray-500"></div>

        {/* About Section */}
        <p className="text-gray-300 text-sm leading-6 px-3">
          Welcome to your profile dashboard. Here you can check your account
          information, manage security settings, and update your profile anytime.
        </p>

        {/* Edit Button */}
        <Link to="/edit-profile">
          <button className="mt-6 bg-bg3 text-white py-2 px-6 rounded-full hover:bg-bg3/80 transition">
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
