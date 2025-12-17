import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast, { Toaster } from 'react-hot-toast';
import ReactHelmet from "../Components/Layout/ReactHelmet";

const PaymentSSL = () => {
  const location = useLocation();

  const axiosSecure=useAxiosSecure();

  const totalPrice = location.state?.totalPrice || 0;
  const orderItem = location.state?.data || [];
  const { user } = useContext(AuthContext);

  // Controlled Form States
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    address: "",
    price: totalPrice || "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // এখানে SSLCommerz payment এর API কল যাবে
    const order={

        orderName: orderItem.map((item)=> item.name),
        id: orderItem.map((item)=> item._id),
        email:user.email,
        price:totalPrice,
        address:formData.address,
        name:user.displayName || formData.name ,
        
        
    }

    axiosSecure.post('/order', order)
    .then(data=> {
      
      window.location.replace(data.data.url

      )
    } )
    .catch(err=>{
        toast.error(`Payment Failed ${err.message}`)

    
    })
  };

  return (
    <div className="max-w-xl mx-auto mt-10 ">
      <ReactHelmet pageName="Payment SSL" />
      <h1 className="text-2xl font-bold mb-5">Order Now</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 bg-bg2 p-10 rounded-xl shadow  border border-bg4"
      >
        <label className="text-bg3 font-bold">Name</label>
        <input
          value={formData.name}
          onChange={handleChange}
          type="text"
          name="name"
          className="input input-bordered w-full p-3"
        />

        <label className="text-bg3 font-bold">Email</label>
        <input
          value={formData.email}
          onChange={handleChange}
          type="email"
          name="email"
          className="input input-bordered w-full p-3"
        />

        <label className="text-bg3 font-bold">Address</label>
        <input
          value={formData.address}
          onChange={handleChange}
          type="text"
          name="address"
          placeholder="Enter Your Addres"
          className="input input-bordered w-full p-3"
        />

        <label className="text-bg3 font-bold">Price</label>
        <input
          value={formData.price}
          onChange={handleChange}
          type="text"
          name="price"
          className="input input-bordered w-full p-3"
          readOnly
        />

        <button className="btn bg-bgGradient1 bg-bg3 text-white">Buy</button>
      </form>
    </div>
  );
};

export default PaymentSSL;
