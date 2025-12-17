
import React, { useState } from "react";
import ReactHelmet from "../Components/Layout/ReactHelmet";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    alert("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="container mx-auto mt-[64px] min-h-[calc(100vh-276px)] py-20">
      <ReactHelmet pageName={'contact'} />
      <div className="flex flex-col md:flex-row gap-10 justify-center h-full">

        {/* ---------------- Contact Form ---------------- */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col gap-4 p-5 bg-bg2 rounded shadow w-full"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded border border-gray-400 focus:outline-none w-full"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded border border-gray-400 focus:outline-none w-full"
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="p-3 rounded border border-gray-400 focus:outline-none w-full"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="p-3 rounded border border-gray-400 focus:outline-none resize-none w-full"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-bg3 text-white py-3 rounded hover:bg-bg3/70 transition w-full"
          >
            Send Message
          </button>
        </form>

        {/* ---------------- Google Map ---------------- */}
        <div className="flex-1 w-full">
          <iframe
            title="location-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902387958579!2d90.40019091536521!3d23.75090309469547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b857eb36b3bb%3A0x5f99f6d57bb94dcf!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1699388358472!5m2!1sen!2sus"
            className="rounded shadow w-full h-[300px] md:h-[400px] lg:h-[450px]"
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
