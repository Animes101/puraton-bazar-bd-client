import React, { useState } from "react";

const Contact = () => {
  // ✅ Controlled form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    // Optionally, you can send this to backend via axios
    alert("Message sent successfully!");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="container mx-auto py-10 mt-[64px]">
      <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>

      <div className="flex flex-col md:flex-row gap-10">
        {/* ---------------- Contact Form ---------------- */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col gap-4 p-5 bg-bg2 rounded shadow"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 rounded border border-gray-400 focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 rounded border border-gray-400 focus:outline-none"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="p-2 rounded border border-gray-400 focus:outline-none"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="p-2 rounded border border-gray-400 focus:outline-none"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-bg3 text-white py-2 rounded hover:bg-bg3/70"
          >
            Send Message
          </button>
        </form>

        {/* ---------------- Google Map ---------------- */}
        <div className="flex-1">
          <iframe
            title="location-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902387958579!2d90.40019091536521!3d23.75090309469547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b857eb36b3bb%3A0x5f99f6d57bb94dcf!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1699388358472!5m2!1sen!2sus"
            width="100%"
            height="400"
            className="rounded shadow"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
