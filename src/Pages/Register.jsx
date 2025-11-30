import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { Toaster, toast } from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxiosPublic";

const img_hosting_Key = import.meta.env.VITE_IMAGEBB_API_KEY;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${img_hosting_Key}`;

const Register = () => {
  const { createUser, googleLogin, updateProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photoUrl: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, photoUrl: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1️⃣ Password validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("❌ Password and Confirm Password do not match!");
      return;
    }

    // 3️⃣ Upload image if selected
    let photoURL = null;
    if (formData.photoUrl) {
      const imgFile = formData.photoUrl;
      const formDataObj = new FormData();
      formDataObj.append("image", imgFile);

      const res = await axiosPublic.post(imgHostingApi, formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      photoURL = res.data.data.display_url;
    }

    try {
      // 2️⃣ Create Firebase user
      createUser(formData.email, formData.password)
      .then((result) => {
        // 4️⃣ Update Firebase profile
        updateProfile(result.user, formData.name, photoURL).then(() => {
          // 5️⃣ Send user info to backend
          const userInfo = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            photoUrl: photoURL,
          };

          const backendRes = axiosPublic.post("/users", userInfo);

          if (backendRes.data?.data?.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `Welcome ${userInfo.name}`,
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/"); // Or use location.state
          } else {
            toast.error("User registration failed on backend!");
          }
        });
      });
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || err.message);
    }
  };

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
        navigate(location.state ? location.state : "/");
      } else if (res.data.status === "no") {
        toast.error("❌ User already exists! please Login");
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div>
      <Toaster position="top-center" />
      <div className="hero min-h-screen bg-bg3">
        <div className="card border border-textColor w-[30%] bg-bg4 shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="fieldset space-y-2">
              <h1 className="text-white text-center text-3xl font-bold">
                Register
              </h1>

              <label className="label text-xl text-bg1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input bg-transparent w-full border-textColor border p-2 text-xl outline-none"
                placeholder="Enter Your Name"
                required
              />

              <label className="label text-xl text-bg1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input bg-transparent w-full border-textColor border p-2 text-xl outline-none"
                placeholder="Email"
                required
              />

              <label className="label text-xl text-bg1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input bg-transparent w-full border-textColor border p-2 text-xl outline-none"
                placeholder="Password"
                required
              />

              <label className="label text-xl text-bg1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input bg-transparent w-full border-textColor border p-2 text-xl outline-none"
                placeholder="Confirm Password"
                required
              />

              <input
                type="file"
                onChange={handleChange}
                name="profileImage"
                id="profile"
              />

              <button
                type="submit"
                className="btn bg-bg3 text-white mt-4 bg-buttonBg text-textWhite text-xl w-full"
              >
                Register
              </button>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="btn bg-bg3 text-white text-xl w-full flex items-center justify-center gap-2"
              >
                Login with Google
              </button>

              <div className="text-center mt-3">
                <Link
                  to="/login"
                  className="link link-hover text-xl text-textColor"
                >
                  Already have an account?{" "}
                  <span className="text-bg1 font-semibold">Login here</span>
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
