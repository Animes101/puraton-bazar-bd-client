import React, { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ReactHelmet from "../Components/Layout/ReactHelmet";


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
    isBest: Boolean,
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

        console.log(res2);

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
            isBest:formData.isBest,
          };

          const result = await axiosSecure.post("/products", newItem);

          if (result.data.data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "New Product Added Successfully",
              showConfirmButton: false,
              timer: 1500,
              iconColor:'#F1C40F',
              color:'#5b6e74',
              background:'#f2f2f0'
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
            });
          }
        }
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      setImageUploadLoading(false);
    }
  };

  return (
    <div className="">
      {/* Helmet (SEO title) */}
      <ReactHelmet pageName={"Admin Add Item Page"} />
      <h1 className="text-center font-bold text-3xl mb-6 text-bg1 py-4 uppercase">
        Add New Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2  py-5 rounded-2xl bg-bg2  p-10"
      >
        {/* CATEGORY */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className=" font-bold  p-2 rounded  border-bg4 border"
        >
          <option value="" className="">
            Select Category
          </option>
          <option value="DSLR">DSLR</option>
          <option value="Laptop">Laptop</option>
          <option value="Mobile">Mobile</option>
          <option value="PC">PC</option>
        </select>

        <div className="grid grid-cols-2 gap-2">
          {/* NAME */}
          <div className="flex flex-col py-3">
            <label className="font-bold" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 rounded  border-bg4 border  text-bg3"
            />
          </div>

          {/* BRAND */}
          <div className="flex flex-col py-3">
            <label className="font-bold" htmlFor="brand">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="p-2 rounded  border-bg4 border  text-bg3"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* PRICE */}
          <div className="flex flex-col py-2">
            <label className="font-bold" htmlFor="price">
              Price
            </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="p-2 rounded  border-bg4 border  text-bg3"
            />
          </div>

          {/* CONDITION */}
          <div className="flex flex-col py-2">
            <label className="font-bold" htmlFor="condition">
              Condition
            </label>
            <input
              type="text"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="p-2 rounded  border-bg4 border  text-bg3"
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <label className="font-bold" htmlFor="description">
          Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none"
          rows="4"
          placeholder="Write your Description"
        />

        {/* BEST */}
        <div className="py-4">
          <label className="font-bold" htmlFor="isBest">
           Best yes / No
        </label>
        <input onChange={handleChange}
  className="ml-5 scale-150 accent-bg3"
  type="checkbox"
  name="isBest"
  id="isBest"
/>

        </div>
        

        {/* DATE */}
        <label className="font-bold" htmlFor="date">
          Date
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="p-2 rounded  border-bg4 border text-white"
        />

        {/* IMAGE INPUTS */}
        <div className="flex justify-center items-center">
          <div>
            <label className="font-bold" htmlFor="img1">
              Image 1
            </label>
            <input
              type="file"
              name="img1"
              accept="image/*"
              onChange={handleChange}
              className="p-2 bg-bg2 inline-block"
            />
          </div>

          <div>
            <label className="font-bold" htmlFor="img2">
              Image 2
            </label>
            <input
              type="file"
              name="img2"
              accept="image/*"
              onChange={handleChange}
              className="p-2 bg-bg2 inline-block"
            />
          </div>
        </div>

        {/* ✅ Preview Selected Images */}
        <div className="mt-4 flex flex-col md:flex-row gap-4 justify-center items-center">
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
        {/* Submit */}
        <button
            type="submit"
            className="bg-bg3 text-white py-2 mt-4 rounded flex items-center justify-center gap-2 hover:bg-bg3/50"
            disabled={imgUploadLoading} // disable button while loading
          >
            {imgUploadLoading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin w-5 h-5" />
                Uploading...
              </>
            ) : (
              "Add Item"
            )}
          </button>
      </form>
    </div>
  );
};

export default AdminAddItem;
