import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { Toaster, toast } from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { updateProfile } from "firebase/auth";
import ReactHelmet from "../Components/Layout/ReactHelmet";

// ImageBB API key
const img_hosting_Key = import.meta.env.VITE_IMAGEBB_API_KEY;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${img_hosting_Key}`;

const Register = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photoUrl: null,
  });

  // -------------------------------
  // Handle input changes
  // -------------------------------
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, photoUrl: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // -------------------------------
  // Handle form submission
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1️⃣ Password check
    if (formData.password !== formData.confirmPassword) {
      toast.error("❌ Password and Confirm Password do not match!");
      return;
    }

    // 2️⃣ Upload profile image if exists
    let photoURL = null;
    if (formData.photoUrl) {
      const formDataObj = new FormData();
      formDataObj.append("image", formData.photoUrl);

      const res = await axiosPublic.post(imgHostingApi, formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      photoURL = res.data.data.display_url;
    }

    try {
      // 3️⃣ Create Firebase User
      const result = await createUser(formData.email, formData.password);

      // 4️⃣ Update Firebase Profile
      await updateProfile(result.user, {
        displayName: formData.name,
        photoURL: photoURL,
      });

      // 5️⃣ Send user info to backend
      const userInfo = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        photoUrl: photoURL,
      };

      const backendRes = await axiosPublic.post("/users", userInfo);

      if (backendRes.data.data?.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Welcome ${userInfo.name}`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      } else {
        toast.error("User registration failed on backend!");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // -------------------------------
  // Handle Google Login
  // -------------------------------
  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();

      const userInfo = {
        name: result.user.displayName,
        email: result.user.email,
      };

      const res = await axiosPublic.post("/users", userInfo);

      if (res.data.data?.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${result.user.email}`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      } else if (res.data.status === "no") {
        toast.error("❌ User already exists! Please login.");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <Toaster position="top-center" />
      <ReactHelmet pageName="Register" />

      <div className="hero min-h-screen bg-bg3 flex justify-center items-center px-4">
        {/* Card Container */}
        <div className="card border border-textColor w-full max-w-md bg-bg4 shadow-2xl">
          <div className="card-body">

            <form onSubmit={handleSubmit} className="space-y-4">
              <h1 className="text-white text-center text-3xl font-bold mb-4">Register</h1>

              {/* Name */}
              <div>
                <label className="label text-xl text-bg1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input w-full bg-transparent border-textColor border p-2 text-xl rounded"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="label text-xl text-bg1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input w-full bg-transparent border-textColor border p-2 text-xl rounded"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="label text-xl text-bg1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input w-full bg-transparent border-textColor border p-2 text-xl rounded"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="label text-xl text-bg1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input w-full bg-transparent border-textColor border p-2 text-xl rounded"
                  required
                />
              </div>

              {/* Profile Image */}
              <div>
                <label className="label text-xl text-bg1">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="file-input w-full border-textColor border rounded"
                />
              </div>

              {/* Register Button */}
              <button className="btn bg-bg3 text-bg5 text-xl w-full mt-2 rounded">
                Register
              </button>

              {/* Google Login */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="btn bg-bg3 text-white text-xl w-full mt-2 rounded"
              >
                Login with Google
              </button>

              {/* Link to Login */}
              <div className="text-center mt-3">
                <Link to="/login" className="text-xl text-textColor">
                  Already have an account? <span className="font-bold text-bg5">Login here</span>
                </Link>
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
