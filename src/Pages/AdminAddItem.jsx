import React, { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const img_hosting_Key = import.meta.env.VITE_IMAGEBB_API_KEY;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${img_hosting_Key}`;

const AdminAddItem = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const [imgUploadLoading, setImageUploadLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    brand: "",
    price: "",
    condition: "",
    description: "",
    date: "",
    image1: null,
    image2: null,
  });

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (name === "img1") {
        setFormData((prev) => ({ ...prev, image1: file }));
      } else if (name === "img2") {
        setFormData((prev) => ({ ...prev, image2: file }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setImageUploadLoading(true);

      const image1 = { image: formData.image1 };
      const image2 = { image: formData.image2 };

      const res1 = await axiosPublic.post(imgHostingApi, image1, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res1.data.success) {
        setImageUploadLoading(false);

        const res2 = await axiosPublic.post(imgHostingApi, image2, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res2.data.success) {
          setImageUploadLoading(false);

          const newItem = {
            category: formData.category,
            name: formData.name,
            brand: formData.brand,
            price: formData.price,
            condition: formData.condition,
            description: formData.description,
            images: [res1.data.data.display_url, res2.data.data.display_url],
            postedAt: formData.date,
          };

          const result = await axiosSecure.post("/products", newItem);

          if (result.data.data.insertedId) {
            Swal.fire({
              position: "center-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
            
            setFormData({
    category: "",
    name: "",
    brand: "",
    price: "",
    condition: "",
    description: "",
    date: "",
    image1: null,
    image2: null,
  })
          }
        }
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      setImageUploadLoading(false);
    }
  };

  // ✅ Loading Screen
  if (imgUploadLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-blue-600 animate-pulse">
          Uploading Images...
        </h1>
        <p className="mt-2 text-gray-500">
          Please wait, it may take a few seconds.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center font-bold text-3xl mb-6">Add New Item</h1>

      <form
        onSubmit={handleSubmit}
        className="border flex flex-col gap-3 bg-bgGradient1 p-10 rounded-2xl"
      >
        {/* CATEGORY */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="bg-bgGradinet3 text-white font-bold text-2xl p-2 rounded"
        >
          <option value="">Select Category</option>
          <option value="DSLR">DSLR</option>
          <option value="Laptop">Laptop</option>
          <option value="Mobile">Mobile</option>
          <option value="PC">PC</option>
        </select>

        {/* NAME */}
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 rounded"
        />

        {/* BRAND */}
        <label htmlFor="brand">Brand</label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="p-2 rounded"
        />

        {/* PRICE */}
        <label htmlFor="price">Price</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="p-2 rounded"
        />

        {/* CONDITION */}
        <label htmlFor="condition">Condition</label>
        <input
          type="text"
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          className="p-2 rounded"
        />

        {/* DESCRIPTION */}
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="p-2 rounded"
        />

        {/* DATE */}
        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="p-2 rounded"
        />

        {/* IMAGE INPUTS */}
        <label htmlFor="img1">Image 1</label>
        <input
          type="file"
          name="img1"
          accept="image/*"
          onChange={handleChange}
          className="p-2"
        />

        <label htmlFor="img2">Image 2</label>
        <input
          type="file"
          name="img2"
          accept="image/*"
          onChange={handleChange}
          className="p-2"
        />

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-700"
        >
          Add Item
        </button>

        {/* ✅ Preview Selected Images */}
        <div className="mt-4 flex gap-3">
          {formData.image1 && (
            <img
              src={URL.createObjectURL(formData.image1)}
              alt="Preview 1"
              className="w-24 h-24 object-cover rounded"
            />
          )}
          {formData.image2 && (
            <img
              src={URL.createObjectURL(formData.image2)}
              alt="Preview 2"
              className="w-24 h-24 object-cover rounded"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminAddItem;
