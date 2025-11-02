import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  // controlled state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });


  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

      // password match check
    if (formData.password !== formData.confirmPassword) {
      alert("❌ Password and Confirm Password do not match!");
      return; // form submit বন্ধ হবে
    }
    console.log("Register Data:", formData);
    // এখানে তুমি backend API call করতে পারো
  };

  // handle Google login
  const handleGoogleLogin = () => {
    console.log("Google login clicked!");
    // এখানে তুমি Firebase / OAuth Google login code দেবে
  };

  return (
    <div>
      <div className="hero min-h-screen bg-gradient-to-r from-bgGradient1 via-bgGradient3 to-bgGradient2">
        <div className="card border border-textColor w-[30%] bg-gradient-to-r from-bgGradient1 via-bgGradient3 to-bgGradient2 shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="fieldset space-y-2">
              <h1 className="text-textColor text-center text-3xl font-bold">
                Register
              </h1>

              <label className="label text-xl text-textColor">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input bg-transparent w-full border-textColor border p-2 text-xl outline-none"
                placeholder="Enter Your Name"
                required
              />

              <label className="label text-xl text-textColor">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input bg-transparent w-full border-textColor border p-2 text-xl outline-none"
                placeholder="Email"
                required
              />

              <label className="label text-xl text-textColor">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input bg-transparent w-full border-textColor border p-2 text-xl outline-none"
                placeholder="Password"
                required
              />

              <label className="label text-xl text-textColor">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input bg-transparent w-full border-textColor border p-2 text-xl outline-none"
                placeholder="Confirm Password"
                required
              />

              <div>
                <a className="link link-hover text-xl text-textColor">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="btn btn-neutral mt-4 bg-buttonBg text-textWhite text-xl w-full"
              >
                Register
              </button>

              {/* Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="btn bg-buttonBg text-textWhite text-xl w-full flex items-center justify-center gap-2"
              >
                <svg
                  aria-label="Google logo"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
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

              <div className="text-center mt-3">
                <Link
                  to="/login"
                  className="link link-hover text-xl text-textColor"
                >
                  Already have an account?{" "}
                  <span className="text-blue-400 font-semibold">Login here</span>
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
