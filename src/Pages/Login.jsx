import { useContext, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import ReactHelmet from "../Components/Layout/ReactHelmet";

const Login = () => {
  const { googleLogin, loginUser, forgatePassword } = useContext(AuthContext);
  const [seePassword, setSeePassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const emailRef = useRef(null);

  // Input Handle
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Login Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields!");
      return;
    }

    loginUser(formData.email, formData.password)
      .then((result) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Logged in as ${result?.user.email}`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location.state ? location.state : "/");
      })
      .catch(() => {
        toast.error("Invalid email or password");
      });
  };

  // Google login
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Logged in as ${result?.user.email}`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location.state ? location.state : "/");
      })
      .catch(() => {
        toast.error("Google login failed");
      });
  };

  // Forgot Password
  const handlePasswordChange = () => {
    const email = emailRef.current.value;

    if (!email) {
      toast.error("Please enter your email first!");
      return;
    }

    forgatePassword(email)
      .then(() => {
        toast.success(`Password reset email sent to ${email}`);
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          toast.error("No user found with this email");
        } else if (error.code === "auth/invalid-email") {
          toast.error("Invalid email format");
        } else {
          toast.error("Error: " + error.code);
        }
      });
  };

  return (
    <div className="hero min-h-screen bg-bg3 px-3">
      <ReactHelmet pageName={'login'} />
      <div className="card border border-textColor w-full sm:w-[60%] md:w-[40%] lg:w-[28%] bg-bg4 mx-auto">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="fieldset space-y-2">
            <h1 className="text-white text-center text-3xl font-bold">
              Login
            </h1>

            {/* Email */}
            <label className="label text-xl text-textColor">Email</label>
            <input
              type="email"
              name="email"
              ref={emailRef}
              value={formData.email}
              onChange={handleChange}
              className="input bg-transparent w-full border-textColor border p-2 text-xl outline-none"
              placeholder="Email"
              required
            />

            {/* Password */}
            <label className="label text-xl text-textColor">Password</label>
            <div className="relative w-full">
              <input
                type={seePassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input bg-transparent w-full border-textColor border p-2 text-xl outline-none pr-12"
                placeholder="Password"
                required
              />

              <button
                type="button"
                onClick={() => setSeePassword(!seePassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-textColor text-2xl"
              >
                {seePassword ? <IoMdEye /> : <FaRegEyeSlash />}
              </button>
            </div>

            {/* Forgot Password */}
            <div>
              <span
                onClick={handlePasswordChange}
                className="link link-hover text-xl text-red-500 cursor-pointer hover:text-black"
              >
                Forgot password?
              </span>
            </div>

            {/* Login Btn */}
            <button
              type="submit"
              className="btn bg-bg3 text-white text-xl w-full mt-4"
            >
              Login
            </button>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn bg-bg3 text-bg5 text-xl w-full flex items-center justify-center gap-2"
            >
              <svg className="rounded"
                aria-label="Google logo"
                width="24"
                height="24"
                viewBox="0 0 512 512"
              >
                <path fill="#fff" d="m0 0H512V512H0z" />
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                />
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                />
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                />
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                />
              </svg>
              Login with Google
            </button>

            {/* Bottom link */}
            <div className="text-center mt-3">
              <Link
                to="/register"
                className="link link-hover text-xl text-textColor"
              >
                No account?{" "}
                <span className="text-bg2 font-semibold">
                  Create one
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
