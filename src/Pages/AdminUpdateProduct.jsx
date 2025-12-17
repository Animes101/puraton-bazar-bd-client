import React, { useState, useEffect } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactHelmet from "../Components/Layout/ReactHelmet";

const img_hosting_Key = import.meta.env.VITE_IMAGEBB_API_KEY;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${img_hosting_Key}`;

const AdminUpdateProduct = () => {
  const { id } = useParams();
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
    isBest: false,
    oldImages: [],
  });

  // Get product data
  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data.data;
    },
  });

  // Set initial form values
  useEffect(() => {
    if (data) {
      setFormData({
        category: data.category,
        name: data.name,
        brand: data.brand,
        price: data.price,
        condition: data.condition,
        description: data.description,
        date: data.postedAt,
        image1: null,
        image2: null,
        isBest: data.isBest || false,
        oldImages: data.images || [],
      });
    }
  }, [data]);

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    if (type === "file") {
      const file = files[0];
      if (name === "img1") {
        setFormData((prev) => ({ ...prev, image1: file }));
      } else if (name === "img2") {
        setFormData((prev) => ({ ...prev, image2: file }));
      }
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, isBest: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // UPDATE PRODUCT
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setImageUploadLoading(true);

      let img1URL = formData.oldImages[0];
      let img2URL = formData.oldImages[1];

      if (formData.image1) {
        const imgData = { image: formData.image1 };
        const res = await axiosPublic.post(imgHostingApi, imgData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        img1URL = res.data.data.display_url;
      }

      if (formData.image2) {
        const imgData = { image: formData.image2 };
        const res = await axiosPublic.post(imgHostingApi, imgData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        img2URL = res.data.data.display_url;
      }

      const updatedItem = {
        category: formData.category,
        name: formData.name,
        brand: formData.brand,
        price: formData.price,
        condition: formData.condition,
        description: formData.description,
        images: [img1URL, img2URL],
        postedAt: formData.date,
        isBest: formData.isBest,
      };

      const result = await axiosSecure.patch(`/products/${id}`, updatedItem);

      if (result.data.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Product Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      setImageUploadLoading(false);
    } catch (error) {
      console.error(error);
      setImageUploadLoading(false);
    }
  };

  if (isLoading || imgUploadLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-blue-600 animate-pulse">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div>
      {/* Helmet (SEO title) */}
      <ReactHelmet pageName={"Admin Update Product"} />
      <h1 className="text-center font-bold text-3xl mb-6 text-bg1 py-4 uppercase">
        Update Product
      </h1>

      <form
        onSubmit={handleUpdate}
        className="flex flex-col gap-2 py-5 rounded-2xl bg-bg2 p-10"
      >
        {/* CATEGORY */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="font-bold p-2 rounded border-bg4 border"
        >
          <option value="">Select Category</option>
          <option value="DSLR">DSLR</option>
          <option value="Laptop">Laptop</option>
          <option value="Mobile">Mobile</option>
          <option value="PC">PC</option>
        </select>

        {/* NAME */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 rounded border-bg4 border text-bg3"
        />

        {/* BRAND */}
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="p-2 rounded border-bg4 border text-bg3"
        />

        {/* PRICE + CONDITION */}
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="p-2 rounded border-bg4 border text-bg3"
          />

          <input
            type="text"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="p-2 rounded border-bg4 border text-bg3"
          />
        </div>

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          rows="4"
        />

        {/* BEST */}
        <div className="py-4">
          <label className="font-bold">Best (Yes / No)</label>
          <input
            type="checkbox"
            name="isBest"
            checked={formData.isBest}
            onChange={handleChange}
            className="ml-5 scale-150 accent-bg3"
          />
        </div>

        {/* DATE */}
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="p-2 rounded border-bg4 border"
        />

        {/* IMAGE INPUTS */}
        <div className="flex justify-center items-center gap-4">
          <div>
            <label className="font-bold">Image 1</label>
            <input
              type="file"
              name="img1"
              accept="image/*"
              onChange={handleChange}
              className="p-2"
            />
          </div>

          <div>
            <label className="font-bold">Image 2</label>
            <input
              type="file"
              name="img2"
              accept="image/*"
              onChange={handleChange}
              className="p-2"
            />
          </div>
        </div>

        {/* PREVIEW */}
        <div className="mt-4 flex gap-4 justify-center">
          <img
            src={
              formData.image1
                ? URL.createObjectURL(formData.image1)
                : formData.oldImages[0]
            }
            className="w-24 h-24 object-cover rounded"
          />
          <img
            src={
              formData.image2
                ? URL.createObjectURL(formData.image2)
                : formData.oldImages[1]
            }
            className="w-24 h-24 object-cover rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-bg3 text-white py-2 mt-4 rounded hover:bg-bg3/50"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default AdminUpdateProduct;

