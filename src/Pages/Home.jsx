import React from "react";
import ReactHelmet from "../Components/Layout/ReactHelmet";
import Banner from "../Components/Banner";
import Card from "../Components/Card";
import Marquee from "react-fast-marquee";

import { FaTruckFast } from "react-icons/fa6";
import { FaMedal } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { MdPhoneIphone, MdLaptopMac, MdCameraAlt, MdPayment, MdShoppingBag } from "react-icons/md";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const categories = [
  {
    name: "Mobile",
    icon: <MdPhoneIphone size={45} />,
  },
  {
    name: "Laptop",
    icon: <MdLaptopMac size={45} />,
  },
  {
    name: "DSLR",
    icon: <MdCameraAlt size={45} />,
  },
  {
    name: "PC",
   icon: <MdLaptopMac size={45} />,
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

  const axiosPublic=useAxiosPublic()

  const { data, isLoading } = useQuery({
  queryKey: ["bestProducts"],
  queryFn: async () => axiosPublic.get("/best-product")
  .then(res => res.data.bestProduct),
});

  return (
    <div className="">
      <ReactHelmet pageName={"Home Page"} />

      <Banner />

      <div className="container mx-auto">
        <div className="my-14">
          <div className="divider divider-neutral  text-lg font-bold my-10">Categories</div>

          <div  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <Link state={{categorie:cat.name}} to={`/category`}
                key={index}
                className="p-6 bg-bg4 rounded-xl shadow hover:shadow-xl flex flex-col items-center justify-center transition cursor-pointer"
              >
                <div className="text-bg2 mb-3">{cat.icon}</div>
                <h2 className="text-lg font-semibold">{cat.name}</h2>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="divider divider-neutral  text-lg font-bold py-10">Best Products</div>
        {isLoading && <span className="loading loading-infinity loading-xl"></span>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-between ">
          {data?.map((item)=><Card key={item.id} data={item} />)}

        </div>
      </div>

      <div className="container mx-auto py-10">
        <div className="divider divider-neutral  text-lg font-bold">Why Choose Us</div>
        
        <Marquee speed={80} pauseOnHover={true} gradient={false}>
  <div className="max-w-6xl mx-auto mt-16 px-4 flex gap-6">
    {infoData.map((card) => (
      <div
        key={card.id}
        className="bg-bg4 cursor-pointer mb-5 shadow-md shadow-bg3 p-6 rounded-xl flex flex-col items-center text-center hover:shadow-xl transition min-w-[220px]"
      >
        <div className="text-bg2 text-4xl mb-3">{card.icon}</div>
        <h3 className="text-xl font-bold mb-2">{card.title}</h3>
        <p className="text-gray-600 text-sm font-semibold">{card.text}</p>
      </div>
    ))}
  </div>
</Marquee>
      </div>
    </div>
  );
};

export default Home;
