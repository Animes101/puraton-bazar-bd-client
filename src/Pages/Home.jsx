import React from "react";
import ReactHelmet from "../Components/Layout/ReactHelmet";
import Banner from "../Components/Banner";
import Card from "../Components/Card";
import useItem from "../hooks/useItem";

import { FaTruckFast } from "react-icons/fa6";
import { FaMedal } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { MdPhoneIphone, MdLaptopMac, MdCameraAlt, MdPayment, MdShoppingBag } from "react-icons/md";

const categories = [
  {
    name: "Mobile",
    icon: <MdPhoneIphone size={45} />,
  },
  {
    name: "Laptop / PC",
    icon: <MdLaptopMac size={45} />,
  },
  {
    name: "DSLR Camera",
    icon: <MdCameraAlt size={45} />,
  },
  {
    name: "Fashion",
    icon: <MdShoppingBag size={45} />,
  },
];

const infoData = [
  {
    id: 1,
    icon: <FaTruckFast size={40} />,
    title: "Fast Delivery",
    text: "We deliver your products quickly and safely.",
  },
  {
    id: 2,
    icon: <MdPayment size={40} />,
    title: "Secure Payment",
    text: "100% secure and trusted payment system.",
  },
  {
    id: 3,
    icon: <FaMedal size={40} />,
    title: "Best Quality",
    text: "We ensure the best quality products for you.",
  },
  {
    id: 4,
    icon: <BiSupport size={40} />,
    title: "24/7 Support",
    text: "Our support team is always available.",
  },
];

const Home = () => {
  // const { data: laptopData, isLoading:lapto } = useItem(0, 6, "laptop");

  // const { data: mobileData } = useItem(0, 6, "mobile");

  return (
    <div className="">
      <ReactHelmet pageName={"Home Page"} />

      <Banner />

      <div className="container mx-auto">
        <div className="my-14">
          <h1 className="text-2xl font-bold mb-6 text-center">Categories</h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow hover:shadow-xl flex flex-col items-center justify-center transition cursor-pointer"
              >
                <div className="text-blue-600 mb-3">{cat.icon}</div>
                <h2 className="text-lg font-semibold">{cat.name}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <h1 className="text-center text-3xl text-textColor font-bold py-10">
          Best Laptop
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8"></div>
      </div>

      <div className="container mx-auto py-5">
        <h1 className="text-center text-3xl text-textColor font-bold py-5">
          Why Choose Us
        </h1>
        <div className="max-w-6xl mx-auto mt-16 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {infoData.map((card) => (
            <div
              key={card.id}
              className="bg-white shadow-md p-6 rounded-xl flex flex-col items-center text-center hover:shadow-xl transition"
            >
              <div className="text-green-600 mb-3">{card.icon}</div>
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
