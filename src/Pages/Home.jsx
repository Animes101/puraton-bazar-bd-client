import React, { useState } from "react";
import ReactHelmet from "../Components/Layout/ReactHelmet";
import Banner from "../Components/Banner";
import Card from "../Components/Card";
import Marquee from "react-fast-marquee";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaTruckFast } from "react-icons/fa6";
import { FaMedal } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import {
  MdPhoneIphone,
  MdLaptopMac,
  MdCameraAlt,
  MdPayment,
} from "react-icons/md";

import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

// ------------------------
// Categories Data
// ------------------------
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

// ------------------------
// Why Choose Us Section Data
// ------------------------
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

// ------------------------
// Static Reviews Data
// ------------------------
const reviews = [
  {
    id: 1,
    name: "Rahim Uddin",
    rating: 4,
    review: "Product quality is excellent! Fast delivery, highly recommended.",
  },
  {
    id: 2,
    name: "Jannat Ara",
    rating: 4,
    review: "Good product and service. Packaging was perfect.",
  },
  {
    id: 3,
    name: "Sajid Hasan",
    rating: 5,
    review: "Best online shop! Very trusted.",
  },
];

const Home = () => {
  const axiosPublic = useAxiosPublic();

  // State for Latest Products "Show All / Show Less"
  const [isShowAll, setIsShowAll] = useState(true);

  // State for Best Products "Show All / Show Less"
  const [isShowAllBest, setIsShowAllBest] = useState(false);

  // ------------------------
  // Fetching Best Products
  // ------------------------
  const { data, isLoading } = useQuery({
    queryKey: ["bestProducts"],
    queryFn: async () =>
      axiosPublic.get("/best-product").then((res) => res.data.bestProduct),
  });

  // ------------------------
  // Fetching Latest Products
  // ------------------------
  const { data: latest, isLoading: latestLoaing } = useQuery({
    queryKey: ["latestdata"],
    queryFn: async () =>
      axiosPublic
        .get("/latest-products")
        .then((res) => res.data.latestProducts),
  });

  return (
    <div>
      {/* Helmet (SEO title) */}
      <ReactHelmet pageName={"Home Page"} />

      {/* Banner Section */}
      <Banner />

      {/* ------------------------ */}
      {/* Categories Section */}
      {/* ------------------------ */}
      <div className="container mx-auto py-10">
        <div>
          <div className="divider divider-neutral text-3xl uppercase font-bold my-10">
            Categories
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 py-5">
            {categories.map((cat, index) => (
              <Link
                state={{ categorie: cat.name }}
                to={`/category`}
                key={index}
                className="p-6 bg-bg2 border border-bg4 rounded-xl shadow hover:shadow-xl flex flex-col items-center justify-center transition cursor-pointer"
              >
                <div className="text-red-500 mb-3">{cat.icon}</div>
                <h2 className="text-lg uppercase font-semibold">{cat.name}</h2>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------ */}
      {/* Best Products Section */}
      {/* ------------------------ */}
      <div className="container mx-auto py-10">
        <div className="divider divider-neutral text-3xl uppercase font-bold py-10">
          Best Products
        </div>

        {/* Loading spinner */}
        {isLoading && (
          <div className="text-center">
            <span className="loading loading-infinity loading-xl mx-auto"></span>
          </div>
        )}

        {/* Best Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-5">
          {data?.slice(0, isShowAllBest ? data.length : 3).map((item) => (
            <Card key={item.id} data={item} />
          ))}
        </div>

        {/* Show All / Show Less button */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsShowAllBest(!isShowAllBest)}
            className="btn bg-bg3 hover:bg-bg3/80 uppercase p-2 text-white"
          >
            {isShowAllBest ? "Show Less" : "Show All"}
          </button>
        </div>
      </div>

      {/* ------------------------ */}
      {/* Latest Products Section */}
      {/* ------------------------ */}
      <div className="container mx-auto py-10">
        <div className="divider divider-neutral text-3xl uppercase font-bold py-10">
          Latest Products
        </div>

        {latestLoaing && (
          <div className="text-center">
            <span className="loading loading-infinity loading-xl mx-auto"></span>
          </div>
        )}

        {/* Latest Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-5">
          {latest?.slice(0, isShowAll ? 6 : latest?.length).map((item) => (
            <Card key={item.id} data={item} />
          ))}
        </div>

        {/* Toggle button */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsShowAll(!isShowAll)}
            className="btn bg-bg3 hover:bg-bg3/80 uppercase p-2 text-white"
          >
            {isShowAll ? "Show All" : "Show Less"}
          </button>
        </div>
      </div>

      {/* ------------------------ */}
      {/* Customer Review Section */}
      {/* ------------------------ */}
      <div className="container mx-auto py-16 space-y-16">
        <div className="divider divider-neutral text-3xl uppercase font-bold mb-10">
          Customer Reviews
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          className="pb-10"
        >
          {reviews.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-bg2 border border-bg4 shadow p-8 rounded-xl max-w-6xl mx-auto text-center">
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>

                <p className="text-red-500 text-lg mb-3">
                  {"⭐".repeat(item.rating)}
                </p>

                <p className="text-gray-600 font-medium">{item.review}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ------------------------ */}
      {/* Why Choose Us Section */}
      {/* ------------------------ */}
      <div className="container mx-auto py-10">
        <div className="divider divider-neutral text-3xl uppercase font-bold">
          Why Choose Us
        </div>

        <Marquee speed={80} pauseOnHover={true} gradient={false}>
          <div className="max-w-6xl mx-auto mt-16 px-4 flex gap-6">
            {infoData.map((card) => (
              <div
                key={card.id}
                className="bg-bg2 border border-bg4 cursor-pointer mb-5 shadow-md p-6 rounded-xl flex flex-col items-center text-center hover:shadow-xl transition min-w-[220px]"
              >
                <div className="text-red-500 text-4xl mb-3">{card.icon}</div>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm font-semibold">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default Home;
