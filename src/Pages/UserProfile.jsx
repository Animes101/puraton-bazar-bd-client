import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [preview, setPreview] = useState(user?.photoURL || ""); // 👈 preview state
  const [file, setFile] = useState(null); // 👈 selected file
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handlePhotoChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // 👈 instant preview
    }
  };

  // Upload to Imgbb manually (you already know how)
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.data.url; // return hosted URL
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      let finalPhotoURL = photo;

      if (file) {
        finalPhotoURL = await uploadImage(file); // 👈 upload image first
        setPhoto(finalPhotoURL);
      }

      await updateProfile(user, {
        displayName: name,
        photoURL: finalPhotoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile information has been saved.",
        background: "#f2f2f0",
        color: "#000000",
        customClass: {
          confirmButton: "btn bg-bg3 text-white",
        },

      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-[64px] min-h-[calc(100vh-276px)] px-5 flex justify-center items-center">
      <div className="bg-bg2 shadow-md p-8 rounded-2xl w-full max-w-md text-center border border-bg4">

        {/* Profile Image Preview */}
        <div className="flex justify-center mb-5">
          <img
            src={preview || "https://i.ibb.co/YTzP4cm/user.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-bg3 object-cover"
          />
        </div>

        <h1 className="text-2xl font-bold text-bg3 mb-1">
          {user?.displayName}
        </h1>
        <p className="text-black">{user?.email}</p>

        <div className="my-6 border-t border-gray-500"></div>

        <div className="drawer drawer-end">
          <input id="edit-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="edit-drawer" className="btn bg-bg3 text-white">Edit Profile</label>
          </div>

          <div className="drawer-side">
            <label htmlFor="edit-drawer" className="drawer-overlay"></label>

            <div className="menu bg-base-200 min-h-[calc(100vh-64px)] mt-[64px] bg-bg2 w-80 p-5 space-y-4">

              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

              <label className="font-semibold mt-2">Name</label>
              <input
                type="text"
                className="input w-full p-4 border-t-node border-left-node border-r-node border-b-2 border-b-bg3  rounded-md mb-4 bg-transparent text-black focus:outline-none"
                value={name}
                placeholder="Enter Your Name"
                onChange={(e) => setName(e.target.value)}
              />

              <label className="font-semibold mt-2">Profile Photo</label>
              <input
                type="file"
                className="file-input file-input-bordered w-full mb-4 bg-bg4 text-white"
                accept="image/*"
                onChange={handlePhotoChange} // 👈 handle file
              />

              <button
                onClick={handleSave}
                disabled={loading}
                className="btn bg-bg3 text-white w-full"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;
