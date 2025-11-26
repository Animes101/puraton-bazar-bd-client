import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { Toaster, toast } from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Register = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  // controlled state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      toast.error("❌ Password and Confirm Password do not match!");
      return; // form submit বন্ধ হবে
    }

    createUser(formData.email, formData.password)
      .then((result) => {
        const userInfo = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };
        axiosPublic
          .post("/users", userInfo)
          .then((res) => {
            if (res.data.data.insertedId) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: `${result?.user.email}`,
                showConfirmButton: false,
                timer: 1500,
              });
              navigate(location.state ? location.state : "/");
            }
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => {
        toast.error(`${err?.message}`);
      });
  };

  // handle Google login
  const handleGoogleLogin = () => {
     googleLogin()
     .then(result=> {

      const userInfo={
        name:result.user.displayName,
        email:result.user.email,
      }

      axiosPublic.post('/users', userInfo)
      .then(res=>{
        console.log(res);

        if(res.data.data.insertedId){
          Swal.fire({
            position: "center",
            icon: "success",
            title:`${result?.user.email}`,
            showConfirmButton: false,
            timer: 1500
          });
          navigate(location.state ? location.state : '/')
        }

        if(res.data.status == 'no'){
      


          toast.error("❌ User already exists! please Login");
          
        }

      
      })
    
     })
    .catch(err => {
      toast.error(`${err?.message}`);
    });
    
    
  }

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

              <label className="label text-xl text-bg1">
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

              <button
                type="submit"
                className="btn bg-bg3 text-white mt-4 bg-buttonBg text-textWhite text-xl w-full"
              >
                Register
              </button>

              {/* Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="btn bg-bg3  text-white text-xl w-full flex items-center justify-center gap-2"
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
                  <span className="text-bg1 font-semibold">
                    Login here
                  </span>
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
