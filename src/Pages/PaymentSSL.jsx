import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const PaymentSSL = () => {
  const location = useLocation();

  const axiosSecure=useAxiosSecure();

  const totalPrice = location.state?.totalPrice || 0;
  const orderItem = location.state?.data || [];
  const { user } = useContext(AuthContext);

  console.log(orderItem);

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
        name:user.displayName,
        
        
    }

    axiosSecure.post('/order', order)
    .then(data=> {
      
      window.location.replace(data.data.url

      )
    } )

    
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Order now</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 bg-bgGradinet3 p-10 rounded-xl shadow"
      >
        <label>Name</label>
        <input
          value={formData.name}
          onChange={handleChange}
          type="text"
          name="name"
          className="input input-bordered w-full p-3"
        />

        <label>Email</label>
        <input
          value={formData.email}
          onChange={handleChange}
          type="email"
          name="email"
          className="input input-bordered w-full p-3"
        />

        <label>Address</label>
        <input
          value={formData.address}
          onChange={handleChange}
          type="text"
          name="address"
          className="input input-bordered w-full p-3"
        />

        <label>Price</label>
        <input
          value={formData.price}
          onChange={handleChange}
          type="text"
          name="price"
          className="input input-bordered w-full p-3"
          readOnly
        />

        <button className="btn bg-bgGradient1 text-black">Buy</button>
      </form>
    </div>
  );
};

export default PaymentSSL;
