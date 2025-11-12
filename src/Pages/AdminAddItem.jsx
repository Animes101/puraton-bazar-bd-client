import React, { useState } from "react";

const AdminAddItem = () => {
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    brand: "",
    price: "",
    condition: "",
    description: "",
    date: "",
    images: [], // all images from both file inputs will be stored here
  });

  // Input change handler
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      // multiple file input হলে সব ফাইল merge করে array তে রাখবো
      const fileArray = Array.from(files);

      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...fileArray], // merge both input's images
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    // Example FormData for backend upload
    // const formDataToSend = new FormData();
    // Object.keys(formData).forEach((key) => {
    //   if (key === "images") {
    //     formData.images.forEach((img) => formDataToSend.append("images", img));
    //   } else {
    //     formDataToSend.append(key, formData[key]);
    //   }
    // });

    // axios.post("/api/items", formDataToSend, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // });
  };

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
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 rounded"
        />

        {/* BRAND */}
        <label htmlFor="brand">Brand</label>
        <input
          type="text"
          name="brand"
          id="brand"
          value={formData.brand}
          onChange={handleChange}
          className="p-2 rounded"
        />

        {/* PRICE */}
        <label htmlFor="price">Price</label>
        <input
          type="text"
          name="price"
          id="price"
          value={formData.price}
          onChange={handleChange}
          className="p-2 rounded"
        />

        {/* CONDITION */}
        <label htmlFor="condition">Condition</label>
        <input
          type="text"
          name="condition"
          id="condition"
          value={formData.condition}
          onChange={handleChange}
          className="p-2 rounded"
        />

        {/* DESCRIPTION */}
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          className="p-2 rounded"
        />

        {/* DATE */}
        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          id="date"
          value={formData.date}
          onChange={handleChange}
          className="p-2 rounded"
        />

        {/* IMAGES INPUTS */}
        <label>Images (you can select multiple in both)</label>
        <input
          type="file"
          name="images1"
          multiple
          onChange={handleChange}
          className="p-2"
        />
        <input
          type="file"
          name="images2"
          multiple
          onChange={handleChange}
          className="p-2"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-700"
        >
          Add Item
        </button>

        {/* Preview Selected Images */}
        {formData.images.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {formData.images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default AdminAddItem;
